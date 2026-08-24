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

    container.innerHTML = ChacraData.tourScenes.map(scene => `
      <button 
        onclick="TourController.switchScene('${scene.id}', this)"
        class="scene-btn ${scene.id === this.currentSceneId ? 'text-brand-text border-brand-text bg-brand-secondary' : 'text-brand-text/50 border-brand-border hover:text-brand-text hover:border-brand-text'} px-4 py-3 text-[10px] uppercase tracking-[0.15em] border transition-all flex flex-col md:flex-row items-center gap-2 min-w-max text-left"
        title="${scene.desc}">
        
        <span>${scene.name}</span>
      </button>
    `).join("");
  },

  switchScene(sceneId, btnElement = null) {
    this.currentSceneId = sceneId;
    if (this.iframeElement) {
      this.iframeElement.src = `${ChacraData.business.tourEmbedBase}?sceneId=${sceneId}`;
    }

    // Re-render buttons to update Tailwind classes correctly based on currentSceneId
    this.renderSceneButtons();
  }
};
