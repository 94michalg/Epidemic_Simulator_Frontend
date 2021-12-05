import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulationListComponent } from './component/simulation-list/simulation-list.component';
import { SimulationDetailsComponent } from './component/simulation-details/simulation-details.component';
import { AddSimulationComponent } from './component/add-simulation/add-simulation.component';
import { EditSimulationComponent } from './component/edit-simulation/edit-simulation.component';


const routes: Routes = [
  { path: '', redirectTo: 'simulation', pathMatch: 'full'},
  { path: 'simulation', component: SimulationListComponent},
  { path: 'simulation/:id', component: SimulationDetailsComponent},
  { path: 'add', component: AddSimulationComponent},
  { path: 'edit/:id', component: EditSimulationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
