import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

@Injectable({
  providedIn: 'root'
})
export class LlenarBoletaService {

  constructor() { }

  async modificarBoleta(boleta: any, existingPdfBytes: ArrayBuffer) {

    console.log(boleta);
    

    const fechas = boleta.fecha.split('-');

    let montoMora = boleta.montoMora;
    const pagoCheque = boleta.pagoCheque;
    const pagoEfectivo = boleta.pagoEfectivo;

    if (isNaN(montoMora)) {
      montoMora = 0;
    }

    const totalAPagar = Number(boleta.colegiatura) + Number(montoMora);
    console.log('total: ' + totalAPagar);


    //Carga los bytes del documento pdf
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Carga en memoria el tipo de letra Helvetica
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Obtiene la primera pagina del documento pdf
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // ------------------------------------

    // Obtiene el alto y ancho de la primera pagina
    const { width, height } = firstPage.getSize()

    // Escribe texto en el documento en las coordenadas dadas
    firstPage.drawText(Number(totalAPagar).toFixed(2), {
      x: 128,
      y: height / 2 + 237,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    if (montoMora > 0 && boleta.mora == true) {
      firstPage.drawText(Number(montoMora).toFixed(2), {
        x: 139,
        y: height / 2 + 248,
        size: 10,
        font: helveticaFont,
        // color: rgb(0.95, 0.1, 0.1),
      });
    }

    firstPage.drawText(boleta.municipio, {
      x: 242,
      y: height / 2 + 290,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    firstPage.drawText(fechas[2] + '             ' + fechas[1] + '             ' + fechas[0], {
      x: 335,
      y: height / 2 + 290,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    if (!isNaN(pagoEfectivo)) {
      if (pagoEfectivo > 0) {
        firstPage.drawText(pagoEfectivo + '     00', {
          x: 403,
          y: height / 2 + 250,
          size: 10,
          font: helveticaFont,
        });
      }
    }

    if (!isNaN(pagoCheque)) {
      if (pagoCheque > 0) {
        firstPage.drawText(boleta.pagoCheque + '     00', {
          x: 408,
          y: height / 2 + 232,
          size: 10,
          font: helveticaFont,
        });
      }
    }

    firstPage.drawText(totalAPagar + '     00', {
      x: 403,
      y: height / 2 + 218,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Escribe texto en el documento en las coordenadas dadas
    firstPage.drawText(Number(totalAPagar).toFixed(2), {
      x: 128,
      y: height / 2 + -23,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });


    firstPage.drawText(boleta.municipio, {
      x: 242,
      y: height / 2 + 30,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    firstPage.drawText(fechas[2] + '             ' + fechas[1] + '             ' + fechas[0], {
      x: 335,
      y: height / 2 + 30,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    if (!isNaN(pagoEfectivo)) {
      if (pagoEfectivo > 0) {
        firstPage.drawText(boleta.colegiatura + '     00', {
          x: 403,
          y: height / 2 + -10,
          size: 10,
          font: helveticaFont,
          // color: rgb(0.95, 0.1, 0.1),
        });
      }
    }

    if (!isNaN(pagoCheque)) {
      if (pagoCheque > 0) {
        firstPage.drawText(pagoCheque + '     00', {
          x: 408,
          y: height / 2 + -28,
          size: 10,
          font: helveticaFont,
          // color: rgb(0.95, 0.1, 0.1),
        });
      }
    }

    firstPage.drawText(totalAPagar + '     00', {
      x: 403,
      y: height / 2 + -42,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Escribe texto en el documento en las coordenadas dadas
    firstPage.drawText(Number(totalAPagar).toFixed(2), {
      x: 128,
      y: height / 2 + -282,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    firstPage.drawText(boleta.municipio, {
      x: 242,
      y: height / 2 + -230,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    firstPage.drawText(fechas[2] + '             ' + fechas[1] + '             ' + fechas[0], {
      x: 335,
      y: height / 2 + -230,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });

    if (!isNaN(pagoEfectivo)) {
      if (pagoEfectivo > 0) {
        firstPage.drawText(pagoEfectivo + '     00', {
          x: 403,
          y: height / 2 + -270,
          size: 10,
          font: helveticaFont,
          // color: rgb(0.95, 0.1, 0.1),
        });
      }
    }

    if (!isNaN(pagoCheque)) {
      if (pagoCheque > 0) {
        firstPage.drawText(pagoCheque + '     00', {
          x: 408,
          y: height / 2 + -288,
          size: 10,
          font: helveticaFont,
          // color: rgb(0.95, 0.1, 0.1),
        });
      }
    }

    firstPage.drawText(totalAPagar + '     00', {
      x: 403,
      y: height / 2 + -302,
      size: 10,
      font: helveticaFont,
      // color: rgb(0.95, 0.1, 0.1),
    });



    // Guarda los cambios hechos en los bytes del pdf cargado en memoria
    const pdfBytes = await pdfDoc.save();

    var blob = new Blob([pdfBytes], { type: 'application/pdf' });
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);


  }

}
