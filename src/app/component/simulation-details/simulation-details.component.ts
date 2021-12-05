import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulationWithStats } from 'src/app/models/simulation-with-stats.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { lastValueFrom } from 'rxjs';
import { Simulation } from 'src/app/models/simulation.model';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-simulation-details',
  templateUrl: './simulation-details.component.html',
  styleUrls: ['./simulation-details.component.scss'],
})
export class SimulationDetailsComponent implements OnInit {
  currentSimulation!: SimulationWithStats;

  // LINE CHART PARAMS
  lineChartData!: ChartDataModel[];
  public lineChartLabels: string[] = [];
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

  //1ST DOUGHTNUT PARAMS
  doughnutChartLabels: Label[] = ['Healthy', 'Infected'];
  doughnutChartData: SingleDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Color[] = [
    {
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 50, 77)',
        'rgb(235, 226, 2',
        'rgb(50, 50, 50'
      ]
    }
  ];

  //2ND DOUGHTNUT PARAMS
  doughnutChartLabelsAfter: Label[] = ['Healthy', 'Infected', 'Convalescents', 'Dead'];
  doughnutChartDataAfter: SingleDataSet = [];
  doughnutChartTypeAfter: ChartType = 'doughnut';

  constructor(
    private controllerService: ControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    var id = this.route.snapshot.params['id'];
    await this.getSimulation(id);

    // FILLING LINE CHART
    let piModel = new ChartDataModel('Infected');
    let pvModel = new ChartDataModel('Vulnerable');
    let prModel = new ChartDataModel('Convalescents');
    let pmModel = new ChartDataModel('Dead');

    for (let dailyStats of this.currentSimulation.dailyStatsList) {
      this.lineChartLabels.push(dailyStats.day + '');
      piModel.data.push(dailyStats.pi);
      pvModel.data.push(dailyStats.pv);
      prModel.data.push(dailyStats.pr);
      pmModel.data.push(dailyStats.pm);
    }
    this.lineChartData = [piModel, pvModel, prModel, pmModel];
    
    // FILLING DOUGHNUT CHARTS

    this.doughnutChartData.push(
      this.currentSimulation.dailyStatsList[0].pv,
      this.currentSimulation.dailyStatsList[0].pi
    );

    this.doughnutChartDataAfter.push(
      this.currentSimulation.dailyStatsList[this.currentSimulation.dailyStatsList.length - 1].pv,
      this.currentSimulation.dailyStatsList[this.currentSimulation.dailyStatsList.length - 1].pi,
      this.currentSimulation.dailyStatsList[this.currentSimulation.dailyStatsList.length - 1].pr,
      this.currentSimulation.dailyStatsList[this.currentSimulation.dailyStatsList.length - 1].pm
    );
  }

  async getSimulation(id: string): Promise<void> {
    try {
      this.currentSimulation = await lastValueFrom(
        this.controllerService.get(id)
      );
      console.log(
        'current simulation data retrieved successfully',
        this.currentSimulation
      );
    } catch (error) {
      console.error('error retrieving current simulation', error);
    }
  }

  edit(simulation: Simulation) {
    this.router.navigate(['edit/' + simulation.id]);
  }
}

class ChartDataModel {
  data: number[] = [];
  label: string;

  constructor(label: string) {
    this.label = label;
  }
}
