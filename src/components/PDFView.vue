<template>
    <!-- <div class="row table-overhead">
              <div class="col-3">
                <div class="table-overhead-title">200</div>
                <div class="table-overhead-subtitle">unique values</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">200</div>
                <div class="table-overhead-subtitle">pages</div>
              </div>
              <div class="col-3">asd</div>
              <div class="col-3">tzh</div>
    </div> -->
    <div v-if="!this.fullscreen" class="text-box">
      <vue-pdf-embed 
        :source="this.pdfsource" />
    </div>
    <div v-if="this.fullscreen" class="text-box-fullscreen">
      <vue-pdf-embed 
        :source="this.pdfsource2" />
    </div>
</template>

<script>
import { ref } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

export default {
    name: 'TextView',
    components: {
      VuePdfEmbed
    },
    props: [
    'data',
    'file',
    'fullscreen_bool'
  ],
  data(){
    return{
      // pageCount: 1
    }
  },
  computed:{
    pdfsource(){
      console.log('small')
      return 'http://localhost:5174/item/0704.0002?file=' + this.file
    },
    pdfsource2(){
      console.log("full")
      return 'http://localhost:5174/item/0704.0002?file=' + this.file
    },
    fullscreen(){
      console.log(this.fullscreen_bool)
      return this.fullscreen_bool
    }
    // pageCount(){
    //   return this.$refs.pdfRef.pageCount
    // }
  },
  methods:{
    // handleDocumentRender(){
    //   this.pageCount = this.$refs.pdfRef.pageCount
    // }
  }
}
</script>
<style scoped>
.table-overhead-title{
  font-weight: bold;
}
.table-overhead-subtitle{
  font-size: 12px;
}
.table-overhead{
  height: 75px;
  display: flex;
  align-items:center;
  justify-content:center;
}
.text-box{
  max-height: 500px;
  overflow: auto;
}
.text-box-fullscreen{
  max-height: 100vh;
  overflow: auto;
}
</style>