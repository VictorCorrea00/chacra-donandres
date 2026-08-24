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
    const container = document.getElementById("sceneButtonsContainer");
    if (!container) return;

    container.innerHTML = ChacraData.tourScenes.map(scene => `
      <button 
        onclick="TourController.switchScene('${scene.id}', this)"
        class="scene-btn ${scene.id === this.currentSceneId ? 'active' : ''} px-3 py-2 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-yellow-400 hover:border-yellow-500/40 transition flex items-center gap-1.5"
        title="${scene.desc}">
        <i class="fa-solid ${scene.icon} text-yellow-500 text-[11px]"></i>
        <span>${scene.name}</span>
      </button>
    `).join("");
  },

  switchScene(sceneId, btnElement = null) {
    this.currentSceneId = sceneId;
    if (this.iframeElement) {
      this.iframeElement.src = `${ChacraData.business.tourEmbedBase}?sceneId=${sceneId}`;
    }

    document.querySelectorAll(".scene-btn").forEach(btn => btn.classList.remove("active"));
    if (btnElement) {
      btnElement.classList.add("active");
    } else {
      document.querySelectorAll(".scene-btn").forEach(btn => {
        if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(sceneId)) {
          btn.classList.add("active");
        }
      });
    }
  }
};
