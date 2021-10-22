<template>
  <Todos />
  <Header/>
 <!-- {{todos}}   -->

</template>

<script setup>

import { onMounted } from '@vue/runtime-core';
import Header from './components/Header.vue'
import Todos from './components/Todos.vue'
import {todos, sorted} from "./todos"

onMounted(()=>{
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => {
    todos.value = json
  })
})



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
