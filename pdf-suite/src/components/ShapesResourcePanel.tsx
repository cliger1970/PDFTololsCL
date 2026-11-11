import React, { useState } from 'react';
import { 
  Square, 
  Circle, 
  Diamond, 
  Hexagon, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Triangle, 
  Plus, 
  Layers, 
  Trash2, 
  Maximize2 
} from 'lucide-react';
import type { CanvasShape } from '../types';

interface ShapesResourcePanelProps {
  onAddShape: (shape: CanvasShape) => void;
  selectedShape: CanvasShape | null;
  onUpdateShape: (shape: CanvasShape) => void;
  onDeleteShape: (id: string) => void;
  shapesList: CanvasShape[];
  onSelectShape: (shape: CanvasShape | null) => void;
}

export const ShapesResourcePanel: React.FC<ShapesResourcePanelProps> = ({
  onAddShape,
  selectedShape,
  onUpdateShape,
  onDeleteShape,
  shapesList,
  onSelectShape,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'polygons' | 'arrows' | 'callouts'>('basic');
  const [customSides, setCustomSides] = useState<number>(5);
  const [fillColor, setFillColor] = useState<string>('#3b82f6');
  const [strokeColor, setStrokeColor] = useState<string>('#1d4ed8');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);

  const createShape = (
    type: CanvasShape['type'],
    sides?: number,
    text?: string
  ) => {
    const newShape: CanvasShape = {
      id: `shape_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      x: 150 + Math.floor(Math.random() * 80),
      y: 150 + Math.floor(Math.random() * 80),
      width: type === 'arrow' ? 140 : 120,
      height: type === 'arrow' ? 40 : 100,
      sides: sides || (type === 'polygon' ? customSides : undefined),
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      opacity: 0.9,
      rotation: 0,
      text: text || '',
    };
    onAddShape(newShape);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
      {/* Shapes Palette (Left 8 Cols) */}
      <div className="lg:col-span-8 space-y-5">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-700/80 pb-2">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'basic' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Square className="w-3.5 h-3.5" />
            <span>Formas Básicas</span>
          </button>
          <button
            onClick={() => setActiveTab('polygons')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'polygons' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Hexagon className="w-3.5 h-3.5" />
            <span>Polígonos N-Lados & Estrellas</span>
          </button>
          <button
            onClick={() => setActiveTab('arrows')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'arrows' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Flechas & Conectores</span>
          </button>
          <button
            onClick={() => setActiveTab('callouts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'callouts' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Llamadas & Globos</span>
          </button>
        </div>

        {/* Tab 1: Formas Básicas */}
        {activeTab === 'basic' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Rectángulo */}
            <button
              onClick={() => createShape('rectangle')}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2 group transition-all"
            >
              <div className="w-12 h-10 border-2 border-blue-400 bg-blue-500/20 rounded"></div>
              <span className="text-xs font-medium text-slate-200">Rectángulo</span>
            </button>

            {/* Elipse / Círculo */}
            <button
              onClick={() => createShape('ellipse')}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2 group transition-all"
            >
              <div className="w-12 h-10 border-2 border-emerald-400 bg-emerald-500/20 rounded-full"></div>
              <span className="text-xs font-medium text-slate-200">Elipse / Círculo</span>
            </button>

            {/* Rombo / Diamante */}
            <button
              onClick={() => createShape('diamond')}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2 group transition-all"
            >
              <div className="w-10 h-10 border-2 border-amber-400 bg-amber-500/20 rotate-45 rounded-sm"></div>
              <span className="text-xs font-medium text-slate-200">Rombo</span>
            </button>

            {/* Triángulo Convexo */}
            <button
              onClick={() => createShape('polygon', 3)}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2 group transition-all"
            >
              <Triangle className="w-10 h-10 text-purple-400" />
              <span className="text-xs font-medium text-slate-200">Triángulo</span>
            </button>
          </div>
        )}

        {/* Tab 2: Polígonos de N lados & Estrellas */}
        {activeTab === 'polygons' && (
          <div className="space-y-4">
            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/70 flex items-center justify-between gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-200 block">Número de lados (Polígono regular / convexo)</label>
                <span className="text-[11px] text-slate-400">Genera pentágonos, hexágonos, heptágonos, octágonos... (3 a 16 lados)</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="3"
                  max="16"
                  value={customSides}
                  onChange={(e) => setCustomSides(Math.max(3, Math.min(16, parseInt(e.target.value) || 3)))}
                  className="w-16 h-8 text-center bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 font-bold"
                />
                <button
                  onClick={() => createShape('polygon', customSides)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insertar Polígono ({customSides} lados)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => createShape('polygon', 5)}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
              >
                <Hexagon className="w-10 h-10 text-cyan-400" />
                <span className="text-xs font-medium text-slate-200">Pentágono (5)</span>
              </button>
              <button
                onClick={() => createShape('polygon', 6)}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
              >
                <Hexagon className="w-10 h-10 text-emerald-400" />
                <span className="text-xs font-medium text-slate-200">Hexágono (6)</span>
              </button>
              <button
                onClick={() => createShape('polygon', 8)}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
              >
                <Hexagon className="w-10 h-10 text-indigo-400" />
                <span className="text-xs font-medium text-slate-200">Octágono (8)</span>
              </button>
              <button
                onClick={() => createShape('star', 5)}
                className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
              >
                <Star className="w-10 h-10 text-amber-400" />
                <span className="text-xs font-medium text-slate-200">Estrella 5 Puntas</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Flechas & Conectores */}
        {activeTab === 'arrows' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => createShape('arrow')}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
            >
              <ArrowRight className="w-10 h-10 text-blue-400" />
              <span className="text-xs font-medium text-slate-200">Flecha Derecha</span>
            </button>
            <button
              onClick={() => {
                const s: CanvasShape = {
                  id: `shape_${Date.now()}`,
                  type: 'arrow',
                  x: 180,
                  y: 180,
                  width: 140,
                  height: 40,
                  fill: fillColor,
                  stroke: strokeColor,
                  strokeWidth,
                  opacity: 0.9,
                  rotation: 180,
                };
                onAddShape(s);
              }}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
            >
              <ArrowLeft className="w-10 h-10 text-blue-400" />
              <span className="text-xs font-medium text-slate-200">Flecha Izquierda</span>
            </button>
            <button
              onClick={() => {
                const s: CanvasShape = {
                  id: `shape_${Date.now()}`,
                  type: 'arrow',
                  x: 180,
                  y: 180,
                  width: 140,
                  height: 40,
                  fill: fillColor,
                  stroke: strokeColor,
                  strokeWidth,
                  opacity: 0.9,
                  rotation: -90,
                };
                onAddShape(s);
              }}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
            >
              <ArrowUp className="w-10 h-10 text-blue-400" />
              <span className="text-xs font-medium text-slate-200">Flecha Arriba</span>
            </button>
            <button
              onClick={() => {
                const s: CanvasShape = {
                  id: `shape_${Date.now()}`,
                  type: 'arrow',
                  x: 180,
                  y: 180,
                  width: 140,
                  height: 40,
                  fill: fillColor,
                  stroke: strokeColor,
                  strokeWidth,
                  opacity: 0.9,
                  rotation: 90,
                };
                onAddShape(s);
              }}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
            >
              <ArrowDown className="w-10 h-10 text-blue-400" />
              <span className="text-xs font-medium text-slate-200">Flecha Abajo</span>
            </button>
          </div>
        )}

        {/* Tab 4: Llamadas & Globos */}
        {activeTab === 'callouts' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => createShape('callout', undefined, 'Nota explicativa')}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 flex flex-col items-center gap-2"
            >
              <MessageSquare className="w-10 h-10 text-emerald-400" />
              <span className="text-xs font-medium text-slate-200">Globo Rectangular</span>
            </button>
          </div>
        )}

        {/* Existing Shapes on Canvas List */}
        <div className="mt-6 border-t border-slate-700/80 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Formas Insertadas en el Lienzo ({shapesList.length})
              </h4>
            </div>
            {selectedShape && (
              <button
                onClick={() => onSelectShape(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Deseleccionar
              </button>
            )}
          </div>

          {shapesList.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center bg-slate-800/40 rounded-xl border border-dashed border-slate-700">
              No hay figuras vectoriales en el documento aún. Haz clic en cualquiera de arriba para agregarla.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {shapesList.map((shape) => {
                const isSelected = selectedShape?.id === shape.id;
                return (
                  <div
                    key={shape.id}
                    onClick={() => onSelectShape(shape)}
                    className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-900/40 border-blue-500 text-white'
                        : 'bg-slate-800/70 border-slate-700/70 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-4 h-4 rounded shrink-0 border"
                        style={{ backgroundColor: shape.fill, borderColor: shape.stroke }}
                      ></div>
                      <span className="text-xs font-medium truncate capitalize">
                        {shape.type} {shape.sides ? `(${shape.sides} lados)` : ''}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteShape(shape.id);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      title="Eliminar figura"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Inspector / Properties (Right 4 Cols) */}
      <div className="lg:col-span-4 bg-slate-800/60 rounded-xl border border-slate-700/80 p-4 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 border-b border-slate-700/60 pb-2">
          {selectedShape ? 'Propiedades de la Figura Seleccionada' : 'Ajustes de Color Predefinidos'}
        </h4>

        {/* Fill Color */}
        <div>
          <label className="text-xs text-slate-300 block mb-1.5 font-medium">Color de Relleno</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedShape ? selectedShape.fill : fillColor}
              onChange={(e) => {
                setFillColor(e.target.value);
                if (selectedShape) {
                  onUpdateShape({ ...selectedShape, fill: e.target.value });
                }
              }}
              className="w-10 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-300 uppercase">
              {selectedShape ? selectedShape.fill : fillColor}
            </span>
          </div>
        </div>

        {/* Stroke Color */}
        <div>
          <label className="text-xs text-slate-300 block mb-1.5 font-medium">Color de Borde</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedShape ? selectedShape.stroke : strokeColor}
              onChange={(e) => {
                setStrokeColor(e.target.value);
                if (selectedShape) {
                  onUpdateShape({ ...selectedShape, stroke: e.target.value });
                }
              }}
              className="w-10 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-300 uppercase">
              {selectedShape ? selectedShape.stroke : strokeColor}
            </span>
          </div>
        </div>

        {/* Stroke Width */}
        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
            <span>Grosor de Borde</span>
            <span>{selectedShape ? selectedShape.strokeWidth : strokeWidth} px</span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            value={selectedShape ? selectedShape.strokeWidth : strokeWidth}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setStrokeWidth(val);
              if (selectedShape) {
                onUpdateShape({ ...selectedShape, strokeWidth: val });
              }
            }}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Opacity if selected */}
        {selectedShape && (
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
              <span>Opacidad</span>
              <span>{Math.round(selectedShape.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={selectedShape.opacity}
              onChange={(e) => {
                onUpdateShape({ ...selectedShape, opacity: parseFloat(e.target.value) });
              }}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        )}

        {/* Shape Size / Dimensions */}
        {selectedShape && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Ancho (px)</label>
              <input
                type="number"
                value={selectedShape.width}
                onChange={(e) => onUpdateShape({ ...selectedShape, width: Math.max(20, parseInt(e.target.value) || 20) })}
                className="w-full h-8 px-2 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Alto (px)</label>
              <input
                type="number"
                value={selectedShape.height}
                onChange={(e) => onUpdateShape({ ...selectedShape, height: Math.max(20, parseInt(e.target.value) || 20) })}
                className="w-full h-8 px-2 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200"
              />
            </div>
          </div>
        )}

        {/* Delete button */}
        {selectedShape && (
          <button
            onClick={() => onDeleteShape(selectedShape.id)}
            className="w-full py-2 px-3 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Eliminar esta figura</span>
          </button>
        )}
      </div>
    </div>
  );
};
