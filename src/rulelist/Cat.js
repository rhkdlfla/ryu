import React, { useState, useEffect } from 'react';

let currentState = null;

export const initCat = async () => {
    try {
        // 1. 모든 품종 목록 가져오기
        const breedsResponse = await fetch('https://api.thecatapi.com/v1/breeds');
        const breeds = await breedsResponse.json();

        if (breeds.length === 0) return;

        // 2. 랜덤 품종 선택
        const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

        // 3. 해당 품종의 이미지 가져오기
        const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}`);
        const imageData = await imageResponse.json();

        if (imageData && imageData.length > 0) {
            currentState = {
                image: imageData[0].url,
                answer: randomBreed.name // 정답은 품종 이름
            };
        }
    } catch (error) {
        console.error("Failed to fetch cat", error);
        // 실패 시 안전장치
        currentState = {
            image: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
            answer: "Abyssinian"
        };
    }
};

export const checkCat = (pw) => {
    if (!pw || !currentState) return false;
    // 대소문자 구분 없이, 그리고 공백 무시 등으로 유연하게? 
    // 일단은 단순 포함 여부 (품종 이름이 정확해야 함)
    // 품종 이름에 공백이 있을 수 잇음.
    return pw.toLowerCase().includes(currentState.answer.toLowerCase());
};

export const RenderCat = () => {
    const [tick, setTick] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleRefresh = async () => {
        setLoading(true);
        await initCat();
        setLoading(false);
        setTick(t => t + 1);
    };

    // 컴포넌트 마운트 시 데이터가 없으면 초기화
    useEffect(() => {
        if (!currentState) {
            handleRefresh();
        }
    }, []);

    if (loading) return <div>고양이 불러오는 중... 🐈</div>;
    if (!currentState) return <div>고양이 데이터 없음</div>;

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
                    🔄 다른 고양이 보기
                </button>
            </div>
            <img
                src={currentState.image}
                alt="Cat"
                style={{ border: '1px solid #ddd', borderRadius: '4px', maxWidth: '100%', maxHeight: '300px' }}
            />
            {/* 디버깅 편의를 위해 정답을 숨겨둠 (주석 처리) */}
            {<p style={{ fontSize: '10px', color: '#ccc' }}>{currentState.answer}</p>}
        </div>
    );
};

export const descriptionCat = "비밀번호는 다음 고양이의 품종(영어)이 포함되어야 합니다.";
