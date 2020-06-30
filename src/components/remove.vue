<template>
    <modal
    @on-yes="yes"
    @on-no="cancel">
      <p>are you sure you want to delete this message</p>

    </modal>
</template>

<script>
  import {getInfo} from "../api/test";

  export default {
        name: "remove",
      data(){
          return{
            name:''
          }
      },
    props:{

    },
      methods:{
          yes(){
            getInfo().then(res=>{
            if (res.data.data.name === data.name) {
              res.data.data.splice
            }
          })
          },
          cancel(){}
      }


    }
</script>

<style scoped>

</style>
