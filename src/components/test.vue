<template>
  <div id="app">
    <div id="select">
      <span id="net">
        <label>net:</label>
        <input type="text"></input>
      </span>
      <span id="brief">
        <label>brief:</label>
        <input type="text"></input>
      </span>
      <span>
        <button :click="search">search</button>
      </span>
    </div><br>
    <div id="table">
      <Table border id="table1" :data="data1" :columns="column1"></Table>
      <page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
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
            pageNum: null,
            pageSize: null,
            column1:[
              {
                title:'netNo',//网申号
                key:'netno'
              },
              {
                title: 'briefName',//案由
                key: 'briefname'
              },
              {
                title: 'plaintiffName',//原告
                key: 'plaintiffname'
              },
              {
                title: 'defendantName',//被告
                key: 'defendantname'
              },
              {
                title: 'courtName',//法庭
                key: 'courtname'
              },

            ],
            data1:[{
              netno:'',
              briefname:'',
              plaintiffname:'',
              defendantname:'',
              courtname:''
            }
            ]
          }

        },
    mounted() {
          axios.get('../../static/test.txt')
            .then(res=>{
            console.log(res.data)
              if (res.data.state===100){
                this.pageTotal=res.data.data.totalPages
                this.pageNum=res.data.data.pageNumber
                this.pageSize=res.data.data.pageSize
                let listLen=res.data.data.lawCaseList.length

                for (let i=0;i<listLen;i++){
                  this.data1=[
                    {
                    netno:res.data.data.lawCaseList[i].netApplicationNo,
                    briefname:res.data.data.lawCaseList[i].briefName,
                    plaintiffname:res.data.data.lawCaseList[i].plaintiffName,
                    defendantname:res.data.data.lawCaseList[i].defendantName,
                    courtname:res.data.data.lawCaseList[i].courtName,
                  }]
                }

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
      search(data){

      }
    }
  }
</script>

<style scoped>
  #app{
    width: 1000px;
    height: 600px;
    top: 50%;
    bottom: 50%;
    right: 50%;
    left: 50%;
    transform: translate(-50%,-70%);
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
