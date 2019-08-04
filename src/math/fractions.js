


/**
 * Возвращает наименьшее общее кратное 
*  'least common multiple'
 */


const findLSM = arr => {
  let lsm = Math.abs(arr[0]);
  
  for (let i = 1; i < arr.length; i++) {
    let current = Math.abs(arr[i]);
    let next = lsm;
    while (lsm && current) {
      lsm > current ? lsm %= current : current %= lsm;
    }
    lsm = Math.abs(next * arr[i]) / (lsm + current);
  }
  return lsm;
};


const returnFraction = {
  type: 'number',
  isResult: false,
  numenator: '',
  denomenator: ''
};

const multiply = (x,y) => {
  returnFraction.numenator = +x.numenator * +y.numenator;
  returnFraction.denomenator = +x.denomenator * +y.denomenator;
  return returnFraction;
};

const divide = (x,y) => {
  returnFraction.numenator = +x.numenator * +y.denomenator;
  returnFraction.denomenator = +x.denomenator * +y.numenator;
  return returnFraction;
};

const sum = (x, y) => {
  const nok = findLSM([x.denomenator, y.denomenator]);
  returnFraction.numenator = +x.numenator*(nok/x.denomenator) + +y.numenator*(nok/y.denomenator);
  returnFraction.denomenator = nok;
  return returnFraction;

};

const sub = (x, y) => {
  const nok = findLSM([x.denomenator, y.denomenator]);
  returnFraction.numenator = +x.numenator*(nok/x.denomenator) - +y.numenator*(nok/y.denomenator);
  returnFraction.denomenator = nok;
  return returnFraction;
};

const isDigital = num => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};


export {sum, multiply, divide, sub, isDigital}
