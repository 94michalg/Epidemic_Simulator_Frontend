import { Component, OnInit } from '@angular/core';
import { Simulation } from 'src/app/models/simulation.model';
import { ControllerService } from 'src/app/services/controller.service';


@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.css']
})
export class SimulationListComponent implements OnInit {

  simulations?: Simulation[];
  currentSimulation: Simulation = {};
  currentIndex = -1;
  title = '';

  constructor(private controllerService: ControllerService) { }

  ngOnInit(): void {
    this.retrieveSimulations();
  }

  retrieveSimulations(): void {
    this.controllerService.getAll()
      .subscribe(
        data => {
          this.simulations = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  setActiveSimulation(simulation: Simulation, index: number): void {
    this.currentSimulation = simulation;
    this.currentIndex = index;
  }

}
