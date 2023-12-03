<template>
   <Suspense>
      <template #default>
        <router-view :key="$route.fullPath"></router-view>
      </template>
      <template #fallback>
          Loading...
      </template>
  </Suspense> 
</template>

<script>
import dataset from './assets/datasetsmall.json'

export default {
name: 'App',
data() {
  return {
    papers: dataset
  }
},
provide(){
  return{
    papers: this.papers
  }
},
}
</script>

<style>
#app {
font-family: Verdana, Geneva, Tahoma, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
background-color: #fff;
margin: 0px;
}
.container{
  max-width: 992px;
}
</style>
