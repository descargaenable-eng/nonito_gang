# Tienda Front-end — Componente `<tarjeta-producto>`

Proyecto del primer parcial de **Desarrollo de Aplicaciones Web y Sistemas Operativos** (193308), unidad *Introducción al Front-end*.

## Descripción

Catálogo sencillo de productos construido con un **Web Component nativo** (HTML + CSS + JavaScript vanilla, sin librerías). El componente `<tarjeta-producto>` se reutiliza tres veces con datos diferentes, es responsivo y emite eventos personalizados que la página escucha para actualizar un carrito de compras.

## Estructura

```
proyecto-tarjeta/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── tarjeta-producto.js   # definición del Web Component
│   └── main.js               # escucha de eventos y carrito
└── assets/
    ├── laptop.svg
    ├── audifonos.svg
    └── teclado.svg
```

## Uso del componente

```html
<tarjeta-producto
  imagen="assets/laptop.svg"
  titulo="Portátil Pro 14"
  descripcion="Procesador de última generación."
  precio="3200000"
></tarjeta-producto>
```

**Props (atributos):** `imagen`, `titulo`, `descripcion`, `precio`.

**Eventos emitidos:**
- `agregar-al-carrito` → `detail: { titulo, precio }`
- `ver-mas` → `detail: { titulo }`

## Cómo ejecutarlo

1. Abrir la carpeta en Visual Studio Code.
2. Instalar la extensión **Live Server**.
3. Clic derecho sobre `index.html` → **Open with Live Server**.

## Autor

Nombre del estudiante — Código estudiantil — UFPSO
