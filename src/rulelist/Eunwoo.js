import eunwooImg from '../assets/hq720.jpg';

export const RenderEunwoo = () => {
    return (
        <div style={{ marginTop: '10px' }}>
            <img src={eunwooImg} alt="Eunwoo Clock" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
    );
};

export const checkEunwoo = (pw) => {
    return pw.toLowerCase().includes("🕗");
};

export const descriptionEunwoo = "비밀번호는 다음 인물의 오늘 국방시계 시각 이모지를 포함해야합니다.";