import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { InicioAppComponent } from './inicio-app/inicio-app.component';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { AltaComponent } from './alta/alta.component';
import { DirectivaService } from './directiva/directiva.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import { HightChartsComponent } from './hight-charts/hight-charts.component';
import { patch } from 'webdriver-js-extender';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'directiva', component: DirectivaComponent},
  {path: 'inicio', component: FooterComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'alta', component: AltaComponent },
  {path: 'chart', component: HightChartsComponent} 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    AltaComponent,
    FilterPipe,
    InicioAppComponent,
    HightChartsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DatePickerModule,
    NgxUiLoaderModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService, DirectivaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
