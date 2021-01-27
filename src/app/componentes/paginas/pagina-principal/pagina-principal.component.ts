import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { LlenarBoletaService } from 'src/app/servicios/llenar-boleta.service';


declare var $: any;

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('inputFilePdf', { static: false }) inputFilePdf: ElementRef;

  SERVER_URL = "http://localhost:3000/upload";


  fileToUpload: File = null;

  formularioPago = new FormGroup({
    inputMunicipio: new FormControl('Los Amates'),
    inputFecha: new FormControl('2021-01-27'),
    inputColegiatura: new FormControl('1630'),
    inputPagoEfectivo: new FormControl('1630'),
    inputPagoCheque: new FormControl('50'),
    inputCheckMora: new FormControl(true),
    inputMora: new FormControl('50'),
    importFile: new FormControl('', Validators.required)
  });

  constructor(
    private httpClient: HttpClient,
    private llenarBoletaService: LlenarBoletaService
  ) { }

  ngOnInit(): void {
    this.formularioPago.controls.inputMora.disable();
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  async enviarFormulario(data) {

    // const archivoPdf = this.inputFilePdf.nativeElement.files[0];
    // console.log(await this.fileToUpload.arrayBuffer());

    const boleta = {
      colegiatura: this.formularioPago.value.inputColegiatura,
      pagoCheque: this.formularioPago.value.inputPagoCheque,
      pagoEfectivo: this.formularioPago.value.inputPagoEfectivo,
      mora: this.formularioPago.value.inputCheckMora,
      montoMora: this.formularioPago.value.inputMora,
      fecha: this.formularioPago.value.inputFecha,
      municipio: this.formularioPago.value.inputMunicipio
    }
    

    if (this.fileToUpload) {

      const existingPdfBytes = await this.fileToUpload.arrayBuffer();
      this.llenarBoletaService.modificarBoleta(boleta, existingPdfBytes);


    } else {

    }



    // const formulario = new FormData();
    // formulario.set('municipio', this.formularioPago.controls.inputMunicipio.value);
    // formulario.set('fecha', this.formularioPago.controls.inputFecha.value);
    // formulario.set('colegiatura', this.formularioPago.controls.inputColegiatura.value);
    // formulario.set('mora', this.formularioPago.controls.inputCheckMora.value);
    // formulario.set('montoMora', this.formularioPago.controls.inputMora.value);
    // formulario.set('boletaPago', arhivoPdf);

    // this.httpClient.post<any>(this.SERVER_URL, formulario).subscribe(
    //   (res) => {
    //     window.open('http://localhost:3000/' + res.file);
    //     console.log(res);
    //   },
    //   (err) => console.log('ocurrio error')
    // );
  }

  onChangeMora() {
    if (this.formularioPago.controls.inputCheckMora.value) {
      this.formularioPago.controls.inputMora.enable();
    } else {
      this.formularioPago.controls.inputMora.disable();
    }
  }

}
