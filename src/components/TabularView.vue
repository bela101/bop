<template>
    <div :class="{'table-box' : !this.fullscreen, 'table-box-fullscreen' : this.fullscreen}">
      <table>
        <tbody class="relativ">
          <tr>
            <th v-for="(thead, index) in this.columns" class="table-overhead" ref="topRefs">
              <!-- <div class="table-overhead-title">{{ thead.name }}</div>
              <div class="table-overhead-subtitle">{{thead.type}}</div> -->
              <div v-if="this.uniquevalues[index] == 2" class="uniquevalues">
                <div class="table-overhead-title">{{ this.distribution.uniqueelements[index][0]}} - {{Math.round(this.distribution.distribution[index][0] *100)/100}} %</div>
                <div class="table-overhead-title">{{ this.distribution.uniqueelements[index][1]}} - {{Math.round(this.distribution.distribution[index][1]*100)/100}} %</div>
              </div>
              <div v-else-if="thead.type == 'string'" class="uniquevalues">
                <div class="table-overhead-title">{{ this.uniquevalues[index] }}</div>
                <div class="table-overhead-subtitle">unique values</div>
              </div>
              <div v-else class="uniquevalues">
                <div class="chart">
                  <Bar :options="this.options" :data="this.chartData[index]"></Bar>
                  <!-- <UplotVue :options="options" :data="chartData"></UplotVue> -->
                  <!-- <apexchart type="bar" height="100" :options="chartOptions" :series="this.series[index]"></apexchart> -->
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th v-for="(thead, index) in this.columns" :key="thead.name" class="head" >
              <div class="float-left" @click="select(thead.name, index)" ref="theadRefs">{{ thead.name }}</div>
              <i class="float-right point-right bi bi-triangle" @click="sort(thead.name, index)" ref="triangle">
                <div hidden>{{ thead.name }}</div>
              </i>
            </th>
          </tr>
          <tr class="r" v-for="(row,index) in this.data">
            <td class="c" v-for="column in this.data[index]">
              <div>{{ column }}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="foot">
        <span>
          <button class="btn btn-sm btn-uncolored">
            {{this.footer[0]}}
          </button>
          <button v-if="show" class="btn btn-sm btn-uncolored">
            {{this.footer[1]}}
          </button>
          <button v-if="show" class="btn btn-sm btn-uncolored">
            {{this.footer[2]}}
          </button>
          <button v-if="show" class="btn btn-sm btn-uncolored">
            {{this.footer[3]}}
          </button>
          <button v-if="show" class="btn btn-sm btn-uncolored">
            {{this.footer[4]}}
          </button>
        </span>
      </div>
    </div>
</template>

<script>
import { ref, setBlockTracking } from 'vue'
import ApexCharts from 'vue3-apexcharts'
import UplotVue from 'uplot-vue'
import uPlot from 'uplot'
import "uplot/dist/uPlot.min.css";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'TabularView',
  components:{
    apexchart: ApexCharts,
    UplotVue,
    Bar
  },
  props: [
    'data',
    'fullscreen_bool',
  ],
  data(){
    return{
      // local_data: this.data,
      selectedColumn: [],
      sum: 0,
      avg: 0,
      footer: [],
      show: false,
      options: {
        //these are options for Chart JS 
        plugins: {
          legend: {
            display: false
          },
          tooltip:{
            callbacks: {
              label: (context) => {
                // let label = context.parsed.y
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                // return label;
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false
          },
          x: {
            display: false,
          }
        }
      },
      // chartOptions: {
      //   //these are options for apex charts
      //       chart: {
      //         type: 'bar',
      //         height: 100,
      //         toolbar: false,
      //         xaxis: {
      //           labels: {
      //             show: false
      //           }
      //         }
      //       },
      //       colors:['#644CDA'],
      //       grid:{
      //         show:false
      //       },
      //       toolbar:{
      //         show: false
      //       },
      //       plotOptions: {
      //         bar: {
      //           horizontal: false,
      //           columnWidth: '5%',
      //           endingShape: 'rounded'
      //         },
      //       },
      //       dataLabels: {
      //         enabled: false
      //       },
      //       stroke: {
      //         show: false,
      //         width: 2,
      //         colors: ['transparent']
      //       },
      //       xaxis: {
      //         show:false,
      //         labels: {
      //           show: false
      //         },
      //         axisTicks:{
      //           show: false
      //         }
      //       },
      //       yaxis: {
      //         show:false,
      //         title: {
      //           text: ''
      //         }
      //       },
      //       tooltip: {
      //         y: {
      //           formatter: function (val) {
      //             return val
      //           }
      //         }
      //       }
      //     },
    }
  },
  setup(){
    pagination: ref({
        rowsPerPage: 0
      })
  },
  computed:{
    columns(){
      let columns = []
      for( let i in this.data[0] ){
        columns.push({
              name: i,
              type: typeof(this.data[0][i]),
              field: i,
              sortable: true,
              align: 'left',
              // headerStyle: 'max-width:10px'
            })
      }
      return columns
    },
    fullscreen(){
      return this.fullscreen_bool
    },
    uniquevalues(){
      return this.columns.map(e => e.name).map(el => el = new Set(this.data.map(e => e[el])).size)
    },
    distribution(){
      let uniquevalues = this.columns.map(e => e.name).map(el => el = this.data.map(e => e[el]))
      const map = uniquevalues.map(el => el.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))
      uniquevalues = uniquevalues.map(el => el.filter((v,i) => i==el.lastIndexOf(v) ))
      let uniqueelements = map.map(el => [...el.keys()])
      let occurences = map.map(el => [...el.values()])
      let length = this.data.length
      let distribution = occurences.map(el => el.map(e => e * 100 / length))
      // console.log(uniqueelements)
      // console.log(occurences)
      // console.log(distribution)

      return {uniqueelements, distribution}
    },
    series(){
      //this is data for apex charts
      return this.columns.map(el => {
        return [{
          name: el.name,
          data: this.data.map(e => e[el.name])
        }]
      })
    },
    chartData(){
      // this is data for Chart JS 
      return this.columns.map(el => {
        return {
          labels: [...Array(this.data.length).keys()],
          datasets: [{
            data: this.data.map(e => e[el.name]),
            backgroundColor: ['#81B9FF'],
            borderColor: ['rgb(0,0,0)']
          }] 
        }
      })
    }
  },
  methods:{
    select(column, index){
      // console.log(this.$refs.theadRefs)
      this.$refs.theadRefs.map(el => el.classList.remove("underlined"))
      this.$refs.theadRefs.map(el => {
        if(el.innerHTML == column){
          el.classList.add("underlined")
        }
      })
      this.selectedColumn = this.data.map(el => el[column])
      this.sum = this.selectedColumn.reduce((a,b) => a+b, 0)
      this.avg = this.sum / this.selectedColumn.length 
      this.footer[1] = "Mean: " + Math.round(this.avg)
      this.footer[2] = "Sum: " + Math.round(this.sum)
      this.footer[3] = "Min: " + Math.min(...this.selectedColumn)
      this.footer[4] = "Max: " + Math.max(...this.selectedColumn)
      this.show = true // TODO if typeof(this.selectedColumn[0] == 'number')
    },
    sort(column, index){
      this.$refs.triangle.map(el => {
        if(!el.innerHTML.includes(column)){
          el.classList.add('point-right')
          el.classList.remove('point-down')
          el.classList.remove('point-up')
        }
      })
      this.$refs.triangle.map(el => {
        if(el.innerHTML.includes(column)){
          if(el.classList.contains('point-right')){
            el.classList.add('point-down')
            el.classList.remove('point-right')
            el.classList.remove('point-up')
            if(this.columns[index].type == 'string'){
              this.data.sort((a,b) => {
                return new Intl.Collator().compare(a[column], b[column])
              })
            } else {
              this.data.sort((a,b)=> a[column] - b[column])
            }
          } else if (el.classList.contains('point-down')){
            el.classList.add('point-up')
            el.classList.remove('point-down')
            el.classList.remove('point-right')
            if(this.columns[index].type == 'string'){
              this.data.sort((a,b) => {
                return new Intl.Collator().compare(b[column], a[column])
              })
            } else {
              this.data.sort((a,b)=> - a[column] + b[column])
            }
          } else if (el.classList.contains('point-up')){
            el.classList.add('point-right')
            el.classList.remove('point-down')
            el.classList.remove('point-up')
          }
        }
      })
    },
  },
  created(){
    for(let i = 0; i < this.columns.length; i++){
        this.footer[i] = ''
      }
      this.footer[0] = "Rows: " + this.data.length
  },
  mounted(){
    this.$refs.triangle.map(el=> el.classList.remove('point-up'))
    this.$refs.triangle.map(el=> el.classList.remove('point-down'))
    this.$refs.triangle.map(el=> el.classList.add('point-right'))
  },
}
</script>
<style scoped>
.float-right{
  float: right;
  margin-right: 10px;
}
.point-right{
  transform: rotate(90deg);
}
.point-down{
  transform: rotate(180deg);
  /* fill: #000; */
}
.point-up{
  transform: rotate(120deg);
  /* color: #000; */
}
.float-left{
  float: left;
  margin-left: 10px;
}
.underlined{
  text-decoration: underline;
}
.foot{
  background-color: #fff;
  position: sticky;
  bottom: 0;
  left: 0;
  text-align: left;
}
.table-overhead-title{
  font-weight: bold;
}
.table-overhead-subtitle{
  font-size: 9px;
}
.btn-uncolored{
  margin: 2px 10px;
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
.table-overhead{
  height: 100px;
}
.table-box{
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
}
.table-box-fullscreen{
  max-height: calc(100vh - 61px);
  overflow-y: auto;
  overflow-x: auto;
}
.r{
  height: 30px;
}
.c{
  border-right: 1px solid #B4B4B4;
  border-top: 1px solid #B4B4B4;
  border-bottom: 1px solid #B4B4B4;
}
.chart{
  width: 150px;
  height: 100px;
}
th{
  min-width: 150px;
  height: 30px;
}
.head{
  position: sticky;
  top: 0;
  background-color: #fff;
  border-right: 1px solid #B4B4B4;
  
}
.head:hover{
  cursor: pointer;
  position: sticky;
  top: 0;
  background-color: #fff
}
table{
  font-size: 10px;
  border-collapse: collapse;
}
tfoot{
  position: sticky;
  bottom: 0;
  height: 30px;
  background-color: #fff;
  border: 1px solid #B4B4B4
}
</style>