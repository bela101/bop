<template>
    <div class="main-wrapper">
        <Navbar></Navbar>
        <div class="main-content">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- <div class="search">
                            <input type="text" class="form-control" placeholder="Search" v-model="this.searchString"
                                @input="this.$emit('search', this.searchString)" @keydown.enter="forwardToSearch()" />
                            <button class="btn btn-primary" @click="forwardToSearch()">Search</button>
                        </div> -->
                        <Searchbar
                            @search="this.$emit('search', $event)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-wrapper">
            <Footer></Footer>
        </div>
    </div>
    <!-- <div>{{ this.searchString }}</div> -->
</template>
  
<script>
import Searchbar from './Searchbar.vue'
import Footer from './Footer.vue'
import Navbar from './Navbar.vue'

export default {
    name: 'Home',
    components: {
        Searchbar,
        Footer,
        Navbar
    },
    data() {
        return {
            searchString: ""
        }
    },
    emits: ['search'],
    methods: {
        forwardToSearch() {
            window.location.href = '#/search'
        }
    }
}
</script>
  
<style scoped>
.test {
    border: 1px dotted black;
}

#app {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0px;
}

.navbar-wrapper {
    /* border: 1px dotted black; */
    padding: 50px;
    margin-bottom: auto;
}

.main-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    /* padding-top:200px; */
    margin: auto 0;
}

.footer-wrapper {
    margin-top: auto;
}

.search {
    position: relative;
    box-shadow: 0 0 40px rgba(51, 51, 51, .1);
    border-radius: 40px;
}

.search input {
    height: 60px;
    text-indent: 25px;
    border: 2px solid #d6d4d4;
    border-radius: 40px;
}

.search input:focus {
    box-shadow: none;
    border: 2px solid gray;
}

.search button {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 50px;
    width: 110px;
    background: rgb(48, 76, 201);
    border-color: rgb(52, 80, 143);
    border-radius: 40px;
}
</style>
  