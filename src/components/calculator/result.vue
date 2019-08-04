<template>
        
  <div  class="fraction" > 
    <div  class="numinator" >
      {{result[1].numenator}}
    </div>
    <div  class="denominator" >
       {{result[1].denomenator}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'result',
    data() {
      return {
      
      }
    },
    props: ['result'],
  }
   
</script>

<style scoped>
  .fraction {
    width: 50px;
    height: 100px;
    display: inline-block;
    margin: 10px;
    position: relative;
  }

  .numinator {
    width: 50px;
    height: 50px;
    position: absolute;
    line-height: 50px;
    font-size: 30pt;
    border-bottom: 3px solid black;
  }

  .denominator {
    width: 50px;
    height: 50px;
    position: absolute;
    line-height: 50px;
    font-size: 30pt;
    bottom: -3px;
  }

  .fraction-input {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 3px;
    top: 2px;
    font-weight: 800;
    font-size: 13pt;
    text-align: center;
    border-radius: 5px;
    border: 2px solid;
  }
</style>
