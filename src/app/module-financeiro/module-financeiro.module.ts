import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ModuleFinanceiroRoutingModule } from './module-financeiro-routing.module';
import { FinanceiroComponent } from './financeiro/financeiro.component';


@NgModule({
  declarations: [FinanceiroComponent],
  imports: [
    CommonModule,
	ModuleFinanceiroRoutingModule,
	MatCardModule
  ]
})
export class ModuleFinanceiroModule { }
