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
    const name = document.getElementById("qName").value;
    const eventType = document.getElementById("qEventType").value;
    const date = document.getElementById("qDate").value;
    const guests = document.getElementById("qGuests").value;
    const shift = document.getElementById("qShift") ? document.getElementById("qShift").value : "Nocturno";
    const notes = document.getElementById("qNotes") ? document.getElementById("qNotes").value : "";

    const waUrl = this.buildWhatsAppUrl({ name, eventType, date, guests, shift, notes });
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }
};
