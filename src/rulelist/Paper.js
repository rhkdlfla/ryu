export const RenderPaper = () => {
    return (
        <div>
            <p>SAFE: Formal Specification and Implementation of a Scalable Analysis Framework for ECMAScript</p>
        </div>
    );
};

export const checkPaper = (pw) => {
    return pw.toLowerCase().includes("🇺🇸");
};

export const descriptionPaper = "비밀번호는 다음 논문이 발표된 학회의 국가를 이모지로 포함해야 합니다.";