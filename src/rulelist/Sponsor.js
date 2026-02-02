import React from 'react';

export const checkSponsor = (pw) => {
    if (!pw) return false;
    return pw.includes('류석영') || pw.includes('장병규');
};

export const descriptionSponsor = "비밀번호에는 우리의 스폰서 중 하나가 포함되어야 합니다.";

const sponsorImages = [
    { src: 'sponsor/ryu.jpeg', alt: '스폰서 1' },
    { src: 'sponsor/jang.jpeg', alt: '스폰서 2' },
];

export const RenderSponsor = () => (
    <div style={{ marginTop: '10px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {sponsorImages.map((img, i) => (
            <img
                key={i}
                src={img.src}
                alt={img.alt}
                style={{ border: '1px solid #ddd', borderRadius: '4px', maxWidth: '100%', maxHeight: '200px' }}
            />
        ))}
    </div>
);
