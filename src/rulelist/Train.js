// --- [설정값 및 상수] ---
const SERVICE_KEY = "7ebbc742efdba41bb27b856f07b716fc17c4ea78bd06b5b47f4dd0672028d6aa";
const ENDPOINT = "https://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo";

const SEOUL_CODE = "NAT010000";
const DAEJEON_CODE = "NAT011668";

// --- [상태 관리 변수] ---
let cachedTrainName = null;
let lastFetchedDate = null;
let isFetching = false;

// --- [유틸리티 함수] ---
const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
};

const getLastTrainName = async () => {
    try {
        const today = getTodayStr();
        const depPlandTime = today;

        const originalUrl = `${ENDPOINT}?serviceKey=${encodeURIComponent(SERVICE_KEY)}&depPlaceId=${SEOUL_CODE}&arrPlaceId=${DAEJEON_CODE}&depPlandTime=${depPlandTime}&numOfRows=200&_type=json`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

        const response = await fetch(proxyUrl);

        if (!response.ok) return null;

        const json = await response.json();
        const header = json.response?.header;
        if (header && header.resultCode !== "00") return null;

        const items = json.response?.body?.items?.item;
        if (!items) return null;

        const sortedTrains = Array.isArray(items)
            ? [...items].sort((a, b) => Number(b.arrplandtime) - Number(a.arrplandtime))
            : [items];

        const lastTrain = sortedTrains[0];
        if (!lastTrain) return null;

        const gradeName = lastTrain.traingradename || lastTrain.trainGradeName || "";
        const trainNo = lastTrain.trainno || lastTrain.trainNo || "";
        return `${gradeName}${trainNo}`.trim();
    } catch {
        return null;
    }
};

const ensureTrainName = () => {
    const today = getTodayStr();
    if (lastFetchedDate === today && cachedTrainName) return;
    if (isFetching) return;

    isFetching = true;
    getLastTrainName()
        .then((name) => {
            cachedTrainName = name;
            lastFetchedDate = today;
        })
        .catch(() => {
            cachedTrainName = null;
            lastFetchedDate = today;
        })
        .finally(() => {
            isFetching = false;
        });
};

// --- [외부 export] ---
export const descriptionTrain = "비밀번호는 오늘 서울역 방면에서 대전역에 도착하는 마지막 KTX 열차 이름이 포함되어야 합니다. (예: KTX023)";

export const initTrain = () => {
    ensureTrainName();
};

export const checkTrain = (pw) => {
    if (!pw) return false;
    if (!cachedTrainName) {
        ensureTrainName();
        return false;
    }
    return pw.includes(cachedTrainName);
};
