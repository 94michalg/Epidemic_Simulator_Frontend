import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Simulation } from 'src/app/models/simulation.model';
import { SimulationWithStats } from 'src/app/models/simulation-with-stats.model';

@Component({
  selector: 'app-simulation-details',
  templateUrl: './simulation-details.component.html',
  styleUrls: ['./simulation-details.component.scss']
})
export class SimulationDetailsComponent implements OnInit {

  currentSimulation!: SimulationWithStats;


  constructor(
    private controllerService: ControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSimulation(this.route.snapshot.params['id']);
  }

  getSimulation(id: string): void {
    this.controllerService.get(id)
      .subscribe(
        data => {
          this.currentSimulation = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
