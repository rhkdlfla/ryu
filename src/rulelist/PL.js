export const RenderPL = () => {
    return (
        <div>
            <p>_____ is a decision procedure to check whether a certain program can incur a type-related error during execution.</p>
        </div>
    );
};

export const checkPL = (pw) => {
    if (!pw) return false;
    const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();
    return normalize(pw).includes("typechecking");
};

export const descriptionPL = "비밀번호는 다음 문제의 답을 포함해야 합니다.";