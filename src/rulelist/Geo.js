import React from "react";

// public/geo 폴더 안 glb 파일들 (경로, 비밀번호에 넣을 이름 = 확장자 제외 파일명)
const GEO_FILES = [
    { path: "/geo/KI.glb", name: "KI빌딩" },
    { path: "/geo/PP.glb", name: "파팔라도센터" },
];

let currentState = null;

export const initGeo = () => {
    const idx = Math.floor(Math.random() * GEO_FILES.length);
    currentState = GEO_FILES[idx];
    return currentState;
};

export const checkGeo = (pw) => {
    if (!pw || !currentState) return false;
    return pw.includes(currentState.name);
};

export const descriptionGeo = "비밀번호에는 아래 건물의 파일명이 포함되어야 합니다.";

export const RenderGeo = () => {
    const [, setTick] = React.useState(0);
    const [viewerReady, setViewerReady] = React.useState(false);

    // Geo 규칙이 배열 맨 앞(index 0)이면 init이 호출되지 않으므로, 처음 보일 때 여기서 초기화
    React.useEffect(() => {
        if (!currentState) {
            initGeo();
            setTick((t) => t + 1);
        }
    }, []);

    // model-viewer 스크립트가 로드된 뒤에만 GLB 요청이 나가므로, 정의될 때까지 대기
    React.useEffect(() => {
        if (typeof customElements !== "undefined" && !customElements.get("model-viewer")) {
            customElements.whenDefined("model-viewer").then(() => setViewerReady(true));
        } else if (typeof customElements !== "undefined" && customElements.get("model-viewer")) {
            setViewerReady(true);
        } else {
            setViewerReady(true); // SSR 등에서 customElements 없으면 그냥 렌더
        }
    }, []);

    const handleRefresh = () => {
        initGeo();
        setTick((t) => t + 1);
    };

    if (!currentState) return <div style={{ marginTop: "10px", color: "#666" }}>로딩 중...</div>;

    const glbSrc = (process.env.PUBLIC_URL || "") + currentState.path;

    return (
        <div style={{ marginTop: "10px" }}>
            <div style={{ marginBottom: "8px" }}>
                <button
                    type="button"
                    onClick={handleRefresh}
                    style={{
                        padding: "4px 8px",
                        fontSize: "12px",
                        cursor: "pointer",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                >
                    🔄 다른 건물
                </button>
            </div>
            {viewerReady ? (
                <model-viewer
                    src={glbSrc}
                    alt="건물 3D 모델"
                    camera-controls
                    auto-rotate
                    style={{
                        width: "100%",
                        height: "240px",
                        backgroundColor: "#eee",
                        borderRadius: "8px",
                    }}
                />
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "240px",
                        backgroundColor: "#eee",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#666",
                    }}
                >
                    3D 뷰어 로딩 중…
                </div>
            )}
        </div>
    );
};
