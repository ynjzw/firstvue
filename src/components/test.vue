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
        <button @click="search">search</button>
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
  import show from './show';
  import remove from './remove';
  import edit from './edit'
  export default {
    components:{
      show,
      remove,
      edit
    },
        data:function() {
          return{
            loading:true,
            border:true,
            pageTotal: null,
            pageNum:null,
            pageSize:null,
            process:'',
            dialogVisible:false,
            item:[],
            jurorData:{
              name:'',
              address:'',
              profession:''
            },

            proList:[
                {
                  value:'厦门',
                  label:'厦门'
                },
                {
                  value:'泉州',
                  label:'泉州'
                }
              ],

            column1:[
              {
                title:'网申号',//网申号
                key:'netApplicationNo'
              },
              {
                title: 'address',//progress
                key: 'address'
              },
              {
                title: 'idcard',//lawCaseId
                key: 'idcard'
              },
              {
                title: 'name',//法庭
                key: 'name'
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
                          show(param.index)
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
                          this.edit(param.index)
                        }
                      }
                    },'edit'),
                  h('button',{
                    props:{
                      type:'text',
                      size:'small'
                    },
                    on:{
                      click:()=>{
                        remove(param.index)
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
          getInfo().then(res=>{
            console.log(res.data)
              if (res.data.state===100){
                this.data1=res.data.data

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
          getInfo().then(res=>{
              console.log(res.data)
            if (res.data.state===100){
              let list = res.data.data
              this.data1 = []
              list.map(it=>{
                if(it.address === this.process){
                  this.data1=[it]
                }
              })
              console.log(this.data1,'当前数据')

            }
          }

          )
        }else{
          this.$Message.info('没有选择')
        }

      },

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
    transform: translate(-50%,-30%);
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
