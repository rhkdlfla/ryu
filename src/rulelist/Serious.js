export const checkSerious = (pw) => {
    return !pw.includes('K') && !pw.includes('ㅋ');
};

export const descriptionSerious = "이 비밀번호는 진지합니다… ㅋ이나 K을 포함하지 마세요";
