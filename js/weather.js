/**
 * Widget de Clima & Atardecer para Las Piedras
 */
const WeatherWidget = {
  init() {
    const container = document.getElementById("weatherWidgetContainer");
    if (!container) return;

    const weatherData = {
      temp: "23°C",
      condition: "Despejado & Agradable",
      sunset: "19:42 hs",
      idealTime: "18:30 a 19:45 hs (Golden Hour)",
      humidity: "58%"
    };

    container.innerHTML = `
      <div class="glass p-4 rounded-2xl border border-yellow-600/30 flex items-center justify-between gap-4 text-xs">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-lg">
            <i class="fa-solid fa-sun"></i>
          </div>
          <div>
            <div class="font-bold text-white">Clima en Las Piedras: <span class="text-yellow-400">${weatherData.temp}</span></div>
            <div class="text-slate-400 text-[11px]">${weatherData.condition} &middot; Humedad ${weatherData.humidity}</div>
          </div>
        </div>
        <div class="text-right border-l border-white/10 pl-4 hidden sm:block">
          <div class="text-slate-400 text-[11px]">Atardecer / Fotos</div>
          <div class="font-bold text-yellow-300">${weatherData.sunset} (${weatherData.idealTime})</div>
        </div>
      </div>
    `;
  }
};
