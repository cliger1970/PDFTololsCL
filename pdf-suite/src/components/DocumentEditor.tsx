import React, { useRef, useState, useEffect } from 'react';
import { 
  FileText, 
  Trash2, 
  Move,
  GripHorizontal
} from 'lucide-react';
import type { CanvasShape, CanvasImage } from '../types';

interface DocumentEditorProps {
  contentHtml: string;
  onChangeContent: (html: string) => void;
  shapes: CanvasShape[];
  onUpdateShape: (shape: CanvasShape) => void;
  onDeleteShape: (id: string) => void;
  selectedShapeId: string | null;
  onSelectShapeId: (id: string | null) => void;
  images: CanvasImage[];
  onAddImage: (img: CanvasImage) => void;
  onUpdateImage: (img: CanvasImage) => void;
  onDeleteImage: (id: string) => void;
  selectedImageId: string | null;
  onSelectImageId: (id: string | null) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  contentHtml,
  onChangeContent,
  shapes,
  onUpdateShape,
  onDeleteShape,
  selectedShapeId,
  onSelectShapeId,
  images,
  onAddImage,
  onUpdateImage,
  onDeleteImage,
  selectedImageId,
  onSelectImageId,
  onShowToast,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging state for shapes/images
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync content on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== contentHtml) {
      editorRef.current.innerHTML = contentHtml;
    }
  }, []);

  // Listen to paste events for images (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            const reader = new FileReader();
            reader.onload = (event) => {
              const src = event.target?.result as string;
              const newImg: CanvasImage = {
                id: `img_${Date.now()}`,
                src,
                x: 140,
                y: 180,
                width: 260,
                height: 190,
                opacity: 1,
              };
              onAddImage(newImg);
              onSelectImageId(newImg.id);
              onShowToast('Imagen insertada', 'Imagen pegada desde el portapapeles (Ctrl+V)', 'success');
            };
            reader.readAsDataURL(file);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onAddImage, onSelectImageId, onShowToast]);

  // Handle shape dragging
  const handleShapeMouseDown = (e: React.MouseEvent, shape: CanvasShape) => {
    e.stopPropagation();
    onSelectShapeId(shape.id);
    onSelectImageId(null);
    setDraggingId(shape.id);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Handle image dragging
  const handleImageMouseDown = (e: React.MouseEvent, img: CanvasImage) => {
    e.stopPropagation();
    onSelectImageId(img.id);
    onSelectShapeId(null);
    setDraggingId(img.id);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Global mouse move while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = Math.max(0, e.clientX - containerRect.left - dragOffset.x);
    const newY = Math.max(0, e.clientY - containerRect.top - dragOffset.y);

    const shape = shapes.find((s) => s.id === draggingId);
    if (shape) {
      onUpdateShape({ ...shape, x: newX, y: newY });
      return;
    }

    const img = images.find((i) => i.id === draggingId);
    if (img) {
      onUpdateImage({ ...img, x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const getPolygonPoints = (sides: number = 5, w: number, h: number) => {
    const rx = w / 2;
    const ry = h / 2;
    const cx = rx;
    const cy = ry;
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const getStarPoints = (pointsCount: number = 5, w: number, h: number) => {
    const outerRx = w / 2;
    const outerRy = h / 2;
    const innerRx = outerRx / 2.2;
    const innerRy = outerRy / 2.2;
    const cx = outerRx;
    const cy = outerRy;
    const pts: string[] = [];
    for (let i = 0; i < pointsCount * 2; i++) {
      const angle = (i * Math.PI) / pointsCount - Math.PI / 2;
      const rx = i % 2 === 0 ? outerRx : innerRx;
      const ry = i % 2 === 0 ? outerRy : innerRy;
      const x = cx + rx * Math.cos(angle);
      const y = cy + ry * Math.sin(angle);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  };

  return (
    <div
      className="w-full flex-1 flex flex-col items-center py-8 px-4 overflow-x-auto min-h-[calc(100vh-130px)] bg-slate-900/40"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => {
        onSelectShapeId(null);
        onSelectImageId(null);
      }}
    >
      {/* Wrapper to ensure full horizontal scroll reaches the left edge */}
      <div className="w-full flex justify-center min-w-fit">
        {/* A4 Sheet Container */}
        <div
          ref={containerRef}
          id="pdf-page-canvas"
          className="relative w-[820px] min-h-[1140px] bg-white text-slate-900 rounded-xl shadow-2xl p-16 select-text overflow-hidden transition-all border border-slate-200/80 dark:border-slate-800"
          style={{
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Document Header decoration */}
          <div className="pb-5 mb-6 border-b border-slate-200 flex items-center justify-between text-slate-400 select-none pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                DocuFlow Pro Suite • Documento A4
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">PÁGINA 1 / 1</span>
          </div>

          {/* Rich Editable Content Area (Word style) */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => {
              if (editorRef.current) {
                onChangeContent(editorRef.current.innerHTML);
              }
            }}
            className="document-content w-full min-h-[880px] outline-none leading-relaxed text-[13.5px] text-slate-800 space-y-3 focus:ring-0"
            style={{
              fontFamily: 'Inter, sans-serif',
            }}
          />

          {/* OVERLAY: Interactive Vector Shapes */}
          {shapes.map((shape) => {
            const isSelected = selectedShapeId === shape.id;
            return (
              <div
                key={shape.id}
                onMouseDown={(e) => handleShapeMouseDown(e, shape)}
                style={{
                  position: 'absolute',
                  left: `${shape.x}px`,
                  top: `${shape.y}px`,
                  width: `${shape.width}px`,
                  height: `${shape.height}px`,
                  transform: shape.rotation ? `rotate(${shape.rotation}deg)` : undefined,
                  cursor: 'move',
                  zIndex: isSelected ? 30 : 20,
                }}
                className={`group transition-all ${
                  isSelected
                    ? 'ring-2 ring-blue-500 rounded'
                    : 'hover:ring-1 hover:ring-blue-400/60 rounded'
                }`}
              >
                {/* Visible drag handle button for dark mode visibility */}
                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-md bg-slate-900 border border-slate-600 text-blue-400 flex items-center justify-center shadow-md cursor-move opacity-90 hover:opacity-100 hover:scale-110 transition-transform">
                  <Move className="w-3.5 h-3.5" />
                </div>

                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${shape.width} ${shape.height}`}
                  style={{ opacity: shape.opacity, overflow: 'visible' }}
                >
                  {shape.type === 'rectangle' && (
                    <rect
                      x="2"
                      y="2"
                      width={shape.width - 4}
                      height={shape.height - 4}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                      rx="4"
                    />
                  )}

                  {shape.type === 'ellipse' && (
                    <ellipse
                      cx={shape.width / 2}
                      cy={shape.height / 2}
                      rx={shape.width / 2 - 4}
                      ry={shape.height / 2 - 4}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                    />
                  )}

                  {shape.type === 'diamond' && (
                    <polygon
                      points={`${shape.width / 2},2 ${shape.width - 2},${shape.height / 2} ${shape.width / 2},${shape.height - 2} 2,${shape.height / 2}`}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                    />
                  )}

                  {shape.type === 'polygon' && (
                    <polygon
                      points={getPolygonPoints(shape.sides || 5, shape.width - 4, shape.height - 4)}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                    />
                  )}

                  {shape.type === 'star' && (
                    <polygon
                      points={getStarPoints(shape.sides || 5, shape.width - 4, shape.height - 4)}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                    />
                  )}

                  {shape.type === 'arrow' && (
                    <polygon
                      points={`0,${shape.height * 0.3} ${shape.width * 0.65},${shape.height * 0.3} ${shape.width * 0.65},0 ${shape.width},${shape.height / 2} ${shape.width * 0.65},${shape.height} ${shape.width * 0.65},${shape.height * 0.7} 0,${shape.height * 0.7}`}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      strokeWidth={shape.strokeWidth}
                    />
                  )}

                  {shape.type === 'callout' && (
                    <g>
                      <rect
                        x="2"
                        y="2"
                        width={shape.width - 4}
                        height={shape.height - 18}
                        rx="6"
                        fill={shape.fill}
                        stroke={shape.stroke}
                        strokeWidth={shape.strokeWidth}
                      />
                      <polygon
                        points={`${shape.width * 0.25},${shape.height - 18} ${shape.width * 0.4},${shape.height - 18} ${shape.width * 0.2},${shape.height - 2}`}
                        fill={shape.fill}
                        stroke={shape.stroke}
                        strokeWidth={shape.strokeWidth}
                      />
                    </g>
                  )}
                </svg>

                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteShape(shape.id);
                    }}
                    className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow hover:bg-rose-500"
                    title="Eliminar figura"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          {/* OVERLAY: Images */}
          {images.map((img) => {
            const isSelected = selectedImageId === img.id;
            return (
              <div
                key={img.id}
                onMouseDown={(e) => handleImageMouseDown(e, img)}
                style={{
                  position: 'absolute',
                  left: `${img.x}px`,
                  top: `${img.y}px`,
                  width: `${img.width}px`,
                  height: `${img.height}px`,
                  cursor: 'move',
                  zIndex: isSelected ? 30 : 20,
                }}
                className={`group rounded-lg overflow-hidden transition-all ${
                  isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-blue-400/60'
                }`}
              >
                {/* Drag handle button for images */}
                <div className="absolute top-1 left-1 w-6 h-6 rounded-md bg-slate-900/90 border border-slate-700 text-blue-400 flex items-center justify-center shadow-md cursor-move opacity-90 hover:opacity-100">
                  <GripHorizontal className="w-3.5 h-3.5" />
                </div>

                <img
                  src={img.src}
                  alt="Document asset"
                  className="w-full h-full object-cover rounded pointer-events-none"
                  style={{ opacity: img.opacity }}
                />

                {isSelected && (
                  <div className="absolute top-1 right-1 flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteImage(img.id);
                      }}
                      className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow hover:bg-rose-500"
                      title="Eliminar imagen"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
