import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Simulation } from 'src/app/models/simulation.model';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.scss']
})

export class SimulationListComponent implements OnInit {

  simulations?: Simulation[];
  currentSimulation: Simulation = {};
  currentIndex = -1;
  title = '';

  constructor(private controllerService: ControllerService,
              private router: Router) { }

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

  goToDetails(simulation: Simulation) {
    this.router.navigate(['simulation/' + simulation.id]);
  }

  deleteTutorial(simulation: Simulation) {
    this.controllerService.delete(simulation.id)
      .subscribe(
        response=> {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        }
      )
  }

  refreshList(): void {
    this.retrieveSimulations();
    // this.currentTutorial = {};
    // this.currentIndex = -1;
  }

  // setActiveSimulation(simulation: Simulation, index: number): void {
  //   this.currentSimulation = simulation;
  //   this.currentIndex = index;
  // }

}
