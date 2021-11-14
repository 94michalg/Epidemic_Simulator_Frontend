import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulationWithStats } from 'src/app/models/simulation-with-stats.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-simulation-details',
  templateUrl: './simulation-details.component.html',
  styleUrls: ['./simulation-details.component.scss'],
})
export class SimulationDetailsComponent implements OnInit {
  currentSimulation!: SimulationWithStats;

  chartData!: ChartDataModel[];

  public chartLabel: string[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(
    private controllerService: ControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    var id = this.route.snapshot.params['id'];
    await this.getSimulation(id);
    
    let piModel = new ChartDataModel("pi");

    for (let dailyStats of this.currentSimulation.dailyStatsList) {
      this.chartLabel.push(dailyStats.day + '');
      piModel.data.push(dailyStats.pi);
    }
    this.chartData = [piModel];
    // this.chartLabel.push('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
  }

  async getSimulation(id: string): Promise<void> {
    try {
      this.currentSimulation = await lastValueFrom(this.controllerService.get(id));
      console.log('current simulation data retrieved successfully', this.currentSimulation);
    } catch (error) {
      console.error('error retrieving current simulation', error);
    }
  }
}

class ChartDataModel {
  data: number[] = [];
  label: string;
 
  constructor(label: string) {
    this.label = label;
  }
 
}