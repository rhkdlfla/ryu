export const checkSponsor = (pw) => {
    if (!pw) return false;
    return pw.includes('류석영') || pw.includes('장병규');
};

export const descriptionSponsor = "비밀번호에는 우리의 스폰서 중 하나가 포함되어야 합니다.";
