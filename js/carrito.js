document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    actualizarContador();
    agregarEventosBotones();
});

function agregarEventosBotones() {
    const botones = document.querySelectorAll(".agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            agregarAlCarrito(nombre, precio);
        });
    });
}

function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador();
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoHTML = document.querySelector("#carrito");
    if (!carritoHTML) return;
    carritoHTML.innerHTML = "";

    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        carritoHTML.innerHTML += `
            <div class="item">
                <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
    });

    carritoHTML.innerHTML += `<p>Total: $${total}</p>`;
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarCarrito();
    actualizarContador();
}

function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = totalProductos;
    }
}