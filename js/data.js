/**
 * Repositorio de Datos - Chacra Don Andres
 */
const ChacraData = {
  business: {
    name: "Chacra Don Andres",
    tagline: "Eventos & Naturaleza",
    phoneDisplay: "092 504 871",
    phoneInt: "+59892504871",
    contactPerson: "Karen",
    address: "Cno. Monte Sosa 6610, Las Piedras / Montevideo Rural",
    driveTime: "25 minutos desde el Centro de Montevideo",
    email: "Contacto@chacradonandres.com.uy",
    instagram: "https://www.instagram.com/chacradonandres",
    maxCapacity: 250,
    tourEmbedBase: "https://casas.virtualprop360.uy/tours/avNLpjngi"
  },
  
  tourScenes: [
    { id: "k2sntmWaUa7", name: "Entrada & Porton", icon: "fa-door-open", desc: "Acceso arbolado y recepcion" },
    { id: "-XLQKyTz1p1", name: "Salon Principal", icon: "fa-champagne-glasses", desc: "Climatizado para hasta 250 personas" },
    { id: "O01mA6V_HnT", name: "Pista de Baile", icon: "fa-music", desc: "Robotica de luces y cabina DJ" },
    { id: "qQsIL49PpG8", name: "Salon El Horno", icon: "fa-fire-burner", desc: "Parrillero criollo tradicional techado" },
    { id: "9v4WiS7A0K9", name: "Granero & Parque", icon: "fa-tree", desc: "Locacion de fotos y ceremonias al aire libre" },
    { id: "9WMkC7dKInv", name: "Cancha & Barbacoa", icon: "fa-volleyball", desc: "Area deportiva y juegos infantiles" },
    { id: "gF6OUdeYxI2", name: "Estacionamiento", icon: "fa-car", desc: "Vigilado para mas de 80 vehiculos" }
  ],

  spaces: [
    {
      title: "Salon Principal Climatizado",
      capacity: "Hasta 250 personas",
      description: "Salon vidriado de alta categoria con climatizacion frio/calor, iluminacion ambiental calida, mesas vestidas y pista de baile integrada.",
      image: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-EAety5uSDAc-scene.jpg",
      sceneId: "-XLQKyTz1p1",
      features: ["Climatizacion integral", "Pista de baile integrada", "Capacidad hasta 250 personas", "Suite nupcial privada"]
    },
    {
      title: "Salon El Horno & Parrillero Criollo",
      capacity: "Hasta 90 personas",
      description: "Espacio de estilo rustico uruguayo con horno a leña tradicional y parrillero criollo. Ideal para asados de mediodia y eventos corporativos.",
      image: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-H-qxZamYcv1-scene.jpg",
      sceneId: "qQsIL49PpG8",
      features: ["Parrillero criollo gigante", "Horno de barro a leña", "Barra rustica de tragos", "Galeria techada al parque"]
    },
    {
      title: "El Granero & Parque Fotografico",
      capacity: "Exterior amplio",
      description: "Escenario iconico con fachada de granero rustico, arboles autoctonos y senderos iluminados. Perfecto para ceremonias civiles y sesiones de fotos.",
      image: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-FrNbIHWhMTJ-scene.jpg",
      sceneId: "9v4WiS7A0K9",
      features: ["Altar natural para ceremonias", "Guirnaldas de luces vintage", "Deck de madera para fotos", "Entorno campestre 100% natural"]
    },
    {
      title: "Pista de Baile con Robotica",
      capacity: "Integrada al salon",
      description: "Equipada con tecnologia de discoteca profesional: cabezales moviles roboticos, maquina de humo bajo, lasers sincronizados y DJ.",
      image: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-LU2gQ_j4btj-scene.jpg",
      sceneId: "O01mA6V_HnT",
      features: ["Cabezales roboticos DMX", "Sonido array alta fidelidad", "Efectos de humo y lasers", "DJ residente experimentado"]
    }
  ],

  testimonials: [
    {
      name: "Martina & Federico",
      event: "Boda de Noche",
      date: "Noviembre 2025",
      rating: 5,
      avatar: "M",
      comment: "Hicimos nuestro casamiento en Chacra Don Andres y fue una experiencia inolvidable. Karen nos acompaño en cada detalle, la comida fue alabada por todos los invitados y el salon iluminado de noche parecia un cuento. ¡100% recomendados!"
    },
    {
      name: "Claudia Rodriguez",
      event: "Fiesta de 15 Años de Sofia",
      date: "Agosto 2025",
      rating: 5,
      avatar: "C",
      comment: "Los 15 de mi hija fueron soñados. La pista con las luces roboticas y la cabina de fotos en el parque fueron la sensacion. Destaco la seguridad y el estacionamiento cerrado que nos dio tranquilidad toda la noche."
    },
    {
      name: "Ing. Gonzalo Cabrera",
      event: "Jornada Empresarial & Asado de Fin de Año",
      date: "Diciembre 2025",
      rating: 5,
      avatar: "G",
      comment: "Realizamos la jornada de integracion corporativa en el Salon El Horno. El asado criollo estuvo exquisito, la atencion de los mozos impecable y el entorno verde nos permitio desconectar de la rutina de oficina."
    }
  ],

  faqs: [
    {
      q: "A que distancia se encuentra la chacra de Montevideo?",
      a: "Chacra Don Andres se ubica en Camino Monte Sosa 6610 (Las Piedras / Montevideo Rural), a solo 25 minutos del centro de Montevideo con acceso directo por camino totalmente asfaltado e iluminado."
    },
    {
      q: "Cuentan con generador electrico en caso de tormentas o cortes de luz?",
      a: "Si, disponemos de grupo electrogeno propio de alta potencia que cubre el 100% de la demanda energetica de los salones, cocinas, luces roboticas y equipos de audio, garantizando que tu fiesta continue sin interrupciones."
    },
    {
      q: "Como es el servicio de gastronomia y catering?",
      a: "Ofrecemos catering integral propio con menues de gala de varios pasos, pizzas al horno de leña y asados criollos tradicionales. Ademas contemplamos menues adaptados para comensales celiacos, vegetarianos, veganos e hipertensos."
    },
    {
      q: "Puedo coordinar una visita presencial para conocer las instalaciones?",
      a: "Por supuesto. Recomendamos primero recorrer el Tour Virtual 360 en esta web y luego coordinar una visita presencial con Karen por WhatsApp para recorrer juntos el parque, salones y suite nupcial."
    }
  ]
};
