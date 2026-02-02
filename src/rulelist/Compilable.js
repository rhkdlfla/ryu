import { loadPyodide } from "pyodide";

let pyodide = null;

// 앱 시작 시 한 번만 로드하도록 초기화 함수 제공
export const initPyodide = async () => {
    if (!pyodide) {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
    }
};

export const checkCompilable = (pw) => {
    // pyodide가 아직 로드되지 않았거나 빈 입력이면 false (또는 통과 처리 등 정책 결정 필요, 여기선 false)
    if (!pyodide || !pw) return false;

    try {
        // runPython은 코드를 실행하고 결과를 반환합니다.
        // 실행 도중 SyntaxError 등이 발생하면 catch 블록으로 이동합니다.
        pyodide.runPython(pw);
        return true;
    } catch (error) {
        return false;
    }
};

export const descriptionCompilable = "비밀번호가 파이썬으로 에러없이 실행 가능해야합니다.";
