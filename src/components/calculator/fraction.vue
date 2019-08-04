<template>
  <div class="fraction" v-if="!isResult">
    <div class="numinator">
      <input v-model="currentNumenator" class="fraction-input input-numinator" 
             @change="onChange('numenator')"/>
    </div>
    <div class="denominator">
      <input v-model="currentDenomenator" class="fraction-input input-denominator" 
             @change="onChange('denomenator')"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'fraction',
    data() {
      return {
        msg: 'Дробь',
        currentNumenator: '',
        currentDenomenator: ''
      }
    },
    watch: {
      numenator: function(){
        this.currentNumenator = this.numenator;
      },
      denomenator: function () {
        this.currentDenomenator = this.denomenator;
      }
    },
    mounted(){
      this.currentNumenator = this.numenator;
      this.currentDenomenator = this.denomenator;
    },
    props: { id: Number, numenator: String, denomenator: String, isResult: Boolean},
    methods: {
      onChange(name) {
        if (!this.isResult) {
          let payload = {
            id: this.id,
            name,
            newValue: name === 'numenator' ? this.currentNumenator : this.currentDenomenator
          };
          this.$emit('fraction-change', payload);
        }
      }
    }
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
