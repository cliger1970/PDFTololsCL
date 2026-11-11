import React, { useState } from 'react';
import { 
  FileText, 
  Table as TableIcon, 
  Image as ImageIcon, 
  Shapes, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Layers, 
  Palette, 
  Settings 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Components
import { HeaderToolbar } from './components/HeaderToolbar';
import { DocumentEditor } from './components/DocumentEditor';
import { ShapesResourcePanel } from './components/ShapesResourcePanel';
import { AdvancedPdfTools } from './components/AdvancedPdfTools';
import { DocumentConverter } from './components/DocumentConverter';
import { Modal } from './components/Modal';
import { ToastContainer } from './components/ToastContainer';

// Types
import type { ToastMessage, CanvasShape, CanvasImage } from './types';

export function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Active top navigation tab
  const [activeTab, setActiveTab] = useState<string>('editor');

  // Document formatting state
  const [fontSize, setFontSize] = useState<string>('3');
  const [fontFamily, setFontFamily] = useState<string>('Inter, sans-serif');

  // Document initial HTML content
  const [contentHtml, setContentHtml] = useState<string>(`
    <h1 style="font-size: 24px; font-weight: bold; color: #1e293b; margin-bottom: 8px;">CONTRATO DE SERVICIOS & SLA CORPORATIVO</h1>
    <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Ref: DOC-2025-CORP-9402 • Procesamiento Criptográfico Aislado WASM</p>
    
    <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
      El presente acuerdo regula los términos y condiciones operacionales del servicio de infraestructura técnica de alta disponibilidad. Ambas partes convienen en implementar estrictos protocolos de redundancia geográfica y optimización de latencia en nodos descentralizados.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin-top: 18px; margin-bottom: 18px; font-size: 13px;">
      <thead>
        <tr style="background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
          <th style="padding: 10px; text-align: left; font-weight: 600; color: #1e293b;">Componente</th>
          <th style="padding: 10px; text-align: left; font-weight: 600; color: #1e293b;">Disponibilidad (SLA)</th>
          <th style="padding: 10px; text-align: left; font-weight: 600; color: #1e293b;">Latencia Máxima</th>
          <th style="padding: 10px; text-align: left; font-weight: 600; color: #1e293b;">Estado Operativo</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px; font-weight: 500;">Motor de Inferencia WASM</td>
          <td style="padding: 10px; color: #16a34a; font-weight: 600;">99.99%</td>
          <td style="padding: 10px;">&lt; 5 ms</td>
          <td style="padding: 10px; color: #2563eb;">Activo</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fafafa;">
          <td style="padding: 10px; font-weight: 500;">Búfer Vectorial Directo</td>
          <td style="padding: 10px; color: #16a34a; font-weight: 600;">99.95%</td>
          <td style="padding: 10px;">&lt; 12 ms</td>
          <td style="padding: 10px; color: #2563eb;">Activo</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px; font-weight: 500;">Compresión Lempel-Ziv</td>
          <td style="padding: 10px; color: #16a34a; font-weight: 600;">99.90%</td>
          <td style="padding: 10px;">&lt; 20 ms</td>
          <td style="padding: 10px; color: #2563eb;">Activo</td>
        </tr>
      </tbody>
    </table>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Cualquier modificación o alteración a los parámetros de balanceo requerirá de la validación criptográfica multi-firma de al menos dos delegados autorizados de seguridad técnica.
    </p>
  `);

  // Shapes & Images state
  const [shapes, setShapes] = useState<CanvasShape[]>([
    {
      id: 'shape_initial_1',
      type: 'diamond',
      x: 640,
      y: 50,
      width: 70,
      height: 70,
      fill: '#3b82f6',
      stroke: '#1d4ed8',
      strokeWidth: 2,
      opacity: 0.85,
    },
  ]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);

  const [images, setImages] = useState<CanvasImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  // Modals state
  const [isShapesModalOpen, setIsShapesModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([
    {
      id: 't_init',
      title: 'DocuFlow Pro Activado',
      description: 'Motor WASM y editor tipo Word inicializados correctamente.',
      type: 'info',
    },
  ]);

  const showToast = (
    title: string,
    description?: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Document Formatting Actions
  const handleFormatDoc = (command: string, value?: string) => {
    if (command === 'paste') {
      navigator.clipboard.readText().then((text) => {
        document.execCommand('insertText', false, text);
        showToast('Texto pegado', 'Contenido insertado desde el portapapeles', 'info');
      }).catch(() => {
        showToast('Portapapeles', 'Usa Ctrl+V para pegar directamente', 'info');
      });
      return;
    }
    document.execCommand(command, false, value);
  };

  // Undo / Redo
  const handleUndo = () => {
    document.execCommand('undo');
    showToast('Deshacer', 'Acción deshecha', 'info');
  };

  const handleRedo = () => {
    document.execCommand('redo');
    showToast('Rehacer', 'Acción restaurada', 'info');
  };

  // Export to PDF
  const handleExportPdf = async () => {
    const canvasElement = document.getElementById('pdf-page-canvas');
    if (!canvasElement) return;

    showToast('Generando PDF...', 'Renderizando documento con alta fidelidad gráfica.', 'info');
    try {
      const canvas = await html2canvas(canvasElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`documento_docuflow_${Date.now()}.pdf`);

      showToast('¡PDF exportado con éxito!', 'El documento ha sido compilado y descargado.', 'success');
    } catch (err: any) {
      showToast('Error al exportar', err.message || 'No se pudo generar el PDF', 'error');
    }
  };

  // Insert Table via Modal
  const confirmInsertTable = () => {
    let html = `<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;"><thead><tr style="background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1;">`;
    for (let c = 0; c < tableCols; c++) {
      html += `<th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Encabezado ${c + 1}</th>`;
    }
    html += `</tr></thead><tbody>`;
    for (let r = 0; r < tableRows; r++) {
      html += `<tr>`;
      for (let c = 0; c < tableCols; c++) {
        html += `<td style="padding: 8px; border: 1px solid #e2e8f0;">Fila ${r + 1}, Col ${c + 1}</td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table><p><br></p>`;

    document.execCommand('insertHTML', false, html);
    setIsTableModalOpen(false);
    showToast('Tabla insertada', `Se creó una tabla de ${tableRows} filas x ${tableCols} columnas.`, 'success');
  };

  // Insert Image from disk
  const handleInsertImageFromDisk = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImg: CanvasImage = {
            id: `img_${Date.now()}`,
            src: event.target?.result as string,
            x: 180,
            y: 180,
            width: 240,
            height: 180,
            opacity: 1,
          };
          setImages((prev) => [...prev, newImg]);
          setSelectedImageId(newImg.id);
          showToast('Imagen cargada', file.name, 'success');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Shapes management
  const handleAddShape = (newShape: CanvasShape) => {
    setShapes((prev) => [...prev, newShape]);
    setSelectedShapeId(newShape.id);
    showToast('Figura agregada', `Figura de tipo "${newShape.type}" colocada en el documento.`, 'success');
  };

  const handleUpdateShape = (updated: CanvasShape) => {
    setShapes((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteShape = (id: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== id));
    if (selectedShapeId === id) setSelectedShapeId(null);
    showToast('Figura eliminada', 'Se removió la figura del documento.', 'info');
  };

  const selectedShapeObj = shapes.find((s) => s.id === selectedShapeId) || null;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'}`}>
      {/* Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Top Header & Ribbon Toolbar */}
      <HeaderToolbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onExportPdf={handleExportPdf}
        onInsertTable={() => setIsTableModalOpen(true)}
        onInsertImage={handleInsertImageFromDisk}
        onOpenShapesModal={() => setIsShapesModalOpen(true)}
        onFormatDoc={handleFormatDoc}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />

      {/* Main View Area based on tab */}
      <main className="w-full">
        {activeTab === 'editor' && (
          <DocumentEditor
            contentHtml={contentHtml}
            onChangeContent={setContentHtml}
            shapes={shapes}
            onUpdateShape={handleUpdateShape}
            onDeleteShape={handleDeleteShape}
            selectedShapeId={selectedShapeId}
            onSelectShapeId={setSelectedShapeId}
            images={images}
            onAddImage={(img) => setImages((prev) => [...prev, img])}
            onUpdateImage={(img) => setImages((prev) => prev.map((i) => (i.id === img.id ? img : i)))}
            onDeleteImage={(id) => setImages((prev) => prev.filter((i) => i.id !== id))}
            selectedImageId={selectedImageId}
            onSelectImageId={setSelectedImageId}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'shapes' && (
          <div className="max-w-6xl mx-auto py-6">
            <ShapesResourcePanel
              onAddShape={handleAddShape}
              selectedShape={selectedShapeObj}
              onUpdateShape={handleUpdateShape}
              onDeleteShape={handleDeleteShape}
              shapesList={shapes}
              onSelectShape={(s) => setSelectedShapeId(s ? s.id : null)}
            />
          </div>
        )}

        {activeTab === 'tools' && (
          <AdvancedPdfTools onShowToast={showToast} />
        )}

        {activeTab === 'converter' && (
          <DocumentConverter onShowToast={showToast} editorHtmlContent={contentHtml} />
        )}
      </main>

      {/* MODAL 1: INSERT TABLE */}
      <Modal
        isOpen={isTableModalOpen}
        title="Insertar Tabla interactiva"
        subtitle="Configura las dimensiones de la tabla editable"
        onClose={() => setIsTableModalOpen(false)}
        footer={
          <>
            <button
              onClick={() => setIsTableModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmInsertTable}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Insertar Tabla
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Número de Filas</label>
              <input
                type="number"
                min="1"
                max="20"
                value={tableRows}
                onChange={(e) => setTableRows(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Número de Columnas</label>
              <input
                type="number"
                min="1"
                max="10"
                value={tableCols}
                onChange={(e) => setTableCols(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100"
              />
            </div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-400">
            La tabla insertada puede ser editada directamente en cualquier celda dentro del lienzo estilo Word.
          </div>
        </div>
      </Modal>

      {/* MODAL 2: SHAPES QUICK INSERT */}
      <Modal
        isOpen={isShapesModalOpen}
        title="Biblioteca de Figuras y Formas Geométricas"
        subtitle="Agrega formas vectoriales, rombos, flechas y polígonos regulares"
        onClose={() => setIsShapesModalOpen(false)}
        maxWidth="max-w-4xl"
      >
        <ShapesResourcePanel
          onAddShape={(shape) => {
            handleAddShape(shape);
            setIsShapesModalOpen(false);
          }}
          selectedShape={selectedShapeObj}
          onUpdateShape={handleUpdateShape}
          onDeleteShape={handleDeleteShape}
          shapesList={shapes}
          onSelectShape={(s) => setSelectedShapeId(s ? s.id : null)}
        />
      </Modal>
    </div>
  );
}

export default App;
