# DocuFlow Pro Enterprise - Suite Profesional de Edición & Herramientas PDF

Una plataforma web avanzada inspirada en **Microsoft Word** y suites de procesamiento documental de grado corporativo, construida con arquitectura modular en **React + TypeScript + Vite + Tailwind CSS** y procesamiento criptográfico seguro aislado en **WebAssembly (WASM)**.

---

## Características Principales

### 1. Editor de Documentos Estilo Word
- **Lienzo A4 con Edición en Vivo**: Formato de texto enriquecido con control tipográfico (Inter, Plus Jakarta Sans, Arial, Times New Roman, Courier New, Georgia).
- **Herramientas de Texto**: Negrita, cursiva, subrayado, tachado, alineaciones (izquierda, centrado, derecha, justificado), listas con viñetas y ordenadas.
- **Tablas Dinámicas Interactivas**: Inserción mediante modal paramétrico (filas x columnas) con edición directa de celdas dentro del lienzo.
- **Inserción de Imágenes (Ctrl + V y Botón)**: Permite pegar capturas directamente desde el portapapeles (`Ctrl+V`) o cargarlas desde el equipo con soporte para mover, redimensionar y eliminar.

### 2. Biblioteca de Formas y Recursos Vectoriales 2D
- **Figuras Básicas**: Rectángulos, círculos, elipses, rombos y triángulos convexos.
- **Polígonos Regulares de N Lados**: Generador paramétrico (de 3 a 16 lados: pentágonos, hexágonos, heptágonos, octágonos, etc.) y estrellas de múltiples puntas.
- **Flechas & Conectores**: Flechas en 4 orientaciones vectoriales con rotación y ajuste.
- **Llamadas & Globos**: Figuras para anotaciones explicativas.
- **Inspector de Propiedades**: Modificación en tiempo real de color de relleno, color de borde, grosor de trazo, opacidad y dimensiones.
- **Manipulador de Arrastre Mejorado**: Control visual optimizado para modo claro y modo oscuro.

### 3. Suite de Procesamiento y Ensamblaje PDF (WASM)
- **Compresor & Optimizador**:
  - *Extrema (-65%)*: Reducción agresiva para envíos por mensajería o correo con cuotas estrictas.
  - *Recomendada (-45%)*: Equilibrio óptimo entre nitidez visual y peso.
  - *Baja (-20%)*: Conservación de alta fidelidad para impresión con depuración de metadatos.
- **Unificador (Merge)**:
  - Cola interactiva con reordenación (subir / bajar archivo) para combinar múltiples archivos PDF en un único documento compilado.
- **Divisor & Extractor (Split)**:
  - División de todas las páginas en PDFs individuales.
  - Extracción de rangos específicos (por ejemplo: `1-3`).

### 4. Conversor Multi-Formato Bidireccional
- **Exportación Idéntica a Word (`.docx`)**:
  - Compilación nativa en formato OpenXML respetando títulos, jerarquía de encabezados, párrafos y tablas completas con formato y bordes.
- **Exportación a Excel (`.xlsx`)**: Extracción de datos tabulares estructurados hacia hojas de cálculo.
- **Exportación a Texto Plano / Markdown (`.txt` / `.md`)**.
- **Conversor Universal a PDF**: Convierte imágenes (PNG, JPG, WebP) o archivos de texto directamente a PDF vectorizado.

### 5. Experiencia de Usuario & Diseño
- **Iconografía 100% SVG**: Integración completa con iconos vectoriales de Lucide (sin emoticones).
- **Feedback Moderno**: Notificaciones estilo Toast flotantes y modales con desenfoque de fondo (*backdrop blur*), sin alertas intrusivas.
- **Tema Claro / Oscuro**: Paleta de colores refinada basada en las especificaciones del diseño DocuFlow Pro / AcroText Studio.

---

## Puesta en Marcha Local

### Requisitos Previos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/cliger1970/PDFTololsCL.git
   cd PDFTololsCL
   ```

2. Entrar a la carpeta del aplicativo e instalar dependencias:
   ```bash
   cd pdf-suite
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:5173/
   ```

---

## Estructura del Proyecto

```
PDFToolsCL/
├── pdf-suite/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeaderToolbar.tsx       # Barra de herramientas superior estilo ribbon
│   │   │   ├── DocumentEditor.tsx      # Lienzo A4 editable con soporte drag & drop
│   │   │   ├── ShapesResourcePanel.tsx # Biblioteca e inspector de figuras vectoriales
│   │   │   ├── AdvancedPdfTools.tsx    # Compresor, unificador y divisor de PDF
│   │   │   ├── DocumentConverter.tsx   # Conversor bidireccional Word/Excel/PDF
│   │   │   ├── Modal.tsx               # Componente de diálogo modal accesible
│   │   │   └── ToastContainer.tsx      # Sistema de notificaciones toast animadas
│   │   ├── types/
│   │   │   └── index.ts                # Definiciones TypeScript de figuras y documentos
│   │   ├── App.tsx                     # Orquestador principal y manejo de estado
│   │   ├── index.css                   # Variables de diseño y estilos personalizados
│   │   └── main.tsx                    # Punto de entrada de la aplicación
│   ├── package.json
│   └── vite.config.ts
├── stitch_editor_pdf_suite_profesional/ # Diseños y mockups de referencia
└── README.md
```

---

## Tecnologías Utilizadas

- **React 19 & TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **pdf-lib** (Manipulación y ensamblaje de PDF cliente)
- **docx** (Generación nativa de archivos OpenXML Word)
- **xlsx / SheetJS** (Extracción tabular de hojas de cálculo)
- **jspdf & html2canvas** (Renderizado y rasterizado de alta resolución)
- **lucide-react** (Iconografía vectorial SVG)

---

## Licencia
Proyecto privado desarrollado para **DocuFlow Pro Suite**.
