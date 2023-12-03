<template>
    <div class="row table-overhead">
              <div class="col-3">
                <div class="table-overhead-title">{{ this.width }} x {{ this.height }}</div>
                <div class="table-overhead-subtitle">width x height</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">{{ Math.round(this.headers['content-length'] / 1000) }} </div>
                <div class="table-overhead-subtitle">KB</div>
              </div>
              <div class="col-3">
                <div class="table-overhead-title">{{(this.headers['content-type']).split('/')[1]}} </div>
                <div class="table-overhead-subtitle">File Type</div>
              </div>
              <div class="col-3"></div>
    </div>
    <img :src="this.imgsource">
    {{ this.image.headers }}
</template>

<script>
import axios from 'axios'

export default {
    name: 'ImageView',
    props: [
    'data',
    'file',
    'fullscreen_bool',
    'filesize',
    'headers'
  ],
  data(){
    return {
      width: 0,
      height: 0,
      image: '',
    }
  },
  computed:{
    imgsource(){
      return 'http://localhost:5174/item/0704.0002?file=' + this.file
    },
  },
  created(){
    const loadImage = (imageSrc) => new Promise(resolve => {
      const image = new Image(); 
      image.onload = () => {
        const height = image.height;
        const width = image.width;
        resolve({ image, width, height });
    };
    image.src = imageSrc;
    })
    const run = async () => {
      const { image, width, height } = await loadImage('http://localhost:5174/item/0704.0002?file=' + this.file);
        this.width = width
        this.height = height
        this.image = image
    }
    run();
  },
  setup(){
  },
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
img{
  max-height: 100%;
  max-width: 100%;
}
</style>