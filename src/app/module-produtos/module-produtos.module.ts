import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleProdutosRoutingModule } from './module-produtos-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EstoqueComponent } from './estoque/estoque.component';
import { AtualizacaoEstoqueComponent } from './atualizacao-estoque/atualizacao-estoque.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ProdutosComponent, EstoqueComponent, AtualizacaoEstoqueComponent],
  imports: [
    CommonModule,
	ModuleProdutosRoutingModule,
	MatCardModule,
	FormsModule,
	MatButtonModule,
	MatInputModule,
	MatFormFieldModule
  ]
})
export class ModuleProdutosModule { }
