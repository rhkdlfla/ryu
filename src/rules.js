import { checkSsangJaeum, descriptionSsangJaeum } from "./rulelist/Ssangjauem";
import { checkBatchim, descriptionBatchim } from "./rulelist/Batchim";
import { checkSibiji, descriptionSibiji } from "./rulelist/Sibiji";
import { checkCaptcha, initCaptcha, RenderCaptcha, descriptionCaptcha } from "./rulelist/Captcha";


/*
필수요소
id: 문제 번호
desc: 문제 설명
check: 검증 함수

선택요소
init: 상태 초기화 함수
render: 렌더링 함수(설명을 할때 문자 외에 요소들이 더 필요할떄, JSX를 이용해 html로딩)
update: 주기적 업데이트 함수 (currentPassword) => newPassword, 매분마다 실행됨, 번호 오름차순으로
*/
export const rules = [
    {
        id: 1,
        desc: "비밀번호는 5글자 이상이어야 합니다.",
        check: (pw) => pw.length >= 5,
    },
    {
        id: 2,
        desc: "숫자가 포함되어야 합니다.",
        check: (pw) => /\d/.test(pw),
    },
    {
        id: 3,
        desc: "모든 숫자의 합은 25여야 합니다.",
        check: (pw) => {
            const numbers = pw.match(/\d/g);
            if (!numbers) return false;
            const sum = numbers.reduce((acc, curr) => acc + parseInt(curr), 0);
            return sum === 25;
        },
    },
    {
        id: 4,
        desc: descriptionSsangJaeum,
        check: checkSsangJaeum,
    },
    {
        id: 5,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 6,
        desc: descriptionBatchim,
        check: checkBatchim,
    },
    {
        id: 7,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 8,
        desc: descriptionSibiji,
        check: checkSibiji,
    },
    {
        id: 9,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 10,
        desc: descriptionCaptcha,
        init: initCaptcha,
        check: checkCaptcha,
        render: RenderCaptcha,
    },
    {
        id: 11,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 12,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 13,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 14,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 15,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 16,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 17,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 18,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 19,
        desc: "규칙 설명",
        check: (pw) => true,
    },
    {
        id: 20,
        desc: "규칙 설명",
        check: (pw) => true,
    },
];