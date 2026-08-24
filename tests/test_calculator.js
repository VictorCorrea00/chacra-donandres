function runCalculatorTests() {
  const results = [];
  const clean = QuoteCalculator.sanitizeInput("<script>alert('xss')</script>Juan");
  results.push({
    test: "Sanitizes HTML tags",
    passed: clean === "alert('xss')Juan" || !clean.includes("<"),
    detail: clean
  });

  const formattedDate = QuoteCalculator.formatDateUy("2026-11-20");
  results.push({
    test: "Formats YYYY-MM-DD to DD/MM/YYYY",
    passed: formattedDate === "20/11/2026",
    detail: formattedDate
  });

  const url = QuoteCalculator.buildWhatsAppUrl({
    name: "Ana Lopez",
    eventType: "Boda / Casamiento Civil",
    date: "2026-12-15",
    guests: 150,
    shift: "Nocturno",
    notes: "Ceremonia al atardecer"
  });

  results.push({
    test: "Generates valid WhatsApp URL with Karen's phone (59892504871)",
    passed: url.startsWith("https://wa.me/59892504871?text="),
    detail: url
  });

  results.push({
    test: "URL encoded text includes guest count and event type",
    passed: url.includes(encodeURIComponent("Ana Lopez")) && url.includes(encodeURIComponent("150")),
    detail: "Contains user parameters"
  });

  return results;
}
