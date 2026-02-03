import Hangul from 'hangul-js';

export const checkSerious = (pw) => {
    if (!pw) return true;
    if (pw.includes('K') || pw.includes('k')) return false;
    const disassembled = Hangul.disassemble(pw);
    return !disassembled.some(jamo => jamo === 'ㅋ');
};

export const descriptionSerious = "이 비밀번호는 진지합니다… ㅋ이나 K을 포함하지 마세요";
