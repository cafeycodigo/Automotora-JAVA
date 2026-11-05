const contexts = [
  {
    name: "Vehículo", model: "Vehiculo", icon: "🚗", domain: "Automotora",
    title: "Un inventario de autos, paso a paso.", badge: "Inventario",
    key: "Patente", example: "ABCD12", format: /^(?:[A-Z]{4}|[A-Z]{2}\d{2})\d{2}$/,
    rule: "La patente identifica el vehículo en el DAO. El código interno tiene ocho dígitos y se guarda como otro campo.",
    fields: [["Modelo", "Ferrari F8 Tributo", /^.{2,}$/u, "Escribe al menos dos caracteres."],
      ["Código", "00000001", /^\d{8}$/, "Escribe exactamente ocho dígitos."],
      ["Año", "2023", value => /^\d+$/.test(value) && Number(value) >= 2015 && Number(value) <= 2147483647, "Escribe un año entero desde 2015."], ["Color", "Rojo furia"]]
  },
  {
    name: "Animal", model: "Animal", icon: "🐾", domain: "Refugio",
    title: "Un refugio y sus fichas de animales.", badge: "Refugio",
    key: "ID", example: "1042", format: /^[1-9]\d*$/,
    rule: "El refugio asigna un ID numérico positivo a cada animal. Dos animales pueden tener el mismo nombre.",
    fields: [["Nombre", "Luna"], ["Especie", "Perro"], ["Raza", "Mestiza"], ["Estado", "En adopción"]]
  },
  {
    name: "Persona", model: "Persona", icon: "👤", domain: "Directorio",
    title: "Un directorio de personas.", badge: "Directorio",
    key: "RUN", example: "12345678-5", format: /^\d{7,8}-[\dK]$/,
    rule: "La demo comprueba el formato del RUN sin puntos, con guion y dígito verificador.",
    fields: [["Nombre", "Camila Soto"], ["Comuna", "Ñuñoa"], ["Ocupación", "Diseñadora"], ["Estado", "Activa"]]
  },
  {
    name: "Estudiante", model: "Estudiante", icon: "🎓", domain: "Registro académico",
    title: "Un registro de estudiantes.", badge: "Academia",
    key: "Matrícula", example: "MAT-2026-014", format: /^MAT-\d{4}-\d{3}$/,
    rule: "La institución asigna una matrícula con el formato MAT-AÑO-NÚMERO. Esa clave identifica la ficha académica.",
    fields: [["Nombre", "Isabel Vega"], ["Carrera", "Informática"], ["Jornada", "Diurna"], ["Nivel", "Segundo año"]]
  },
  {
    name: "Producto", model: "Producto", icon: "📦", domain: "Bodega",
    title: "Una bodega organizada por código.", badge: "Bodega",
    key: "Código", example: "SKU-042", format: /^SKU-\d{3}$/,
    rule: "El código de catálogo identifica el producto y sigue el formato SKU más tres dígitos.",
    fields: [["Nombre", "Teclado mecánico"], ["Categoría", "Periféricos"], ["Ubicación", "Estante B2"], ["Stock", "18", /^\d+$/, "Escribe un entero igual o mayor que cero."]]
  },
  {
    name: "Dispositivo", model: "Dispositivo", icon: "💻", domain: "Activos TI",
    title: "Un registro de dispositivos por UUID.", badge: "Activos TI",
    key: "UUID", example: "550e8400-e29b-41d4-a716-446655440000",
    format: /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/,
    rule: "El UUID identifica el dispositivo. Se escribe en cinco bloques hexadecimales separados por guiones.",
    fields: [["Nombre", "Sensor de temperatura"], ["Tipo", "IoT"], ["Ubicación", "Laboratorio 2"], ["Estado", "En servicio"]]
  }
];

const byId = id => document.getElementById(id);
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
  list.replaceChildren();
  const records = recordsByContext.get(active);
  if (!records.size) list.appendChild(document.createElement("li")).textContent = "Aún no hay registros.";
  for (const values of records.values()) {
    const item = list.appendChild(document.createElement("li"));
    item.className = "break-words rounded-xl bg-white px-3 py-2";
    item.textContent = `${active.key} ${values[0]} · ${values[1]}`;
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

function showContext(context, announce = false) {
  active = context;
  const isVehicle = context === contexts[0];
  buttons.forEach((button, index) => button.setAttribute("aria-pressed", contexts[index] === context));
  const modelLesson = document.body.dataset.lesson === "modelo";
  const testLesson = document.body.dataset.lesson === "junit";
  const databaseLesson = document.body.dataset.lesson === "base-datos";
  const lesson = databaseLesson ? "Conexión a base de datos" : testLesson ? "Test JUnit" : modelLesson ? "El modelo" : "Proyecto de datos";
  document.title = `${lesson} · ${context.domain}`;
  byId("context-brand").textContent = context.domain;
  byId("context-title").textContent = modelLesson ? context.title : `De la ficha a la colección · ${context.name}`;
  byId("context-description").textContent = modelLesson
    ? `Aprende a crear una ficha de tipo ${context.model}. Empezarás con variables, las usarás para construir un objeto y revisarás las reglas de sus atributos.`
    : `Ya tienes una ficha de tipo ${context.model}. Ahora usa su ${context.key} para guardar, buscar, listar, actualizar y eliminar registros desde el DAO.`;
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

  byId("vehicle-guide").hidden = !isVehicle;
  byId("demo-rule").textContent = context.rule;
  if (modelLesson) renderModelLesson(context);
  else renderDataLesson(context, isVehicle);

  const start = byId(modelLesson ? "primeros-pasos" : "demo");
  if (announce && window.scrollY > start.offsetTop) start.scrollIntoView();
}

function renderModelLesson(context) {
  byId("sample-badge").textContent = context.badge;
  byId("sample-key").textContent = `${context.key} · ${context.example}`;
  byId("sample-name").textContent = context.fields[0][1];
  const fields = byId("sample-fields");
  fields.replaceChildren();
  for (const [label, value] of context.fields) {
    const card = document.createElement("div");
    const name = document.createElement("p");
    const detail = document.createElement("p");
    card.className = "rounded-2xl bg-white/[0.07] p-4";
    name.className = "font-mono text-[11px] uppercase tracking-wider text-white/60";
    detail.className = "mt-2 break-words text-sm";
    name.textContent = label;
    detail.textContent = value;
    card.append(name, detail);
    fields.append(card);
  }

  renderIntro(context);
  const rules = byId("model-rules");
  rules.replaceChildren();
  const ruleTexts = [
    `Obligatoriedad. Completa todos los campos. La demo quita los espacios de los extremos.`,
    `Formato de ${context.key}. Usa una clave como ${context.example}.`,
    ...context.fields.filter(([, , , message]) => message)
      .map(([label, , , message]) => `${label}. ${message}`)
  ];
  for (const rule of ruleTexts) {
    rules.appendChild(document.createElement("li")).textContent = rule;
  }
  byId("model-question").textContent =
    `Comprueba lo aprendido · ¿Qué ocurre si ${context.key} contiene solo espacios?`;
  byId("model-answer").textContent =
    `Al quitar los espacios, el valor queda vacío. La ficha debe rechazarse por la regla de obligatoriedad. Si ${context.key} tiene el formato correcto, el DAO todavía debe comprobar si esa clave ya existe.`;
}

function renderDataLesson(context, isVehicle) {
  byId("demo-title").textContent = `${context.name} · clave por ${context.key}`;
  const formFields = byId("form-fields");
  formFields.replaceChildren();
  inputs.length = 0;
  for (const [label, example] of [[context.key, context.example], ...context.fields]) {
    const wrapper = document.createElement("label");
    const input = document.createElement("input");
    wrapper.className = "block min-w-0 text-sm font-medium";
    input.className = "mt-1 block w-full rounded-lg border border-ink/20 px-3 py-2 font-mono text-sm";
    input.placeholder = example;
    input.autocomplete = "off";
    wrapper.append(label, input);
    formFields.append(wrapper);
    inputs.push(input);
  }
  renderProject(context, isVehicle);
  byId("demo-status").textContent = "";
  renderRecords();
}

const modelTabs = Array.from(document.querySelectorAll("#model-tabs [role=tab]"));
let modelTab = 0;
let modelSource;
let simulation;

function showModelTab(index) {
  modelTab = index;
  const isOutput = index === 3;
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
  const {model, key, field, identifier, example} = simulation;
  const trace = byId("model-trace");
  trace.replaceChildren();
  for (const step of [
    `main asigna "${identifier}" a ${key} y "${example}" a ${field}.`,
    `new ${model}(...) pasa ambos valores al constructor y registro guarda la referencia al objeto.`,
    `println lee registro.${key} y registro.${field}, los une y muestra la línea de abajo.`
  ]) {
    trace.appendChild(document.createElement("li")).textContent = step;
  }
  byId("model-output").textContent = `${identifier} · ${example}`;
  showModelTab(3);
  modelTabs[3].focus();
});

function renderIntro(context) {
  const key = javaName(context.key);
  const [label, example] = context.fields[0];
  const field = label.toLowerCase();
  byId("intro-variable").textContent =
    `En String ${key} = "${context.example}";, String es el tipo, ${key} es el nombre y "${context.example}" es el valor. Dentro de main, ${key} es una variable local.`;
  byId("intro-attributes").textContent =
    `La clase ${context.model} declara ${key} y ${field} como atributos. Cada objeto tiene sus propios valores. El constructor recibe parámetros y this.${key} se refiere al atributo del objeto.`;
  byId("intro-object").textContent =
    `new ${context.model}(...) crea la ficha y la variable registro guarda su referencia. ${label} describe la ficha y el DAO usa ${context.key} para encontrarla.`;
  const declaration = `class ${context.model} {
    private final String ${key};
    private final String ${field};

    ${context.model}(String ${key}, String ${field}) {
        this.${key} = ${key};
        this.${field} = ${field};
    }`;
  const main = `    public static void main(String[] args) {
        String ${key} = "${context.example}";
        String ${field} = "${example}";
        ${context.model} registro = new ${context.model}(${key}, ${field});
        System.out.println(registro.${key} + " · " + registro.${field});
    }`;
  modelSource = [`${declaration}\n}`, main.replace(/^ {4}/gm, ""), `${declaration}\n\n${main}\n}`];
  simulation = {model: context.model, key, field, identifier: context.example, example};
  byId("model-trace").replaceChildren();
  byId("model-output").textContent = "Pulsa Ejecutar simulación para ver la salida de main.";
  showModelTab(modelTab === 3 ? 1 : modelTab);
}

function renderCode(codeId, source) {
  const code = byId(codeId);
  const tokens = /(?<comment>\/\/[^\n]*)|(?<string>"[^"\n]*")|(?<keyword>\b(?:class|private|final|public|static|void|this|new|import|package|return|if|for|boolean|null|throw)\b)|(?<type>\b[A-Z][A-Za-z]*\b)/g;
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
    const source = code.textContent;
    let copied = false;
    try {
      await navigator.clipboard.writeText(source);
      copied = true;
    } catch {
      copied = copyWithSelection(source);
    }
    if (code.textContent === source) {
      byId(statusId).textContent = copied
        ? "Código copiado."
        : "Selecciona el código y cópialo con el menú del navegador.";
    }
  });
}

setupCopy("copy-project-code", "project-code", "project-copy-status");
setupCopy("copy-model-code", "model-code", "model-copy-status");

byId("load-sample")?.addEventListener("click", () => {
  fill(sampleValues(active));
  byId("demo-status").textContent = "Ejemplo cargado en el formulario.";
});

form?.addEventListener("submit", event => {
  event.preventDefault();
  const status = byId("demo-status");
  const action = event.submitter?.value ?? "guardar";
  const values = inputs.map(input => input.value.trim());
  const key = active.key === "UUID" ? values[0].toLowerCase() : values[0].toUpperCase();
  if (!active.format.test(key)) {
    status.textContent = `Ingresa ${active.key} con el formato del ejemplo (${active.example}).`;
    inputs[0].focus();
    return;
  }
  values[0] = key;
  const records = recordsByContext.get(active);
  if (records.has(key) === (action === "guardar")) {
    status.textContent = action === "guardar"
      ? `Ya existe un registro con ${active.key} ${key}.`
      : `No se encontró un registro con ${active.key} ${key}.`;
    return;
  }

  if (action === "buscar") {
    fill(records.get(key));
    status.textContent = "Registro encontrado y cargado en el formulario.";
    return;
  }
  if (action === "eliminar") {
    records.delete(key);
    status.textContent = "Registro eliminado.";
  } else {
    const invalid = active.fields.findIndex(([, , format], index) =>
      !values[index + 1] || (format instanceof RegExp && !format.test(values[index + 1]))
      || (typeof format === "function" && !format(values[index + 1])));
    if (invalid !== -1) {
      const [label, , , message] = active.fields[invalid];
      status.textContent = `${label}. ${values[invalid + 1] && message ? message : "Completa este campo."}`;
      inputs[invalid + 1].focus();
      return;
    }
    records.set(key, values);
    status.textContent = action === "guardar" ? "Registro guardado." : "Registro actualizado.";
  }
  renderRecords();
});

document.querySelectorAll("#vehicle-guide pre > code").forEach((code, index) => {
  const source = code.textContent;
  const pre = code.parentElement;
  const toolbar = document.createElement("div");
  const copy = document.createElement("button");
  const status = document.createElement("span");
  code.id = `vehicle-snippet-${index}`;
  copy.id = `copy-vehicle-snippet-${index}`;
  status.id = `vehicle-copy-status-${index}`;
  status.setAttribute("role", "status");
  toolbar.className = "flex flex-wrap items-center gap-3 rounded-t-xl bg-ink px-4 py-2 text-xs text-white";
  copy.type = "button";
  copy.className = "rounded-lg border border-white/30 px-3 py-1.5";
  copy.textContent = "Copiar código";
  toolbar.append(copy, status);
  pre.before(toolbar);
  pre.className = "overflow-x-auto rounded-b-xl bg-ink p-4 text-xs leading-6 text-white sm:text-sm";
  renderCode(code.id, source);
  setupCopy(copy.id, code.id, status.id);
});

const requestedContext = new URLSearchParams(window.location.search).get("contexto");
function initContext() {
  showContext(contexts.find(context => javaName(context.model) === requestedContext) ?? contexts[0]);
}

if (["modelo", "proyecto"].includes(document.body.dataset.lesson)) initContext();
