import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ExportElementToPdfOptions {
  fileName: string;
  marginMm?: number;
  ignoreElements?: (element: Element) => boolean;
}

export async function exportElementToPdf(
  element: HTMLElement,
  options: ExportElementToPdfOptions
) {
  const marginMm = options.marginMm ?? 8;
  const pageWidthMm = 210;
  const pageHeightMm = 297;
  const contentWidthMm = pageWidthMm - marginMm * 2;
  const contentHeightMm = pageHeightMm - marginMm * 2;

  const canvas = await html2canvas(element, {
    scale: Math.max(window.devicePixelRatio, 2),
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    ignoreElements: options.ignoreElements,
  });

  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const imageHeightMm = (canvas.height * contentWidthMm) / canvas.width;
  let remainingHeightMm = imageHeightMm;
  let offsetYMm = 0;

  pdf.addImage(
    imageData,
    'PNG',
    marginMm,
    marginMm + offsetYMm,
    contentWidthMm,
    imageHeightMm,
    undefined,
    'FAST'
  );
  remainingHeightMm -= contentHeightMm;

  while (remainingHeightMm > 0) {
    offsetYMm = remainingHeightMm - imageHeightMm;
    pdf.addPage();
    pdf.addImage(
      imageData,
      'PNG',
      marginMm,
      marginMm + offsetYMm,
      contentWidthMm,
      imageHeightMm,
      undefined,
      'FAST'
    );
    remainingHeightMm -= contentHeightMm;
  }

  pdf.save(options.fileName);
}
