/**@type {HTMLElement} 몬스터 체력바*/
const monsterHealthBar = document.getElementById('monster-health');
/**@type {HTMLElement} 플레이어 체력바*/
const playerHealthBar = document.getElementById('player-health');
/**@type {HTMLElement} 보너스 라이프 표시*/
const bonusLifeEl = document.getElementById('bonus-life');


/**@type {HTMLElement} 공격버튼*/
const attackBtn = document.getElementById('attack-btn');
/**@type {HTMLElement} 강공버튼*/
const strongAttackBtn = document.getElementById('strong-attack-btn');
/**@type {HTMLElement} 힐버튼*/
const healBtn = document.getElementById('heal-btn');
/**@type {HTMLElement} 전체 로그 보기버튼*/
const logBtn = document.getElementById('log-btn');


// 체력바 벨류 변경 함수 선언
function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

/**
 * 몬스터 체력바 벨류에 전달값에 랜덤값을 곱해준 값을 빼고 곱한값을 리턴. 
 * @param  {number} damage 전달받을 데미지 값 
 */
function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value -= dealtDamage;
  return dealtDamage;
}

/**
 * 플레이어 체력바 벨류에 전달값에 랜덤값을 곱해준 값을 빼고 곱한값을 리턴
 * @param  {number} damage 전달받을 데미지 값 
 */
function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value -= dealtDamage;
  return dealtDamage;
}

/**
 * 플레이어 체력바 벨류 증가 함수 (힐) 선언
 * @param  {number} healValue 전달받을 힐 증가값
 */
function increasePlayerHealth(healValue) {
  playerHealthBar.value += healValue;
}

/**
 * @param  {number} value 전달받을 체력값
 */
function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

// 보너스 생명 표시 제거 함수 선언
function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

/**
 * 플레이어 체력바 설정 함수 선언
 * @param  {number} health 전달받을 체력값
 */
function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
