import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface UsePrintViewOptions {
  documentTitle: string;
}

export const usePrintView = <T extends HTMLElement>({ documentTitle }: UsePrintViewOptions) => {
  const contentRef = useRef<T>(null);

  const pageStyle = useMemo(
    () => `
      @page {
        size: A4 portrait;
        margin: 12mm;
      }

      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        html, body {
          background: #ffffff !important;
        }
      }
    `,
    []
  );

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
    pageStyle,
  });

  return {
    contentRef,
    handlePrint,
  };
};
