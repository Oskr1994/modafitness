document.addEventListener("DOMContentLoaded", function () {
    const abrirCarritoBtn = document.getElementById("abrir-carrito");
    const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
    const carritoContenedor = document.getElementById("carrito-contenedor");
    const carritoElemento = document.getElementById("carrito");
    const botonesAgregar = document.querySelectorAll(".agregar");
    let carrito = [];

    // Mostrar/Ocultar carrito
    abrirCarritoBtn.addEventListener("click", function (event) {
        event.preventDefault();
        carritoContenedor.style.display = "block";
    });

    cerrarCarritoBtn.addEventListener("click", function () {
        carritoContenedor.style.display = "none";
    });

    // Agregar producto al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", function () {
            const id = boton.dataset.id;
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            
            const productoExistente = carrito.find(item => item.id === id);
            
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }
            actualizarCarrito();
        });
    });

    // Actualizar carrito en pantalla
    function actualizarCarrito() {
        console.log("Carrito actualizado:", carrito);
        carritoElemento.innerHTML = "";
        carrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.classList.add("item-carrito");
            item.innerHTML = `
                <p>${producto.nombre} - S/ ${producto.precio} x ${producto.cantidad}</p>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            carritoElemento.appendChild(item);
        });

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll(".eliminar").forEach(boton => {
            boton.addEventListener("click", function () {
                const index = boton.dataset.index;
                carrito.splice(index, 1);
                actualizarCarrito();
            });
        });
    }
});