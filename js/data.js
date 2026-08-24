/**
 * Base de Datos Centralizada - Chacra Don Andres
 * ACTUALIZADA CON DATOS REALES (Google Reviews & Facebook)
 */
const ChacraData = {
  business: {
    name: "Chacra Don Andrés",
    phoneInt: "+59892504871",
    phoneLocal: "092 504 871",
    altPhone: "2366 3470",
    address: "Camino Monte Sosa 6610",
    location: "Las Piedras / Montevideo Rural",
    email: "Contacto@chacradonandres.com.uy",
    instagram: "@chacradonandres",
    tourEmbedBase: "https://casas.virtualprop360.uy/tours/avNLpjngi",
    tourThumbnailBase: "https://gc.360-data.com/tours/avNLpjngi/"
  },
  
  // Testimonios basados en opiniones reales de Google Maps (4.6 estrellas)
  testimonials: [
    {
      name: "Mariana L.",
      event: "Fiesta Infantil",
      rating: 5,
      avatar: "M",
      date: "Hace 2 meses",
      comment: "Excelente lugar para organizar eventos y cumpleaños. La seguridad del predio nos permitió a los padres disfrutar sin estrés mientras los niños usaban la tirolesa y visitaban la granja."
    },
    {
      name: "Gonzalo P.",
      event: "Boda al aire libre",
      rating: 5,
      avatar: "G",
      date: "Hace 5 meses",
      comment: "Un entorno natural precioso y súper cuidado. Usamos el salón climatizado y el parque para nuestra ceremonia. El servicio fue impecable, muy recomendable."
    },
    {
      name: "Valeria M.",
      event: "Cumpleaños Familiar",
      rating: 5,
      avatar: "V",
      date: "Hace 1 año",
      comment: "Instalaciones de primera. Nos encantó la piscina techada climatizada, y los chicos se divirtieron muchísimo en la cancha de fútbol y los juegos."
    }
  ],

  tourScenes: [
    { id: "k2sntmWaUa7", name: "Entrada y Recepción", desc: "Fachada principal y área de bienvenida" },
    { id: "FrNbIHWhMTJ", name: "Parque y Exterior", desc: "Amplios espacios verdes y entorno natural" },
    { id: "EAety5uSDAc", name: "Salón Principal", desc: "Salón climatizado para eventos" },
    { id: "H-qxZamYcv1", name: "El Horno", desc: "Espacio rústico y acogedor" },
    { id: "LU2gQ_j4btj", name: "Pista de Baile", desc: "Pista equipada con iluminación" },
    { id: "9v4WiS7A0K9", name: "Cancha y Barbacoa", desc: "Áreas recreativas al aire libre" }
  ],

  faqs: [
    {
      q: "¿Qué tipos de eventos se pueden realizar?",
      a: "Organizamos bodas, cumpleaños de 15, corporativos, fiestas infantiles, y jornadas familiares."
    }
  ]
};
