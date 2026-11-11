export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface ModalConfig {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface CanvasShape {
  id: string;
  type: 'rectangle' | 'ellipse' | 'polygon' | 'arrow' | 'callout' | 'diamond' | 'star';
  x: number;
  y: number;
  width: number;
  height: number;
  sides?: number; // Para polígonos de N lados o estrellas
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  rotation?: number;
  text?: string;
}

export interface CanvasImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  rotation?: number;
}

export interface PdfDocumentState {
  fileName: string;
  totalPages: number;
  currentPage: number;
  contentHtml: string;
  shapes: CanvasShape[];
  images: CanvasImage[];
}
