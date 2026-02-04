
export const checkSibganji = (pw) => {
    if (!pw) return false;
    const sibiji = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
    let count = 0;
    for (const char of pw) {
        if (sibiji.includes(char)) {
            count++;
        }
    }
    return count === 1;
};

export const descriptionSibganji = "비밀번호에 십이지와 십간 중 하나만 포함되어야 합니다.";
