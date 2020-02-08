import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleProdutosRoutingModule } from './module-produtos-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';

@NgModule({
  declarations: [ProdutosComponent],
  imports: [
    CommonModule,
    ModuleProdutosRoutingModule
  ]
})
export class ModuleProdutosModule { }
