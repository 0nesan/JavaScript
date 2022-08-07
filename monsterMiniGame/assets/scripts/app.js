/**@type {number} 플레이어 기본 공격 데미지 */
const ATTACK_VALUE = 10;
/**@type {number} 플레이어 강 공격 데미지 */
const STRONG_ATTACK_VALUE = 17;
/**@type {number} 몬스터 반격 데미지 */
const MONSTER_ATTACK_VALUE = 14;
/**@type {number} 플레이어 힐량 */
const HEAL_VALUE = 20;

// 전역변수 모음
const MODE_ATTACK = `ATTACK`;
const MODE_STRONG_ATTACK = `STRONG_ATTACK`;
const LOG_EVENT_PLAYER_ATTACK = `PLAYER_ATTACK`;
const LOG_EVENT_PLAYER_STRONG_ATTACK = `PLAYER_STRONG_ATTACK`;
const LOG_EVENT_MONSTER_ATTACK = `MONSTER_ATTACK`;
const LOG_EVENT_PLAYER_HEAL = `EVENT_PLAYER_HEAL`;
const LOG_EVENT_GAME_OVER = `GAME_OVER`;
const LOG_EVENT_PLAYER_RESURRECTION = `PLAYER_RESURRECTION`;
const LOG_EVENT_GAME_RESET = `GAME_RESET`;

// 기본 체력값 변수 저장.
const enteredValue = prompt(`플레이어와 몬스터의 기본 체력을 설정해주세요. \n (둘 다 같은 체력으로 설정됩니다.)`, `100`);

/**@type {number} 최대 설정 체력값 */
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

// 숫자가 아니거나 음수 입력시 100으로 고정 설정.
if(isNaN(chosenMaxLife) || chosenMaxLife <= 0 ){
    alert('숫자가 아니거나, 음수값을 입력하셨습니다. \n 이 경우 100으로 임의 설정됨을 알려드립니다.');
    chosenMaxLife = 100;
}

/**@type {number} 최초 몬스터 체력값 */
let currentMonsterHealth = chosenMaxLife;
/**@type {number} 최초 플레이어 체력값 */
let currentPlayerHealth = chosenMaxLife;
/**@type {boolean} 보너스 생명 유무 */
let hasBonusLife = true;

// 체력바 벨류 변경 함수에 최대 체력값을 전달해 호출
adjustHealthBars(chosenMaxLife);

// 로그 기록 함수
function writeToLog(e, val, monsterHealth, playerHealth) {
    let logEntry = {
        event:e,
        value:val,
        finalMonsterHealth:monsterHealth,
        finalPlayerHealth:playerHealth
    };

    if(e === LOG_EVENT_PLAYER_ATTACK || e === LOG_EVENT_PLAYER_STRONG_ATTACK || e === LOG_EVENT_PLAYER_HEAL || e === LOG_EVENT_PLAYER_RESURRECTION ){
        logEntry.target = `PLAYER`;
    }else if(e === LOG_EVENT_MONSTER_ATTACK){
        logEntry.target = `MONSTER`;
    }

    battleLog.push(logEntry);
}

// 게임리셋 함수
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    hasBonusLife = true;
    resetGame(chosenMaxLife);
}

// 반격 및 게임 결과.
function endRound(){
    // 이전 체력값으로 돌아가기 위해 일전에 crrentHealth 값을 저장해준다 
    const initialPlayerHealth = currentPlayerHealth; 
    // 플레이어가 공격할 때 마다 몬스터 반격.
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    // 로그 전달
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    // 보너스 생명 있는지 확인 후 표시제거 함수 실행과 함께 맞기 전 체력으로 돌려줌.
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife(); 
        alert(`보너스 생명을 차감하고 부활하셨습니다\n(죽기 마지막 턴 체력으로 돌아갑니다).`);
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);

        // 로그 전달
        writeToLog(LOG_EVENT_PLAYER_RESURRECTION, '1회 부활', currentMonsterHealth, currentPlayerHealth);
    }

    // 게임 결과값 출력 + 로그 전달
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You win');
        writeToLog(LOG_EVENT_GAME_OVER, 'You win', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost');
        writeToLog(LOG_EVENT_GAME_OVER, 'You lost', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert(`You draw`);
        writeToLog(LOG_EVENT_GAME_OVER, 'You draw', currentMonsterHealth, currentPlayerHealth);
    }

    // 게임이 완전히 끝났을 때 게임 리셋
    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0 && hasBonusLife === false ){
        reset();

        // 로그 전달
        writeToLog(LOG_EVENT_GAME_RESET, 'game reset', currentMonsterHealth, currentPlayerHealth);
    }
}

// 공격할 때 강공인지 약공인지 확인 후 딜.
function attackMonster(mode){
    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let modeAttack = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    // 로그 전달
    writeToLog(modeAttack, damage, currentMonsterHealth, currentPlayerHealth);

    // 반격 및 게임 결과
    endRound();
}

// 강공인지 약공인지 파악하기 위해 함수 호출 시 어텍함수에 다른 인자값을 전달함.
function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

// 힐 함수
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert('최대 체력을 초과하는 힐은 할 수 없습니다.');
        healValue = chosenMaxLife - currentPlayerHealth;
    }else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    
    // 로그 전달
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);

    // 반격 및 게임 결과
    endRound();
}

// 로그 출력 함수
function printLogHandler(){
    console.log(battleLog);
}


//이벤트 리스너
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener(`click`,printLogHandler);