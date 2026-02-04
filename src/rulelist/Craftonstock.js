import React, { useState, useEffect } from 'react';

let stockPrice = null;

export const initCraftonStock = async () => {
    try {
        const proxyUrl = 'https://corsproxy.io/?';
        const targetUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/259960.KS?interval=1d&range=1d';

        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const data = await response.json();

        const result = data.chart.result[0];
        const price = result.meta.chartPreviousClose;

        if (price) {
            stockPrice = price;
        } else {
            throw new Error("No price data found");
        }
    } catch (error) {
        console.error("Failed to fetch stock price from Yahoo Finance", error);
        // 실패 시 기본값 (안전장치)
        stockPrice = 330000;
    }
};

export const checkCraftonStock = (pw) => {
    if (!pw || !stockPrice) return false;
    return pw.includes(stockPrice.toString());
};

export const RenderCraftonStock = () => {
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!stockPrice) {
            setLoading(true);
            initCraftonStock().then(() => {
                setPrice(stockPrice);
                setLoading(false);
            });
        } else {
            setPrice(stockPrice);
        }
    }, []);

    return (
        <div style={{ marginTop: '10px' }}>
            {loading ? (
                <span style={{ fontSize: '12px', color: '#888' }}>주가 정보 불러오는 중...</span>
            ) : (
                <span style={{ fontSize: '11px', color: '#aaa' }}>
                    (현재 로드된 값: {stockPrice ? stockPrice : '로드 실패'})
                </span>
            )}
        </div>
    );
};

export const descriptionCraftonStock = "비밀번호는 크래프톤(259960)의 전일 종가를 포함해야 합니다.";
