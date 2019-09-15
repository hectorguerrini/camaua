import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { LoginComponent } from './pages/login/login.component';
import { MessageComponent } from './dialog/message/message.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { SystemComponent } from './dialog/system/system.component';
@NgModule({
  declarations: [
    AppComponent,
    VendasComponent,
    LoginComponent,
    MessageComponent,
    SystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MessageComponent, SystemComponent]
})
export class AppModule { }
