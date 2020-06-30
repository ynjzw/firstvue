<template>
    <modal
    @on-save="save"
    @on-cancel="cancel">
      <label>name:</label>
      <input v-model="data1.name"></input>
    </modal>
</template>

<script>
    export default {
        name: "edit",
      data(){
          return{

          }
      },
      props:{
          data1:[]
      },
      methods:{
          save(){},
          cancel(){}
      }
    }
</script>

<style scoped>

</style>
