// 1. 설정값과 상태 관리 분리
const CONFIG = {
    BEFORE: "🧑‍🏫",
    AFTER: "👨‍💻",
    BOOK: "📚",
    GOAL_COUNT: 15,
};

const state = {
    fedCount: 0,
    completed: false,
};

// 2. 초기화 함수
export const initBook = () => {
    state.fedCount = 0;
    state.completed = false;
};

// 3. 상태 확인 및 자동 리셋 함수
export const checkBook = (text) => {
    // 완료 상태인데 결과물(AFTER)이 사라졌다면 리셋 (사용자가 지운 경우 등)
    if (state.completed && !text.includes(CONFIG.AFTER)) {
        initBook();
    }
    // 완료되었거나, 아직 변환 전 대상(BEFORE)이 남아있으면 true
    return state.completed || text.includes(CONFIG.BEFORE);
};

// 4. 핵심 로직: 먹이 주기 및 변환
export const updateBook = (text) => {
    // 대상(BEFORE)이 없으면 아무것도 하지 않음
    if (!text.includes(CONFIG.BEFORE)) return text;

    // 이미 목표치를 달성한 경우 (복구 로직 포함)
    if (state.fedCount >= CONFIG.GOAL_COUNT) {
        state.completed = true;
        // 이미 완료되었는데 BEFORE가 보이면 즉시 AFTER로 치환
        return text.includes(CONFIG.BEFORE)
            ? text.replace(CONFIG.BEFORE, CONFIG.AFTER)
            : text;
    }

    // 먹이(BOOK)가 없으면 변화 없음
    if (!text.includes(CONFIG.BOOK)) return text;

    // --- 먹이 섭취 로직 ---
    state.fedCount += 1;
    let nextText = text.replace(CONFIG.BOOK, "");

    // 목표 달성 확인
    if (state.fedCount >= CONFIG.GOAL_COUNT) {
        state.completed = true;
        return nextText.replace(CONFIG.BEFORE, CONFIG.AFTER);
    }

    return nextText;
};

export const descriptionBook = `영석이${CONFIG.BEFORE}가 학교를 졸업할 수 있도록 ${CONFIG.BOOK}을 주세요.`;