import Hangul from 'hangul-js';

export const checkSsangJaeum = (pw) => {
    if (!pw) return false;
    const disassembled = Hangul.disassemble(pw);
    const ssangJaueum = ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'];
    return disassembled.some(char => ssangJaueum.includes(char));
};

export const descriptionSsangJaeum = "비밀번호는 쌍자음이 포함되어야 합니다";
