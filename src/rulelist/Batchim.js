import Hangul from 'hangul-js';

export const checkBatchim = (pw) => {
    if (!pw) return false;

    let batchimCount = 0;
    for (const char of pw) {
        // 한글이 아닌 경우 건너뜀
        if (!Hangul.isComplete(char)) continue;

        const disassembled = Hangul.disassemble(char);
        const lastJamo = disassembled[disassembled.length - 1];

        // 마지막 자모가 자음인지 확인 (받침 존재 여부)
        if (Hangul.isConsonant(lastJamo)) {
            batchimCount++;
        }
    }

    return batchimCount >= 1 && batchimCount <= 5;
};

export const descriptionBatchim = "비밀번호에 받침이 1개 이상, 5개 이하로 포함되어야 합니다";
