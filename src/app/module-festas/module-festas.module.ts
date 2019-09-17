import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleFestasRoutingModule } from './module-festas-routing.module';
import { ListaFestaComponent } from './lista-festa/lista-festa.component';


@NgModule({
  declarations: [ListaFestaComponent],
  imports: [
    CommonModule,
    ModuleFestasRoutingModule
  ]
})
export class ModuleFestasModule { }
