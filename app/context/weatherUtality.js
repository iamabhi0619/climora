export const getFiveDayAverages = (data) => {
  const dailyData = {};

  data.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toISOString().split('T')[0];

    if (!dailyData[date]) {
      dailyData[date] = {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        humidity: 0,
        pressure: 0,
        wind_speed: 0,
        wind_deg: 0,
        wind_gust: 0,
        weather: {},
        weatherDescriptions: {},
        weatherIcons: {},
        weatherIds: {}, // to track weather IDs
        count: 0,
      };
    }

    const main = entry.main;
    const wind = entry.wind;
    const weather = entry.weather[0];

    dailyData[date].temp += main.temp;
    dailyData[date].feels_like += main.feels_like;
    dailyData[date].temp_min += main.temp_min;
    dailyData[date].temp_max += main.temp_max;
    dailyData[date].humidity += main.humidity;
    dailyData[date].pressure += main.pressure;
    dailyData[date].wind_speed += wind.speed;
    dailyData[date].wind_deg += wind.deg;
    dailyData[date].wind_gust += wind.gust || 0;

    dailyData[date].weather[weather.main] = (dailyData[date].weather[weather.main] || 0) + 1;
    dailyData[date].weatherDescriptions[weather.description] = (dailyData[date].weatherDescriptions[weather.description] || 0) + 1;
    dailyData[date].weatherIcons[weather.icon] = (dailyData[date].weatherIcons[weather.icon] || 0) + 1;
    dailyData[date].weatherIds[weather.id] = (dailyData[date].weatherIds[weather.id] || 0) + 1;

    dailyData[date].count++;
  });

  return Object.entries(dailyData)
    .slice(0, 5)
    .map(([date, values]) => {
      const mostCommonWeather = Object.entries(values.weather).reduce((a, b) => (a[1] > b[1] ? a : b), [])[0];
      const mostCommonDescription = Object.entries(values.weatherDescriptions).reduce((a, b) => (a[1] > b[1] ? a : b), [])[0];
      // const mostCommonIcon = Object.entries(values.weatherIcons).reduce((a, b) => (a[1] > b[1] ? a : b), [])[0];
      const mostCommonWeatherId = Object.entries(values.weatherIds).reduce((a, b) => (a[1] > b[1] ? a : b), [])[0];

      return {
        date,
        avg_temp: (values.temp / values.count),
        avg_feels_like: (values.feels_like / values.count),
        avg_temp_min: (values.temp_min / values.count),
        avg_temp_max: (values.temp_max / values.count),
        avg_humidity: (values.humidity / values.count),
        avg_pressure: (values.pressure / values.count),
        avg_wind_speed: (values.wind_speed / values.count),
        avg_wind_deg: (values.wind_deg / values.count),
        avg_wind_gust: (values.wind_gust / values.count),
        most_common_weather: mostCommonWeather || "Unknown",
        most_common_description: mostCommonDescription || "Unknown",
        most_common_weather_id: mostCommonWeatherId || "Unknown",
      };
    });
};
