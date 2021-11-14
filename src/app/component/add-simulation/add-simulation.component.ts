import { Component, OnInit } from '@angular/core';
import { Simulation } from 'src/app/models/simulation.model';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'app-add-simulation',
  templateUrl: './add-simulation.component.html',
  styleUrls: ['./add-simulation.component.scss'],
})
export class AddSimulationComponent implements OnInit {
  simulation: Simulation = {
    name: '',
    population: 0,
    infected: 0,
    mortality: 0,
    rvalue: 0,
    infectedTime: 0,
    mortalityTime: 0,
    simulationTime: 0,
  };
  submitted = false;

  constructor(private controllerService: ControllerService) {}

  ngOnInit(): void {}

  saveSimulation(): void {
    const data = {
      name: this.simulation.name,
      population: this.simulation.population,
      infected: this.simulation.infected,
      mortality: this.simulation.mortality,
      rvalue: this.simulation.rvalue,
      infectedTime: this.simulation.infectedTime,
      mortalityTime: this.simulation.mortalityTime,
      simulationTime: this.simulation.simulationTime,
    };

    this.controllerService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newSimulation(): void {
    this.submitted = false;
    this.simulation = {
      name: '',
      population: 0,
      infected: 0,
      mortality: 0,
      rvalue: 0,
      infectedTime: 0,
      mortalityTime: 0,
      simulationTime: 0,
    };
  }
}
