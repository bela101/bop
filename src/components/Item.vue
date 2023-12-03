<template>
  <div class="container-fluid p-0 fileexplorer-table-fullscreen" 
        v-if="this.fullscreen_bool">
          <div class="file-preview-title row">
            <div class="col-10">
              <div class="row">
                <div class="col left">
                  <i v-if="this.filetype == 'tabular'" class="icon bi bi-table"></i>
                  <i v-else-if="this.filetype == 'pdf'" class="icon bi bi-file-pdf"></i>
                  <i v-else-if="this.filetype == 'image'" class="icon bi bi-file-image"></i>
                  <i v-else-if="this.filetype == 'video'" class="icon bi bi-camera-reels"></i>
                  <i v-else-if="this.filetype == 'audio'" class="icon bi bi-soundwave"></i>
                  <i v-else-if="this.filetype == 'text'" class="icon bi bi-file-text"></i>
                  <i v-else class="icon bi bi-file"></i>
                  <span>{{ this.file }}</span> 
                </div>
                <div class="col right">
                  <a @click="this.fullscreen()"><i class="bi bi-fullscreen"></i></a>
                  <a @click="this.download()"><i class="bi bi-download"></i></a>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="row">
                <div v-if="this.fileExplorer" class="col left">
                  <a @click="this.hideFileExplorer()"><i class="bi bi-arrow-bar-right"></i></a>
                </div>
                <div v-if="!this.fileExplorer" class="col right">
                  <a @click="this.hideFileExplorer()"><i class="bi bi-arrow-bar-left"></i></a>
                </div>
              </div>
            </div>
          </div>
        <div class="row file-preview">
          <div :class="{'col-10': this.fileExplorer, 'col-12': !this.fileExplorer}"> 
            <TabularView v-if="this.fetchedPaper.headers['content-type'] == 'application/json; charset=UTF-8'"
              :data="this.fetchedPaper.data"
              :fullscreen_bool = this.fullscreen_bool></TabularView>
            <ImageView v-else-if="this.fetchedPaper.headers['content-type'] == 'image/jpeg'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"
              :filesize="this.fetchedPaper.headers['content-length']"
              :headers="this.fetchedPaper.headers"></ImageView>
            <TextView v-else-if="this.fetchedPaper.headers['content-type'] == 'text/plain; charset=UTF-8'"
              :data="this.fetchedPaper.data"
              :fullscreen_bool="this.fullscreen_bool"
              :headers="this.fetchedPaper.headers"></TextView>
            <AudioView v-else-if="this.fetchedPaper.headers['content-type'] == 'audio/mpeg'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"
              :headers="this.fetchedPaper.headers"></AudioView>
            <VideoView v-else-if="this.fetchedPaper.headers['content-type'] == 'video/mp4'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"
              :headers="this.fetchedPaper.headers"></VideoView>
            <PDFView v-else-if="this.fetchedPaper.headers['content-type'] == 'application/pdf'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"></PDFView>
            <OtherView v-else
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"></OtherView>
          </div>
          <div v-if="this.fileExplorer" class="col-2 table-file-explorer">
              <div class="h2">Files</div>
              <div class="file-explorer container-fluid">
                <div class="file-list" v-for="(file, index) in this.paper.files" :key="file" ref="fileRefs">
                  <button @click="fileSelection(file), fetchFile(file), underline(index)"> 
                    <i v-if="file.split('.')[1] == 'json'" class="bi bi-table"></i>
                    <i v-else-if="file.split('.')[1] == 'pdf'" class="bi bi-file-pdf"></i>
                    <i v-else-if="file.split('.')[1] == 'jpeg'" class="bi bi-file-image"></i>
                    <i v-else-if="file.split('.')[1] == 'mp4'" class="bi bi-camera-reels"></i>
                    <i v-else-if="file.split('.')[1] == 'mp3'" class="bi bi-soundwave"></i>
                    <i v-else-if="file.split('.')[1] == 'txt'" class="i bi bi-file-text"></i>
                    <i v-else class="bi bi-file"></i>
                    {{ file }} </button>
                </div>
              </div>
          </div>
        </div>
      </div>
  <div class="main-wrapper" v-if="!this.fullscreen_bool">
    <Navbar />
    <div class="item-wrapper container">
      <div class="title-authors">
        <div class="row">
          <div class="title">{{ this.paper.title }}</div>
        </div>
          <div class="row row-cols-auto authors">
              <template @click="forward()" v-for="(author, index) in this.paper.authors_parsed">
              {{author[0]}}, {{author[1]}}
                  <template v-if="index < this.paper.authors_parsed.length - 1"><i class="bi bi-dot"></i> </template>
              </template>
          </div>
      </div>

      <div class="about-metadata-tabs row">
        <div class="col-10">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">About</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Metadata</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <div class="h2">About Paper</div>
              {{ this.paper.abstract }}
              </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <div v-for="(col, index) in this.paper">
                <div v-if="index != 'abstract'">
                  {{index}} : {{ col }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2 tags-wrapper">
          <div class="h2">
            Provider
          </div>
          <div class="tags container-fluid">
            <div class="row row-cols-auto">
              <button type="button" class="btn btn-sm btn-colored">
                {{ this.paper.provider }}
              </button>
            </div>
          </div>
          <div class="h2">
            Tags
          </div>
          <div class="tags container-fluid">
            <div class="row row-cols-auto">
              <button type="button" class="btn btn-sm btn-uncolored" v-for="tag in this.paper.tags">
                <div class="col">
                  {{tag}}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="download-all"> <a class="download-all" @click="this.downloadAll()" ><i class="bi bi-download"></i>download all</a></div>
      <div class="container-fluid p-0 fileexplorer-table" 
        v-if="!this.fullscreen_bool">
          <div class="file-preview-title row">
            <div class="col-10">
              <div class="row">
                <div class="col left">
                  <i v-if="this.filetype == 'tabular'" class="icon bi bi-table"></i>
                  <i v-if="this.filetype == 'pdf'" class="icon bi bi-file-pdf"></i>
                  <i v-if="this.filetype == 'image'" class="icon bi bi-file-image"></i>
                  <i v-if="this.filetype == 'video'" class="icon bi bi-camera-reels"></i>
                  <i v-if="this.filetype == 'audio'" class="icon bi bi-soundwave"></i>
                  <i v-if="this.filetype == 'text'" class="icon bi bi-file-text"></i>
                  <span>{{ this.file }}</span> 
                </div>
                <div class="col right">
                  <a @click="this.fullscreen()" ><i class="bi bi-fullscreen"></i></a>
                  <a @click="this.download()" ><i class="bi bi-download"></i></a>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="row">
                <div v-if="this.fileExplorer" class="col left">
                  <a @click="this.hideFileExplorer()"><i class="bi bi-arrow-bar-right"></i></a>
                </div>
                <div v-if="!this.fileExplorer" class="col right">
                  <a @click="this.hideFileExplorer()"><i class="bi bi-arrow-bar-left"></i></a>
                </div>
              </div>
            </div>
          </div>
        <div class="row file-preview">
          <div :class="{'col-10': this.fileExplorer, 'col-12': !this.fileExplorer}"> 
            <TabularView v-if="this.fetchedPaper.headers['content-type'] == 'application/json; charset=UTF-8'"
              :data="this.fetchedPaper.data"
              :fullscreen_bool = this.fullscreen_bool></TabularView>
            <ImageView v-else-if="this.fetchedPaper.headers['content-type'] == 'image/jpeg'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"
              :filesize="this.fetchedPaper.headers['content-length']"
              :headers="this.fetchedPaper.headers"></ImageView>
            <TextView v-else-if="this.fetchedPaper.headers['content-type'] == 'text/plain; charset=UTF-8'"
              :data="this.fetchedPaper.data"
              :fullscreen_bool="this.fullscreen_bool"
              :headers="this.fetchedPaper.headers"></TextView>
            <AudioView v-else-if="this.fetchedPaper.headers['content-type'] == 'audio/mpeg'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"
              :headers="this.fetchedPaper.headers"></AudioView>
            <VideoView v-else-if="this.fetchedPaper.headers['content-type'] == 'video/mp4'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"
              :headers="this.fetchedPaper.headers"></VideoView>
            <PDFView v-else-if="this.fetchedPaper.headers['content-type'] == 'application/pdf'"
              :data="this.fetchedPaper.data"
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"></PDFView>
            <OtherView v-else
              :file="this.file"
              :fullscreen_bool="this.fullscreen_bool"></OtherView>
          </div>
          <div v-if="this.fileExplorer" class="col-2 table-file-explorer">
              <div class="h2">Files</div>
              <div class="file-explorer">
                <div class="file-list" v-for="(file, index) in this.paper.files" :key="file" ref="fileRefs">
                  <button @click="fileSelection(file), fetchFile(file), underline(index)"> 
                    <i v-if="file.split('.')[1] == 'json'" class="bi bi-table"></i>
                    <i v-else-if="file.split('.')[1] == 'pdf'" class="bi bi-file-pdf"></i>
                    <i v-else-if="file.split('.')[1] == 'jpeg'" class="bi bi-file-image"></i>
                    <i v-else-if="file.split('.')[1] == 'mp4'" class="bi bi-camera-reels"></i>
                    <i v-else-if="file.split('.')[1] == 'mp3'" class="bi bi-soundwave"></i>
                    <i v-else-if="file.split('.')[1] == 'txt'" class="i bi bi-file-text"></i>
                    <i v-else class="bi bi-file"></i>
                    {{ file }} 
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-wrapper">
    <Footer v-if="!this.fullscreen_bool"/>
  </div>

</template>
  
<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue';
import TabularView from './TabularView.vue'
import ImageView from './ImageView.vue'
import VideoView from './VideoView.vue'
import TextView from './TextView.vue'
import AudioView from './AudioView.vue'
import OtherView from './OtherView.vue'
import PDFView from './PDFView.vue'
import axios from 'axios'
import { useRoute } from 'vue-route'
import { ref, watch } from 'vue'
const serverUrl = 'http://localhost:5174'

export default {
  name: "Items",
  inject: ['papers'],
  components: {
    Navbar,
    Footer,
    TabularView,
    ImageView,
    TextView,
    AudioView,
    VideoView,
    PDFView,
    OtherView,
  },
  data(){
    return{
      paper: null,
      columns: [],
      tableLength: 5,
      selectedData: 0,
      counter: 0,
      filetype: '',
      fetchedPaper: { "data": "no file selected", "status": 200, "statusText": "OK", "headers": { "cache-control": "public, max-age=0", "content-length": "16", "content-type": "text/plain; charset=UTF-8", "last-modified": "Mon, 16 Oct 2023 12:31:53 GMT" }, "config": { "transitional": { "silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false }, "adapter": [ "xhr", "http" ], "transformRequest": [ null ], "transformResponse": [ null ], "timeout": 0, "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN", "maxContentLength": -1, "maxBodyLength": -1, "env": {}, "headers": { "Accept": "application/json, text/plain, */*" }, "method": "get", "url": "http://localhost:5174/item/0704.0002" }, "request": "[object XMLHttpRequest]" },
      error: null,
      file: "",
      fullscreen_bool: false,
      fileExplorer: true,
    }
  },
  props: [
    'searchString',
    'paperList',
    'item_id'
  ],
  // mounted(){
  //   this.paper = this.papers.find( el => el.id === this.item_id)
  //   this.fetchFile(this.paper.files[0])
  //   this.fileSelection(this.paper.files[0])
  // },
  created(){
    this.paper = this.papers.find( el => el.id === this.item_id)
    this.fetchFile(this.paper.files[0])
    this.fileSelection(this.paper.files[0])
  }, 
  computed: {},
  methods: {
    async fetchFile(file){
      // console.log(file)
      this.fetchedPaper = await axios.get(serverUrl + '/item/' + this.item_id + '?file=' + file)
      this.setFiletype(this.fetchedPaper.headers['content-type'])
      console.log(this.fetchedPaper.headers)
    },
    forward(){
      console.log("poos")
    },
    setFiletype(contentType){
      switch(contentType){
        case 'application/json; charset=UTF-8':
          this.filetype = 'tabular'
          break
        case 'application/pdf':
          this.filetype = 'pdf'
          break
        case 'audio/mpeg':
          this.filetype = 'audio'
          break
        case 'video/mp4':
          this.filetype = 'video'
          break
        case 'text/plain; charset=UTF-8':
          this.filetype = 'text'
          break
        case 'image/jpeg':
          this.filetype = 'image'
          break
      }
    },
    underline(index){
      // console.log(this.$refs.fileRefs[index])
      this.$refs.fileRefs.map(el => el.classList.remove("underlined"))
      this.$refs.fileRefs[index].classList.add("underlined")
    },
    fileSelection(file){
      this.file = file
    },
    download(){
      let url = serverUrl + '/item/' + this.item_id + '?file=' + this.file
      let label = this.file
      axios.get(url, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = label
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
    },
    downloadAll(){
      let url = serverUrl + '/item/' + this.item_id + '?file=all'
      let label = 'archive'
      axios.get(url, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = label
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
    },
    fullscreen(){
      this.fullscreen_bool = !this.fullscreen_bool
    },
    hideFileExplorer(){
      this.fileExplorer = !this.fileExplorer
    },
  }
}
</script>

<style scoped>
.underlined>button{
  text-decoration: underline;
  background-color: #EFEFEF;
}
.border{
  border: 1px dotted black
}
.footer-wrapper {
    margin-top: auto;
    text-decoration: underline;
}
.file-list{
  text-align: left;
}
.file-list:hover{
  color: #565656;
}
.download-all{
  text-align: right;
  font-size: 15px;
  margin: 5px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
.download-all:hover{
  text-align: right;
  font-size: 15px;
  margin: 5px;
  font-weight: bold;
  color: #81B9FF;
  text-decoration: underline;
  cursor: pointer;
}
.bi-download{
  text-align: right;
  right: 0px;
  padding: 10px;
  cursor: pointer;
}
.bi-download:hover{
  text-align: right;
  right: 0px;
  padding: 10px;
  cursor: pointer;
  color: #81B9FF;
}
.bi-fullscreen{
  cursor: pointer;
  padding: 10px;
}
.bi-fullscreen:hover{
  cursor: pointer;
  color: #81B9FF;
  padding: 10px;
}
.bi-arrow-bar-right{
  cursor: pointer;
}
.bi-arrow-bar-left{
  cursor: pointer;
}
.bi-arrow-bar-right:hover{
  color: #81B9FF;
  cursor: pointer;
}
.bi-arrow-bar-left:hover{
  color: #81B9FF;
  cursor: pointer;
}
.icon{
  margin-right: 10px;
}
.left{
  text-align: left;
}
.right{
  text-align: right;
}
.tags-wrapper{
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: #B4B4B4;
}
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
.file-preview{
  /* max-height: 500px; */
  /* padding-right: 1px solid black; */
}
.file-preview-title{
  /* display: flex; */
  /* align-items: center; */
  height: 61px;
  font-size: 20px;
  padding: 15px;
  padding-left: 20px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image: linear-gradient(to right, #B4B4B4, rgba(250, 225, 66, 0) 50%) 1;
}
.fileexplorer-table{
  /* height: 500px; */
  border: 1px #B4B4B4 solid;
  margin: 0px 0px 50px 0px;
}
.title-authors{
  margin: 20px;
  margin-bottom: 40px;
}
.title{
  text-align: left;
  font-weight: bold;
  font-size: 30px;
}
.authors{
  text-align: left;
  font-style: italic;
}
.container-fluid{
  overflow: hidden;
}
.nav-pills {
    --bs-nav-pills-border-radius: var(--bs-border-radius);
    --bs-nav-pills-link-active-color: #000000;
    --bs-nav-pills-link-active-bg: #ffffff;
}
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    text-decoration: underline;
    --bs-nav-pills-border-radius: var(--bs-border-radius);
    --bs-nav-pills-link-active-color: #000000;
    --bs-nav-pills-link-active-bg: #ffffff;
}
.h2{
  font-size: 14px;
  font-weight: bold;
  text-align: left;
}
.file-explorer{
  text-align: left;
  font-size: 11px;
}
.about-metadata-tabs{
  text-align: left;
  margin-bottom: 50px;
}
.tab-content{
  margin-left: 15px;
  padding-bottom: 50px;
}
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
    background: #6390c6;
    /* border: 2px solid rgba(108, 89, 179, 0.75); */
}
.btn-uncolored{
  margin: 2px 3px;
  font-size: 11px;
  font-weight: bold;
  color: #000;
  line-height: 11px;
  border-radius: 40px;
  background: #EFEFEF;
  transition: all 0.3s ease 0s;
}
.btn-uncolored:hover{
    /* color: #FFF; */
    background: #cfcdcd;
    /* border: 2px solid rgba(108, 89, 179, 0.75); */
}

</style>