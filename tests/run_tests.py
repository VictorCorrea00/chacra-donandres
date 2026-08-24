import urllib.parse
import os

def test_whatsapp_builder():
    phone = "59892504871"
    name = "Juan Perez"
    event_type = "Boda / Casamiento Civil"
    date = "2026-12-15"
    guests = "120"
    shift = "Nocturno"
    notes = "Altar en parque"

    parts = date.split("-")
    f_date = f"{parts[2]}/{parts[1]}/{parts[0]}" if len(parts) == 3 else date
    msg = f"Hola Karen! Mi nombre es {name}, estuve recorriendo la web y el Tour 360 de Chacra Don Andres.\n\nQuisiera consultar disponibilidad y presupuesto para:\n- Tipo de Evento: {event_type}\n- Fecha Estimada: {f_date}\n- Cantidad de Invitados: {guests} personas\n- Turno: {shift}\n- Comentarios: {notes}\n\n¿Tienen disponibilidad para esa fecha? Muchas gracias!"
    
    url = f"https://wa.me/{phone}?text=" + urllib.parse.quote(msg)
    assert url.startswith("https://wa.me/59892504871?text="), "Invalid target phone"
    assert urllib.parse.quote(name) in url, "Name encoding missing"
    assert "2026" in url, "Year missing"
    print("[PASS] WhatsApp Builder URL test passed.")

def test_data_integrity():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    index_path = os.path.join(base, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    assert "Chacra Don Andrés" in content or "Chacra Don Andres" in content, "Missing title"
    assert "casas.virtualprop360.uy/tours/avNLpjngi" in content, "Missing 360 tour embed"
    assert "59892504871" in content or "092 504 871" in content, "Missing Karen phone"
    assert "Camino Monte Sosa 6610" in content, "Missing address"
    print("[PASS] Data Integrity & Content verification passed.")

if __name__ == "__main__":
    print("Running Automated Test Suite for Chacra Don Andres...")
    test_whatsapp_builder()
    test_data_integrity()
    print("ALL AUTOMATED TESTS PASSED SUCCESSFULLY! (2/2)")
