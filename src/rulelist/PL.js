export const RenderPL = () => {
    return (
        <div>
            <p>_____ is a decision procedure to check whether a certain program can incur a type-related error during execution.</p>
        </div>
    );
};

export const checkPL = (pw) => {
    return pw.toLowerCase().includes("type checking");
};

export const descriptionPL = "비밀번호는 다음 문제의 답을 포함해야 합니다.";