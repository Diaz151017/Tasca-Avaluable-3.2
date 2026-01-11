// Título dinámico
// Buscamos el elemento por su ID y cambiamos el texto.
let titol = document.getElementById("titol-dinamic");
if (titol) {
    titol.textContent = "Pràctica JS Bàsica";
}

// Gestión de lista
const btnAddLi = document.getElementById("btn-add-li");
const btnClearLi = document.getElementById("btn-clear-li");
const llistaElements = document.getElementById("elements");

// Botón de añadido: Pide texto y crea <li>
btnAddLi.addEventListener("click", () => {
    let textUsuari = prompt("Introdueix el text del nou element:");
    
    // Solo añadimos si el usuario escribió algo
    if (textUsuari) {
        // 1. Crear el elemento
        let nouLi = document.createElement("li");
        // 2. Darle contenido
        nouLi.textContent = textUsuari;
        // 3. Pegarlo en la lista (DOM)
        llistaElements.appendChild(nouLi);
    }
});

// Botón Limpieza: Borra todo lo de dentro
btnClearLi.addEventListener("click", () => {
    // Manera rápida de vaciar un contenedor
    llistaElements.innerHTML = ""; 
});


// Tabla de datos
const btnAddRow = document.getElementById("btn-add-row");
const taulaCos = document.querySelector("#dades tbody"); // Seleccionamos el cuerpo de la tabla

btnAddRow.addEventListener("click", () => {
    // 1. Crear nueva fila (tr)
    let novaFila = document.createElement("tr");

    // 2. Preparar los datos
    let textFix = "Nou";
    // Número aleatorio entre 1 y 100
    let randomNum = Math.floor(Math.random() * 100) + 1;
    // Fecha actual formateada
    let dataActual = new Date().toLocaleDateString("es-ES");

    // 3. Inyectar el HTML de las celdas directamente (truco rápido)
    novaFila.innerHTML = `
        <td>${textFix}</td>
        <td>${randomNum}</td>
        <td>${dataActual}</td>
    `;

    // 4. Añadir la fila a la tabla
    taulaCos.appendChild(novaFila);
});


// Cambio de estilo (Mode Foscor)
const btnDark = document.getElementById("btn-dark-mode");
const cos = document.body;

btnDark.addEventListener("click", () => {
    // .toggle añade la clase si no está, y la quita si está
    cos.classList.toggle("dark");
});


// Doble click en párrafos
// Seleccionamos TODOS los párrafos (<p>)
const paragrafs = document.querySelectorAll("p");

// Como querySelectorAll devuelve una lista, hay que recorrerla uno a uno
paragrafs.forEach((paragraf) => {
    paragraf.addEventListener("dblclick", () => {
        // Imprime el texto del párrafo clickado
        console.log("TEXTO DEL PÁRRAFO: " + paragraf.textContent);
        alert("Has fet doble click: " + paragraf.textContent);
    });
});
/* ----------------------------------------------------------
   EXERCICI 3 – Validació de Formulari
   ----------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {
    
    // Seleccionamos todos los elementos necesarios
    const form = document.getElementById("form-basic");
    const inputUsuari = document.getElementById("usuari");
    const inputPass = document.getElementById("contrasenya");
    const inputCP = document.getElementById("codiPostal");
    const inputTelf = document.getElementById("telefon");
    const inputProv = document.getElementById("provincia");
    const divMissatges = document.getElementById("missatges");

    // Función auxiliar para mostrar error en rojo
    function mostrarError(input, idError, missatge) {
        const span = document.getElementById(idError);
        span.textContent = missatge;
        span.style.color = "red";
        span.style.fontSize = "0.8em";
        input.style.borderColor = "red";
    }

    // Función auxiliar para limpiar error (verde o neutro)
    function limpiarError(input, idError) {
        const span = document.getElementById(idError);
        span.textContent = "";
        input.style.borderColor = ""; // Volver al borde original
    }

    // Escuchamos el evento cuando se intenta enviar el formulario
    form.addEventListener("submit", (event) => {
        // 1. DETENER EL ENVÍO (Prevenir recarga de página)
        event.preventDefault();

        // Variable bandera: asumimos que es válido hasta encontrar un error
        let esValid = true;

        // --- VALIDACIÓN USUARIO (Mínimo 4 caracteres) ---
        if (inputUsuari.value.trim().length < 4) {
            mostrarError(inputUsuari, "error-usuari", "L'usuari ha de tenir mínim 4 caràcters.");
            esValid = false;
        } else {
            limpiarError(inputUsuari, "error-usuari");
        }

        // --- VALIDACIÓN PASSWORD (Mínimo 6 caracteres) ---
        if (inputPass.value.length < 6) {
            mostrarError(inputPass, "error-contrasenya", "La contrasenya ha de tenir mínim 6 caràcters.");
            esValid = false;
        } else {
            limpiarError(inputPass, "error-contrasenya");
        }

        // --- VALIDACIÓN CP (5 dígitos numéricos) ---
        // Regex: ^ (inicio), \d (dígito), {5} (exactamente 5 veces), $ (final)
        const regexCP = /^\d{5}$/;
        if (!regexCP.test(inputCP.value)) {
            mostrarError(inputCP, "error-cp", "El Codi Postal ha de ser de 5 dígits.");
            esValid = false;
        } else {
            limpiarError(inputCP, "error-cp");
        }

        // --- VALIDACIÓN TELÉFONO (Solo números, mínim 9 dígitos) ---
        // Regex: ^ (inicio), \d (dígito), {9,} (9 o más veces), $ (final)
        // Aceptamos espacios opcionales con \s* si quisiéramos ser amables, pero el ejercicio pide estricto.
        // Usaremos una regex simple que pide min 9 digitos.
        const regexTelf = /^\d{9,}$/;
        // Quitamos espacios en blanco por si el usuario pone "666 555 444"
        let telfLimpio = inputTelf.value.replace(/\s/g, ''); 
        
        if (!regexTelf.test(telfLimpio)) {
            mostrarError(inputTelf, "error-telefon", "Telèfon invàlid (mínim 9 números).");
            esValid = false;
        } else {
            limpiarError(inputTelf, "error-telefon");
        }

        // --- VALIDACIÓN PROVINCIA (Selección obligatoria) ---
        if (inputProv.value === "") {
            mostrarError(inputProv, "error-provincia", "Has de triar una província.");
            esValid = false;
        } else {
            limpiarError(inputProv, "error-provincia");
        }

        // --- RESULTADO FINAL ---
        if (esValid) {
            divMissatges.style.color = "green";
            divMissatges.textContent = "Tot correcte! Dades enviades (simulació).";
            // Aquí harías form.submit() si fuera real
        } else {
            divMissatges.style.color = "red";
            divMissatges.textContent = "Hi ha errors al formulari. Revisa els camps.";
        }
    });
});