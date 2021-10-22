import {ref, computed} from "vue"

const todos = ref([]);

const sorted = computed(()=>{
  return todos.value.sort((x,y) => (x.completed === y.completed)? 0 : x.completed? 1 : -1 )
})

export  { todos, sorted }