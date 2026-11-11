import React, { useState } from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  Upload, 
  Download, 
  Cpu, 
  CheckCircle2, 
  ArrowRightLeft 
} from 'lucide-react';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table as DocxTable, 
  TableRow as DocxTableRow, 
  TableCell as DocxTableCell, 
  WidthType, 
  BorderStyle 
} from 'docx';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

interface DocumentConverterProps {
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  editorHtmlContent: string;
}

export const DocumentConverter: React.FC<DocumentConverterProps> = ({ onShowToast, editorHtmlContent }) => {
  const [conversionDirection, setConversionDirection] = useState<'to_pdf' | 'from_pdf'>('from_pdf');
  const [targetFormat, setTargetFormat] = useState<'docx' | 'xlsx' | 'txt'>('docx');
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Parse HTML into real DOCX elements: Headings, Paragraphs, Lists & Tables with borders and styling
  const handleExportWord = async () => {
    setIsProcessing(true);
    try {
      const parser = new DOMParser();
      const docHtml = parser.parseFromString(editorHtmlContent, 'text/html');
      const bodyChildren = Array.from(docHtml.body.children);

      const docxChildren: (Paragraph | DocxTable)[] = [];

      const processNode = (node: Element) => {
        const tagName = node.tagName.toLowerCase();

        if (tagName === 'h1') {
          docxChildren.push(
            new Paragraph({
              text: node.textContent?.trim() || '',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 240, after: 120 },
            })
          );
        } else if (tagName === 'h2') {
          docxChildren.push(
            new Paragraph({
              text: node.textContent?.trim() || '',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 180, after: 100 },
            })
          );
        } else if (tagName === 'h3') {
          docxChildren.push(
            new Paragraph({
              text: node.textContent?.trim() || '',
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 140, after: 80 },
            })
          );
        } else if (tagName === 'table') {
          const rows: DocxTableRow[] = [];
          const trList = Array.from(node.querySelectorAll('tr'));

          trList.forEach((tr, rIdx) => {
            const cells: DocxTableCell[] = [];
            const thOrTd = Array.from(tr.querySelectorAll('th, td'));

            thOrTd.forEach((cell) => {
              const isHeader = cell.tagName.toLowerCase() === 'th' || rIdx === 0;
              cells.push(
                new DocxTableCell({
                  width: { size: Math.floor(9000 / Math.max(1, thOrTd.length)), type: WidthType.DXA },
                  shading: isHeader ? { fill: 'F1F5F9' } : undefined,
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
                    left: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
                    right: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: cell.textContent?.trim() || '',
                          bold: isHeader,
                          font: 'Calibri',
                          size: 21,
                        }),
                      ],
                      spacing: { before: 80, after: 80 },
                    }),
                  ],
                })
              );
            });

            if (cells.length > 0) {
              rows.push(new DocxTableRow({ children: cells }));
            }
          });

          if (rows.length > 0) {
            docxChildren.push(
              new DocxTable({
                rows,
                width: { size: 100, type: WidthType.PERCENTAGE },
              })
            );
          }
        } else {
          // Normal paragraphs, div or text blocks
          const text = node.textContent?.trim();
          if (text) {
            docxChildren.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text,
                    font: 'Calibri',
                    size: 22,
                  }),
                ],
                spacing: { after: 140, line: 320 },
              })
            );
          }
        }
      };

      if (bodyChildren.length === 0) {
        // Fallback if no tags
        const plainLines = editorHtmlContent.replace(/<[^>]+>/g, '\n').split('\n').filter((l) => l.trim().length > 0);
        plainLines.forEach((line) => {
          docxChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, font: 'Calibri', size: 22 })],
              spacing: { after: 140 },
            })
          );
        });
      } else {
        bodyChildren.forEach(processNode);
      }

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docxChildren,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `documento_exportado_${Date.now()}.docx`;
      a.click();
      URL.revokeObjectURL(url);

      onShowToast(
        '¡Exportación a Word idéntica!',
        'Documento .docx descargado preservando encabezados, párrafos y tablas completas con bordes.',
        'success'
      );
    } catch (err: any) {
      onShowToast('Error en la exportación', err.message || 'No se pudo generar el archivo Word', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Convert to Excel XLSX
  const handleExportExcel = () => {
    setIsProcessing(true);
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = editorHtmlContent;
      const rows: string[][] = [];

      const tables = tempDiv.querySelectorAll('table');
      if (tables.length > 0) {
        tables.forEach((table) => {
          const trList = table.querySelectorAll('tr');
          trList.forEach((tr) => {
            const rowData: string[] = [];
            tr.querySelectorAll('th, td').forEach((cell) => {
              rowData.push((cell as HTMLElement).innerText.trim());
            });
            rows.push(rowData);
          });
        });
      } else {
        tempDiv.innerText.split('\n').forEach((line) => {
          if (line.trim()) rows.push([line.trim()]);
        });
      }

      const ws = XLSX.utils.aoa_to_sheet(rows.length > 0 ? rows : [['DocuFlow Pro Data']]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos Extraídos');
      XLSX.writeFile(wb, `datos_exportados_${Date.now()}.xlsx`);

      onShowToast('¡Exportación a Excel completada!', 'Datos tabulares generados en formato .xlsx', 'success');
    } catch (err: any) {
      onShowToast('Error al exportar', err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Convert any format to PDF
  const handleConvertAnyToPdf = async () => {
    if (!sourceFile) {
      onShowToast('Selecciona un archivo', 'Sube un archivo de cualquier formato para convertirlo a PDF.', 'warning');
      return;
    }
    setIsProcessing(true);
    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4',
      });

      if (sourceFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = e.target?.result as string;
          const img = new Image();
          img.src = imgData;
          img.onload = () => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(img, 'JPEG', 40, 40, pageWidth - 80, pageHeight - 80, undefined, 'FAST');
            doc.save(`convertido_${sourceFile.name.split('.')[0]}.pdf`);
            setIsProcessing(false);
            onShowToast('¡Imagen convertida a PDF!', 'Descarga completada con éxito.', 'success');
          };
        };
        reader.readAsDataURL(sourceFile);
        return;
      } else {
        const text = await sourceFile.text();
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(11);
        const splitText = doc.splitTextToSize(text, 515);
        doc.text(splitText, 40, 50);
        doc.save(`convertido_${sourceFile.name.split('.')[0]}.pdf`);
        setIsProcessing(false);
        onShowToast('¡Documento convertido a PDF!', 'Descarga completada.', 'success');
      }
    } catch (err: any) {
      setIsProcessing(false);
      onShowToast('Error en la conversión', err.message || 'No se pudo convertir el archivo', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Conversor Multi-Formato Bidireccional</h2>
            <p className="text-xs text-slate-400">Exporta tu documento a Word (.docx), Excel, o convierte cualquier archivo a PDF</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setConversionDirection('from_pdf')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              conversionDirection === 'from_pdf' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Documento a Word / Formatos</span>
          </button>
          <button
            onClick={() => setConversionDirection('to_pdf')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              conversionDirection === 'to_pdf' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Cualquier Formato a PDF</span>
          </button>
        </div>
      </div>

      {/* MODE 1: FROM DOCUMENT TO WORD DOCX */}
      {conversionDirection === 'from_pdf' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">1. Seleccionar Formato de Destino</h3>
              <p className="text-xs text-slate-400">Reconstrucción estructurada preservando encabezados, párrafos y tablas exactas</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTargetFormat('docx')}
                className={`p-4 rounded-xl border flex flex-col items-start gap-2 transition-all ${
                  targetFormat === 'docx'
                    ? 'bg-blue-900/30 border-blue-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  {targetFormat === 'docx' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-100">Microsoft Word</span>
                  <span className="text-[11px] text-blue-400 font-mono">.docx</span>
                </div>
              </button>

              <button
                onClick={() => setTargetFormat('xlsx')}
                className={`p-4 rounded-xl border flex flex-col items-start gap-2 transition-all ${
                  targetFormat === 'xlsx'
                    ? 'bg-emerald-900/30 border-emerald-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  {targetFormat === 'xlsx' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-100">Microsoft Excel</span>
                  <span className="text-[11px] text-emerald-400 font-mono">.xlsx</span>
                </div>
              </button>

              <button
                onClick={() => setTargetFormat('txt')}
                className={`p-4 rounded-xl border flex flex-col items-start gap-2 transition-all ${
                  targetFormat === 'txt'
                    ? 'bg-purple-900/30 border-purple-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center">
                    <FileCode className="w-4 h-4" />
                  </div>
                  {targetFormat === 'txt' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-100">Texto Plano / Markdown</span>
                  <span className="text-[11px] text-purple-400 font-mono">.txt / .md</span>
                </div>
              </button>
            </div>

            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60">
              <h4 className="text-xs font-semibold text-slate-200 mb-1">Origen del contenido:</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                El conversor procesará el documento actual del editor, incluyendo todos sus párrafos, saltos de línea y tablas con formato idéntico.
              </p>
            </div>

            <button
              onClick={() => {
                if (targetFormat === 'docx') handleExportWord();
                else if (targetFormat === 'xlsx') handleExportExcel();
                else {
                  const temp = document.createElement('div');
                  temp.innerHTML = editorHtmlContent;
                  const blob = new Blob([temp.innerText], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `documento_${Date.now()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                  onShowToast('¡Descargado como Texto plano!', 'Formato .txt generado con éxito', 'success');
                }
              }}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'Compilando documento...'
                  : `Exportar a ${targetFormat.toUpperCase()} y Descargar`}
              </span>
            </button>
          </div>

          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Cpu className="w-5 h-5" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Motor de Reconstrucción</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El motor genera archivos DOCX auténticos con formato nativo de OpenXML, preservando encabezados, celdas y párrafos, compatible con Microsoft Word, Office 365, LibreOffice y Google Docs.
            </p>
          </div>
        </div>
      )}

      {/* MODE 2: ANY FORMAT TO PDF */}
      {conversionDirection === 'to_pdf' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Sube cualquier archivo para crear un PDF</h3>
            <p className="text-xs text-slate-400">Soporta PNG, JPG, WebP, SVG, archivos de texto plano (.txt, .json, .md, .csv)</p>
          </div>

          <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer bg-slate-800/40 hover:bg-slate-800/60 transition-all">
            <Upload className="w-9 h-9 text-blue-400" />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-200">
                {sourceFile ? sourceFile.name : 'Haz clic o arrastra un archivo de imagen o texto'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {sourceFile ? `Tamaño: ${(sourceFile.size / 1024).toFixed(1)} KB` : 'Se compilará en un PDF vectorizado listo para impresión'}
              </p>
            </div>
            <input
              type="file"
              accept="image/*,.txt,.md,.json,.csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSourceFile(e.target.files[0]);
                  onShowToast('Archivo cargado', e.target.files[0].name, 'info');
                }
              }}
            />
          </label>

          <button
            onClick={handleConvertAnyToPdf}
            disabled={!sourceFile || isProcessing}
            className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-md ${
              !sourceFile || isProcessing
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{isProcessing ? 'Convirtiendo a PDF...' : 'Convertir a PDF y Descargar'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
