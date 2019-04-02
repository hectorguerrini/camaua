import { Component, OnInit } from "@angular/core";
import { VendasService } from './vendas.service';

@Component({
  selector: "app-vendas",
  templateUrl: "./vendas.component.html",
  styleUrls: ["./vendas.component.scss"]
})
export class VendasComponent implements OnInit {
  tipoVenda: string = "aluno";
  RA: string;
  CPF: string;
  sexo: string;
  lote: number;
  alimento: number;
  combo: number;
  numeroIngresso: string;
  nome: string;
  periodo: string;
  id_festa: number;
  nomeFesta: string;
  id_aluno: number;
  nomeConvidado: string;
  valores = [
    { tipo: "aluno", lote: 1, valor: 55 },
    { tipo: "aluno", lote: 2, valor: 60 },
    { tipo: "aluno", lote: 3, valor: 65 },
    { tipo: "convidado", lote: 1, valor: 70 },
    { tipo: "convidado", lote: 2, valor: 80 },
    { tipo: "convidado", lote: 3, valor: 90 }
  ];
  constructor(private vendasService: VendasService) {
    this.getFesta();
  }

  ngOnInit() {}
  getFesta(): void{
    this.vendasService.getFesta()
    .subscribe((data: {jsonRetorno: Array<any>}) => {
      this.id_festa = data.jsonRetorno[0].id_festa;
      this.nomeFesta = data.jsonRetorno[0].nome;
    })
  }

  getAluno(): void{
    this.vendasService.getAluno(this.RA, this.id_festa)
    .subscribe((data: {jsonRetorno: Array<any>}) => {
      this.nome = data.jsonRetorno[0].nome;
      this.periodo = data.jsonRetorno[0].periodo;
      this.id_aluno = data.jsonRetorno[0].id_aluno;
    });
  }
  
  finalizarVenda(): void{
    let valor = this.valorFinal();
    if(this.tipoVenda === 'aluno'){
      this.vendasService.updateVendaAluno(
        this.id_festa, 1, valor, this.sexo,
        this.alimento, this.id_aluno, this.lote,
        this.combo, this.numeroIngresso
      ).subscribe((data: {jsonRetorno: Array<any>}) => {
        if(data.jsonRetorno.length > 0){
          this.zerarCampos();
        }
      })
    } else if(this.tipoVenda === 'convidado'){
      this.vendasService.updateVendaConvidado(
        this.id_festa, 1, valor, this.sexo,
        this.alimento, this.CPF, this.lote,
        this.combo, this.nomeConvidado, this.numeroIngresso
      ).subscribe((data: {jsonRetorno: Array<any>}) => {
        if(data.jsonRetorno.length > 0){
          this.zerarCampos();
        }
      })
    }

  }

  zerarCampos(): void {
    this.RA = '';
    this.CPF = '';
    this.sexo = '';
    this.lote = 0;
    this.alimento = -1;
    this.combo = -1;
    this.numeroIngresso = '';
    this.nome = '';
    this.periodo = '';
    this.id_aluno = 0;
    this.nomeConvidado = '';
  }
  valorFinal(): number {
    const valor = this.valores.find(
      el => el.tipo === this.tipoVenda && el.lote === this.lote
    );
    let result = 0;
    if (valor) {
      result = valor.valor;
      if (this.alimento) {
        result -= 5;
      }
      if (this.combo) {
        result += 12;
      }
    }

    return result;
  }
}
