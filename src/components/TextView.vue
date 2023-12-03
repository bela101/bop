<template>
    <div class="row table-overhead">
              <div class="col-3">
                <div class="table-overhead-title">{{ this.wordCount }}</div>
                <div class="table-overhead-subtitle">words</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">{{ this.data.length }}</div>
                <div class="table-overhead-subtitle">characters</div>
              </div>
              <div class="col-3" v-if="this.headers['content-length'] > 1000">
                <div class="table-overhead-title">{{ Math.round(this.headers['content-length'] / 10) / 100 }} </div>
                <div class="table-overhead-subtitle">KB</div>
              </div>
              <div class="col-3" v-else>
                <div class="table-overhead-title">{{ this.headers['content-length'] }} </div>
                <div class="table-overhead-subtitle">Byte</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">txt</div>
                <div class="table-overhead-subtitle">File Type</div>
              </div>
    </div>
    <div v-if="!fullscreen_bool" class="text-box" v-html="this.data"></div>
    <div v-if="fullscreen_bool" class="text-box-fullscreen" v-html="this.data"></div>
</template>

<script>

export default {
    name: 'TextView',
    props: [
    'data',
    'fullscreen_bool',
    'headers'
  ],
  computed:{
    wordCount(){
      return this.data.match(/\b[-?(\w+)?]+\b/gi).length
    }
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