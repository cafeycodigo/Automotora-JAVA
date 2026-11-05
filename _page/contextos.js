const contexts = [
  {
    name: "Vehículo", model: "Vehiculo", listName: "vehiculos", itemVar: "vehiculo", icon: "🚗", domain: "Automotora",
    title: "Un inventario de autos, paso a paso.", badge: "DISPONIBLE",
    key: "Patente", example: "ABCD12", format: /^(?:[A-Z]{4}|[A-Z]{2}\d{2})\d{2}$/,
    rule: "La patente identifica el vehículo en el DAO (formato AAAA12 o AA1234). El código interno tiene 8 dígitos y el año debe ser desde 2015.",
    fields: [
      ["Modelo", "Ferrari F8 Tributo", /^.{2,}$/u, "Escribe al menos dos caracteres."],
      ["Código", "88202601", /^\d{8}$/, "Escribe exactamente ocho dígitos."],
      ["Año", "2023", value => /^\d+$/.test(value) && Number(value) >= 2015 && Number(value) <= 2147483647, "Escribe un año entero desde 2015."],
      ["Color", "Rojo furia"]
    ],
    spec: {
      codeAttr: "codigo", codeLabel: "Código", codeExample: "88202601",
      keyAttr: "patente", keyLabel: "Patente", keyExample: "ABCD12", keyRawExample: " abcd12 ", keyAltExample: "BB1234", keyBadExample: "AB123C", keyFormatDesc: "6 caracteres en formato AAAA12 o AA1234",
      groupAttr: "marca", groupLabel: "Marca", groupExample: "Ferrari", groupAlt: "Tesla",
      nameAttr: "modelo", nameLabel: "Modelo", nameExample: "F8 Tributo", nameAlt: "Model S Plaid", namePartial: "Mod",
      yearAttr: "anio", yearLabel: "Año", yearExample: 2023,
      bool1Attr: "electrico", bool1Label: "Eléctrico", bool1Plural: "Electricos", bool1Default: false,
      bool2Attr: "disponible", bool2Label: "Disponible", bool2Plural: "Disponibles", bool2Default: true,
      typeAttr: "tipo", typeLabel: "Tipo", typeExample: "Superdeportivo",
      colorAttr: "color", colorLabel: "Color", colorExample: "Rojo Furia", colorAlt: "Negro Mate",
      modeAttr: "transmision", modeLabel: "Transmisión", modeExample: "Secuencial F1",
      extraIntAttr: "kilometraje", extraIntLabel: "kilometraje"
    }
  },
  {
    name: "Animal", model: "Animal", listName: "animales", itemVar: "animal", icon: "🐾", domain: "Refugio",
    title: "Un refugio y sus fichas de animales.", badge: "EN ADOPCIÓN",
    key: "ID", example: "1042", format: /^[1-9]\d*$/,
    rule: "El refugio asigna un ID numérico positivo a cada animal. El microchip tiene 8 dígitos y el año de ingreso se registra desde 2015.",
    fields: [
      ["Nombre", "Luna", /^.{2,}$/u, "Escribe al menos dos caracteres."],
      ["Microchip", "98512001", /^\d{8}$/, "Escribe exactamente ocho dígitos."],
      ["Ingreso", "2024", value => /^\d+$/.test(value) && Number(value) >= 2015 && Number(value) <= 2147483647, "Escribe un año entero desde 2015."],
      ["Especie", "Perro"]
    ],
    spec: {
      codeAttr: "microchip", codeLabel: "Microchip", codeExample: "98512001",
      keyAttr: "id", keyLabel: "ID", keyExample: "1042", keyRawExample: " 1042 ", keyAltExample: "2085", keyBadExample: "00A", keyFormatDesc: "entero positivo sin ceros a la izquierda",
      groupAttr: "especie", groupLabel: "Especie", groupExample: "Perro", groupAlt: "Gato",
      nameAttr: "nombre", nameLabel: "Nombre", nameExample: "Luna", nameAlt: "Maxi", namePartial: "Lun",
      yearAttr: "anioIngreso", yearLabel: "Año de ingreso", yearExample: 2024,
      bool1Attr: "vacunado", bool1Label: "Vacunado", bool1Plural: "Vacunados", bool1Default: true,
      bool2Attr: "disponible", bool2Label: "En adopción", bool2Plural: "Disponibles", bool2Default: true,
      typeAttr: "raza", typeLabel: "Raza", typeExample: "Mestiza",
      colorAttr: "color", colorLabel: "Pelaje", colorExample: "Dorado", colorAlt: "Blanco y Negro",
      modeAttr: "tamano", modeLabel: "Tamaño", modeExample: "Mediano",
      extraIntAttr: "pesoKg", extraIntLabel: "peso en kg"
    }
  },
  {
    name: "Persona", model: "Persona", listName: "personas", itemVar: "persona", icon: "👤", domain: "Directorio",
    title: "Un directorio de personas, paso a paso.", badge: "ACTIVA",
    key: "RUN", example: "12345678-5", format: /^\d{7,8}-[\dK]$/,
    rule: "El RUN sin puntos y con guion identifica a cada persona en el DAO. El número de ficha tiene 8 dígitos y el año de registro parte en 2015.",
    fields: [
      ["Nombre", "Camila Soto", /^.{2,}$/u, "Escribe al menos dos caracteres."],
      ["Ficha", "20260101", /^\d{8}$/, "Escribe exactamente ocho dígitos."],
      ["Registro", "2023", value => /^\d+$/.test(value) && Number(value) >= 2015 && Number(value) <= 2147483647, "Escribe un año entero desde 2015."],
      ["Comuna", "Ñuñoa"]
    ],
    spec: {
      codeAttr: "ficha", codeLabel: "Ficha", codeExample: "20260101",
      keyAttr: "run", keyLabel: "RUN", keyExample: "12345678-5", keyRawExample: " 12345678-k ", keyAltExample: "19876543-K", keyBadExample: "123456785", keyFormatDesc: "7 u 8 dígitos, guion y dígito verificador (0-9 o K)",
      groupAttr: "comuna", groupLabel: "Comuna", groupExample: "Ñuñoa", groupAlt: "Providencia",
      nameAttr: "nombre", nameLabel: "Nombre", nameExample: "Camila Soto", nameAlt: "Matías Rojas", namePartial: "Cam",
      yearAttr: "anioRegistro", yearLabel: "Año de registro", yearExample: 2023,
      bool1Attr: "verificada", bool1Label: "Verificada", bool1Plural: "Verificadas", bool1Default: true,
      bool2Attr: "disponible", bool2Label: "Activa", bool2Plural: "Disponibles", bool2Default: true,
      typeAttr: "ocupacion", typeLabel: "Ocupación", typeExample: "Diseñadora",
      colorAttr: "area", colorLabel: "Área", colorExample: "UX/UI", colorAlt: "Arquitectura",
      modeAttr: "jornada", modeLabel: "Modalidad", modeExample: "Híbrida",
      extraIntAttr: "antiguedad", extraIntLabel: "antigüedad"
    }
  },
  {
    name: "Estudiante", model: "Estudiante", listName: "estudiantes", itemVar: "estudiante", icon: "🎓", domain: "Registro académico",
    title: "Un registro académico de estudiantes.", badge: "REGULAR",
    key: "Matrícula", example: "MAT-2026-014", format: /^MAT-\d{4}-\d{3}$/,
    rule: "La institución asigna una matrícula única con formato MAT-AÑO-NNN. El código interno tiene 8 dígitos y el año de cohorte es desde 2015.",
    fields: [
      ["Nombre", "Isabel Vega", /^.{2,}$/u, "Escribe al menos dos caracteres."],
      ["Código", "20260014", /^\d{8}$/, "Escribe exactamente ocho dígitos."],
      ["Cohorte", "2025", value => /^\d+$/.test(value) && Number(value) >= 2015 && Number(value) <= 2147483647, "Escribe un año entero desde 2015."],
      ["Carrera", "Informática"]
    ],
    spec: {
      codeAttr: "codigo", codeLabel: "Código interno", codeExample: "20260014",
      keyAttr: "matricula", keyLabel: "Matrícula", keyExample: "MAT-2026-014", keyRawExample: " mat-2026-014 ", keyAltExample: "MAT-2025-099", keyBadExample: "MAT2026014", keyFormatDesc: "formato MAT-AÑO-NNN (ej. MAT-2026-014)",
      groupAttr: "carrera", groupLabel: "Carrera", groupExample: "Informática", groupAlt: "Ciberseguridad",
      nameAttr: "nombre", nameLabel: "Nombre", nameExample: "Isabel Vega", nameAlt: "Diego Mora", namePartial: "Isa",
      yearAttr: "anioCohorte", yearLabel: "Año cohorte", yearExample: 2025,
      bool1Attr: "becado", bool1Label: "Becado", bool1Plural: "Becados", bool1Default: true,
      bool2Attr: "disponible", bool2Label: "Alumno regular", bool2Plural: "Disponibles", bool2Default: true,
      typeAttr: "nivel", typeLabel: "Nivel", typeExample: "Segundo año",
      colorAttr: "sede", colorLabel: "Sede", colorExample: "Sede Central", colorAlt: "Campus Sur",
      modeAttr: "jornada", modeLabel: "Jornada", modeExample: "Diurna",
      extraIntAttr: "creditos", extraIntLabel: "créditos aprobados"
    }
  },
  {
    name: "Producto", model: "Producto", listName: "productos", itemVar: "producto", icon: "📦", domain: "Bodega",
    title: "Una bodega de productos organizada por SKU.", badge: "EN STOCK",
    key: "Código", example: "SKU-042", format: /^SKU-\d{3}$/,
    rule: "El código SKU-NNN identifica cada producto en la bodega. El código de barras tiene 8 dígitos y el año de lote es desde 2015.",
    fields: [
      ["Nombre", "Teclado mecánico", /^.{2,}$/u, "Escribe al menos dos caracteres."],
      ["EAN", "78000042", /^\d{8}$/, "Escribe exactamente ocho dígitos."],
      ["Lote", "2025", value => /^\d+$/.test(value) && Number(value) >= 2015 && Number(value) <= 2147483647, "Escribe un año entero desde 2015."],
      ["Categoría", "Periféricos"]
    ],
    spec: {
      codeAttr: "ean", codeLabel: "Código EAN", codeExample: "78000042",
      keyAttr: "codigo", keyLabel: "SKU", keyExample: "SKU-042", keyRawExample: " sku-042 ", keyAltExample: "SKU-108", keyBadExample: "SKU42", keyFormatDesc: "prefijo SKU- seguido de 3 dígitos (ej. SKU-042)",
      groupAttr: "categoria", groupLabel: "Categoría", groupExample: "Periféricos", groupAlt: "Monitores",
      nameAttr: "nombre", nameLabel: "Nombre", nameExample: "Teclado mecánico", nameAlt: "Mouse óptico Pro", namePartial: "Tecl",
      yearAttr: "anioLote", yearLabel: "Año de lote", yearExample: 2025,
      bool1Attr: "importado", bool1Label: "Importado", bool1Plural: "Importados", bool1Default: true,
      bool2Attr: "disponible", bool2Label: "En stock", bool2Plural: "Disponibles", bool2Default: true,
      typeAttr: "formato", typeLabel: "Formato", typeExample: "Compacto 75%",
      colorAttr: "ubicacion", colorLabel: "Ubicación", colorExample: "Estante B2", colorAlt: "Pasillo A1",
      modeAttr: "despacho", modeLabel: "Despacho", modeExample: "Express 24h",
      extraIntAttr: "stockUnidades", extraIntLabel: "stock en unidades"
    }
  },
  {
    name: "Dispositivo", model: "Dispositivo", listName: "dispositivos", itemVar: "dispositivo", icon: "💻", domain: "Activos TI",
    title: "Un inventario de activos TI por UUID.", badge: "EN SERVICIO",
    key: "UUID", example: "550e8400-e29b-41d4-a716-446655440000",
    format: /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/,
    rule: "El UUID en cinco bloques hexadecimales identifica el dispositivo. El número de inventario tiene 8 dígitos y el año de compra es desde 2015.",
    fields: [
      ["Nombre", "Sensor de temperatura", /^.{2,}$/u, "Escribe al menos dos caracteres."],
      ["Serie", "99002026", /^\d{8}$/, "Escribe exactamente ocho dígitos."],
      ["Adquisición", "2024", value => /^\d+$/.test(value) && Number(value) >= 2015 && Number(value) <= 2147483647, "Escribe un año entero desde 2015."],
      ["Tipo", "IoT"]
    ],
    spec: {
      codeAttr: "serie", codeLabel: "N° Serie", codeExample: "99002026",
      keyAttr: "uuid", keyLabel: "UUID", keyExample: "550e8400-e29b-41d4-a716-446655440000", keyRawExample: " 550E8400-E29B-41D4-A716-446655440000 ", keyAltExample: "660f9500-f30c-52e5-b827-557766551111", keyBadExample: "uuid-invalido-123", keyFormatDesc: "36 caracteres en 5 bloques hexadecimales (8-4-4-4-12)",
      groupAttr: "fabricante", groupLabel: "Fabricante", groupExample: "Cisco", groupAlt: "Ubiquiti",
      nameAttr: "nombre", nameLabel: "Nombre", nameExample: "Sensor de temperatura", nameAlt: "Gateway Industrial", namePartial: "Sens",
      yearAttr: "anioCompra", yearLabel: "Año de compra", yearExample: 2024,
      bool1Attr: "inalambrico", bool1Label: "Inalámbrico", bool1Plural: "Inalambricos", bool1Default: true,
      bool2Attr: "disponible", bool2Label: "Operativo", bool2Plural: "Disponibles", bool2Default: true,
      typeAttr: "tipo", typeLabel: "Tipo", typeExample: "IoT",
      colorAttr: "ubicacion", colorLabel: "Ubicación", colorExample: "Laboratorio 2", colorAlt: "Rack Principal",
      modeAttr: "conexion", modeLabel: "Conectividad", modeExample: "WiFi 6 / MQTT",
      extraIntAttr: "consumoWatts", extraIntLabel: "consumo en Watts"
    }
  }
];

const byId = id => document.getElementById(id);
const cap = str => str[0].toUpperCase() + str.slice(1);
const form = byId("demo-form");
const inputs = [];
const recordsByContext = new Map(contexts.map(context => [context, new Map()]));
let active = contexts[0];

function sampleValues(context) {
  return [context.example, ...context.fields.map(([, value]) => value)];
}

function fill(values) {
  inputs.forEach((input, index) => { input.value = values[index]; });
}

function renderRecords() {
  const list = byId("demo-records");
  if (!list) return;
  list.replaceChildren();
  const records = recordsByContext.get(active);
  if (!records.size) {
    const empty = list.appendChild(document.createElement("li"));
    empty.className = "rounded-xl border border-dashed border-ink/20 bg-white px-3.5 py-3 text-xs text-ink/60";
    empty.textContent = `Aún no hay objetos ${active.model} en el ArrayList. Pulsa 'Cargar datos de ejemplo' y luego 'Guardar'.`;
    return;
  }
  for (const values of records.values()) {
    const item = list.appendChild(document.createElement("li"));
    item.className = "break-words rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 font-mono text-xs shadow-xs";
    item.textContent = `${active.key}: ${values[0]} · ${values.slice(1).join(" · ")}`;
  }
}

const buttons = contexts.map(context => {
  const button = document.createElement("button");
  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = context.icon;
  button.type = "button";
  button.append(icon, context.name);
  button.addEventListener("click", () => showContext(context, true));
  byId("selector-buttons").append(button);
  return button;
});

function updateDomainPlaceholders(context) {
  const {model, name, key} = context;
  document.querySelectorAll(".domain-model-name").forEach(el => { el.textContent = model; });
  document.querySelectorAll(".domain-model-file").forEach(el => { el.textContent = `${model}.java`; });
  document.querySelectorAll(".domain-dao-name").forEach(el => { el.textContent = `${model}DAO`; });
  document.querySelectorAll(".domain-dao-file").forEach(el => { el.textContent = `${model}DAO.java`; });
  document.querySelectorAll(".domain-vista-name").forEach(el => { el.textContent = `${model}Vista`; });
  document.querySelectorAll(".domain-vista-file").forEach(el => { el.textContent = `${model}Vista.java`; });
  document.querySelectorAll(".domain-title-name").forEach(el => { el.textContent = name; });
  document.querySelectorAll(".domain-key-lower").forEach(el => { el.textContent = key.toLowerCase(); });
  document.querySelectorAll(".domain-table-name").forEach(el => { el.textContent = javaName(model); });
  document.querySelectorAll(".domain-empty-ctor").forEach(el => { el.textContent = `public ${model}()`; });
}

function showContext(context, announce = false) {
  active = context;
  const isVehicle = context === contexts[0];
  try {
    sessionStorage.setItem("guia-contexto", javaName(context.model));
    const url = new URL(window.location.href);
    url.searchParams.set("contexto", javaName(context.model));
    window.history.replaceState({}, "", url);
  } catch {}

  buttons.forEach((button, index) => button.setAttribute("aria-pressed", contexts[index] === context));
  updateDomainPlaceholders(context);

  const modelLesson = document.body.dataset.lesson === "modelo";
  const testLesson = document.body.dataset.lesson === "junit";
  const databaseLesson = document.body.dataset.lesson === "base-datos";
  const seoTitle = databaseLesson
    ? `04 Base de Datos JDBC en Java 17 (${context.model}DAO SQL · MySQL y Supabase) · ${context.domain}`
    : testLesson
      ? `03 Pruebas Unitarias JUnit 5 y JaCoCo (${context.model}Test y ${context.model}DAOTest) · ${context.domain}`
      : modelLesson
        ? `01 Modelo POO en Java 17 (${context.model}.java · Getters, Setters y Validaciones) · ${context.domain}`
        : `02 Patrón DAO en Java 17 (${context.model}DAO · ArrayList, CRUD y 13 Consultas) · ${context.domain}`;
  const seoDescription = databaseLesson
    ? `Conecta ${context.model}DAO con MySQL y PostgreSQL (Supabase) usando JDBC en Java 17: tabla SQL ${javaName(context.model)}, ConexionBD, PreparedStatement, ResultSet y 6 ejercicios.`
    : testLesson
      ? `Aprende a probar ${context.model} y ${context.model}DAO con JUnit Jupiter 5 y cobertura JaCoCo en Java 17: patrón AAA, assertEquals, assertThrows y 6 ejercicios resueltos.`
      : modelLesson
        ? `Diseña la clase ${context.model}.java en Java 17 paso a paso: 10 atributos privados sin final, constructores, getters, setters con validación de ${context.key}, @Override toString() y 6 ejercicios.`
        : `Implementa ${context.model}DAO.java en Java 17 con ArrayList<${context.model}>: operaciones CRUD por ${context.key}, 8 métodos de filtrado y conteo, vistas Swing y 6 ejercicios.`;
  document.title = seoTitle;
  const pageFile = databaseLesson ? "base-datos.html" : testLesson ? "junit.html" : modelLesson ? "index.html" : "proyecto.html";
  const canonicalUrl = isVehicle
    ? `https://curso-java.cafeycodigo.org/${pageFile}`
    : `https://curso-java.cafeycodigo.org/${pageFile}?contexto=${javaName(context.model)}`;
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) canonicalEl.setAttribute("href", canonicalUrl);
  const ogUrlEl = document.querySelector('meta[property="og:url"]');
  if (ogUrlEl) ogUrlEl.setAttribute("content", canonicalUrl);
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", seoDescription);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", seoTitle);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", seoDescription);
  byId("context-brand").textContent = context.domain;
  byId("context-title").textContent = modelLesson ? context.title : `De la ficha a la colección · ${context.name}`;
  byId("context-description").textContent = modelLesson
    ? `Aprende a diseñar la clase ${context.model} en Java: variables, encapsulamiento de atributos privados (sin final), constructores, getters, setters con validación, @Override toString() y ejercicios prácticos.`
    : `Ya tienes la clase ${context.model}. Ahora usa ${context.model}DAO y su clave ${context.key} para guardar, buscar, listar, actualizar, eliminar y ejecutar 13 consultas de negocio.`;

  for (const link of document.querySelectorAll("[data-page]")) {
    const [page, fragment] = link.dataset.page.split("#");
    link.href = `${page}?contexto=${javaName(context.model)}${fragment ? "#" + fragment : ""}`;
  }

  if (databaseLesson) {
    renderDatabaseLesson(context);
    return;
  }

  if (testLesson) {
    renderJUnitLesson(context, isVehicle);
    return;
  }

  if (byId("vehicle-guide")) {
    byId("vehicle-guide").hidden = false;
  }
  byId("demo-rule").textContent = context.rule;
  if (modelLesson) renderModelLesson(context);
  else renderDataLesson(context, isVehicle);
}

// ==========================================
// LECCIÓN 01: RENDERIZADO COMPLETO DEL MODELO
// ==========================================
function renderModelLesson(context) {
  const {model, spec} = context;
  byId("sample-badge").textContent = context.badge;
  byId("sample-key").textContent = `${context.key} · ${context.example}`;
  if (byId("sample-constructor-call")) byId("sample-constructor-call").textContent = `new ${model}(...)`;
  if (byId("jump-model-code")) byId("jump-model-code").textContent = `3. Código ${model}.java`;
  byId("sample-name").textContent = context.fields[0][1];

  const fields = byId("sample-fields");
  fields.replaceChildren();
  for (const [label, value] of [
    [spec.groupLabel, spec.groupExample],
    [spec.typeLabel, spec.typeExample],
    [spec.colorLabel, spec.colorExample],
    [spec.modeLabel, spec.modeExample]
  ]) {
    const card = document.createElement("div");
    const name = document.createElement("p");
    const detail = document.createElement("p");
    card.className = "rounded-2xl bg-white/[0.07] p-4";
    name.className = "font-mono text-[11px] uppercase tracking-wider text-white/60";
    detail.className = "mt-1.5 break-words text-sm font-medium";
    name.textContent = label;
    detail.textContent = value;
    card.append(name, detail);
    fields.append(card);
  }

  if (byId("why-model-text")) {
    byId("why-model-text").textContent =
      `Si quisieras registrar 10 fichas de ${context.name.toLowerCase()} usando variables sueltas (${spec.keyAttr}1, ${spec.nameAttr}1, ${spec.yearAttr}1, ${spec.keyAttr}2...), tendrías decenas de variables desordenadas. La clase ${model} agrupa todos esos datos y sus reglas en un solo molde reutilizable.`;
  }
  if (byId("poo-attr-example")) byId("poo-attr-example").textContent = `private String ${spec.keyAttr};`;
  if (byId("poo-ctor-example")) byId("poo-ctor-example").textContent = `public ${model}(...)`;

  renderIntro(context);

  const rules = byId("model-rules");
  rules.replaceChildren();
  const ruleTexts = [
    `Obligatoriedad y limpieza: ningún texto obligatorio puede ser null ni vacío. Los setters aplican .trim() para limpiar espacios.`,
    `Formato de ${spec.keyLabel} (${spec.keyAttr}): exige ${spec.keyFormatDesc} (ejemplo: ${spec.keyExample}).`,
    `Formato de ${spec.codeLabel} (${spec.codeAttr}): exige exactamente 8 dígitos numéricos (ejemplo: ${spec.codeExample}).`,
    `Regla de ${spec.nameLabel} (${spec.nameAttr}) y ${spec.yearLabel} (${spec.yearAttr}): al menos 2 caracteres y año entero mayor o igual a 2015.`
  ];
  for (const rule of ruleTexts) {
    rules.appendChild(document.createElement("li")).textContent = rule;
  }
  byId("model-question").textContent =
    `Comprueba lo aprendido · ¿Qué ocurre en ${model} si ${context.key} contiene solo espacios en blanco?`;
  byId("model-answer").textContent =
    `Al ejecutar .trim(), el valor queda vacío ("") y no supera la validación de formato en set${cap(spec.keyAttr)}, por lo que lanza IllegalArgumentException antes de poder guardarse en ${model}DAO.`;

  renderModelAttributesTable(context);
  renderModelDeepDive(context);
  renderSetterLabForContext(context);
  renderModelExercises(context);
}

function renderModelAttributesTable(context) {
  const tbody = byId("domain-attributes-tbody");
  if (!tbody) return;
  const {spec} = context;
  const rows = [
    [spec.codeAttr, "String", "null", `get${cap(spec.codeAttr)}() / set${cap(spec.codeAttr)}(String)`, `No nulo, longitud exacta de 8 caracteres y todos dígitos numéricos (Character.isDigit).`],
    [spec.keyAttr, "String", "null", `get${cap(spec.keyAttr)}() / set${cap(spec.keyAttr)}(String)`, `Normaliza con trim() y valida ${spec.keyFormatDesc} (ej. "${spec.keyExample}").`],
    [spec.groupAttr, "String", "null", `get${cap(spec.groupAttr)}() / set${cap(spec.groupAttr)}(String)`, `Limpia espacios en los extremos con trim() (ej. "${spec.groupExample}").`],
    [spec.nameAttr, "String", "null", `get${cap(spec.nameAttr)}() / set${cap(spec.nameAttr)}(String)`, `Limpia con trim() y exige longitud mínima de 2 caracteres (length() >= 2).`],
    [spec.yearAttr, "int", "0", `get${cap(spec.yearAttr)}() / set${cap(spec.yearAttr)}(int)`, `Exige que el año sea mayor o igual a 2015 (if (${spec.yearAttr} < 2015) throw ...).`],
    [spec.bool1Attr, "boolean", "false", `is${cap(spec.bool1Attr)}() / set${cap(spec.bool1Attr)}(boolean)`, `Estado booleano (${spec.bool1Label}: true o false).`],
    [spec.bool2Attr, "boolean", "false", `is${cap(spec.bool2Attr)}() / set${cap(spec.bool2Attr)}(boolean)`, `Estado booleano de disponibilidad (${spec.bool2Label}: true o false).`],
    [`${spec.typeAttr}, ${spec.colorAttr}, ${spec.modeAttr}`, "String", "null", `get${cap(spec.typeAttr)}(), get${cap(spec.colorAttr)}(), get${cap(spec.modeAttr)}()`, `Atributos descriptivos adicionales con sus respectivos getters y setters.`]
  ];
  tbody.innerHTML = rows.map(([attr, type, def, acc, desc]) => `
    <tr>
      <td><code>${attr}</code></td>
      <td><code>${type}</code></td>
      <td><code>${def}</code></td>
      <td><code>${acc}</code></td>
      <td>${desc}</td>
    </tr>
  `).join("");
}

function renderModelDeepDive(context) {
  const {model, spec} = context;
  if (byId("model-deep-intro")) {
    byId("model-deep-intro").textContent =
      `Analicemos la estructura completa de ${model}.java para el dominio ${context.domain}. Observa cómo los atributos se declaran privados (sin final), el constructor delega en los setters y toString() lleva @Override:`;
  }

  const ctorSource = `public class ${model} {
    private String ${spec.codeAttr};
    private String ${spec.keyAttr};
    private String ${spec.groupAttr};
    private String ${spec.nameAttr};
    private int ${spec.yearAttr};
    private boolean ${spec.bool1Attr};
    private boolean ${spec.bool2Attr};
    private String ${spec.typeAttr};
    private String ${spec.colorAttr};
    private String ${spec.modeAttr};

    // 1. Constructor vacío
    public ${model}() {
    }

    // 2. Constructor parametrizado: delega en los setters
    public ${model}(String ${spec.codeAttr}, String ${spec.keyAttr},
            String ${spec.groupAttr}, String ${spec.nameAttr}, int ${spec.yearAttr},
            boolean ${spec.bool1Attr}, boolean ${spec.bool2Attr},
            String ${spec.typeAttr}, String ${spec.colorAttr}, String ${spec.modeAttr}) {
        set${cap(spec.codeAttr)}(${spec.codeAttr});
        set${cap(spec.keyAttr)}(${spec.keyAttr});
        set${cap(spec.groupAttr)}(${spec.groupAttr});
        set${cap(spec.nameAttr)}(${spec.nameAttr});
        set${cap(spec.yearAttr)}(${spec.yearAttr});
        set${cap(spec.bool1Attr)}(${spec.bool1Attr});
        set${cap(spec.bool2Attr)}(${spec.bool2Attr});
        set${cap(spec.typeAttr)}(${spec.typeAttr});
        set${cap(spec.colorAttr)}(${spec.colorAttr});
        set${cap(spec.modeAttr)}(${spec.modeAttr});
    }
}`;
  renderCode("deep-ctor-code", ctorSource);

  const grid = byId("deep-validations-grid");
  if (!grid) return;
  const keyCaseMethod = context.key === "UUID" ? "toLowerCase()" : "toUpperCase()";
  const cards = [
    {
      badge: "Validación 01 · Recorrido de caracteres",
      sig: `set${cap(spec.codeAttr)}(String)`,
      title: `${spec.codeLabel}: exactamente 8 dígitos numéricos`,
      code: `public String get${cap(spec.codeAttr)}() {
    return ${spec.codeAttr};
}

public void set${cap(spec.codeAttr)}(String ${spec.codeAttr}) {
    if (${spec.codeAttr} == null || ${spec.codeAttr}.length() != 8) {
        throw new IllegalArgumentException(
            "El campo ${spec.codeAttr} debe tener exactamente 8 dígitos.");
    }
    for (int i = 0; i < ${spec.codeAttr}.length(); i++) {
        if (!Character.isDigit(${spec.codeAttr}.charAt(i))) {
            throw new IllegalArgumentException(
                "El campo ${spec.codeAttr} solo puede contener números.");
        }
    }
    this.${spec.codeAttr} = ${spec.codeAttr};
}`,
      explanation: `Primero comprueba que ${spec.codeAttr} no sea null y mida 8 caracteres. Luego recorre cada posición con charAt(i) y Character.isDigit(...) antes de asignar this.${spec.codeAttr}.`
    },
    {
      badge: "Validación 02 · Normalización y Clave Única",
      sig: `set${cap(spec.keyAttr)}(String)`,
      title: `${spec.keyLabel}: limpiar y comprobar formato`,
      code: `public String get${cap(spec.keyAttr)}() {
    return ${spec.keyAttr};
}

public void set${cap(spec.keyAttr)}(String ${spec.keyAttr}) {
    if (${spec.keyAttr} == null) {
        throw new IllegalArgumentException("${spec.keyLabel} es obligatorio.");
    }
    ${spec.keyAttr} = ${spec.keyAttr}.trim().${keyCaseMethod};
    if (!${spec.keyAttr}.matches(${JSON.stringify(context.format.source)})) {
        throw new IllegalArgumentException(
            "${spec.keyLabel} debe cumplir el formato (${spec.keyExample}).");
    }
    this.${spec.keyAttr} = ${spec.keyAttr};
}`,
      explanation: `Normaliza el texto recibido con .trim().${keyCaseMethod} y verifica que cumpla el patrón de ${spec.keyLabel} (${spec.keyFormatDesc}). Si no cumple, lanza IllegalArgumentException.`
    },
    {
      badge: "Validación 03 · Longitud mínima de texto",
      sig: `set${cap(spec.nameAttr)}(String)`,
      title: `${spec.nameLabel}: limpiar espacios antes de medir`,
      code: `public String get${cap(spec.nameAttr)}() {
    return ${spec.nameAttr};
}

public void set${cap(spec.nameAttr)}(String ${spec.nameAttr}) {
    if (${spec.nameAttr} == null) {
        throw new IllegalArgumentException("${spec.nameLabel} es obligatorio.");
    }
    ${spec.nameAttr} = ${spec.nameAttr}.trim();
    if (${spec.nameAttr}.length() < 2) {
        throw new IllegalArgumentException(
            "Falta más información en ${spec.nameAttr} (mínimo 2 caracteres).");
    }
    this.${spec.nameAttr} = ${spec.nameAttr};
}`,
      explanation: `Al aplicar .trim() antes de medir length(), evitamos que un valor con espacios como " X " pase por válido.`
    },
    {
      badge: "Validación 04 · Regla numérica y @Override toString()",
      sig: `set${cap(spec.yearAttr)}(int) + toString()`,
      title: `${spec.yearLabel} (>= 2015) y representación textual`,
      code: `public int get${cap(spec.yearAttr)}() {
    return ${spec.yearAttr};
}

public void set${cap(spec.yearAttr)}(int ${spec.yearAttr}) {
    if (${spec.yearAttr} < 2015) {
        throw new IllegalArgumentException(
            "No se permiten registros con ${spec.yearAttr} anterior a 2015.");
    }
    this.${spec.yearAttr} = ${spec.yearAttr};
}

@Override
public String toString() {
    return "${model}{${spec.codeAttr}=" + ${spec.codeAttr}
        + ", ${spec.keyAttr}=" + ${spec.keyAttr}
        + ", ${spec.groupAttr}=" + ${spec.groupAttr}
        + ", ${spec.nameAttr}=" + ${spec.nameAttr}
        + ", ${spec.yearAttr}=" + ${spec.yearAttr} + '}';
}`,
      explanation: `Valida el rango entero en set${cap(spec.yearAttr)} y sobrescribe @Override public String toString() para devolver los datos legibles del objeto ${model}.`
    }
  ];

  grid.innerHTML = cards.map((card, i) => `
    <article class="pro-card">
      <div class="flex items-center justify-between">
        <span class="pro-badge pro-badge-indigo">${card.badge}</span>
        <code class="font-mono text-xs text-ink/60">${card.sig}</code>
      </div>
      <h3 class="mt-3 text-lg font-bold">${card.title}</h3>
      <pre class="mt-3 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-5 text-white"><code id="deep-val-code-${i}"></code></pre>
      <p class="mt-3 text-sm leading-6 text-ink/70">${card.explanation}</p>
    </article>
  `).join("");

  cards.forEach((card, i) => renderCode(`deep-val-code-${i}`, card.code));
}

function renderSetterLabForContext(context) {
  const {model, spec} = context;
  if (!byId("setter-lab-form")) return;
  byId("lab-ctor-title").textContent = `new ${model}(...)`;
  byId("lab-label-codigo").textContent = `1. ${spec.codeAttr} (String, 8 dígitos)`;
  byId("lab-label-patente").textContent = `2. ${spec.keyAttr} (${spec.keyLabel})`;
  byId("lab-label-marca").textContent = `3. ${spec.groupAttr} (${spec.groupLabel})`;
  byId("lab-label-modelo").textContent = `4. ${spec.nameAttr} (String, mín. 2 caract.)`;
  byId("lab-label-anio").textContent = `5. ${spec.yearAttr} (int, >= 2015)`;
  byId("lab-label-color").textContent = `6. ${spec.colorAttr} (${spec.colorLabel})`;
  byId("lab-label-bool1").textContent = `${spec.bool1Attr} (${spec.bool1Label} · boolean)`;
  byId("lab-label-bool2").textContent = `${spec.bool2Attr} (${spec.bool2Label} · boolean)`;

  const presetsBar = byId("lab-presets-bar");
  const contextPresets = {
    valid: {
      label: `✔ Caso válido (${spec.nameExample})`,
      style: "border-ink/15 bg-paper",
      values: { codigo: spec.codeExample, patente: spec.keyRawExample, marca: spec.groupExample, modelo: spec.nameExample, anio: spec.yearExample, color: spec.colorExample, electrico: spec.bool1Default, disponible: spec.bool2Default }
    },
    alt: {
      label: `✔ Clave alternativa (${spec.keyAltExample})`,
      style: "border-ink/15 bg-paper",
      values: { codigo: spec.codeExample, patente: spec.keyAltExample, marca: spec.groupAlt, modelo: spec.nameAlt, anio: spec.yearExample, color: spec.colorAlt, electrico: true, disponible: true }
    },
    badCodigo: {
      label: `✖ ${spec.codeLabel} con letras (${spec.codeExample.slice(0, 7)}A)`,
      style: "border-rose-300 bg-rose-50 text-rose-900",
      values: { codigo: `${spec.codeExample.slice(0, 7)}A`, patente: spec.keyExample, marca: spec.groupExample, modelo: spec.nameExample, anio: spec.yearExample, color: spec.colorExample, electrico: spec.bool1Default, disponible: true }
    },
    badKey: {
      label: `✖ ${spec.keyLabel} inválida (${spec.keyBadExample})`,
      style: "border-rose-300 bg-rose-50 text-rose-900",
      values: { codigo: spec.codeExample, patente: spec.keyBadExample, marca: spec.groupExample, modelo: spec.nameExample, anio: spec.yearExample, color: spec.colorExample, electrico: spec.bool1Default, disponible: true }
    },
    badName: {
      label: `✖ ${spec.nameLabel} de 1 letra (" X ")`,
      style: "border-rose-300 bg-rose-50 text-rose-900",
      values: { codigo: spec.codeExample, patente: spec.keyExample, marca: spec.groupExample, modelo: " X ", anio: spec.yearExample, color: spec.colorExample, electrico: spec.bool1Default, disponible: true }
    },
    badYear: {
      label: `✖ ${spec.yearLabel} anterior a 2015 (2014)`,
      style: "border-rose-300 bg-rose-50 text-rose-900",
      values: { codigo: spec.codeExample, patente: spec.keyExample, marca: spec.groupExample, modelo: spec.nameExample, anio: 2014, color: spec.colorExample, electrico: spec.bool1Default, disponible: true }
    }
  };

  presetsBar.innerHTML = Object.entries(contextPresets).map(([key, item]) =>
    `<button type="button" data-preset="${key}" class="validator-preset rounded-full border ${item.style} px-3.5 py-1.5 text-xs font-semibold hover:bg-soft-accent">${item.label}</button>`
  ).join("");

  function applyPreset(presetValues) {
    byId("lab-codigo").value = presetValues.codigo;
    byId("lab-patente").value = presetValues.patente;
    byId("lab-marca").value = presetValues.marca;
    byId("lab-modelo").value = presetValues.modelo;
    byId("lab-anio").value = presetValues.anio;
    byId("lab-color").value = presetValues.color;
    byId("lab-electrico").checked = presetValues.electrico;
    byId("lab-disponible").checked = presetValues.disponible;
    runSetterLab();
  }

  presetsBar.querySelectorAll(".validator-preset").forEach(btn => {
    btn.addEventListener("click", () => applyPreset(contextPresets[btn.dataset.preset].values));
  });

  applyPreset(contextPresets.valid.values);
}

function renderModelExercises(context) {
  const grid = byId("model-exercises-grid");
  if (!grid) return;
  const {model, spec} = context;
  const keyCaseMethod = context.key === "UUID" ? "toLowerCase()" : "toUpperCase()";
  const exercises = [
    {
      level: "Ejercicio 01 · Básico", badge: "pro-badge-emerald", topic: "Prevención de NullPointerException",
      title: `Validar null antes de .trim() en set${cap(spec.keyAttr)} y set${cap(spec.nameAttr)}`,
      problem: `Si llamas a ${context.itemVar}.set${cap(spec.keyAttr)}(null) y ejecutas .trim() en la primera línea sin comprobar null antes, Java lanza NullPointerException. Escribe el setter verificando primero si el parámetro es null.`,
      hint: `Comprueba siempre if (${spec.keyAttr} == null) en la primera línea antes de invocar .trim().`,
      code: `public void set${cap(spec.keyAttr)}(String ${spec.keyAttr}) {
    if (${spec.keyAttr} == null) {
        throw new IllegalArgumentException("${spec.keyLabel} es obligatorio.");
    }
    ${spec.keyAttr} = ${spec.keyAttr}.trim().${keyCaseMethod};
    if (!${spec.keyAttr}.matches(${JSON.stringify(context.format.source)})) {
        throw new IllegalArgumentException("Formato de ${spec.keyLabel} inválido.");
    }
    this.${spec.keyAttr} = ${spec.keyAttr};
}`
    },
    {
      level: "Ejercicio 02 · Básico", badge: "pro-badge-emerald", topic: "Cadenas vacías en Setters",
      title: `Impedir valores en blanco en set${cap(spec.groupAttr)}(String ${spec.groupAttr})`,
      problem: `Si alguien invoca set${cap(spec.groupAttr)}("   "), después de aplicar .trim() queda "" (cadena vacía). Agrega el getter y setter exigiendo al menos 2 caracteres.`,
      hint: `Después de hacer ${spec.groupAttr} = ${spec.groupAttr}.trim();, verifica if (${spec.groupAttr}.length() < 2).`,
      code: `public String get${cap(spec.groupAttr)}() {
    return ${spec.groupAttr};
}

public void set${cap(spec.groupAttr)}(String ${spec.groupAttr}) {
    if (${spec.groupAttr} == null) {
        throw new IllegalArgumentException("${spec.groupLabel} es obligatorio.");
    }
    ${spec.groupAttr} = ${spec.groupAttr}.trim();
    if (${spec.groupAttr}.length() < 2) {
        throw new IllegalArgumentException("${spec.groupLabel} debe tener al menos 2 caracteres.");
    }
    this.${spec.groupAttr} = ${spec.groupAttr};
}`
    },
    {
      level: "Ejercicio 03 · Intermedio", badge: "pro-badge-indigo", topic: "Rangos numéricos",
      title: `Validar rango completo (2015 a 2027) en set${cap(spec.yearAttr)}(int ${spec.yearAttr})`,
      problem: `Mejora set${cap(spec.yearAttr)} en ${model}.java para que rechace tanto años anteriores a 2015 como años futuros mayores a 2027.`,
      hint: `Usa el operador lógico || (OR): if (${spec.yearAttr} < 2015 || ${spec.yearAttr} > 2027).`,
      code: `public int get${cap(spec.yearAttr)}() {
    return ${spec.yearAttr};
}

public void set${cap(spec.yearAttr)}(int ${spec.yearAttr}) {
    if (${spec.yearAttr} < 2015 || ${spec.yearAttr} > 2027) {
        throw new IllegalArgumentException(
            "El campo ${spec.yearAttr} debe estar entre 2015 y 2027.");
    }
    this.${spec.yearAttr} = ${spec.yearAttr};
}`
    },
    {
      level: "Ejercicio 04 · Intermedio", badge: "pro-badge-indigo", topic: "Extensión del Modelo",
      title: `Agregar el atributo ${spec.extraIntAttr} sin final, con get y set validado`,
      problem: `En ${model}.java se necesita registrar ${spec.extraIntLabel} (private int ${spec.extraIntAttr};). Declara el atributo sin final y programa su getter y setter impidiendo valores negativos (< 0).`,
      hint: `El valor 0 es válido; solo lanza IllegalArgumentException cuando ${spec.extraIntAttr} < 0.`,
      code: `private int ${spec.extraIntAttr};

public int get${cap(spec.extraIntAttr)}() {
    return ${spec.extraIntAttr};
}

public void set${cap(spec.extraIntAttr)}(int ${spec.extraIntAttr}) {
    if (${spec.extraIntAttr} < 0) {
        throw new IllegalArgumentException(
            "El campo ${spec.extraIntAttr} no puede ser negativo.");
    }
    this.${spec.extraIntAttr} = ${spec.extraIntAttr};
}`
    },
    {
      level: "Ejercicio 05 · Avanzado", badge: "pro-badge-amber", topic: "Representación Textual",
      title: `Implementar @Override public String toString() en ${model}.java`,
      problem: `Sobrescribe el método toString() con la anotación @Override para mostrar claramente los atributos principales de ${model}.`,
      hint: `Usa @Override encima de public String toString() y concatena los campos de la instancia.`,
      code: `@Override
public String toString() {
    return "${model}{"
        + "${spec.codeAttr}=" + ${spec.codeAttr}
        + ", ${spec.keyAttr}=" + ${spec.keyAttr}
        + ", ${spec.groupAttr}=" + ${spec.groupAttr}
        + ", ${spec.nameAttr}=" + ${spec.nameAttr}
        + ", ${spec.yearAttr}=" + ${spec.yearAttr}
        + ", ${spec.bool1Attr}=" + ${spec.bool1Attr}
        + ", ${spec.bool2Attr}=" + ${spec.bool2Attr}
        + '}';
}`
    },
    {
      level: "Ejercicio 06 · Avanzado", badge: "pro-badge-amber", topic: "Método de Negocio en el Modelo",
      title: `Crear método descriptivo obtenerResumenEstado() en ${model}.java`,
      problem: `Agrega un método público en ${model} que combine ${spec.nameAttr}, ${spec.keyAttr} y el booleano is${cap(spec.bool2Attr)}() para devolver una etiqueta lista para mostrar en pantalla.`,
      hint: `Usa un if / else o el operador ternario sobre this.${spec.bool2Attr}.`,
      code: `public String obtenerResumenEstado() {
    String estado = this.${spec.bool2Attr} ? "${context.badge}" : "NO DISPONIBLE";
    return this.${spec.nameAttr} + " [" + this.${spec.keyAttr} + "] - " + estado;
}`
    }
  ];

  grid.innerHTML = exercises.map((ex, i) => `
    <article class="exercise-card">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="pro-badge ${ex.badge}">${ex.level}</span>
        <span class="font-mono text-xs text-ink/50">${ex.topic}</span>
      </div>
      <h3 class="text-lg font-bold">${ex.title}</h3>
      <p class="text-sm leading-6 text-ink/75"><strong>Problema:</strong> ${ex.problem}</p>
      <details class="exercise-solution">
        <summary><span>Ver pista y solución en Java (${model}.java)</span><span aria-hidden="true">▾</span></summary>
        <div class="exercise-solution-body space-y-3 text-xs leading-5">
          <p class="text-ink/80"><strong>Pista:</strong> ${ex.hint}</p>
          <pre class="overflow-x-auto rounded-lg bg-ink p-4 font-mono text-white"><code id="model-ex-code-${i}"></code></pre>
        </div>
      </details>
    </article>
  `).join("");

  exercises.forEach((ex, i) => renderCode(`model-ex-code-${i}`, ex.code));
}

// ==========================================
// LECCIÓN 02: RENDERIZADO COMPLETO DEL DAO
// ==========================================
function renderDataLesson(context, isVehicle) {
  byId("demo-title").textContent = `${context.name} · Gestión en memoria por ${context.key} (${context.model}DAO)`;
  const formFields = byId("form-fields");
  formFields.replaceChildren();
  inputs.length = 0;
  for (const [label, example] of [[context.key, context.example], ...context.fields]) {
    const wrapper = document.createElement("label");
    const input = document.createElement("input");
    wrapper.className = "block min-w-0 text-xs font-semibold text-ink/80";
    input.className = "mt-1 block w-full rounded-lg border border-ink/20 px-3 py-2 font-mono text-sm";
    input.placeholder = example;
    input.autocomplete = "off";
    wrapper.append(label, input);
    formFields.append(wrapper);
    inputs.push(input);
  }
  renderProject(context, isVehicle);
  byId("demo-status").textContent = `Listo para probar operaciones CRUD en ${context.model}DAO.`;
  renderRecords();

  renderDAODeepDive(context);
  renderDAOQueriesSection(context);
  renderSwingIntegrationSection(context);
  renderDAOExercises(context);
}

function renderDAODeepDive(context) {
  const {model, listName, itemVar, spec} = context;
  if (byId("dao-list-declaration")) {
    renderCode("dao-list-declaration", `private final ArrayList<${model}> ${listName} = new ArrayList<>();`);
  }
  const crudContainer = byId("dao-crud-cards");
  if (!crudContainer) return;

  const crudCards = [
    {
      badge: "1. CREATE · Guardar sin duplicar",
      sig: `guardar(${model})`,
      code: `public boolean guardar(${model} ${itemVar}) {
    if (${itemVar} == null) {
        return false;
    }
    if (buscar(${itemVar}.get${cap(spec.keyAttr)}()) != null) {
        return false;
    }
    ${listName}.add(${itemVar});
    return true;
}`,
      desc: `Verifica primero que el objeto ${model} no sea null y llama a buscar(${itemVar}.get${cap(spec.keyAttr)}()) para impedir que se registren dos fichas con el mismo ${spec.keyLabel}.`
    },
    {
      badge: "2. READ · Búsqueda secuencial",
      sig: `buscar(String ${spec.keyAttr})`,
      code: `public ${model} buscar(String ${spec.keyAttr}) {
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.keyAttr)}().equals(${spec.keyAttr})) {
            return ${itemVar};
        }
    }
    return null;
}`,
      desc: `Recorre la colección ${listName} con un ciclo for-each comparando get${cap(spec.keyAttr)}() mediante .equals(...). Si no hay coincidencia, retorna null.`
    },
    {
      badge: "3. UPDATE · Actualizar con Getters y Setters",
      sig: `actualizar(${model})`,
      code: `public boolean actualizar(${model} ${itemVar}) {
    ${model} encontrado = buscar(${itemVar}.get${cap(spec.keyAttr)}());
    if (encontrado == null) {
        return false;
    }
    encontrado.set${cap(spec.codeAttr)}(${itemVar}.get${cap(spec.codeAttr)}());
    encontrado.set${cap(spec.groupAttr)}(${itemVar}.get${cap(spec.groupAttr)}());
    encontrado.set${cap(spec.nameAttr)}(${itemVar}.get${cap(spec.nameAttr)}());
    encontrado.set${cap(spec.yearAttr)}(${itemVar}.get${cap(spec.yearAttr)}());
    encontrado.set${cap(spec.bool1Attr)}(${itemVar}.is${cap(spec.bool1Attr)}());
    encontrado.set${cap(spec.bool2Attr)}(${itemVar}.is${cap(spec.bool2Attr)}());
    encontrado.set${cap(spec.typeAttr)}(${itemVar}.get${cap(spec.typeAttr)}());
    encontrado.set${cap(spec.colorAttr)}(${itemVar}.get${cap(spec.colorAttr)}());
    encontrado.set${cap(spec.modeAttr)}(${itemVar}.get${cap(spec.modeAttr)}());
    return true;
}`,
      desc: `Ubica la referencia existente por su clave ${spec.keyAttr} y actualiza el resto de sus atributos invocando los setters validados.`
    },
    {
      badge: "4. DELETE · Eliminación por índice",
      sig: `eliminar(String ${spec.keyAttr})`,
      code: `public boolean eliminar(String ${spec.keyAttr}) {
    int indice = 0;
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.keyAttr)}().equals(${spec.keyAttr})) {
            ${listName}.remove(indice);
            return true;
        }
        indice++;
    }
    return false;
}`,
      desc: `Lleva un contador de posición indice. Al encontrar la clave ${spec.keyAttr}, quita ese elemento de ${listName} con .remove(indice) y retorna true.`
    }
  ];

  crudContainer.innerHTML = crudCards.map((c, i) => `
    <article class="pro-card">
      <div class="flex items-center justify-between">
        <span class="pro-badge pro-badge-indigo">${c.badge}</span>
        <code class="font-mono text-xs text-ink/60">${c.sig}</code>
      </div>
      <pre class="mt-3 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-5 text-white"><code id="dao-crud-code-${i}"></code></pre>
      <p class="mt-3 text-sm leading-6 text-ink/70">${c.desc}</p>
    </article>
  `).join("");

  crudCards.forEach((c, i) => renderCode(`dao-crud-code-${i}`, c.code));
}

function renderDAOQueriesSection(context) {
  const {model, listName, itemVar, spec} = context;
  const queriesContainer = byId("dao-queries-cards");
  if (!queriesContainer) return;

  const patterns = [
    {
      badge: "Patrón A · Filtro de Sublista por Condición",
      title: "Crear una lista auxiliar y filtrar con if",
      usedIn: `listar${spec.bool1Plural}(), listar${spec.bool2Plural}() y listarDesde${cap(spec.yearAttr)}(int)`,
      code: `// 1. Listar donde is${cap(spec.bool1Attr)}() es true
public ArrayList<${model}> listar${spec.bool1Plural}() {
    ArrayList<${model}> resultado = new ArrayList<>();
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.is${cap(spec.bool1Attr)}()) {
            resultado.add(${itemVar});
        }
    }
    return resultado;
}

// 8. Listar desde un ${spec.yearAttr} mínimo en adelante (>=)
public ArrayList<${model}> listarDesde${cap(spec.yearAttr)}(int minimo) {
    ArrayList<${model}> resultado = new ArrayList<>();
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.yearAttr)}() >= minimo) {
            resultado.add(${itemVar});
        }
    }
    return resultado;
}`,
      desc: `Crea un new ArrayList<>() vacío, recorre ${listName} y agrega únicamente los objetos ${model} que cumplen la condición.`
    },
    {
      badge: "Patrón B · Búsqueda Exacta vs. Parcial de Texto",
      title: "equalsIgnoreCase() vs toLowerCase().contains()",
      usedIn: `buscarPor${cap(spec.groupAttr)}, buscarPor${cap(spec.typeAttr)}, buscarPor${cap(spec.colorAttr)} y buscarPor${cap(spec.nameAttr)}Parcial`,
      code: `// 4. Búsqueda exacta por ${spec.groupAttr} ignorando mayúsculas
public ArrayList<${model}> buscarPor${cap(spec.groupAttr)}(String ${spec.groupAttr}) {
    ArrayList<${model}> resultado = new ArrayList<>();
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.groupAttr)}() != null
                && ${itemVar}.get${cap(spec.groupAttr)}().equalsIgnoreCase(${spec.groupAttr})) {
            resultado.add(${itemVar});
        }
    }
    return resultado;
}

// 13. Búsqueda parcial en ${spec.nameAttr} (ej: "${spec.namePartial}")
public ArrayList<${model}> buscarPor${cap(spec.nameAttr)}Parcial(String texto) {
    ArrayList<${model}> resultado = new ArrayList<>();
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.nameAttr)}() != null
                && ${itemVar}.get${cap(spec.nameAttr)}().toLowerCase()
                       .contains(texto.toLowerCase())) {
            resultado.add(${itemVar});
        }
    }
    return resultado;
}`,
      desc: `equalsIgnoreCase("${spec.groupExample.toLowerCase()}") exige coincidencia completa; .toLowerCase().contains(...) permite buscar una parte del texto dentro de ${spec.nameAttr}.`
    },
    {
      badge: "Patrón C · Contadores y Estadísticas",
      title: "Variable acumuladora contador++ y size()",
      usedIn: `cantidadTotal(), contar${spec.bool1Plural}() y contarPorDisponibilidad(boolean)`,
      code: `// 6. Total de fichas registradas en ${model}DAO
public int cantidadTotal() {
    return ${listName}.size();
}

// 10. Contar según disponibilidad (true o false)
public int contarPorDisponibilidad(boolean estado) {
    int contador = 0;
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.is${cap(spec.bool2Attr)}() == estado) {
            contador++;
        }
    }
    return contador;
}`,
      desc: `Declara int contador = 0;, incrementa con contador++ cada vez que se cumple la condición y retorna el total al finalizar el recorrido.`
    },
    {
      badge: "Patrón D · Búsqueda de Extremos (Mínimo y Máximo)",
      title: "Algoritmo del candidato inicial get(0)",
      usedIn: `obtener${model}MasAntiguo() y obtener${model}MasNuevo()`,
      code: `// 11. Obtener el registro con menor ${spec.yearAttr}
public ${model} obtener${model}MasAntiguo() {
    if (${listName}.isEmpty()) {
        return null; // Evita IndexOutOfBoundsException
    }
    ${model} masAntiguo = ${listName}.get(0);
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.yearAttr)}() < masAntiguo.get${cap(spec.yearAttr)}()) {
            masAntiguo = ${itemVar};
        }
    }
    return masAntiguo;
}`,
      desc: `Verifica primero si ${listName}.isEmpty(). Luego toma el primer elemento como candidato y actualiza la referencia si encuentra un ${spec.yearAttr} menor (<) o mayor (>).`
    }
  ];

  queriesContainer.innerHTML = patterns.map((p, i) => `
    <article class="pro-card">
      <span class="pro-badge pro-badge-emerald">${p.badge}</span>
      <h3 class="mt-3 text-lg font-bold">${p.title}</h3>
      <p class="mt-1 text-xs text-ink/60">Métodos: <code>${p.usedIn}</code></p>
      <pre class="mt-3 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-5 text-white"><code id="dao-query-code-${i}"></code></pre>
      <p class="mt-3 text-sm leading-6 text-ink/70">${p.desc}</p>
    </article>
  `).join("");

  patterns.forEach((p, i) => renderCode(`dao-query-code-${i}`, p.code));

  const tbody = byId("dao-methods-tbody");
  if (tbody) {
    tbody.innerHTML = [
      ["CRUD", `guardar(${model}), buscar(String), actualizar(${model}), eliminar(String), listar()`, `boolean / ${model} / ArrayList`, `Unicidad por ${spec.keyAttr}, recorrido for-each, setters y remove(indice).`],
      ["01, 02", `listar${spec.bool1Plural}() y contar${spec.bool1Plural}()`, `ArrayList<${model}> / int`, `Filtro booleano con is${cap(spec.bool1Attr)}() y acumulador contador++.`],
      ["03, 10", `listar${spec.bool2Plural}() y contarPorDisponibilidad(boolean)`, `ArrayList<${model}> / int`, `Filtro con is${cap(spec.bool2Attr)}() y comparación booleana == estado.`],
      ["04, 05, 07, 09", `buscarPor${cap(spec.groupAttr)}, buscarPor${cap(spec.typeAttr)}, buscarPor${cap(spec.modeAttr)}, buscarPor${cap(spec.colorAttr)}`, `ArrayList<${model}>`, `Chequeo != null + equalsIgnoreCase(parametro).`],
      ["06", `cantidadTotal()`, `int`, `Retorna directamente ${listName}.size().`],
      ["08", `listarDesde${cap(spec.yearAttr)}(int minimo)`, `ArrayList<${model}>`, `Comparación relacional get${cap(spec.yearAttr)}() >= minimo.`],
      ["11, 12", `obtener${model}MasAntiguo() y obtener${model}MasNuevo()`, `${model} (o null)`, `Chequeo isEmpty(), pivote en ${listName}.get(0) y comparación < o >.`],
      ["13", `buscarPor${cap(spec.nameAttr)}Parcial(String texto)`, `ArrayList<${model}>`, `Normalización en minúsculas con toLowerCase().contains(...).`]
    ].map(([num, sig, ret, tech]) => `
      <tr>
        <td>${num}</td>
        <td><code>${sig}</code></td>
        <td><code>${ret}</code></td>
        <td>${tech}</td>
      </tr>
    `).join("");
  }
}

function renderSwingIntegrationSection(context) {
  const container = byId("swing-integration-cards");
  if (!container) return;
  const {model, itemVar, spec} = context;
  const codeLeft = `// 1. JTextField -> String
String ${spec.codeAttr} = txt${cap(spec.codeAttr)}.getText();
String ${spec.keyAttr} = txt${cap(spec.keyAttr)}.getText();
String ${spec.groupAttr} = txt${cap(spec.groupAttr)}.getText();
String ${spec.nameAttr} = txt${cap(spec.nameAttr)}.getText();

// 2. JTextField numérico -> int con Integer.parseInt
int ${spec.yearAttr} = Integer.parseInt(txt${cap(spec.yearAttr)}.getText());

// 3. JCheckBox -> boolean con isSelected()
boolean ${spec.bool1Attr} = check${cap(spec.bool1Attr)}.isSelected();
boolean ${spec.bool2Attr} = check${cap(spec.bool2Attr)}.isSelected();

// 4. JComboBox / JRadioButton -> String
String ${spec.typeAttr} = cb${cap(spec.typeAttr)}.getSelectedItem().toString();
String ${spec.colorAttr} = cb${cap(spec.colorAttr)}.getSelectedItem().toString();
String ${spec.modeAttr} = "${spec.modeExample}";`;

  const codeRight = `public class ${model}Vista extends javax.swing.JFrame {
    // Atributo DAO que administra la colección:
    private final ${model}DAO dao = new ${model}DAO();

    private void btnAgregarActionPerformed(java.awt.event.ActionEvent evt) {
        try {
            ${model} ${itemVar} = new ${model}(
                ${spec.codeAttr}, ${spec.keyAttr}, ${spec.groupAttr}, ${spec.nameAttr}, ${spec.yearAttr},
                ${spec.bool1Attr}, ${spec.bool2Attr}, ${spec.typeAttr}, ${spec.colorAttr}, ${spec.modeAttr}
            );
            if (dao.guardar(${itemVar})) {
                JOptionPane.showMessageDialog(this, "${context.name} guardado con éxito");
            } else {
                JOptionPane.showMessageDialog(this, "La clave ${spec.keyLabel} ya existe");
            }
        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(this, ex.getMessage());
        }
    }
}`;

  container.innerHTML = `
    <article class="pro-card">
      <h3 class="text-lg font-bold">1. Lectura de controles Swing en <code>btnAgregarActionPerformed</code></h3>
      <pre class="mt-3 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-5 text-white"><code id="swing-code-left"></code></pre>
      <p class="mt-3 text-sm leading-6 text-ink/70">Cada control del formulario Swing entrega un tipo de dato que se pasa al constructor de <code>${model}</code>.</p>
    </article>
    <article class="pro-card">
      <h3 class="text-lg font-bold">2. Conectar <code>${model}Vista</code> con <code>${model}DAO</code> y capturar excepciones</h3>
      <pre class="mt-3 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-5 text-white"><code id="swing-code-right"></code></pre>
      <p class="mt-3 text-sm leading-6 text-ink/70">Al envolver la creación en un bloque <code>try / catch (IllegalArgumentException ex)</code>, mostramos cualquier fallo de validación en un diálogo amigable.</p>
    </article>
  `;
  renderCode("swing-code-left", codeLeft);
  renderCode("swing-code-right", codeRight);
}

function renderDAOExercises(context) {
  const grid = byId("dao-exercises-grid");
  if (!grid) return;
  const {model, listName, itemVar, spec} = context;
  const keyCaseMethod = context.key === "UUID" ? "toLowerCase()" : "toUpperCase()";

  const exercises = [
    {
      level: "Ejercicio 01 · Básico", badge: "pro-badge-emerald", topic: "Normalización en Búsqueda",
      title: `Normalizar el parámetro en buscar(String ${spec.keyAttr})`,
      problem: `Haz que ${model}DAO.buscar(...) encuentre registros aunque el usuario escriba espacios o minúsculas (ej. "${spec.keyRawExample}"), y que retorne null si recibe null.`,
      hint: `Comprueba if (${spec.keyAttr} == null) return null; y luego aplica .trim().${keyCaseMethod} antes del ciclo for-each.`,
      code: `public ${model} buscar(String ${spec.keyAttr}) {
    if (${spec.keyAttr} == null) {
        return null;
    }
    String clave = ${spec.keyAttr}.trim().${keyCaseMethod};
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.keyAttr)}().equals(clave)) {
            return ${itemVar};
        }
    }
    return null;
}`
    },
    {
      level: "Ejercicio 02 · Básico", badge: "pro-badge-emerald", topic: "Filtro por Rango",
      title: `Implementar listarPorRangoDe${cap(spec.yearAttr)}(int desde, int hasta)`,
      problem: `Crea un método en ${model}DAO que devuelva una lista con todos los objetos ${model} cuyo ${spec.yearAttr} esté entre desde y hasta (ambos inclusive).`,
      hint: `Combina ambas comparaciones con && dentro del if.`,
      code: `public ArrayList<${model}> listarPorRangoDe${cap(spec.yearAttr)}(int desde, int hasta) {
    ArrayList<${model}> resultado = new ArrayList<>();
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.get${cap(spec.yearAttr)}() >= desde
                && ${itemVar}.get${cap(spec.yearAttr)}() <= hasta) {
            resultado.add(${itemVar});
        }
    }
    return resultado;
}`
    },
    {
      level: "Ejercicio 03 · Intermedio", badge: "pro-badge-indigo", topic: "Encapsulamiento de Colecciones",
      title: `Proteger listar() en ${model}DAO con una copia defensiva`,
      problem: `Si listar() hace return ${listName}; directamente, otra clase podría ejecutar dao.listar().clear() y borrar todos los datos. Modifica listar() para devolver una copia segura.`,
      hint: `Retorna new ArrayList<>(${listName}); para entregar una nueva lista con las mismas referencias.`,
      code: `public ArrayList<${model}> listar() {
    return new ArrayList<>(${listName});
}`
    },
    {
      level: "Ejercicio 04 · Intermedio", badge: "pro-badge-indigo", topic: "Filtros Compuestos",
      title: `Crear listar${spec.bool1Plural}Disponibles() en ${model}DAO`,
      problem: `Programa un método que devuelva únicamente las fichas donde is${cap(spec.bool1Attr)}() e is${cap(spec.bool2Attr)}() sean ambos true.`,
      hint: `Usa if (${itemVar}.is${cap(spec.bool1Attr)}() && ${itemVar}.is${cap(spec.bool2Attr)}()).`,
      code: `public ArrayList<${model}> listar${spec.bool1Plural}Disponibles() {
    ArrayList<${model}> resultado = new ArrayList<>();
    for (${model} ${itemVar} : ${listName}) {
        if (${itemVar}.is${cap(spec.bool1Attr)}() && ${itemVar}.is${cap(spec.bool2Attr)}()) {
            resultado.add(${itemVar});
        }
    }
    return resultado;
}`
    },
    {
      level: "Ejercicio 05 · Avanzado", badge: "pro-badge-amber", topic: "Estadísticas y Promedios",
      title: `Calcular el promedio de ${spec.yearAttr} en ${model}DAO`,
      problem: `Implementa public double calcularPromedio${cap(spec.yearAttr)}() que sume ${spec.yearAttr} de todos los registros y devuelva el promedio con decimales (o 0.0 si la lista está vacía).`,
      hint: `Convierte la suma a (double) antes de dividir por ${listName}.size().`,
      code: `public double calcularPromedio${cap(spec.yearAttr)}() {
    if (${listName}.isEmpty()) {
        return 0.0;
    }
    int suma = 0;
    for (${model} ${itemVar} : ${listName}) {
        suma += ${itemVar}.get${cap(spec.yearAttr)}();
    }
    return (double) suma / ${listName}.size();
}`
    },
    {
      level: "Ejercicio 06 · Avanzado", badge: "pro-badge-amber", topic: "Eliminación Múltiple Segura",
      title: `Implementar eliminarNoDisponibles() en ${model}DAO`,
      problem: `Elimina de ${listName} todos los registros cuyo is${cap(spec.bool2Attr)}() sea false sin provocar ConcurrentModificationException y devuelve cuántos fueron eliminados.`,
      hint: `Recorre la lista desde el último índice hacia 0 con un ciclo for regresivo.`,
      code: `public int eliminarNoDisponibles() {
    int eliminados = 0;
    for (int i = ${listName}.size() - 1; i >= 0; i--) {
        if (!${listName}.get(i).is${cap(spec.bool2Attr)}()) {
            ${listName}.remove(i);
            eliminados++;
        }
    }
    return eliminados;
}`
    }
  ];

  grid.innerHTML = exercises.map((ex, i) => `
    <article class="exercise-card">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="pro-badge ${ex.badge}">${ex.level}</span>
        <span class="font-mono text-xs text-ink/50">${ex.topic}</span>
      </div>
      <h3 class="text-lg font-bold">${ex.title}</h3>
      <p class="text-sm leading-6 text-ink/75"><strong>Problema:</strong> ${ex.problem}</p>
      <details class="exercise-solution">
        <summary><span>Ver pista y solución en Java (${model}DAO.java)</span><span aria-hidden="true">▾</span></summary>
        <div class="exercise-solution-body space-y-3 text-xs leading-5">
          <p class="text-ink/80"><strong>Pista:</strong> ${ex.hint}</p>
          <pre class="overflow-x-auto rounded-lg bg-ink p-4 font-mono text-white"><code id="dao-ex-code-${i}"></code></pre>
        </div>
      </details>
    </article>
  `).join("");

  exercises.forEach((ex, i) => renderCode(`dao-ex-code-${i}`, ex.code));
}

// ==========================================
// PESTAÑAS INTERACTIVAS DE PRIMEROS PASOS
// ==========================================
const modelTabs = Array.from(document.querySelectorAll("#model-tabs [role=tab]"));
let modelTab = 0;
let modelSource;
let simulation;

function showModelTab(index) {
  if (!modelTabs.length) return;
  modelTab = index;
  const isOutput = index === 2;
  modelTabs.forEach((tab, position) => {
    tab.setAttribute("aria-selected", position === index);
    tab.tabIndex = position === index ? 0 : -1;
  });
  byId("model-panel").setAttribute("aria-labelledby", modelTabs[index].id);
  byId("model-source").hidden = isOutput;
  byId("model-console").hidden = !isOutput;
  byId("copy-model-code").hidden = isOutput;
  byId("model-copy-status").textContent = "";
  if (!isOutput) renderCode("model-code", modelSource[index]);
}

modelTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showModelTab(index));
  tab.addEventListener("keydown", event => {
    const destinations = {
      ArrowLeft: (index + modelTabs.length - 1) % modelTabs.length,
      ArrowRight: (index + 1) % modelTabs.length,
      Home: 0,
      End: modelTabs.length - 1
    };
    const next = destinations[event.key];
    if (next === undefined) return;
    event.preventDefault();
    showModelTab(next);
    modelTabs[next].focus();
  });
});

byId("run-model-code")?.addEventListener("click", () => {
  const {model, key, field, keyCap, fieldCap, identifier, example} = simulation;
  const trace = byId("model-trace");
  trace.replaceChildren();
  for (const step of [
    `1. main declara las variables locales ${key} = "${identifier}" y ${field} = "${example}".`,
    `2. new ${model}(${key}, ${field}) invoca al constructor y asigna this.${key} y this.${field} (puedes usar get${keyCap}/set${keyCap} y get${fieldCap}/set${fieldCap}).`,
    `3. System.out.println(registro.toString()) ejecuta el método sobrescrito con @Override y muestra los datos.`
  ]) {
    trace.appendChild(document.createElement("li")).textContent = step;
  }
  byId("model-output").textContent = `${model}{${key}=${identifier}, ${field}=${example}}`;
  showModelTab(2);
  modelTabs[2].focus();
});

function renderIntro(context) {
  const {spec} = context;
  const key = spec.keyAttr;
  const field = spec.nameAttr;
  const keyCap = cap(key);
  const fieldCap = cap(field);
  byId("intro-variable").textContent =
    `En String ${key} = "${spec.keyExample}";, String es el tipo de dato, ${key} es el identificador de la variable y "${spec.keyExample}" es el valor literal almacenado.`;
  byId("intro-attributes").textContent =
    `La clase ${context.model} encapsula ${key} y ${field} como atributos privados (sin final para permitir modificarlos con setters), junto con sus métodos get, set y @Override toString().`;
  byId("intro-object").textContent =
    `new ${context.model}(...) crea el objeto en memoria. Puedes leer o cambiar sus datos con get${keyCap}() / set${keyCap}(...) y mostrar la ficha completa con toString().`;
  const declaration = `public class ${context.model} {
    private String ${key};
    private String ${field};

    public ${context.model}() {
    }

    public ${context.model}(String ${key}, String ${field}) {
        this.${key} = ${key};
        this.${field} = ${field};
    }

    public String get${keyCap}() {
        return ${key};
    }

    public void set${keyCap}(String ${key}) {
        this.${key} = ${key};
    }

    public String get${fieldCap}() {
        return ${field};
    }

    public void set${fieldCap}(String ${field}) {
        this.${field} = ${field};
    }

    @Override
    public String toString() {
        return "${context.model}{" + "${key}=" + ${key} + ", ${field}=" + ${field} + '}';
    }`;
  const main = `public static void main(String[] args) {
    String ${key} = "${spec.keyExample}";
    String ${field} = "${spec.nameExample}";
    ${context.model} registro = new ${context.model}(${key}, ${field});
    System.out.println(registro.toString());
}`;
  modelSource = [`${declaration}\n}`, main];
  simulation = {model: context.model, key, field, keyCap, fieldCap, identifier: spec.keyExample, example: spec.nameExample};
  byId("model-trace").replaceChildren();
  byId("model-output").textContent = "Pulsa Ejecutar simulación para ver la salida de main.";
  showModelTab(modelTab === 2 ? 1 : modelTab);
}

function renderCode(codeId, source) {
  const code = typeof codeId === "string" ? byId(codeId) : codeId;
  if (!code) return;
  const tokens = /(?<comment>\/\/[^\n]*)|(?<string>"[^"\n]*")|(?<keyword>\b(?:class|private|final|public|static|void|this|new|import|package|return|if|else|for|while|try|catch|throws|throw|boolean|int|double|char|null|true|false)\b)|(?<type>\b[A-Z][A-Za-z0-9_]*\b)/g;
  code.replaceChildren();
  let offset = 0;
  for (const match of source.matchAll(tokens)) {
    const token = document.createElement("span");
    const kind = Object.keys(match.groups).find(group => match.groups[group] !== undefined);
    token.className = `java-${kind}`;
    token.textContent = match[0];
    code.append(source.slice(offset, match.index), token);
    offset = match.index + match[0].length;
  }
  code.append(source.slice(offset));
}

function copyWithSelection(source) {
  const field = document.createElement("textarea");
  field.value = source;
  field.readOnly = true;
  field.style.cssText = "position: fixed; opacity: 0; top: 0; left: 0";
  const focused = document.activeElement;
  document.body.append(field);
  try {
    field.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
    focused?.focus();
  }
}

function setupCopy(buttonId, codeId, statusId) {
  byId(buttonId)?.addEventListener("click", async () => {
    const code = byId(codeId);
    if (!code) return;
    const source = code.textContent;
    let copied = false;
    try {
      await navigator.clipboard.writeText(source);
      copied = true;
    } catch {
      copied = copyWithSelection(source);
    }
    if (code.textContent === source && byId(statusId)) {
      byId(statusId).textContent = copied
        ? "✔ Código copiado al portapapeles."
        : "Selecciona el código y cópialo con Ctrl+C.";
    }
  });
}

setupCopy("copy-project-code", "project-code", "project-copy-status");
setupCopy("copy-model-code", "model-code", "model-copy-status");

byId("load-sample")?.addEventListener("click", () => {
  fill(sampleValues(active));
  byId("demo-status").textContent = "✔ Ejemplo cargado en el formulario. Pulsa 'CREATE · Guardar' para añadirlo a la lista.";
});

form?.addEventListener("submit", event => {
  event.preventDefault();
  const status = byId("demo-status");
  const action = event.submitter?.value ?? "guardar";
  const values = inputs.map(input => input.value.trim());
  const key = active.key === "UUID" ? values[0].toLowerCase() : values[0].toUpperCase();
  if (!active.format.test(key)) {
    status.textContent = `✖ Error de formato: ingresa ${active.key} siguiendo el ejemplo (${active.example}).`;
    inputs[0].focus();
    return;
  }
  values[0] = key;
  const records = recordsByContext.get(active);
  if (records.has(key) === (action === "guardar")) {
    status.textContent = action === "guardar"
      ? `✖ ${active.model}DAO.guardar() → false: ya existe un registro con ${active.key} ${key}.`
      : `✖ ${active.model}DAO.${action}() → no se encontró ningún registro con ${active.key} ${key}.`;
    return;
  }

  if (action === "buscar") {
    fill(records.get(key));
    status.textContent = `✔ ${active.model}DAO.buscar("${key}") → Objeto encontrado y cargado en el formulario.`;
    return;
  }
  if (action === "eliminar") {
    records.delete(key);
    status.textContent = `✔ ${active.model}DAO.eliminar("${key}") → true (registro eliminado del ArrayList).`;
  } else {
    const invalid = active.fields.findIndex(([, , format], index) =>
      !values[index + 1] || (format instanceof RegExp && !format.test(values[index + 1]))
      || (typeof format === "function" && !format(values[index + 1])));
    if (invalid !== -1) {
      const [label, , , message] = active.fields[invalid];
      status.textContent = `✖ Validación de ${active.model} (${label}): ${values[invalid + 1] && message ? message : "Completa este campo obligatorio."}`;
      inputs[invalid + 1].focus();
      return;
    }
    records.set(key, values);
    status.textContent = action === "guardar"
      ? `✔ ${active.model}DAO.guardar() → true (${active.model} agregado al ArrayList).`
      : `✔ ${active.model}DAO.actualizar() → true (atributos de ${key} actualizados).`;
  }
  renderRecords();
});

// Simulador Interactivo de Setters adaptado al Dominio activo (Lección 01)
const setterLabForm = byId("setter-lab-form");
function runSetterLab() {
  if (!setterLabForm) return;
  const {model, spec} = active;
  const codigo = byId("lab-codigo").value;
  const rawKey = byId("lab-patente").value;
  const rawGroup = byId("lab-marca").value;
  const rawName = byId("lab-modelo").value;
  const anio = Number(byId("lab-anio").value);
  const color = byId("lab-color").value || spec.colorExample;
  const bool1 = byId("lab-electrico").checked;
  const bool2 = byId("lab-disponible").checked;

  const steps = byId("lab-steps");
  const badge = byId("lab-result-badge");
  const consoleOut = byId("lab-console");
  steps.replaceChildren();

  function addStep(text, ok = true) {
    const li = document.createElement("li");
    li.className = ok ? "text-white/90" : "font-bold text-rose-300";
    li.textContent = `${ok ? "✔" : "✖"} ${text}`;
    steps.appendChild(li);
  }

  try {
    // 1. setCode
    if (!codigo || codigo.length !== 8) {
      addStep(`set${cap(spec.codeAttr)}("${codigo}") → longitud ${codigo.length} != 8`, false);
      throw new Error(`IllegalArgumentException: "El campo ${spec.codeAttr} debe tener exactamente 8 dígitos."`);
    }
    if (!/^\d{8}$/.test(codigo)) {
      addStep(`set${cap(spec.codeAttr)}("${codigo}") → contiene caracteres no numéricos`, false);
      throw new Error(`IllegalArgumentException: "El campo ${spec.codeAttr} solo puede contener números."`);
    }
    addStep(`set${cap(spec.codeAttr)}("${codigo}") → OK (8 dígitos numéricos)`);

    // 2. setKey
    const normalizedKey = active.key === "UUID" ? rawKey.trim().toLowerCase() : rawKey.trim().toUpperCase();
    if (!active.format.test(normalizedKey)) {
      addStep(`set${cap(spec.keyAttr)}("${rawKey}") → "${normalizedKey}" no cumple ${spec.keyFormatDesc}`, false);
      throw new Error(`IllegalArgumentException: "${spec.keyLabel} debe tener formato válido (${spec.keyExample})."`);
    }
    addStep(`set${cap(spec.keyAttr)}("${rawKey}") → normalizado a "${normalizedKey}"`);

    // 3. setGroup
    const groupVal = rawGroup.trim();
    addStep(`set${cap(spec.groupAttr)}("${rawGroup}") → this.${spec.groupAttr} = "${groupVal}"`);

    // 4. setName
    const nameVal = rawName.trim();
    if (nameVal.length < 2) {
      addStep(`set${cap(spec.nameAttr)}("${rawName}") → tras trim() mide ${nameVal.length} (< 2)`, false);
      throw new Error(`IllegalArgumentException: "Falta más información en ${spec.nameAttr}."`);
    }
    addStep(`set${cap(spec.nameAttr)}("${rawName}") → this.${spec.nameAttr} = "${nameVal}"`);

    // 5. setYear
    if (!Number.isInteger(anio) || anio < 2015) {
      addStep(`set${cap(spec.yearAttr)}(${anio}) → menor al mínimo permitido (2015)`, false);
      throw new Error(`IllegalArgumentException: "Registros con ${spec.yearAttr} anterior a 2015 no están permitidos."`);
    }
    addStep(`set${cap(spec.yearAttr)}(${anio}) → OK (>= 2015)`);

    // 6. Booleanos y demás atributos
    addStep(`set${cap(spec.bool1Attr)}(${bool1}), set${cap(spec.bool2Attr)}(${bool2}), set${cap(spec.colorAttr)}("${color}") → OK`);

    badge.textContent = "OBJETO CREADO";
    badge.className = "rounded-full bg-lime px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink";
    consoleOut.className = "mt-2 whitespace-pre-wrap break-words rounded-lg bg-white/10 p-3 font-mono text-xs text-lime";
    consoleOut.textContent = `${model}{${spec.codeAttr}=${codigo}, ${spec.keyAttr}=${normalizedKey}, ${spec.groupAttr}=${groupVal}, ${spec.nameAttr}=${nameVal}, ${spec.yearAttr}=${anio}, ${spec.bool1Attr}=${bool1}, ${spec.bool2Attr}=${bool2}, ${spec.typeAttr}=${spec.typeExample}, ${spec.colorAttr}=${color}, ${spec.modeAttr}=${spec.modeExample}}`;
  } catch (err) {
    badge.textContent = "EXCEPCIÓN LANZADA";
    badge.className = "rounded-full bg-rose-400 px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink";
    consoleOut.className = "mt-2 whitespace-pre-wrap break-words rounded-lg bg-rose-950/70 p-3 font-mono text-xs text-rose-200";
    consoleOut.textContent = `Exception in thread "main" java.lang.${err.message}\n    at modelo.${model}.<init>(${model}.java:25)`;
  }
}

setterLabForm?.addEventListener("submit", event => {
  event.preventDefault();
  runSetterLab();
});

function initContext() {
  const params = new URLSearchParams(window.location.search);
  const urlContext = params.get("contexto") || params.get("dominio");
  let savedContext = null;
  try {
    savedContext = sessionStorage.getItem("guia-contexto");
  } catch {}
  const targetKey = urlContext || savedContext;
  showContext(contexts.find(context => javaName(context.model) === targetKey) ?? contexts[0]);
}

if (["modelo", "proyecto"].includes(document.body.dataset.lesson)) initContext();
