import React from 'react';
import { 
  FileText, 
  Search, 
  Undo, 
  Redo, 
  Sun, 
  Moon, 
  Download, 
  CloudCheck, 
  Scissors, 
  Copy, 
  Clipboard, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  List, 
  ListOrdered, 
  Table, 
  Image as ImageIcon, 
  Shapes, 
  Split, 
  Layers, 
  FileSpreadsheet, 
  Sparkles 
} from 'lucide-react';

interface HeaderToolbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onExportPdf: () => void;
  onInsertTable: () => void;
  onInsertImage: () => void;
  onOpenShapesModal: () => void;
  onFormatDoc: (command: string, value?: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

export const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  darkMode,
  onToggleTheme,
  activeTab,
  onSelectTab,
  onUndo,
  onRedo,
  onExportPdf,
  onInsertTable,
  onInsertImage,
  onOpenShapesModal,
  onFormatDoc,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-lg">
      {/* Top Main Bar */}
      <div className="h-14 px-4 flex items-center justify-between gap-4">
        {/* Brand & Status */}
        <div className="flex items-center gap-3 min-w-[240px]">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">DocuFlow</span>
              <span className="text-blue-400 font-semibold text-base">Pro</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-300 text-[10px] uppercase font-semibold border border-blue-700/50">WASM</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <CloudCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Sincronizado Local</span>
            </div>
          </div>
        </div>

        {/* Global Search / Quick Action */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar herramientas, comandos, textos... (Ctrl+K)"
              className="w-full h-9 pl-9 pr-12 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <kbd className="absolute right-2.5 px-1.5 py-0.5 rounded bg-slate-700 text-[10px] text-slate-300">Ctrl+K</kbd>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={onUndo}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Deshacer (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={onRedo}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Rehacer (Ctrl+Y)"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onToggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Cambiar tema Claro / Oscuro"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-300" />}
          </button>

          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-sm shadow-blue-500/30"
            title="Exportar a PDF"
          >
            <Download className="w-4 h-4" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Primary Section Tabs (Word-like ribbon tabs) */}
      <div className="h-10 px-4 flex items-center gap-1 bg-slate-950/70 border-t border-slate-800 overflow-x-auto">
        {[
          { id: 'editor', label: 'Inicio & Edición', icon: FileText },
          { id: 'shapes', label: 'Figuras & Recursos', icon: Shapes },
          { id: 'tools', label: 'Herramientas PDF (Merge/Split/Compress)', icon: Split },
          { id: 'converter', label: 'Conversor a Word & Formatos', icon: FileSpreadsheet },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`h-full px-3.5 flex items-center gap-2 text-xs font-medium transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-blue-500 text-blue-400 bg-slate-800/80'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Ribbon Toolbar - Visible in Editor tab */}
      {activeTab === 'editor' && (
        <div className="p-2 bg-slate-900 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
          {/* Clipboard Group */}
          <div className="flex items-center gap-1 bg-slate-800/70 p-1 rounded-lg border border-slate-700/60">
            <button
              onClick={() => onFormatDoc('paste')}
              className="px-2 py-1 flex items-center gap-1 rounded text-xs text-slate-200 hover:bg-slate-700"
              title="Pegar portapapeles"
            >
              <Clipboard className="w-3.5 h-3.5 text-blue-400" />
              <span>Pegar</span>
            </button>
            <button
              onClick={() => onFormatDoc('copy')}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700"
              title="Copiar selección"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('cut')}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700"
              title="Cortar"
            >
              <Scissors className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-6 bg-slate-700"></div>

          {/* Font Family & Size */}
          <div className="flex items-center gap-1.5 bg-slate-800/70 p-1 rounded-lg border border-slate-700/60">
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                onFormatDoc('fontName', e.target.value);
              }}
              className="h-7 px-2 text-xs bg-slate-900 border border-slate-700 text-slate-200 rounded focus:outline-none"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Georgia, serif">Georgia</option>
            </select>

            <select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                onFormatDoc('fontSize', e.target.value);
              }}
              className="h-7 px-1.5 text-xs bg-slate-900 border border-slate-700 text-slate-200 rounded focus:outline-none"
            >
              <option value="1">10 pt</option>
              <option value="2">12 pt</option>
              <option value="3">14 pt</option>
              <option value="4">16 pt</option>
              <option value="5">20 pt</option>
              <option value="6">26 pt</option>
              <option value="7">34 pt</option>
            </select>
          </div>

          <div className="w-[1px] h-6 bg-slate-700"></div>

          {/* Text Style: Bold, Italic, Underline, Strikethrough */}
          <div className="flex items-center gap-0.5 bg-slate-800/70 p-1 rounded-lg border border-slate-700/60">
            <button
              onClick={() => onFormatDoc('bold')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700 font-bold"
              title="Negrita (Ctrl+B)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('italic')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Cursiva (Ctrl+I)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('underline')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Subrayado (Ctrl+U)"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('strikeThrough')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Tachado"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-6 bg-slate-700"></div>

          {/* Alignment */}
          <div className="flex items-center gap-0.5 bg-slate-800/70 p-1 rounded-lg border border-slate-700/60">
            <button
              onClick={() => onFormatDoc('justifyLeft')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Alinear Izquierda"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('justifyCenter')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Centrar"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('justifyRight')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Alinear Derecha"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('justifyFull')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Justificar"
            >
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-6 bg-slate-700"></div>

          {/* Lists & Structure */}
          <div className="flex items-center gap-0.5 bg-slate-800/70 p-1 rounded-lg border border-slate-700/60">
            <button
              onClick={() => onFormatDoc('insertUnorderedList')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Lista con viñetas"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFormatDoc('insertOrderedList')}
              className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-700"
              title="Lista numerada"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-6 bg-slate-700"></div>

          {/* Insert Quick Objects */}
          <div className="flex items-center gap-1.5 bg-slate-800/70 p-1 rounded-lg border border-slate-700/60">
            <button
              onClick={onInsertTable}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-200 hover:bg-slate-700"
              title="Insertar Tabla interactiva"
            >
              <Table className="w-3.5 h-3.5 text-blue-400" />
              <span>Tabla</span>
            </button>

            <button
              onClick={onInsertImage}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-200 hover:bg-slate-700"
              title="Insertar Imagen desde archivo o Ctrl+V"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Imagen</span>
            </button>

            <button
              onClick={onOpenShapesModal}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-200 hover:bg-slate-700"
              title="Insertar Formas, Flechas, Rombo, Polígonos de N lados..."
            >
              <Shapes className="w-3.5 h-3.5 text-purple-400" />
              <span>Formas</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
