import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';


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
    inputMunicipio: new FormControl(''),
    inputFecha: new FormControl(''),
    inputColegiatura: new FormControl(''),
    inputCheckMora: new FormControl(false),
    inputMora: new FormControl(''),
    importFile: new FormControl('', Validators.required)
  });

  constructor(
    private httpClient: HttpClient
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

  enviarFormulario(data) {

    const arhivoPdf = this.inputFilePdf.nativeElement.files[0];

    const formulario = new FormData();
    formulario.set('municipio', this.formularioPago.controls.inputMunicipio.value);
    formulario.set('fecha', this.formularioPago.controls.inputFecha.value);
    formulario.set('colegiatura', this.formularioPago.controls.inputColegiatura.value);
    formulario.set('mora', this.formularioPago.controls.inputCheckMora.value);
    formulario.set('montoMora', this.formularioPago.controls.inputMora.value);
    formulario.set('boletaPago', arhivoPdf);

    this.httpClient.post<any>(this.SERVER_URL, formulario).subscribe(
      (res) => {
        window.open('http://localhost:3000/' + res.file);
        console.log(res);
      },
      (err) => console.log('ocurrio error')
    );
  }

  onChangeMora(){
    if(this.formularioPago.controls.inputCheckMora.value){
      this.formularioPago.controls.inputMora.enable();
    }else{
      this.formularioPago.controls.inputMora.disable();
    }
  }

}
