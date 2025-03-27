const carrito = document.querySelector('#carrito');
const productoscarrito = document.querySelector('#productoscarrito tbody');
const vaciarcarrito = document.querySelector('#vaciar-carrito');
const listaproductos = document.querySelector('#listaproductos');
let productocarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaproductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarcarrito.addEventListener('click', vaciarCarrito);
}

function agregarProducto(e) {
    if (e.target.classList.contains('agregar')) {
        const productoseleccionado = e.target.parentElement;
        leerdatosproducto(productoseleccionado);
    }
}

function leerdatosproducto(producto) {
    const infoproducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: parseFloat(producto.querySelector('span').textContent.replace('S/', '').trim()),
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = productocarrito.find(p => p.id === infoproducto.id);
    if (existe) {
        existe.cantidad++; // Si ya está en el carrito, aumenta la cantidad
    } else {
        productocarrito.push(infoproducto); // Si no está, agrégalo
    }

    console.log("Productos en el carrito:", productocarrito); // <-- Verifica si el producto se añade correctamente
    carritohtml();
}

function carritohtml() {
    console.log("Generando HTML del carrito...");
    console.log("Productos actuales:", productocarrito);
    console.log("listacarrito:", listacarrito); 
    if (!listacarrito) {
        console.error("Error: listacarrito no se encuentra en el DOM");
        return;
    }
    
    // Limpiar HTML previo
    listacarrito.innerHTML = ""; 

    productocarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio * producto.cantidad}</td>
            <td><button class="borrar-producto" data-id="${producto.id}">X</button></td>
        `;

        listacarrito.appendChild(row);
    });
}