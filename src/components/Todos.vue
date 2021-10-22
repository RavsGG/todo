<template>

  <div class="fixed w-72 top-16">
    
  </div>
  <div class="sticky top-0 p-3 bg-blue-300 ">
    <Listbox v-model="selectedUserId">
    <ListboxButton class="flex items-center justify-center w-20 p-3 m-auto text-black bg-white rounded-full hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg>
      &nbsp {{ selectedUserId }}</ListboxButton>
  

    <ListboxOptions 
    class="absolute z-20 flex justify-center w-full p-4 mt-1 overflow-auto text-lg font-black bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
>

  <ListboxOption
    v-for="user in userIds"
    
    :value="user"

    class="flex justify-between w-full p-5 mb-2 text-center text-black bg-gray-200 shadow-md hover:bg-blue-200"
    
    
  >
    User: {{user}}
    <svg v-if="user === selectedUserId" xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24" width="24" fill="currentColor"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg>
  </ListboxOption>
        
        
    </ListboxOptions>
  </Listbox>
      
      <div v-if="selectedUserId">
        
        <div class="flex flex-row w-2/5 mx-auto my-2 bg-white rounded-full shadow-xl focus-within:ring ring-blue-500">

          <input v-on:keyup.enter="addTask()" v-model="newTask" ref="newTaskInput" type="text" 
          class="w-full p-2 m-2 bg-transparent rounded-xl focus:outline-none" placeholder="New Task">
        
          <button @click="addTask()" 
          class="flex items-center justify-center w-10 p-2 m-2 rounded-full hover:bg-gray-300">+</button>

        </div>

        <div class="relative">
        <div id="bar" class="transition-all duration-100 rounded-full shadow-md" :style="`width: ${completedPercent}%`"
        :class="{
          'bg-red-500':completedPercent < 30,     
          'bg-yellow-500':completedPercent >= 30,
          'bg-green-500':completedPercent >= 60,

        }"
        >
        <p class="p-1 font-bold text-black">{{completedPercent}}%</p>
        
        
        
        </div>
        
        </div>
        <p class="p-1 font-bold text-black"> {{notCompleted}} Tasks to go</p>
        <p class="w-full p-4 m-2 text-xl font-bold text-center text-black bg-green-400 rounded-full shadow-md" v-if="completedPercent == 100">🎉 Your'e Done! 🎉</p>
      </div>
  </div>
  <div class="px-8">
    <Todo v-for="todo in userTasks" :todo="todo" v-if="selectedUserId"/>
    
  </div>

</template>

<script setup>
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'
import Todo from './Todo.vue'
import {ref, computed} from "vue"
import {todos, sorted} from "./../todos"



const newTask = ref()
const addTask = ()=> {
  if (newTask.value !== null) {
  todos.value.push({
    "title": newTask.value, 
    "completed": false,
    "userId": selectedUserId.value
    })

    newTask.value = null
  }

    
}

const userTasks = computed(()=>{
  return sorted.value.filter(todo => todo.userId == selectedUserId.value)
})

const userIds = computed(()=>{
  return todos.value.map(item => item.userId)
  .filter((value, index, self) => self.indexOf(value) === index)
})

const selectedUserId = ref(1);



const Completed = computed(()=> {
  return userTasks.value.filter(todo=> todo.completed);
})

const completedPercent = computed(()=>  parseInt(Completed.value.length / userTasks.value.length * 100, 10))

const notCompleted = computed(()=> userTasks.value.length - Completed.value.length)

const notZeroPercent =computed(()=> {
  if (userTasks.value.length !== 0){
    return completedPercent.value
  } else {
    
    
  }
})

</script>

<style>



</style>