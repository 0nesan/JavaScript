console.time('얼마나 걸릴까');

/** @type {object} 숫자입력란 */
const userInput = document.getElementById('input-number');
/** @type {object} 더하기버튼 */
const addBtn = document.getElementById('btn-add');
/** @type {object} 빼기버튼 */
const subtractBtn = document.getElementById('btn-subtract');
/** @type {object} 곱하기버튼 */
const multiplyBtn = document.getElementById('btn-multiply');
/** @type {object} 나누기버튼 */
const divideBtn = document.getElementById('btn-divide');
/** @type {object} 버튼전체 */
const btns = document.querySelectorAll('#calc-actions button');

/** @type {object} h1 계산값 들어갈 공간 */
const currentResultOutput = document.getElementById('current-result');
/** @type {object} h1 계산식 들어갈 공간 */
const currentCalculationOutput = document.getElementById('current-calculation');


/**
 * 계산 값과 식을 계산함수에서 받아 출력하는 함수
 * @param {number} result 계산값
 * @param {string} text 계산식
 */
function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}

console.log(multiplyBtn);
console.dir(multiplyBtn);
console.log(JSON.parse(JSON.stringify(multiplyBtn)))