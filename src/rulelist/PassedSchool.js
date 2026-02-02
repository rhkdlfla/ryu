export const checkPassedSchool = (pw) => {
    return pw.includes('KAIST') || pw.includes('카이스트') || pw.includes('하버드') || pw.includes('Harvard') || pw.includes('MIT') || pw.includes('서울과학고등학교');
};

export const descriptionPassedSchool = "비밀번호에는 류석영 교수님이 거쳐간 학교 이름이 포함되어야 합니다.";
