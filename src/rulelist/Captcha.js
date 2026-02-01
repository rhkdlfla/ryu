
import React from 'react';

export const captchaData = [
    { image: "catcha_used/train-images/image_train_8.png", answer: "1222" },
    { image: "catcha_used/train-images/image_train_9.png", answer: "1330" },
    { image: "catcha_used/train-images/image_train_10.png", answer: "1361" },
    { image: "catcha_used/train-images/image_train_11.png", answer: "1377" },
    { image: "catcha_used/train-images/image_train_12.png", answer: "1529" },
    { image: "catcha_used/train-images/image_train_13.png", answer: "1653" },
    { image: "catcha_used/train-images/image_train_14.png", answer: "1991" },
    { image: "catcha_used/train-images/image_train_15.png", answer: "2172" },
    { image: "catcha_used/train-images/image_train_16.png", answer: "2288" },
    { image: "catcha_used/train-images/image_train_17.png", answer: "2380" },
    { image: "catcha_used/train-images/image_train_18.png", answer: "2994" },
    { image: "catcha_used/train-images/image_train_19.png", answer: "3363" },
    { image: "catcha_used/train-images/image_train_20.png", answer: "3486" },
    { image: "catcha_used/train-images/image_train_21.png", answer: "3565" },
    { image: "catcha_used/train-images/image_train_22.png", answer: "3731" },
    { image: "catcha_used/train-images/image_train_23.png", answer: "3737" },
    { image: "catcha_used/train-images/image_train_24.png", answer: "4113" },
    { image: "catcha_used/train-images/image_train_25.png", answer: "4148" },
    { image: "catcha_used/train-images/image_train_26.png", answer: "4206" },
    { image: "catcha_used/train-images/image_train_27.png", answer: "4239" },
    { image: "catcha_used/train-images/image_train_28.png", answer: "4643" },
    { image: "catcha_used/train-images/image_train_29.png", answer: "4701" },
    { image: "catcha_used/train-images/image_train_30.png", answer: "4851" },
    { image: "catcha_used/train-images/image_train_31.png", answer: "5136" },
    { image: "catcha_used/train-images/image_train_32.png", answer: "5158" },
    { image: "catcha_used/train-images/image_train_33.png", answer: "5193" },
    { image: "catcha_used/train-images/image_train_34.png", answer: "5210" },
    { image: "catcha_used/train-images/image_train_35.png", answer: "5245" },
    { image: "catcha_used/train-images/image_train_36.png", answer: "5317" },
    { image: "catcha_used/train-images/image_train_37.png", answer: "5389" },
    { image: "catcha_used/train-images/image_train_38.png", answer: "5415" },
    { image: "catcha_used/train-images/image_train_39.png", answer: "5510" },
    { image: "catcha_used/train-images/image_train_40.png", answer: "5551" },
    { image: "catcha_used/train-images/image_train_41.png", answer: "5940" },
    { image: "catcha_used/train-images/image_train_42.png", answer: "6033" },
    { image: "catcha_used/train-images/image_train_43.png", answer: "6168" },
    { image: "catcha_used/train-images/image_train_44.png", answer: "6323" },
    { image: "catcha_used/train-images/image_train_45.png", answer: "6561" },
    { image: "catcha_used/train-images/image_train_46.png", answer: "6573" },
    { image: "catcha_used/train-images/image_train_47.png", answer: "6607" },
    { image: "catcha_used/train-images/image_train_48.png", answer: "6763" },
    { image: "catcha_used/train-images/image_train_49.png", answer: "6851" },
    { image: "catcha_used/train-images/image_train_50.png", answer: "6934" },
    { image: "catcha_used/train-images/image_train_51.png", answer: "7062" },
    { image: "catcha_used/train-images/image_train_52.png", answer: "7219" },
    { image: "catcha_used/train-images/image_train_53.png", answer: "7454" },
    { image: "catcha_used/train-images/image_train_54.png", answer: "7482" },
    { image: "catcha_used/train-images/image_train_55.png", answer: "7641" },
    { image: "catcha_used/train-images/image_train_56.png", answer: "7717" },
    { image: "catcha_used/train-images/image_train_57.png", answer: "7768" },
    { image: "catcha_used/train-images/image_train_58.png", answer: "8508" },
    { image: "catcha_used/train-images/image_train_59.png", answer: "8689" },
    { image: "catcha_used/train-images/image_train_60.png", answer: "8751" },
    { image: "catcha_used/train-images/image_train_61.png", answer: "9321" },
    { image: "catcha_used/train-images/image_train_62.png", answer: "9515" },
    { image: "catcha_used/train-images/image_train_63.png", answer: "9577" },
    { image: "catcha_used/train-images/image_train_64.png", answer: "9613" },
    { image: "catcha_used/train-images/image_train_65.png", answer: "9685" },
    { image: "catcha_used/train-images/image_train_66.png", answer: "9707" },
    { image: "catcha_used/train-images/image_train_67.png", answer: "9737" }
];

let currentState = null;

// 초기 상태 생성: 랜덤 캡챠 선택 (이미 존재하면 유지)
export const initCaptcha = () => {
    const randomIndex = Math.floor(Math.random() * captchaData.length);
    currentState = captchaData[randomIndex];
    return currentState;
};

// 검증 로직: 상태(정답)가 비밀번호에 포함되어 있는지 확인
export const checkCaptcha = (pw) => {
    if (!pw || !currentState) return false;
    return pw.includes(currentState.answer);
};


// UI 렌더링: 캡챠 이미지 표시
export const RenderCaptcha = () => {
    // 내부 상태 변화를 감지하여 컴포넌트를 다시 그리기 위한 장치
    const [, setTick] = React.useState(0);

    const handleRefresh = () => {
        // 강제로 다시 초기화 (새로운 랜덤 값)
        initCaptcha();
        // 리액트 컴포넌트 리렌더링 유발
        setTick(t => t + 1);
    };

    if (!currentState) return null;
    return (
        <div style={{ marginTop: '10px' }}>
            <div style={{ marginBottom: '5px' }}>
                <button
                    onClick={handleRefresh}
                    style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                >
                    🔄 새로고침
                </button>
            </div>
            <img
                src={currentState.image}
                alt="Captcha"
                style={{ border: '1px solid #ddd', borderRadius: '4px', maxWidth: '100%' }}
            />
        </div>
    );
};

export const descriptionCaptcha = "비밀번호에는 다음 captcha가 포함되어야 합니다.";