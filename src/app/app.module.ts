import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSimulationComponent } from './component/add-simulation/add-simulation.component';
import { SimulationDetailsComponent } from './component/simulation-details/simulation-details.component';
import { SimulationListComponent } from './component/simulation-list/simulation-list.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { EditSimulationComponent } from './component/edit-simulation/edit-simulation.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSimulationComponent,
    SimulationDetailsComponent,
    SimulationListComponent,
    DialogBoxComponent,
    EditSimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
