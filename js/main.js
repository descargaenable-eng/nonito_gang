// Lógica de la página: escucha los eventos emitidos por <tarjeta-producto>
let totalCarrito = 0;
let cantidadItems = 0;

const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

function formatear(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

document.addEventListener("agregar-al-carrito", (evento) => {
  const { titulo, precio } = evento.detail;
  cantidadItems += 1;
  totalCarrito += precio;
  contador.textContent = `Carrito: ${cantidadItems} producto(s) — Total: ${formatear(totalCarrito)}`;
  mensaje.textContent = `Se agregó "${titulo}" al carrito.`;
});

document.addEventListener("ver-mas", (evento) => {
  mensaje.textContent = `Viste más detalles de "${evento.detail.titulo}".`;
});
