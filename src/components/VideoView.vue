<template>
    <div class="row table-overhead">
              <div class="col-3">
                <div class="table-overhead-title">{{this.width}} x {{ this.height }}</div>
                <div class="table-overhead-subtitle">width x height</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">{{Math.round(this.headers['content-length'] / 10000) / 100}}</div>
                <div class="table-overhead-subtitle">MB</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">{{this.duration}}</div>
                <div class="table-overhead-subtitle">seconds</div>
              </div>
              <div class="col-3"></div>
    </div>
    <video controls ref="video" id="video">
      <!-- <source src="http://localhost:5174/item/0704.0002?file=elephants.mp4" type="video/mp4"> -->
      <source :src="this.videosource" type="video/mp4">
      <!-- <source src="movie.ogg" type="video/ogg"> -->
      Your browser does not support the video tag.
    </video>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'VideoView',
    props: [
    'data',
    'file',
    'headers',
    'fullscreen_bool'
  ],
  data(){
    return{
      duration: 0,
      width: 0,
      height: 0,
    }
  },
  computed:{
    videosource(){
      return 'http://localhost:5174/item/0704.0002?file=' + this.file
    }
  },
  setup(){
    pagination: ref({
        rowsPerPage: 0
      })
  },
  mounted(){
    this.$refs.video.onloadedmetadata = () => {
      this.duration = this.$refs.video.duration
      this.width = this.$refs.video.videoWidth
      this.height = this.$refs.video.videoHeight
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
video{
  max-height: 100%;
  max-width: 100%;
}
</style>