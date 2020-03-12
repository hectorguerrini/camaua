import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/dialog/message/message.component';
import { SystemComponent } from 'src/app/dialog/system/system.component';
import { LoginService } from 'src/app/pages/login/login.service';
import { FestasService } from 'src/app/core/services/festas.service';
import { Lotes } from 'src/app/models/lotes';

@Component({
	selector: 'app-vendas',
	templateUrl: './vendas.component.html',
	styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
	tipoVenda: string = 'aluno';
	RA: string;
	CPF: string = '';
	sexo: string;
	lote: number;
	alimento: number = null;
	camarote: number = null;
	formado: number = 0;
	combo: number = null;
	ingresso: string = null;
	formaPgto: string = 'Dinheiro';
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
	flag_formado: number = 0;
	valores: Array<Lotes>;
	nLotes: Array<any>;
	cpfAnterior: string;
	nCombo: number;
	nAlimento: number;
	nConvite: number;
	constructor(
		private festasService: FestasService,
		private loginService: LoginService,
		private router: Router,
		private acRouter: ActivatedRoute,
		public dialog: MatDialog
	) {


	}

	ngOnInit() {
		if (!this.loginService.isLogged) {
			this.router.navigate([`login`]);
		} else {
			this.id_vendedor = parseInt(this.loginService.idLogged);
			this.nomeVendedor = this.loginService.userLogged;
			this.acRouter.paramMap.subscribe(params => {
				this.getLotes(parseInt(params.get('id')));
				this.getFesta(parseInt(params.get('id')));
			});
		}

	}
	getLotes(id: number): void {
		this.festasService.getLotes(id)
			.subscribe((data: { jsonRetorno: Array<Lotes> }) => {
				if (data.jsonRetorno.length > 0) {
					this.valores = data.jsonRetorno;
				} else {
					this.valores = [];
				}

			});

	}

	getLista(): void {
		this.festasService.getLista(this.id_festa)
			.subscribe((data: { jsonRetorno: Array<any> }) => {
				if (data.jsonRetorno.length > 0) {
					this.nLotes = [];
					// this.nLotes = [
					//   {lote:0,aluno_pista:0,aluno_alimento:0,convidado_pista:0,convidado_alimento:0},
					//   {lote:1,aluno_pista:0,aluno_alimento:0,convidado_pista:0,convidado_alimento:0},
					//   {lote:2,aluno_pista:0,aluno_alimento:0,convidado_pista:0,convidado_alimento:0},
					//   {lote:3,aluno_pista:0,aluno_alimento:0,convidado_pista:0,convidado_alimento:0}
					// ];

					data.jsonRetorno.forEach(el => {
						let index = this.nLotes.findIndex(l => { return l.lote == el.lote });
						if (index == -1) {
							this.nLotes.push({ lote: el.lote, aluno_pista: 0, aluno_alimento: 0, convidado_pista: 0, convidado_alimento: 0 })
							index = this.nLotes.findIndex(l => { return l.lote == el.lote });
						}
						if (el.tipo == 'aluno') {
							this.nLotes[index].aluno_pista = el.totalTipo - el.alimento;
							this.nLotes[index].aluno_alimento += el.alimento;
						} else if (el.tipo == 'convidado') {
							this.nLotes[index].convidado_pista = el.totalTipo - el.alimento;
							this.nLotes[index].convidado_alimento += el.alimento;
						}

					})


					// data.jsonRetorno.map(el => {
					//   if(el.lote >= 0){
					//     if(el.tipo == 'aluno'){
					//       this.nLotes[el.lote-1].aluno_pista = el.totalTipo-el.alimento;
					//       this.nLotes[el.lote-1].aluno_alimento += el.alimento;
					//     } else if(el.tipo == 'convidado'){
					//       this.nLotes[el.lote-1].convidado_pista = el.totalTipo-el.alimento;
					//       this.nLotes[el.lote-1].convidado_alimento += el.alimento;
					//     }
					//   }

					// })

				}

			})

	}
	getFesta(id_festa: number): void {
		this.festasService.getFesta(id_festa)
			.subscribe((data: { jsonRetorno: Array<any> }) => {
				this.id_festa = data.jsonRetorno[0].id_festa;
				this.nomeFesta = data.jsonRetorno[0].nome;
				this.flag_alimento = data.jsonRetorno[0].flag_alimento;
				this.flag_camarote = data.jsonRetorno[0].flag_camarote;
				this.flag_formado = data.jsonRetorno[0].flag_formado;
				this.getLista();
			})
	}

	getAluno(): void {
		this.festasService.getAluno(this.RA, this.id_festa)
			.subscribe((data: { jsonRetorno: Array<any> }) => {
				if (data.jsonRetorno.length > 0) {
					if (data.jsonRetorno[0].id_aluno) {
						this.nome = data.jsonRetorno[0].nome;
						this.periodo = data.jsonRetorno[0].periodo;
						this.id_aluno = data.jsonRetorno[0].id_aluno;
					} else {
						this.popup('error', `Venda já realizada em ${data.jsonRetorno[0].data_venda}`)
					}
				} else {
					this.popup('error', `Aluno não encontrado. coloque no formato 00.00000-0`)
				}

			});
	}

	config(): void {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.hasBackdrop = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '400px';
		const dialogRef = this.dialog.open(SystemComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(result => {

		});

	}

	validarCampos(): Array<any> {
		let saida = []
		if (this.tipoVenda === 'aluno') {
			if (this.lote < 0)
				saida.push('Lote')
			if (this.alimento === null && this.flag_alimento)
				saida.push('Alimento')
			if (this.sexo === '')
				saida.push('Genero')
			if (this.formado === null && this.flag_formado)
				saida.push('Formando')
		}
		if (this.tipoVenda === 'convidado') {
			if (!this.TestaCPF(this.CPF))
				saida.push('CPF')
			if (this.nomeConvidado === '')
				saida.push('Nome')
			if (this.lote < 0)
				saida.push('Lote')
			if (this.alimento === null && this.flag_alimento)
				saida.push('Alimento')
			if (this.sexo === '')
				saida.push('Genero')
			if (this.formado === null && this.flag_formado)
				saida.push('Formando')
		}
		return saida;
	}
	finalizarVenda(): void {
		const valCampos = this.validarCampos();
		if (valCampos.length > 0) {
			this.popup('error', `Verificar Seguintes Campos ${valCampos.join(', ')}`)
			return
		}
		let valor = this.valorFinal();
		if (this.tipoVenda === 'aluno') {
			this.festasService.updateVendaAluno(
				this.id_festa, this.id_vendedor, valor, this.sexo,
				this.alimento, this.id_aluno, this.lote,
				this.combo, this.camarote, this.formado, this.formaPgto
			).subscribe((data: { jsonRetorno: Array<any> }) => {
				if (data.jsonRetorno.length > 0) {
					this.zerarCampos();
					this.popup('success', 'Venda Finalizada com sucesso')


				}
			})
		} else if (this.tipoVenda === 'convidado') {
			this.festasService.updateVendaConvidado(
				this.id_festa, this.id_vendedor, valor, this.sexo,
				this.alimento, this.CPF, this.lote,
				this.combo, this.nomeConvidado, this.camarote, this.formado, this.formaPgto
			).subscribe((data: { jsonRetorno: Array<any> }) => {
				if (data.jsonRetorno.length > 0) {
					this.zerarCampos();
					this.popup('success', 'Venda Finalizada com sucesso')
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
		this.ingresso = null;
		this.formaPgto = 'Dinheiro';
		this.nome = '';
		this.periodo = '';
		this.id_aluno = 0;
		this.formado = 0;
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
			if (this.formado) {
				result -= 5;
			}
			if (this.combo) {
				result += 12;
			}
			if (this.camarote) {
				result += 60;
			}
			if(this.formaPgto !==  'Dinheiro') {
				result = parseFloat((result * 1.1).toFixed(2));
			}
		}

		return result;
	}

	TestaCPF(strCPF) {
		var Soma;
		var Resto;
		Soma = 0;
		strCPF = strCPF.replace(/[^\d]+/g, '');
		if (strCPF == '00000000000') return false;

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
