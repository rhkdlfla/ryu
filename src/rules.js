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
  ];