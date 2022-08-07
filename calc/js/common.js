/** @type {number} 계산값 */
let currentResult = 0;
/** @type {string} 계산식 */
let calcDescription;
/** @type {number} 입력값 */
let inputValue = Number(userInput.value);

// 계산하고 값을 출력함수에 인자값 넘기는 함수
function addBtnFn(){
    if(this === addBtn ){
        calcDescription = `${currentResult} + ${inputValue}`
        currentResult += inputValue;
    }else if(this === subtractBtn){
        calcDescription = `${currentResult} - ${inputValue}`
        currentResult -= inputValue;
    }else if(this === multiplyBtn){
        calcDescription = `${currentResult} x ${inputValue}`
        currentResult *= inputValue;
    }else if(this === divideBtn){
        calcDescription = `${currentResult} % ${inputValue}`
        currentResult /= inputValue;
    }
    outputResult(currentResult, calcDescription);
}

btns.forEach( e => e.addEventListener('click',addBtnFn));