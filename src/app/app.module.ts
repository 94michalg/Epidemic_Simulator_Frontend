import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSimulationComponent } from './component/add-simulation/add-simulation.component';
import { SimulationDetailsComponent } from './component/simulation-details/simulation-details.component';
import { SimulationListComponent } from './component/simulation-list/simulation-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSimulationComponent,
    SimulationDetailsComponent,
    SimulationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
