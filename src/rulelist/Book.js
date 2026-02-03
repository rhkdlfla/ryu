// 부화 전 이모지 → 5번 먹이면 바뀔 이모지 / 먹이 이모지
const BEFORE = "🥚";
const AFTER = "🐔";
const BOOK = "📚"; // 먹이

let fedCount = 0;

export const initBook = () => {
    fedCount = 0;
};

export const checkBook = (pw) => {
    const target = fedCount >= 5 ? CHICKEN : BEFORE;
    return pw.includes(target);
};

export const updateBook = (pw) => {
    if (fedCount >= 5) return pw;
    if (!pw.includes(BEFORE)) return pw;
    // 먹이(🐛)가 있으면 하나 제거하고 한 번 먹인 걸로 침
    if (!pw.includes(BOOK)) return pw;
    fedCount += 1;
    let next = pw.replace(BOOK, ""); // 첫 번째 🐛 제거
    if (fedCount >= 5 && next.includes(BEFORE)) {
        next = next.replace(BEFORE, CHICKEN);
    }
    return next;
};

export const descriptionBook = `영석이가 학교를 졸업할 수 있도록 ${BOOK}을 주세요.`;
