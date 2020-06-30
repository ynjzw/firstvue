<template>
  <modal>
    <label>name:</label>
    <p>{{data1.name}}</p>
  </modal>
</template>

<script>
    export default {
        name: "show",
      data(){
        return{

        }
      },
      props:{
          data1:[]

      }

    }
</script>

<style scoped>

</style>
