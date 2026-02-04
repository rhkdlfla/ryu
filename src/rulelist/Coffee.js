// 1. 설정값과 상태 관리 분리
const CONFIG = {
    BEFORE: "👨‍💻",
    AFTER: "🤷‍♂️",
    COFFEE: "☕️",
};

// 일부 환경에서 ☕ 뒤에 variation selector(️=\uFE0F)가 붙거나 안 붙을 수 있어 둘 다 인식
const COFFEE_RE = /☕\uFE0F?/u;

// App.js의 setInterval(10000)과 맞춰, React.StrictMode 등으로 update가 중복 호출돼도
// "한 틱에 커피 1잔"만 소모되도록 방어
const MIN_CONSUME_INTERVAL_MS = 10000;

// 커피가 이 횟수만큼 연속으로 없으면 AFTER로 변환
const NO_COFFEE_TOLERANCE = 2;

const state = {
    consumedCount: 0,
    completed: false,
    lastConsumedAt: 0,
    noCoffeeCount: 0, // 연속으로 커피 없음 틱 횟수
};

// 2. 초기화 함수
export const initCoffee = () => {
    state.consumedCount = 0;
    state.completed = false;
    state.lastConsumedAt = 0;
    state.noCoffeeCount = 0;
};

// 3. 상태 확인 및 자동 리셋 함수
export const checkCoffee = (text) => {
    // 완료 상태인데 결과물(AFTER)이 사라졌다면 리셋 (사용자가 지운 경우 등)
    if (state.completed && !text.includes(CONFIG.AFTER)) {
        initCoffee();
    }
    // AFTER(🤷‍♂️) 상태면 무조건 미달이어야 함
    if (text.includes(CONFIG.AFTER)) return false;
    // 변환 전 대상(BEFORE)이 남아있으면 통과
    return text.includes(CONFIG.BEFORE);
};

// 4. 핵심 로직: "커피가 있으면 주기적으로 소모", "커피가 없으면 AFTER로 변환"
export const updateCoffee = (text) => {
    // 대상(BEFORE)이 없으면 아무것도 하지 않음
    if (!text.includes(CONFIG.BEFORE)) return text;

    // 이미 변환 완료: BEFORE가 다시 보이면 복구(재치환)
    if (state.completed) {
        return text.includes(CONFIG.BEFORE) && !text.includes(CONFIG.AFTER)
            ? text.replace(CONFIG.BEFORE, CONFIG.AFTER)
            : text;
    }

    // 커피가 없으면 카운트만 올리고, NO_COFFEE_TOLERANCE번 연속 없을 때만 변환
    if (!COFFEE_RE.test(text)) {
        state.noCoffeeCount += 1;
        if (state.noCoffeeCount >= NO_COFFEE_TOLERANCE) {
            state.completed = true;
            return text.replace(CONFIG.BEFORE, CONFIG.AFTER);
        }
        return text;
    }

    // 커피가 있으면 "연속 없음" 카운트 리셋 후 1잔 소모 (한 틱에 1번만)
    state.noCoffeeCount = 0;
    const now = Date.now();
    if (state.lastConsumedAt > 0 && now - state.lastConsumedAt < MIN_CONSUME_INTERVAL_MS) {
        return text;
    }
    state.lastConsumedAt = now;
    state.consumedCount += 1;

    return text.replace(COFFEE_RE, "");
};

export const descriptionCoffee = `영석이가 학교를 졸업해서 크래프톤 개발자가 되었습니다. 영석이가 성실히 근무할 수 있도록 ${CONFIG.COFFEE}를 주세요.`;