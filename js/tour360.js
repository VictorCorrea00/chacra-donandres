/**
 * Controlador del Tour Virtual 360 - Chacra Don Andres
 */
const TourController = {
  iframeElement: null,
  currentSceneId: "k2sntmWaUa7",

  init() {
    this.iframeElement = document.getElementById("tourIframe");
    if (!this.iframeElement) return;
    this.renderSceneButtons();
  },

  renderSceneButtons() {
    const container = document.getElementById("sceneList");
    if (!container) return;

    container.innerHTML = ChacraData.tourScenes.map((scene, index) => {
      const num = String(index + 1).padStart(2, '0');
      const isActive = scene.id === this.currentSceneId;
      return `
        <button 
          onclick="TourController.switchScene('${scene.id}')"
          class="group flex items-center gap-6 w-full text-left py-4 border-b border-[#C9A96E]/10 transition-all duration-500 relative overflow-hidden"
          title="${scene.desc}">
          
          <span class="text-[9px] font-bold ${isActive ? 'text-[#C9A96E]' : 'text-[#1C201E]/30'} transition-colors w-6">${num}</span>
          <span class="font-serif text-lg ${isActive ? 'text-[#1C201E]' : 'text-[#1C201E]/50'} group-hover:text-[#1C201E] transition-colors relative z-10">${scene.name}</span>
          
          ${isActive ? '<div class="ml-auto w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse"></div>' : ''}
          
          <div class="absolute inset-0 bg-gradient-to-r from-[#C9A96E]/5 to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-0"></div>
        </button>
      `;
    }).join("");
  },

  switchScene(sceneId) {
    this.currentSceneId = sceneId;
    if (this.iframeElement) {
      this.iframeElement.src = `${ChacraData.business.tourEmbedBase}?sceneId=${sceneId}`;
    }
    this.renderSceneButtons();
  }
};
