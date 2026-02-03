import Hangul from 'hangul-js';

export const checkSerious = (pw) => {
    if (!pw) return true;
    const countK = (pw.match(/K/gi) || []).length;
    const disassembled = Hangul.disassemble(pw);
    const countKiyeok = disassembled.filter(jamo => jamo === 'ㅋ').length;
    return countK + countKiyeok <= 1;
};

export const descriptionSerious = "이 비밀번호는 진지합니다… ㅋ이나 K을 1개 이하로 포함해야 합니다";
