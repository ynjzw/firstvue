<template>
  <div id="app">
    <div id="select">

      <span >
        <label>process:</label>
        <select v-model="process">
          <option v-for="item in proList" :value="item.value" :key="item.value">{{item.label}}</option>
        </select>

      </span>
      <span>
        <button :click="search">search</button>
      </span>
    </div><br>
    <div id="table">
      <Table border id="table1" :data="data1" :columns="column1"></Table>
      <Page :total="pageTotal" :current="pageNum" :page-size="pageSize"  show-elevator show-sizer show-total
            placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'>

      </Page>
    </div>


  </div>

</template>

<script>
  import {getInfo} from "../api/test";
import axios from 'axios'
  export default {
        data:function() {
          return{
            loading:true,
            border:true,
            pageTotal: null,
            pageNum:null,
            pageSize:null,
            process:'',
            proList:[
                {
                  value:'立案申请',
                  label:'立案申请'
                },
                {
                  value:'立案',
                  label:'立案'
                },
                {
                  value:'待开庭',
                  label:'待开庭'
                },
                {
                  value:'排班',
                  label:'排班'
                },
                {
                  value:'已开庭',
                  label:'已开庭'
                },
              ],

            column1:[
              {
                title:'网申号',//网申号
                key:'netApplicationNo'
              },
              {
                title: 'progress',//progress
                key: 'progress'
              },
              {
                title: 'lawCaseId',//lawCaseId
                key: 'lawCaseId'
              },
              {
                title: '法庭',//法庭
                key: 'courtName'
              },
              {
                title: 'action',
                key: 'acion',
                render:(h,param)=>{
                  return h('div',[
                    h('button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click:()=> {
                          this.show(param.index)
                        }
                      }
                    },'view'),
                    h('button',{
                      props:{
                        type:'text',
                        size:'small'
                      },
                      on:{
                        click:()=>{
                          this.remove(param.index)
                        }
                      }
                    },'delete')
                  ])
                }
              }

            ],
            data1:[],
            params:{
              judgeId:'',
              progress:'',
              caseNo:'',
              startTime:'',
              endTime:'',
            }

          }

        },
    mounted() {
          getInfo(this.params).then(res=>{
            console.log(res.data)
              if (res.data.state===100){
                this.pageTotal=res.data.data.totalPages
                this.data1=res.data.data.content

              }
          })
    },
    methods:{
      handlePage(value) {
        this.pageNum = value
      },
      handlePageSize(value) {
        this.pageSize = value
      },
      search(){
        if (this.process!==''){
          this.params.progress=this.process
          axios.get('/api/court/index/indexCourtLawCaseList.jhtml',{params:this.params}).then(res=>{
              console.log(res.data)
            if (res.data.state===100){
              this.data1=res.data.data.content
            }
          }

          )
        }

      },
      show(data){

      },
      remove(data){

      }
    }
  }
</script>

<style scoped>
  #app{
    width: 1000px;
    height: 800px;
    top: 50%;
    bottom: 50%;
    right: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    text-align: center;
    display: table-cell;
    background: lightblue;
  }
  #table{
    width: 800px;
    text-align: center;
    position: absolute;
    display: table-cell;
    margin-top: 10px;
    margin-left: 10%;
  }
  #select{
    text-align: center;
    margin-top: 10px;

  }
  #table1 {
    border: solid dodgerblue;
    background-color: #42b983;
  }

  td{
    border: solid #42b983;
  }


</style>
