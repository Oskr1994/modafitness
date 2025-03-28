// Selección correcta de elementos
const carrito = document.querySelector("#carrito");
const productoscarrito = document.querySelector("#productoscarrito");
const vaciarcarrito = document.querySelector("#vaciarcarrito");
const listaproductos = document.querySelector("#listaproductos");

let productocarrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar eventos correctamente
cargarEventListeners();
function cargarEventListeners() {
    // Delegación de eventos para agregar productos
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("agregar")) {
            agregarProducto(e);
        }

        if (e.target.classList.contains("boton-vaciar")) {
            eliminarProducto(e);
        }

        if (e.target === vaciarcarrito) {
            vaciarCarrito();
        }
    });

    carritohtml(); // Cargar carrito guardado en localStorage
}

// Agregar producto al carrito
function agregarProducto(e) {
    console.log("Click en botón agregar:", e.target);

    const productoseleccionado = e.target.closest(".producto"); // Selecciona el producto completo
    if (productoseleccionado) {
        leerdatosproducto(productoseleccionado);
    } else {
        console.error("No se encontró el producto al hacer clic en el botón.");
    }
}

function leerdatosproducto(producto) {
    const infoproducto = {
        imagen: producto.querySelector("img")?.src || "",
        nombre: producto.querySelector("h3")?.textContent || "Producto sin nombre",
        precio: parseFloat(producto.querySelector("span")?.textContent.replace("S/", "").trim()) || 0,
        id: producto.querySelector("button")?.getAttribute("data-id") || "",
        cantidad: 1,
    };

    if (!infoproducto.id) {
        console.error("Error: El producto no tiene un ID válido.");
        return;
    }

    const existe = productocarrito.find((p) => p.id === infoproducto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        productocarrito.push(infoproducto);
    }

    guardarCarrito();
    carritohtml();
}

// Mostrar productos en el carrito
function carritohtml() {
    productoscarrito.innerHTML = "";

    productocarrito.forEach((producto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>S/ ${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>S/ ${(producto.precio * producto.cantidad).toFixed(2)}</td>
            <td><button class="boton-vaciar" data-id="${producto.id}">X</button></td>
        `;

        productoscarrito.appendChild(row);
    });

    guardarCarrito();
}

// Eliminar producto individual
function eliminarProducto(e) {
    const id = e.target.getAttribute("data-id");
    productocarrito = productocarrito.filter((producto) => producto.id !== id);
    carritohtml();
}

// Vaciar carrito
function vaciarCarrito() {
    productocarrito = [];
    carritohtml();
}

// Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(productocarrito));
}
