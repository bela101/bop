<template>
<div class="navbar-wrapper" container-fluid>
    <div class="row align-top">
      <div class="col" @click="forward()">
        <h6 class="heading">Berlin Open Science Platform </h6>
      </div>
    </div>
</div>
</template>

<script>
export default{
    name: 'Navbar',
    methods:{
        forward(){
          // window.location.href = '#'
          this.$router.push({path: '/' })
        }
      }
}
</script>

<style scoped>
.navbar-wrapper{
  background-color: #116D6E;
}

.navbar-wrapper{
  font-size: 25px;
}
</style>