import React, { useEffect, useState, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import $ from "jquery";
import "turn.js";

// Set the worker source for pdf.js with a hardcoded version
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;


const PdfBook = () => {
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState(null);
  const flipbookRef = useRef(null);

  useEffect(() => {
    let isMounted = true; // To handle memory leaks

    const loadPDF = async () => {
      try {
        const pdf = await getDocument('/src/assets/RECEIPT.pdf').promise;

        if (isMounted) setNumPages(pdf.numPages);

        const renderPromises = [];
        const pageDivs = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          renderPromises.push(
            page.render(renderContext).promise.then(() => {
              const pageDiv = document.createElement('div');
              pageDiv.classList.add('page');
              pageDiv.appendChild(canvas);
              pageDivs.push(pageDiv); // Store rendered page div
            })
          );
        }

        await Promise.all(renderPromises);

        if (flipbookRef.current && isMounted) {
          pageDivs.forEach((pageDiv) => {
            flipbookRef.current.appendChild(pageDiv); // Append all pages in order
          });

          $(flipbookRef.current).turn({
            width: 600,
            height: 400,
            autoCenter: true,
          });
        }
      } catch (error) {
        if (isMounted) setError('Error loading or rendering the PDF');
        console.error("Error loading or rendering the PDF:", error);
      }
    };

    loadPDF();

    return () => {
      isMounted = false; // Clean up when component unmounts
    };
  }, []);

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div id="flipbook" ref={flipbookRef} style={{ margin: '0 auto' }}>
          {/* Flipbook pages will be dynamically appended here */}
        </div>
      )}
    </div>
  );
};

export default PdfBook;
