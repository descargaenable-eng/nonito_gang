/**
 * <tarjeta-producto> — Web Component nativo (HTML + CSS + JS vanilla)
 *
 * Atributos (props):
 *   imagen       -> URL de la imagen del producto
 *   titulo       -> nombre del producto
 *   descripcion  -> texto corto descriptivo
 *   precio       -> número (se formatea como pesos colombianos)
 *
 * Eventos emitidos:
 *   "agregar-al-carrito" -> CustomEvent con detail = { titulo, precio }
 *   "ver-mas"            -> CustomEvent con detail = { titulo }
 */
class TarjetaProducto extends HTMLElement {
  static get observedAttributes() {
    return ["imagen", "titulo", "descripcion", "precio"];
  }

  constructor() {
    super();
    // Shadow DOM: encapsula los estilos y la estructura del componente
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    // Si el atributo cambia después de creado, se vuelve a dibujar
    if (this.isConnected) this.render();
  }

  formatearPrecio(valor) {
    const numero = Number(valor);
    if (Number.isNaN(numero)) return valor ?? "";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(numero);
  }

  render() {
    const imagen = this.getAttribute("imagen") || "";
    const titulo = this.getAttribute("titulo") || "Producto sin nombre";
    const descripcion = this.getAttribute("descripcion") || "";
    const precio = this.getAttribute("precio") || "0";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, Helvetica, sans-serif;
        }
        .tarjeta {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .tarjeta:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
        }
        img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          background: #e9ecef;
          display: block;
        }
        .contenido {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          flex: 1;
        }
        h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #1b263b;
        }
        p {
          margin: 0;
          font-size: 0.9rem;
          color: #495057;
          flex: 1;
        }
        .precio {
          font-size: 1.2rem;
          font-weight: bold;
          color: #0b6e4f;
        }
        .acciones {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        button {
          flex: 1;
          min-width: 110px;
          padding: 10px 12px;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .btn-agregar {
          background: #0b6e4f;
          color: #ffffff;
        }
        .btn-agregar:hover {
          background: #08543c;
        }
        .btn-ver {
          background: #e9ecef;
          color: #1b263b;
        }
        .btn-ver:hover {
          background: #ced4da;
        }
      </style>

      <article class="tarjeta">
        <img src="${imagen}" alt="${titulo}" />
        <div class="contenido">
          <h3>${titulo}</h3>
          <p>${descripcion}</p>
          <span class="precio">${this.formatearPrecio(precio)}</span>
          <div class="acciones">
            <button class="btn-agregar" type="button">Agregar al carrito</button>
            <button class="btn-ver" type="button">Ver más</button>
          </div>
        </div>
      </article>
    `;

    this.shadowRoot
      .querySelector(".btn-agregar")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("agregar-al-carrito", {
            detail: { titulo, precio: Number(precio) },
            bubbles: true,
            composed: true, // permite que el evento salga del Shadow DOM
          })
        );
      });

    this.shadowRoot.querySelector(".btn-ver").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("ver-mas", {
          detail: { titulo },
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

// Registro del elemento personalizado (el nombre debe llevar un guion)
customElements.define("tarjeta-producto", TarjetaProducto);
