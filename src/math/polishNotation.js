/**
 * Reverse polish notation
*  Реализация без скобочек. Поэтому в классическом алгоритме оставляю только 2 приоритета.
  *  Умножение- деление и Плюс- минус

  * Классическая "стековая" реализация
  * пример: '5 + 4 /2  - 5 * 3' == '5 4 2 / + 5 3 * -'
 *
 */

import * as funcs from './fractions';


const create = Arr => {
  let numberStack = [];
  let operationsStack = [];
  const operators = {
    "+": { priority: 1 },
    "-": { priority: 1 },
    "*": { priority: 2 },
    "/": { priority: 2 },
  };
  
  Arr.forEach ((item) => {
    if (item.type === 'number') {
      numberStack.push(item);
    } else {
      let op1 = item;
      let op2 = operationsStack[operationsStack.length - 1];
      while (
        op2 && operators[op1.value].priority <= operators[op2.value].priority) {
          numberStack.push(operationsStack.pop());
        op2 = operationsStack[operationsStack.length - 1];
      }
      operationsStack.push(op1);
    }
  })
  while (operationsStack.length > 0) {
    numberStack.push(operationsStack.pop());
  }

  return numberStack;
};

/**
 * Получает преобразованный массив (polish notation). 
 * С помощью функий из  fractions.js преобразует выражение в обьект вида {числитель, знаменатель}.
 * 
 * 
 */

const parse = Arr => {
  let res = {
    numinator: 1,
    denominator: 1
  };

  const operators = {
    '+': (x, y) => funcs.sum(x, y),
    '-': (x, y) => funcs.sub(x, y),
    '*': (x, y) => funcs.multiply(x, y),
    '/': (x, y) => funcs.divide(x, y)
  };

  let stack = [];
  Arr.forEach(item => {
    if (item.type === 'operation') {
      let [y, x] = [stack.pop(), stack.pop()];
      stack.push(operators[item.value](x, y));
    } else {
      stack.push(item);
    }
  });
  res = stack.pop();
  return res;
};

const calculate = arr => {
  return parse(create(arr));
};

export { calculate };
