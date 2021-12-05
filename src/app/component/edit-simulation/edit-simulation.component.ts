import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Simulation } from 'src/app/models/simulation.model';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'app-edit-simulation',
  templateUrl: './edit-simulation.component.html',
  styleUrls: ['./edit-simulation.component.css'],
})
export class EditSimulationComponent implements OnInit {
  simulation: Simulation = {
    id: '',
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

  constructor(
    private controllerService: ControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    var id = this.route.snapshot.params['id'];
    await this.getSimulation(id);
  }

  async getSimulation(id: string): Promise<void> {
    try {
      this.simulation = await lastValueFrom(this.controllerService.get(id));
      console.log(
        'current simulation data retrieved successfully',
        this.simulation
      );
    } catch (error) {
      console.error('error retrieving current simulation', error);
    }
  }

  editSimulation(): void {
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

    this.controllerService
      .update(this.route.snapshot.params['id'], data)
      .subscribe(
        (response) => {
          console.log(response);
          this.submitted = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  backToList() {
    this.router.navigate(['simulation/']);
  }
}
