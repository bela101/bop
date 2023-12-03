<template>
    <div class="row table-overhead">
              <div class="col-3">
                <div class="table-overhead-title">{{ Math.round(this.headers['content-length'] / 1000) }} </div>
                <div class="table-overhead-subtitle">KB</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">{{ Math.round(this.duration * 100) / 100 }}</div>
                <div class="table-overhead-subtitle">seconds</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">320</div>
                <div class="table-overhead-subtitle">kbps</div>
              </div>
              <div class="col-3"></div>
    </div>
    <div class="audio">
      <audio controls preload="metadata" ref="audio" id="audio">
        <source :src="this.audiosource" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'AudioView',
    props: [
    'data',
    'file',
    'headers',
    'fullscreen_bool'
  ],
  data(){
    return{
      duration: 0,
      audio: ''
    }
  },
  computed:{
    audiosource(){
      return 'http://localhost:5174/item/0704.0002?file=' + this.file
    },
  },
  mounted(){
    this.$refs.audio.onloadedmetadata = () => {
      this.duration = this.$refs.audio.duration
      console.log(this.$refs.audio.dimensions)
    }
  },
  setup(){
    // const audio = ref(null)
    // console.log(audio.value)
    // return {
    //   audio
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
.audio{
  padding: 50px
}
</style>