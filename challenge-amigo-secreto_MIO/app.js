// Obtención de elementos del DOM
let inputName = document.getElementById("amigo");
let nameList = document.getElementById("listaAmigos");
let resultList = document.getElementById("resultado");
let buttonDraw = document.querySelector(".button-draw");
let nameArray = [];

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const nombre = inputName.value.trim();
    if (nombre && !nameArray.includes(nombre)) {
        nameArray.push(nombre);
        actualizarLista();
        inputName.value = ""; // Limpiar el campo después de agregar el nombre
        inputName.focus(); // Volver a enfocar el campo de texto
    }
}

// Función para actualizar la lista de amigos
function actualizarLista() {
    nameList.innerHTML = ""; // Limpiar lista antes de actualizar
    nameArray.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        nameList.appendChild(li);
    });
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    if (nameArray.length >= 4) {
        const amigosDisponibles = [...nameArray]; // Copia del array de amigos
        const sorteados = [];

        // Sorteo para asignar a cada amigo un amigo secreto diferente
        nameArray.forEach(amigo => {
            // Filtrar para que no se pueda elegir a sí mismo
            const amigosPosibles = amigosDisponibles.filter(amigoSecreto => amigoSecreto !== amigo);

            if (amigosPosibles.length > 0) {
                // Seleccionamos aleatoriamente un amigo secreto que no sea la persona misma
                const index = Math.floor(Math.random() * amigosPosibles.length);
                const amigoSecreto = amigosPosibles[index];

                // Eliminar al amigo secreto elegido de la lista de amigos disponibles
                amigosDisponibles.splice(amigosDisponibles.indexOf(amigoSecreto), 1);

                sorteados.push(`${amigo} tiene como amigo secreto a ${amigoSecreto}`);
            }
        });

        // Mostrar los resultados
        mostrarResultados(sorteados);
    } else {
        alert("¡Debe haber al menos 4 nombres para sortear!");
    }
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(sorteados) {
    resultList.innerHTML = ""; // Limpiar resultados anteriores
    sorteados.forEach(resultado => {
        const li = document.createElement("li");
        li.textContent = resultado;
        resultList.appendChild(li);
    });
}

// Evento para presionar Enter y agregar un nombre
inputName.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        agregarAmigo();
    }
});

// Evento para el botón de sortear
buttonDraw.addEventListener("click", sortearAmigo);
