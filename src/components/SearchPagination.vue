<template>
    <button class="btn btn-colored" id="pagination-back-button" 
      :class="{ disabled: page_index == 0}" 
      @click="decrementPage()"
      >Previous</button>
    <button class="btn btn-colored" id="pagination-next-button" 
      :class="{ disabled: page_index == lastIndex}" 
      @click="incrementPage()"
      >Next</button>

      <span>results per page</span>
      <select  class="btn-colored" v-model="rpp" @change="changeRPP()">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
  </template>
   
  <script>
  export default {
    name: 'SearchbarPagination',
    props: [
      'page_index',
      'papers_list_length',
      'window_size'
    ],
    data(){
      return{
        rpp: this.$route.query.rpp ? this.$route.query.rpp : 10
      }
    },
    methods: {
      decrementPage() {
        this.$emit('decrement-page');
      },
      incrementPage(){
        this.$emit('increment-page');
      },
      changeRPP(){
        this.$router.push({path: '/search', query: {query: this.$route.query.query, rpp: this.rpp}})
      }
    },
    computed: {
      lastIndex(){
        return Math.floor(this.papers_list_length / this.window_size);
      },
    }
  }
  </script>
<style scoped>
.btn-colored{
    margin: 2px 4px;
    font-size: 11px;
    font-weight: bold;
    color: #F9F9F9;
    line-height: 11px;
    border-radius: 40px;
    background: #81B9FF;
    transition: all 0.3s ease 0s;
}
.btn-colored:hover{
    /* color: #FFF; */
    background: #81B9FF;
    /* border: 2px solid rgba(108, 89, 179, 0.75); */
}
</style>