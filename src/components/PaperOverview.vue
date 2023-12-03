<template>
    <div class="container-fluid paper-wrapper">
        <div class="row">
            <div class="col-10">
                <div class="row row-cols-auto">
                    <button class="btn btn-sm btn-colored" v-for="item in this.top_buttons"> 
                        <div class="col">
                            {{ item }}
                        </div>
                    </button>
                </div>
                <div class="row" 
                    @mouseover="this.hover = true"
                    @mouseleave="this.hover = false">
                    <div class="col-10">
                        <div @click="forward()" class="row title" :class="{'hover' : this.hover}">{{ this.title }}</div>
                    </div>
                    <div class="col-2">
                        <div @click="forward()" class="date">{{ this.update_date }}</div>
                    </div>
                </div>
                <div class="row row-cols-auto authors">
                    <template v-for="(author, index) in this.authors_parsed">
                        <div @click="filterAuthors(author[0], author[1])">
                            {{author[0]}}, {{author[1]}}
                        </div>
                        <template v-if="index < this.authors_parsed.length - 1"><i class="bi bi-dot"></i> </template>
                    </template>
                </div>
                <div class="row abstract"
                    @click="forward()"
                    @mouseover="this.hover = true"
                    @mouseleave="this.hover = false"> 
                        {{ this.abstract.substring(0,300) }} 
                    <template v-if="this.abstract.length >= 300">...</template>
                </div>
            </div>
            <div class="col-2">
                <div class="row row-cols-auto">
                    <button class="btn btn-sm btn-uncolored" v-for="data_type in this.specific_file_type"> 
                        <div class="col">
                            {{ data_type }}
                        </div>
                    </button>
                </div>
                <div class="row row-cols-auto">
                    <button class="btn btn-sm btn-tags" v-for="tag in this.tags"> 
                        <div class="col">
                            {{ tag }}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"PaperOverview",
    props:[
        "id",
        "authors",
        "title",
        "abstract",
        "doi",
        "update_date",
        "provider",
        "generic_data_type",
        "department",
        "specific_file_type",
        "tags",
        "authors_parsed"
    ],
    data(){
        return{
            // top_buttons: [
            //     this.provider,
            //     this.generic_data_type.flat(),
            //     this.department
            // ],
            hover: false,
        }
    },
    methods:{
        forward(){
            this.$router.push({path: `/item/${this.id}`})
        },
        filterAuthors(author1, author2){
            console.log("")
            // this.$router.push({path: '/search', query: {authors: author1+author2}})
            // this.$router.push({path: `/search?author=${author1}`})
        },
    },
    computed:{
        top_buttons(){
            let ge = []
            ge.push(this.provider)
            ge.push(this.department)
            for(let el in this.generic_data_type){
                ge.push(this.generic_data_type[el])
            }
            return ge
            console.log(ge)
            return [
                this.provider,
                ge,
                this.department
            ]
        }
    }
}
</script>

<style scoped>
div{
    text-align: left;
}
.title{
    color: #000;
    font-weight: 600;
    text-orientation: sideways;
}
.hover{
    cursor: pointer;
    text-decoration: underline;
}
.authors{
    cursor: pointer;
    font-style: italic;
    color: #4E3636;
}
.date{
    cursor: pointer;
    color: #321E1E
}
.abstract{
    cursor: pointer;
}
.paper-wrapper{
    margin: 14px;
}
.btn-colored{
    margin: 0px 3px;
    font-size: 11px;
    font-weight: bold;
    color: #F9F9F9;
    line-height: 11px;
    border-radius: 40px;
    background: #6caeff;
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
    color: #F9F9F9;
    line-height: 11px;
    border-radius: 40px;
    background: #81B9FF;
    transition: all 0.3s ease 0s;
}
.btn-uncolored:hover{
    /* color: #FFF; */
    background: #6390c6;
    /* border: 2px solid rgba(108, 89, 179, 0.75); */
}
.btn-tags{
    margin: 2px 3px;
    font-size: 11px;
    font-weight: bold;
    color: #000;
    line-height: 11px;
    border-radius: 40px;
    background: #EFEFEF;
    transition: all 0.3s ease 0s;
}
.btn-tags:hover{
    /* color: #FFF; */
    background: #cfcdcd;
    /* border: 2px solid rgba(108, 89, 179, 0.75); */
}
</style>