
    // Seleccionamos todos los enlaces del menú
    const enlacesMenu = document.querySelectorAll('.menu-link');

    // Seleccionamos el checkbox del menú hamburguesa
    const menuCheckbox = document.getElementById('menu-boton');

    // A cada enlace le agregamos un listener
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuCheckbox.checked = false; // Desmarcar el checkbox para cerrar el menú
        });
    });


    // Seleccionamos todos los elementos que queremos animar
const animados = document.querySelectorAll('.animado');

const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 // cuando el 10% del elemento es visible
});

animados.forEach(el => observer.observe(el));
