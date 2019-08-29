import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
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
import { AltaService } from './alta/alta.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalSettingsComponent } from './modal/modal-settings/modal-settings.component';
import { ModalConfirmComponent } from './modal/modal-confirm/modal-confirm.component';
import { ClientesAsistenciaComponent } from './clientes-asistencia/clientes-asistencia.component';
import { ClientesAsistenciaRangoComponent } from './clientes-asistencia-rango/clientes-asistencia-rango.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'dashboard-asistencia', component: DirectivaComponent},
  {path: 'inicio', component: InicioAppComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes-asistencia', component: ClientesAsistenciaComponent},
  {path: 'clientes-asistencia-rangos', component: ClientesAsistenciaRangoComponent},
  {path: 'alta', component: AltaComponent }
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
    ModalSettingsComponent,
    ModalConfirmComponent,
    ClientesAsistenciaComponent,
    ClientesAsistenciaRangoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DatePickerModule,
    TimePickerModule,
    NgxUiLoaderModule,
    AlertModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService, DirectivaService, AltaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
