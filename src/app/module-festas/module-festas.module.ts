import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleFestasRoutingModule } from './module-festas-routing.module';
import { ListaFestaComponent } from './lista-festa/lista-festa.component';
import { VendasComponent } from './vendas/vendas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaFestaComponent,
    VendasComponent
  ],
  imports: [
    CommonModule,
    ModuleFestasRoutingModule,
    FormsModule
    
  ]
})
export class ModuleFestasModule { }
