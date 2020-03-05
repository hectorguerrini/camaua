import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleProdutosRoutingModule } from './module-produtos-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [ProdutosComponent],
  imports: [
    CommonModule,
	ModuleProdutosRoutingModule,
	MatCardModule
  ]
})
export class ModuleProdutosModule { }
