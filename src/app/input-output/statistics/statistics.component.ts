import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AppState } from 'src/app/app.reducers';
import { InputOutput } from 'src/app/models/input-output.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  public labels: string[] = [
    'Ingresos',
    'Egresos',
  ];
  public chart: ChartData<'doughnut'> = {
    labels: ['Ingresos', 'Egresos'],
    datasets: [
      { data: [100, 20] },
    ],
  };
  public chartType: ChartType = 'doughnut';
  inputs: number = 0
  outputs: number = 0
  totalInputs: number = 0
  totalOutputs: number = 0

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('inputOutput').subscribe(({ items }) => this.generateStatistics(items))
  }

  generateStatistics(items: InputOutput[]) {
    this.totalInputs = 0
    this.totalOutputs = 0
    this.inputs = 0
    this.outputs = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].type == 'Ingreso') {
        this.totalInputs += items[i].amount
        this.inputs++
      } else {
        this.totalOutputs += items[i].amount
        this.outputs++
      }
    }
    // Doughnut
    this.labels = ['Ingresos', 'Egresos'];

    this.chart = {
      labels: this.labels,
      datasets: [
        {
          data: [this.totalInputs, this.totalOutputs],
          backgroundColor: ['#008000', '#FF0000']
        }
      ]
    };
    this.chartType = 'doughnut';
  }




}
