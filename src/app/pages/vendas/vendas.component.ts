import { Component, OnInit } from "@angular/core";
import { VendasService } from './vendas.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MessageComponent } from 'src/app/dialog/message/message.component';
import { SystemComponent } from 'src/app/dialog/system/system.component';

@Component({
  selector: "app-vendas",
  templateUrl: "./vendas.component.html",
  styleUrls: ["./vendas.component.scss"]
})
export class VendasComponent implements OnInit {
  tipoVenda: string = "aluno";
  RA: string;
  CPF: string = '';
  sexo: string;
  lote: number;
  alimento: number = null;
  camarote: number = null;
  combo: number = null;
  numeroIngresso: string;
  nome: string;
  periodo: string;
  id_festa: number;
  nomeFesta: string;
  id_aluno: number;
  nomeConvidado: string;
  id_vendedor: number;
  nomeVendedor: string;
  flag_alimento: number = 0;
  flag_camarote: number = 0;
  valores = [
    { tipo: "aluno", lote: 1, valor: 55 },
    { tipo: "aluno", lote: 2, valor: 60 },
    { tipo: "aluno", lote: 3, valor: 65 },
    { tipo: "convidado", lote: 1, valor: 70 },
    { tipo: "convidado", lote: 2, valor: 80 },
    { tipo: "convidado", lote: 3, valor: 90 }
  ];
  nLotes: Array<any>;
  cpfAnterior: string;
  nCombo: number;
  nAlimento: number;
  nConvite: number;
  constructor(private vendasService: VendasService, private loginService: LoginService, private router: Router,public dialog: MatDialog) {
    this.getFesta();

  }

  ngOnInit() {
    if(!this.loginService.isLogged){
      this.router.navigate([`login`]);
    } else {
      this.id_vendedor = parseInt(this.loginService.idLogged);
      this.nomeVendedor = this.loginService.userLogged;
    }

  }
  signOut() {
    this.loginService.setLogged(false, null, null);
    this.router.navigate([`login`]);

  }
  getLista(): void{
    this.vendasService.getLista(this.id_festa)
    .subscribe((data: {jsonRetorno: Array<any>}) => {
      if(data.jsonRetorno.length > 0 ){
        this.nLotes = [
          {lote:1,aluno_pista:0,aluno_alimento:0,convidado_pista:0,convidado_alimento:0},
          {lote:2,aluno_pista:0,aluno_alimento:0,convidado_pista:0,convidado_alimento:0},
          {lote:3,aluno_pista:0,aluno_alimento:0,convidado_pista:0,convidado_alimento:0}
        ];
        data.jsonRetorno.map(el => {
          if(el.lote > 0){
            if(el.tipo == 'aluno'){
              this.nLotes[el.lote-1].aluno_pista = el.totalTipo-el.alimento;
              this.nLotes[el.lote-1].aluno_alimento += el.alimento;              
            } else if(el.tipo == 'convidado'){
              this.nLotes[el.lote-1].convidado_pista = el.totalTipo-el.alimento;
              this.nLotes[el.lote-1].convidado_alimento += el.alimento;              
            } 
          }
          
        })

      }

    })

  }
  getFesta(): void{
    this.vendasService.getFesta()
    .subscribe((data: {jsonRetorno: Array<any>}) => {
      this.id_festa = data.jsonRetorno[0].id_festa;
      this.nomeFesta = data.jsonRetorno[0].nome;
      this.flag_alimento = data.jsonRetorno[0].flag_alimento;
      this.flag_camarote = data.jsonRetorno[0].flag_camarote;
      this.getLista();
    })
  }

  getAluno(): void{
    this.vendasService.getAluno(this.RA, this.id_festa)
    .subscribe((data: {jsonRetorno: Array<any>}) => {
      if(data.jsonRetorno.length > 0 ){
        if(data.jsonRetorno[0].id_aluno){
          this.nome = data.jsonRetorno[0].nome;
          this.periodo = data.jsonRetorno[0].periodo;
          this.id_aluno = data.jsonRetorno[0].id_aluno;
        } else {
          this.popup('error',`Venda já realizada em ${data.jsonRetorno[0].data_venda}`)
        }
      } else {
        this.popup('error',`Aluno não encontrado. coloque no formato 00.00000-0`)
      }

    });
  }

  config(): void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';    
    const dialogRef = this.dialog.open(SystemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });

  }  

  validarCampos(): Array<any>{
    let saida = []
    if(this.tipoVenda === 'aluno'){
      if(this.lote <= 0)
        saida.push('Lote')
      if(this.alimento === null)
        saida.push('Alimento')
      if(this.sexo === '')
        saida.push('Genero')
    }
    if(this.tipoVenda === 'convidado'){
      if(!this.TestaCPF(this.CPF))
        saida.push('CPF')
      if(this.nomeConvidado === '')
        saida.push('Nome')
      if(this.lote <= 0)
        saida.push('Lote')
      if(this.alimento === null)
        saida.push('Alimento')
      if(this.sexo === '')
        saida.push('Genero')
    }
    return saida;
  }
  finalizarVenda(): void{
    const valCampos = this.validarCampos();
    if(valCampos.length > 0){
      this.popup('error', `Verificar Seguintes Campos ${valCampos.join(', ')}`)
      return
    }    
    let valor = this.valorFinal();
    if(this.tipoVenda === 'aluno'){
      this.vendasService.updateVendaAluno(
        this.id_festa, this.id_vendedor, valor, this.sexo,
        this.alimento, this.id_aluno, this.lote,
        this.combo, this.camarote
      ).subscribe((data: {jsonRetorno: Array<any>}) => {
        if(data.jsonRetorno.length > 0){
          this.zerarCampos();
          this.popup('success','Venda Finalizada com sucesso')


        }
      })
    } else if(this.tipoVenda === 'convidado'){
      this.vendasService.updateVendaConvidado(
        this.id_festa, this.id_vendedor, valor, this.sexo,
        this.alimento, this.CPF, this.lote,
        this.combo, this.nomeConvidado, this.camarote
      ).subscribe((data: {jsonRetorno: Array<any>}) => {
        if(data.jsonRetorno.length > 0){
          this.zerarCampos();
          this.popup('success','Venda Finalizada com sucesso')
        }
      })
    }

  }
  popup(status, message) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '260px';
    dialogConfig.data = { status: status, message: message };
    const dialogRef = this.dialog.open(MessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  zerarCampos(): void {
    this.cpfAnterior = this.CPF;
    this.RA = '';
    this.CPF = '';    
    this.sexo = '';
    this.lote = null;
    this.alimento = null;
    this.combo = null;
    this.camarote = null;
    this.numeroIngresso = '';
    this.nome = '';
    this.periodo = '';
    this.id_aluno = 0;
    this.nomeConvidado = '';
    this.getLista();
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
      if (this.camarote) {
        result += 60;
      }
    }

    return result;
  }

  TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.replace(/[^\d]+/g, '');
    if (strCPF == "00000000000") return false;

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (var j = 1; j <= 10; j++) Soma = Soma + parseInt(strCPF.substring(j - 1, j)) * (12 - j);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }
}
