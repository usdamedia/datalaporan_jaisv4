import generatePDF, { Resolution, Margin } from 'react-to-pdf';

interface ExportElementToPdfOptions {
  fileName: string;
  marginMm?: number;
  ignoreElements?: (element: Element) => boolean;
}

export async function exportElementToPdf(
  element: HTMLElement | (() => HTMLElement | null),
  options: ExportElementToPdfOptions
) {
  const getTargetElement = typeof element === 'function' ? element : () => element;

  const pdfOptions = {
    filename: options.fileName,
    method: 'save',
    resolution: Resolution.MEDIUM,
    page: {
      margin: options.marginMm ?? Margin.SMALL,
      format: 'a4',
      orientation: 'portrait',
    },
    overrides: {
      canvas: {
        useCORS: true,
        ignoreElements: options.ignoreElements,
      },
    },
  };

  await generatePDF(getTargetElement as any, pdfOptions as any);
}
