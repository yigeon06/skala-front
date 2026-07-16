/* script/realtimeInfo.js */

import { fetchWeatherData } from './weatherAPI.js';

const citySelect = document.getElementById("city-select");
const weatherResult = document.getElementById("weather-result");

const cityCoordinates = {
    seoul: { name: "대한민국 서울 KR", lat: 37.5665, lon: 126.9780 },
    tokyo: { name: "일본 도쿄 JP", lat: 35.6895, lon: 139.6917 },
    paris: { name: "프랑스 파리 FR", lat: 48.8566, lon: 2.3522 }
};

function getWeatherStatus(code) {
    const codeMap = {
        0: { icon: "☀️", text: "맑음 (Clear sky)" },
        1: { icon: "🌤️", text: "대체로 맑음 (Mainly clear)" },
        2: { icon: "⛅", text: "구름 조금 (Partly cloudy)" },
        3: { icon: "☁️", text: "흐림 (Cloudy)" },
        45: { icon: "🌫️", text: "안개 (Fog)" },
        48: { icon: "🌫️", text: "이슬 안개 (Depositing rime fog)" },
        51: { icon: "🌧️", text: "가벼운 이슬비 (Light drizzle)" },
        53: { icon: "🌧️", text: "이슬비 (Moderate drizzle)" },
        55: { icon: "🌧️", text: "짙은 이슬비 (Dense drizzle)" },
        61: { icon: "🌧️", text: "약한 비 (Slight rain)" },
        63: { icon: "🌧️", text: "보통 비 (Moderate rain)" },
        65: { icon: "🌧️", text: "강한 비 (Heavy rain)" },
        71: { icon: "❄️", text: "약한 눈 (Slight snow)" },
        73: { icon: "❄️", text: "보통 눈 (Moderate snow)" },
        75: { icon: "❄️", text: "강한 눈 (Heavy snow)" },
        95: { icon: "⛈️", text: "뇌우 (Thunderstorm)" }
    };
    return codeMap[code] || { icon: "✨", text: "정보 없음 (Unknown)" };
}

citySelect.addEventListener("change", async function() {
    const selectedCity = citySelect.value;

    if (!selectedCity) {
        weatherResult.innerHTML = `<p class="empty-msg">도시를 선택하면 실시간 날씨가 표시됩니다.</p>`;
        return;
    }

    const { name, lat, lon } = cityCoordinates[selectedCity];

    try {
        weatherResult.innerHTML = `
            <div class="weather-info">
                <strong style="display: block; font-size: 14px; color: #080808; margin-bottom: 4px;">📍 ${name}</strong>
                <p style="font-size: 12px; color: #8e8e8e; margin: 0 0 10px 0; line-height: 1.4;">
                    • 위도 (Latitude): ${lat}<br>
                    • 경도 (Longitude): ${lon}
                </p>
                <p style="color: #03c75a; font-weight: bold; margin-top: 12px; font-size: 14px;">실시간 날씨 로딩 중... ⏳</p>
            </div>
        `;

        const data = await fetchWeatherData(lat, lon);

        const temp = data.current.temperature_2m;
        const humidity = data.current.relative_humidity_2m;
        const windSpeed = data.current.wind_speed_10m;
        const weatherCode = data.current.weather_code;

        const { icon, text } = getWeatherStatus(weatherCode);

        weatherResult.innerHTML = `
            <div class="weather-info" style="animation: fadeInUp 0.4s ease-out forwards; text-align: left;">
                <strong style="display: block; font-size: 14px; color: #080808; margin-bottom: 4px;">📍 ${name}</strong>
                
                <p style="font-size: 12px; color: #8e8e8e; margin: 0 0 10px 0; line-height: 1.4;">
                    • 위도 (Latitude): ${lat}<br>
                    • 경도 (Longitude): ${lon}
                </p>
                
                <div style="background-color: #f5f6f7; padding: 15px; border-radius: 8px;">
                    <p style="font-size: 24px; margin: 5px 0; color: #080808;"><strong>${icon} ${temp}°C</strong></p>
                    <p style="margin: 4px 0; color: #555; font-size: 13px;">상태: ${text}</p>
                    <p style="margin: 4px 0; color: #555; font-size: 13px;">습도: ${humidity}% | 바람: 북풍 ${windSpeed} km/h</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("날씨 모듈 결합 에러:", error);
        weatherResult.innerHTML = `<p style="color: #dc3545; font-size: 13px; text-align: center; margin: 0;">⚠️ 날씨 정보를 불러오지 못했습니다.</p>`;
    }
});