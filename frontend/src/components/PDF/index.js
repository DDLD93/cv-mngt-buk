import config from '../../config';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import file from "../../sample/cv.pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export function PDFrender(url) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      
        <button disabled={pageNumber>1?false:true} onClick={()=>setPageNumber((prev)=> prev-1)} >Prev</button>
        <button style={{marginLeft:50}} disabled={pageNumber>=numPages?true:false} onClick={()=>setPageNumber((prev)=> prev+1)} >Next</button>
    </div>
  );
}