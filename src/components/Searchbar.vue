<template>
  <div class="search">
      <input type="text" class="form-control fulltext-search" placeholder="Search" v-model="this.searchString"
          @input="this.$emit('search', this.searchString)" @keydown.enter="forwardToSearch()" />
      <button class="btn btn-primary filter-btn" @click="show = !show"><i class="bi bi-filter"></i>Filter</button>
      <Transition>
        <div v-if="show" class="filter-modal">
          <div class="container modal-content">
            <div class="">
              <div class="sub-header">Provider</div>
            </div>
            <div class="pills">
              <button @click="this.filters.tuBerlin = !this.filters.tuBerlin, this.provider('tuBerlin')"
              class="btn btn-sm"
              :class="{'btn-colored' : this.filters.tuBerlin, 'btn-uncolored' : !this.filters.tuBerlin}" >TU Berlin</button>
              <button @click="this.filters.fuBerlin = !this.filters.fuBerlin, this.provider('fuBerlin')"
              class="btn btn-sm"
              :class="{'btn-colored' : this.filters.fuBerlin, 'btn-uncolored' : !this.filters.fuBerlin}" >FU Berlin</button>
              <button @click="this.filters.huBerlin = !this.filters.huBerlin, this.provider('huBerlin')"
              class="btn btn-sm"
              :class="{'btn-colored' : this.filters.huBerlin, 'btn-uncolored' : !this.filters.huBerlin}" >HU Berlin</button>
              <button @click="this.filters.chariteBerlin = !this.filters.chariteBerlin, this.provider('chariteBerlin')"
              class="btn btn-sm"
              :class="{'btn-colored' : this.filters.chariteBerlin, 'btn-uncolored' : !this.filters.chariteBerlin}" >Charité</button>
            </div>
            <div class="sub-header">
              <div class="col generic-data-type">Generic Data Type</div>
            </div>
            <div class="pills">
              <button @click="this.filters.dataset = !this.filters.dataset, genericDataType('dataset')"
                class="btn btn-sm"
                :class="{'btn-colored' : this.filters.dataset, 'btn-uncolored' : !this.filters.dataset}">
                <i class="bi bi-clipboard-data"></i>Research Data
              </button>
            <button @click="this.filters.paper = !this.filters.paper, genericDataType('paper')"
              class="btn btn-sm"
              :class="{'btn-colored' : this.filters.paper, 'btn-uncolored' : !this.filters.paper}">
              <i class="bi bi-book"></i>Scientific Publidatation
            </button>
            <button @click="this.filters.thesis = !this.filters.thesis, genericDataType('thesis')"
              class="btn btn-sm"
              :class="{'btn-colored' : this.filters.thesis, 'btn-uncolored' : !this.filters.thesis}">
              <i class="bi bi-book"></i>Thesis
            </button>
            </div>
            <div class="pills">
              <div class="dataset" v-if="this.filters.dataset">
                <button v-for="e in this.research_data" class="btn btn-sm btn-uncolored">{{e}}</button>
                <hr>
              </div>
              <div class="paper" v-if="this.filters.paper">
                <button v-for="e in this.scientific_publication" class="btn btn-sm btn-uncolored">{{e}}</button>
                <hr>
              </div>
              <div class="thesis" v-if="this.filters.thesis">
                <button v-for="e in this.thesis" class="btn btn-sm btn-uncolored">{{e}}</button>
                <hr>
              </div>
            </div>

        <div class="sub-header">
          <div class="col department">Department</div>
        </div>
        <div class="pills">
          <input type="text" 
          class="form-control department-search" 
          placeholder="Search" 
          v-model="this.department_search_string" 
          @keydown.enter="addDepartment(this.department_search_string)" />
        </div>
        <div class="pills">
          <button class="btn btn-sm btn-colored col"
          v-for="(department, index) in this.departments_array">
          {{department}}
          <i class="bi bi-x m-1" @click="removeDepartment(index)"></i>
        </button>
      </div>
      <div class="sub-header">
        <div class="col department">Specific File Type</div>
      </div>
      <div class="pills row">
        <div class="col-6">
          <button @click="this.filters.pdf = !this.filters.pdf, addSpecificFileType('pdf')"
          class="btn btn-sm col"
          :class="{'btn-colored' : this.filters.pdf, 'btn-uncolored' : !this.filters.pdf}">PDF</button>
          <button @click="this.filters.csv = !this.filters.csv, addSpecificFileType('csv')"
          class="btn btn-sm col"
          :class="{'btn-colored' : this.filters.csv, 'btn-uncolored' : !this.filters.csv}">CSV</button>
          <button @click="this.filters.txt = !this.filters.txt, addSpecificFileType('txt')"
          class="btn btn-sm col"
          :class="{'btn-colored' : this.filters.txt, 'btn-uncolored' : !this.filters.txt}">TXT</button>
        </div>
        <div class="col-6 specific-data-searchbar">
          <input type="text" 
          class="form-control specific-data-search" 
          placeholder="Search" 
          v-model="this.specific_file_type_search_string" 
          @keydown.enter="addSpecificFileType(this.specific_file_type_search_string)" />
          <!-- <div class="tag-autocomplete" v-for="specific_file_type in this.specific_file_type_autocomplete_list">
            <input class="form-control specific-data-search" type="text" :value="specific_file_type" readonly/>
          </div> -->
        </div>
        <div class="pills">
          <button class="btn btn-sm btn-colored col"
          v-for="(specific_file_type, index) in this.specific_file_type_array">
          {{specific_file_type}}
          <i class="bi bi-x m-1" @click="removeSpecificFileType(index)"></i>
        </button>
      </div>
      <div class="sub-header">
        <div class="col department">Tags</div>
      </div>
      <div class="pills">
        <input type="text" 
        class="form-control department-search" 
        placeholder="Search" 
        v-model="this.tag_search_string" 
        @keydown.enter="addTag(this.tag_search_string)" />
      </div>
      <div class="pills">
        <button class="btn btn-sm btn-colored col"
          v-for="(tag, index) in this.tag_array">
          {{tag}}
          <i class="bi bi-x m-1" @click="removeTag(index)"></i>
        </button>
      </div>
      <div class="apply-remove-pills">
        <button @click="removeAllFilters()"
        class="btn btn-sm btn-colored">Remove All
      </button>
      <button @click="show = !show, filter()"
        class="btn btn-sm btn-colored">Apply
      </button>
</div>
</div>
</div>
</div>
</Transition>
</div>
</template>

<script>
export default {
  name: 'Searchbar',
  data(){
    return{
      show: false,
      searchString: this.$route.query.query,
      provider_array: [],
      generic_data_type_array: [],
      departments_array: [],
      department_search_string: "",
      specific_file_type_search_string: "",
      specific_file_type_array: [],
      specific_file_types: ["MP3", "MP4", "JSON"],
      tag_search_string: "",
      tag_array: [],
      filters: {
        tuBerlin: false,
        fuBerlin: false,
        huBerlin: false,
        chariteBerlin: false,
        dataset: false,
        paper: false,
        pdf: false,
        csv: false,
        txt: false,
      },
      activeFilters: [],
      research_data: ["Audio", "Image", "Video", "Tabular Data", "Text", "Software", "Model", "Generic Research Data"],
      scientific_publication: ["Book", "Conference Proceedings", "Book Section", "Preprint",
                                "Article", "Research Paper", "Report", "Abstract", "Periodical Literature", "Reveiew",
                                "Teaching Material", "Letter to the Editor", "Working Paper"],
      thesis: ["Bachelor Thesis", "Master Thesis", "Doctoral Thesis", "Habilitation", "Diploma Thesis"],
    }
  },
  computed:{
    emitSearchString(){
      return this.$emit('searchString', this.searchString);
    },
    specific_file_type_autocomplete_list(){
      // if (!this.specific_file_type_search_string.length){ return [] }
      let list = []
      for ( let el in this.specific_file_types ){
        if (this.specific_file_types[el].toLowerCase().includes(this.specific_file_type_search_string.toLowerCase()))
          list.push(this.specific_file_types[el])
      }
      return list
    }
  },
  methods:{
    forwardToSearch(){
      this.$router.push({path: '/search', query: {query: this.searchString, filter: this.activeFilters}})
    },
    filter(){
      let nowActiveFilters = []
      for( let [key, value] of Object.entries(this.filters)){
        if(value){
          nowActiveFilters.push(key)
        }
      }
      nowActiveFilters = nowActiveFilters.concat(this.departments_array)
                      .concat(this.specific_file_type_array)
                      .concat(this.tag_array)
      this.activeFilters = nowActiveFilters
      console.log(this.provider_array)
      this.$router.push({path: '/search', query: 
        { query: this.searchString, 
          provider: this.provider_array,
          genericdatatype: this.generic_data_type_array,
          department: this.departments_array,
          specificfiletype: this.specific_file_type_array,
          tag: this.tag_array,
        }
      })
    },
    addDepartment(el){
      if (el.length > 0){
        this.departments_array.push(el)
      }
      this.department_search_string = ""
    },
    removeDepartment(index){
      console.log(index)
      this.departments_array.splice(index, 1)
    },
    addSpecificFileType(el){
      if (el.length > 0){
        this.specific_file_type_array.push(el)
      }
      this.specific_file_type_search_string = ""
    },
    removeSpecificFileType(index){
      console.log(index)
      this.specific_file_type_array.splice(index, 1)
    },
    addTag(el){
      if (el.length > 0){
        this.tag_array.push(el)
      }
      this.tag_search_string = ""
    },
    removeTag(index){
      console.log(index)
      this.tag_array.splice(index, 1)
    },
    removeAllFilters(){
      Object.keys(this.filters).forEach(v => this.filters[v] = false)
      this.departments_array = []
      this.specific_file_type_array = []
      this.tag_array = []
      // this.activeFilters = []
    },
    provider(uni){
      if (this.provider_array.includes(uni)){
        this.provider_array.splice(uni, 1)
      } else {
        this.provider_array.push(uni)
      }
      console.log(this.provider_array)
    },
    genericDataType(type){
      if (this.generic_data_type_array.includes(type)){
        this.generic_data_type_array.splice(type, 1)
      } else {
        this.generic_data_type_array.push(type)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, .1);
  border-radius: 40px;
  max-width: 700px;
  margin: auto;
}
.fulltext-search{
  height: 60px;
  text-indent: 25px;
  border: 2px solid #d6d4d4;
  border-radius: 40px;
}
.fulltext-search:focus{
  box-shadow: none;
  border: 2px solid gray;
}
.filter-btn{
  position: absolute;
  top: 5px;
  right: 5px;
  height: 50px;
  width: 110px;
  background: rgb(48, 76, 201);
  border-color: rgb(52, 80, 143);
  border-radius: 40px;
}
.bi{
  margin: 6px;
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.filter-modal{
  width: 400px;
  background-color: #F9F9F9;
  position: absolute;
  border-radius: 10px;
  margin-right: 0px;
  right: 0px;
  top:75px;
  border: 1px solid #B4B4B4
}
.specific-data-searchbar{
  /* position: relative; */
}
.tag-autocomplete{
  position: absolute;
  /* max-height: 700px; */
}
.modal-content{
  padding: 10px 20px;
}
.sub-header{
  margin-top: 8px;
  text-align: left;
  font-weight: bold;
}
.btn-uncolored{
  margin: 4px 4px;
  font-size: 11px;
  font-weight: bold;
  color: #CCCCCC;
  line-height: 11px;
  border-radius: 40px;
  border: 1px #B4B4B4 solid;
  background: #FAFDFF;
  transition: all 0.3s ease 0s;
}
.btn-uncolored:hover{
    color: #FFF;
    background: #81B9FF;
    /* border: 2px solid rgba(108, 89, 179, 0.75); */
}
.pills{
 text-align: left;
}
.department-search{
 line-height: 11px;
 border-radius: 40px;
 font-size: 11px;
 margin: 0px 0px 5px 
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
.specific-data-search{
 line-height: 11px;
 border-radius: 40px;
 font-size: 11px;
 margin: 0px 0px 5px 
}
.apply-remove-pills{
  text-align: right;
}
.activeFilters{
  margin-top: 10px;
}
</style>
