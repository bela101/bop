<template>
  <div class="main-wrapper">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="searchresults">
          <div class="searchbar-wrapper">
            <Searchbar/>
          </div>
          <div class="filters pills" v-if="this.providers.length > 0">
            <button class="btn btn-sm btn-colored"
              v-for="(filter) in this.providers">
                {{filter}}
                <i class="bi bi-x m-1" @click="removeFilter(filter)"></i>
            </button>
            <button class="btn btn-sm btn-colored"
              v-for="(genericDataType) in this.genericDataTypes">
                {{genericDataType}}
                <i class="bi bi-x m-1" @click="removeFilter(filter)"></i>
            </button>
            <button class="btn btn-sm btn-colored"
              v-for="(department) in this.departments">
                {{department}}
                <i class="bi bi-x m-1" @click="removeFilter(filter)"></i>
            </button>
            <button class="btn btn-sm btn-colored"
              v-for="(specificFileType) in this.specificFileTypes">
                {{specificFileType}}
                <i class="bi bi-x m-1" @click="removeFilter(filter)"></i>
            </button>
            <button class="btn btn-sm btn-colored"
              v-for="(tag) in this.tags">
                {{tag}}
                <i class="bi bi-x m-1" @click="removeFilter(filter)"></i>
            </button>
          </div>
          <div v-if="this.papers.length == 0">There are no results</div>
          <div v-for="paper in this.papers.slice(this.windowsize * this.page, this.windowsize * this.page + this.windowsize)" :key="paper.id">
            <PaperOverview 
              :id="paper.id" 
              :authors="paper.authors" 
              :title="paper.title" 
              :abstract="paper.abstract"
              :doi="paper.doi"
              :update_date="paper.update_date"
              :provider="paper.provider"
              :generic_data_type="paper.generic_data_type"
              :department="paper.department"
              :specific_file_type="paper.specific_file_type"
              :tags="paper.tags"
              :authors_parsed="paper.authors_parsed" />
          </div>
          <SearchbarPagination 
            :window_size="this.windowsize"
            :page_index="this.page"
            :papers_list_length="this.papers.length"
            @increment-page="this.page += 1"
            @decrement-page="this.page -= 1"
            />
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import PaperOverview from './PaperOverview.vue';
import Searchbar from './Searchbar.vue';
import SearchbarPagination from './SearchPagination.vue'


export default {
  inject: ['papers'],
  name: "Search",
  components: {
    Navbar,
    Footer,
    PaperOverview,
    Searchbar,
    SearchbarPagination,
  },
  props: [
    'paperList',
    'keyword',
  ],
  data(){
    return{
      page: 0,
      windowsize: this.$route.query.rpp ? this.$route.query.rpp : 10,
      filters: [],
      providers: [],
      genericDataTypes: [],
      departments: [],
      specificFileTypes: [],
      tags: [],
    }
  },
  created(){
    let query = this.$route.query.query ? this.$route.query.query : ''
    let provider = this.$route.query.provider ? this.$route.query.provider : ''
    let genericDataType = this.$route.query.genericdatatype ? this.$route.query.genericdatatype : ''
    let department = this.$route.query.department ? this.$route.query.department : ''
    let specificFileType = this.$route.query.specificfiletype ? this.$route.query.specificfiletype : ''
    let tag = this.$route.query.tag ? this.$route.query.tag : ''
    if (provider) { this.providers.push(provider) }
    if(genericDataType) { this.genericDataTypes.push(genericDataType) }
    if(specificFileType) { this.specificFileTypes.push(specificFileType) }
    if(department) { this.departments.push(department) }
    if(tag) { this.tags.push(tag) }
    this.providers = this.providers.flat().map(el => this.autoCorrect(el))
    this.genericDataTypes = this.genericDataTypes.flat().map(el => this.autoCorrect(el))
    this.specificFileTypes = this.specificFileTypes.flat().map(el => this.autoCorrect(el))
    this.departments = this.departments.flat().map(el => this.autoCorrect(el))
    this.tags = this.tags.flat().map(el => this.autoCorrect(el))
    // this.filters = provider.concat(genericDataType).concat(department).concat(specificFileType).concat(tag)
    this.papers = this.papers.filter( el => {
      return el.authors.includes(query) ||
              el.title.includes(query) ||
              el.abstract.includes(query) ||
              el.provider.includes(query) ||
              el.generic_data_type.includes(query) ||
              el.specific_file_type.includes(query) ||
              el.department.includes(query) ||
              el.tags.includes(query)
      })
    if (provider.length > 0){ this.papers = this.papers.filter( el => this.providers.includes(el.provider) ) }
    if (genericDataType.length > 0){ this.papers = this.papers.filter( el => this.genericDataTypes.includes(el.generic_data_type) ) }
    if (department.length > 0){ this.papers = this.papers.filter( el => this.departments.includes(el.department) ) }
    if (specificFileType.length  > 0){ this.papers = this.papers.filter( el => this.specificFileTypes.includes(el.specific_file_type) ) }
    if (tag.length > 0){ this.papers = this.papers.filter( el => this.tags.includes(el.tags) ) }
  },
  methods:{
    removeFilter(filter){
      this.filters = this.filters.filter( el => el !== filter)
      this.$router.push({path: '/search', query: {query: this.searchString, filter: this.filters}})
    },
    autoCorrect(text) {
      let correction = {
        tuBerlin: 'TU Berlin',
        fuBerlin: 'FU Berlin',
        huBerlin: 'HU Berlin',
        chariteBerlin: 'Charité Berlin',
        dataset: "Dataset",
        paper: "Paper",
        pdf: "PDF",
      };
      let reg = new RegExp(Object.keys(correction).join("|"), "g");
      return text.replace(reg, (matched) => correction[matched]);
}
  }
}
</script>

<style scoped>
table{
  max-width: 250px;
  margin: auto;
}
input{
  width: 10vw;
  max-width: 100px;
}
.date-filter{
  margin: 10px;
}
.main-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0px
}
.searchbar-wrapper {
 padding: 25px;
}
.pills{
 text-align: left;
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
    background: #81B9FF;
    /* border: 2px solid rgba(108, 89, 179, 0.75); */
}
.footer-wrapper {
  margin-top: auto;
  /* bottom: 0; */
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>