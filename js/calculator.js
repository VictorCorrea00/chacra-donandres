/**
 * Cotizador & Generador de Consultas WhatsApp
 */
const QuoteCalculator = {
  sanitizeInput(str) {
    if (!str) return "";
    return String(str).replace(/[<>]/g, "").trim();
  },

  formatDateUy(dateStr) {
    if (!dateStr) return "A coordinar";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  },

  buildWhatsAppUrl(params) {
    const { name, eventType, date, guests, shift, notes } = params;
    const cleanName = this.sanitizeInput(name);
    const cleanType = this.sanitizeInput(eventType);
    const cleanDate = this.formatDateUy(date);
    const cleanGuests = parseInt(guests, 10) || 100;
    const cleanShift = this.sanitizeInput(shift || "Nocturno");
    const cleanNotes = this.sanitizeInput(notes || "Sin comentarios adicionales");

    const message = `Hola Karen! Mi nombre es ${cleanName}, estuve recorriendo la web y el Tour 360 de Chacra Don Andres.

Quisiera consultar disponibilidad y presupuesto para:
- Tipo de Evento: ${cleanType}
- Fecha Estimada: ${cleanDate}
- Cantidad de Invitados: ${cleanGuests} personas
- Turno: ${cleanShift}
- Comentarios: ${cleanNotes}

¿Tienen disponibilidad para esa fecha? Muchas gracias!`;

    const phone = ChacraData.business.phoneInt.replace("+", "");
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },

  handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("calcName") ? document.getElementById("calcName").value : "";
    const eventType = document.getElementById("calcType") ? document.getElementById("calcType").value : "";
    const date = document.getElementById("calcDate") ? document.getElementById("calcDate").value : "";
    const guests = document.getElementById("calcGuests") ? document.getElementById("calcGuests").value : "";
    const notes = document.getElementById("calcDetails") ? document.getElementById("calcDetails").value : "";

    const waUrl = this.buildWhatsAppUrl({ name, eventType, date, guests, shift: "A coordinar", notes });
    
    // UX Pro Max: Form Submit Feedback
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Procesando...';
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-70');
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Propuesta Enviada';
        submitBtn.classList.add('bg-brand-green', 'text-brand-bg', 'border-brand-green');
        window.open(waUrl, "_blank", "noopener,noreferrer");
        
        // Reset after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-70', 'bg-brand-green', 'text-brand-bg', 'border-brand-green');
          e.target.reset();
        }, 3000);
      }, 800);
    } else {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  }
};
