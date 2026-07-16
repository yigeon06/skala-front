/* script/weatherAPI.js */

/**
 * Open-Meteo API 서버로부터 실시간 날씨 데이터를 비동기로 가져오는 함수
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<Object>} API 응답 JSON 데이터
 */
export async function fetchWeatherData(lat, lon) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("날씨 네트워크 통신에 실패했습니다.");
    }
    
    return await response.json(); // 파싱된 객체 데이터 반환
}