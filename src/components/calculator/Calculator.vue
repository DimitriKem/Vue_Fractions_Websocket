<template>
  <div>
    <div class="title">Калькулятор дробей</div>
    <div class="fractions-list">
      <template v-for="(item, index) in inputArr">
        <template v-if="item.type === 'number'">
          <fraction
            :key="index"
            :id="index"
            :numenator="item.numenator"
            :denomenator="item.denomenator"
            :isResult="item.isResult"
            @fraction-change="onChangeNumber"
          />
        </template>
        <template v-else-if="item.type === 'operation'">
          <operation
            :key="index"
            :id="index"
            :type="item.value"
            @changeOperation="onChangeOperation"
          />
        </template>
      </template>
      <template>
        <result :result="resultString" />
      </template>
      <hr />
      <button class="btn-add-fraction" @click="addSegment">Добавить дробь</button>
      <div v-if="showWarning">
        <hr />
        <span>{{warning}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import fraction from "./fraction.vue";
import operation from "./operation.vue";
import result from "./result.vue";

import * as pN from "../../math/polishNotation";
import { isDigital } from "../../math/fractions";

export default {
  name: "calculator",
  data() {
    return {
      inputString: [],
      resultString: [],
      showWarning: false
    };
  },

  mounted() {
    this.init();
  },

  computed: {
    warning: function() {
      return "Пожалуйста заполните поля числами!";
    },
    inputArr: function() {
      return this.inputString.concat(this.resultString);
    },
  },

  methods: {
    /**
     * Событие измененения значений в дробях
     */
    onChangeNumber(e) {
      if (e.name === "numenator") {
        this.inputString[e.id].numenator = e.newValue;
      } else if (e.name === "denomenator") {
        this.inputString[e.id].denomenator = e.newValue;
      }
      this.checkForUpdate();
    },

    onChangeOperation(e) {
      this.inputString[e.id].value = e.op;
      this.checkForUpdate();
    },

    crDefOperation(op) {
      return {
        type: "operation",
        value: op
      };
    },

    /**
     * Генерирует дробь. isResult - является ли дробью или результатом
     */
    crDefFraction(isResult = false) {
      return {
        numenator: "",
        denomenator: "",
        type: "number",
        isResult: isResult
      };
    },

    /**
     * Добавить новый сегмент по клику
     */
    addSegment() {
      this.inputString.push(this.crDefOperation("+"));
      this.inputString.push(this.crDefFraction());
      this.checkForUpdate();
    },

    checkForUpdate() {
      const operands = this.inputString.filter(item => item.type === "number");
      for (let i = 0; i < operands.length; i++) {
        let isFractionOk =
          isDigital(operands[i].numenator) &&
          isDigital(operands[i].denomenator) &&
          +operands[i].denomenator !== 0;
        if (!isFractionOk) {
          // сброс результатов
          this.reCalcResult();
          return;
        }
        if (i === operands.length - 1) {
          // пересчет результатов
          this.reCalcResult(false);
        }
      }
    },

    reCalcResult(isReset = true) {
      this.showWarning = isReset;
      if (!isReset) {
        
        const result = pN.calculate(this.inputString);
        this.setResult(result.numenator, result.denomenator);
      } else {
        this.setResult();
      }
    },

    setResult(numenator = "", denomenator = "") {
      if (numenator !== "" && denomenator !== "" && numenator === denomenator) {
        numenator = 1;
        denomenator = 1;
      }
      this.resultString = this.resultString.map(item => {
        if (item.type === "number") {
          item.numenator = numenator + "";
          item.denomenator = numenator !== 0 ? denomenator + "" : "0";
        }
        return item;
      });
    },

    

    init() {
      this.inputString.push(this.crDefFraction());
      this.inputString.push(this.crDefOperation("+"));
      this.inputString.push(this.crDefFraction());
      this.resultString.push(this.crDefOperation("="));
      this.resultString.push(this.crDefFraction(true));
      this.checkForUpdate();
    }
  },

  components: {
    fraction,
    operation,
    result
  }
};
</script>

<style scoped>
.fractions-list {
  background-color: white;
  width: 70%;
  border-radius: 4px;
  padding: 10px;
  margin: 10px auto;
  text-align: center;
  display: inline-table;
}

.btn-add-fraction {
  display: block;
  margin: 0 auto;
}
</style>
