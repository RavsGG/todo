<template>



  
  <button
    @click="toggle()"
    class="flex justify-between float-left w-full p-6 mb-2 text-2xl text-left text-black rounded-full shadow-md mx-15 hover:bg-gray-100"
    :class="{
        'line-through':todo.completed,
        'text-opacity-20':todo.completed

      }"
    >
    
    <div>{{todo.title}}
    <!-- <pre>{{todo}}</pre> -->
    </div>

      

    <div 
      class="flex items-center justify-center w-8 h-8 font-black text-white rounded-full shadow-md"
      :class="{
        'bg-green-500':todo.completed,
        'bg-white':!todo.completed,

      }"
    >
      <svg v-if="todo.completed === true" xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24" width="24" fill="currentColor"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg>
      </div>
  </button>
   <button @click="deleteTodo" class="flex items-center justify-center w-8 h-8 p-1 mx-auto my-1 font-black text-white bg-red-500 rounded-full shadow-md">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
      </button>
  

 

</template>

<script setup>
import {todos} from "./../todos"
import {computed} from 'vue'
const props = defineProps({
  todo: Object  
})

const toggle = () => {
  props.todo.completed = !props.todo.completed
}

const index = computed(()=>{
  return todos.value.map(todo => todo.id).indexOf(props.todo.id);
})


const deleteTodo = () => {
  todos.value.splice(index.value, 1);
}


</script>
