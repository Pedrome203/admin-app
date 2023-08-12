import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InputOutputComponent } from './input-output.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { SortInputOutputPipe } from '../pipes/sort-input-output.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { AppRoutingModule } from '../app-routing.module';
import { StoreModule } from '@ngrx/store';
import { _inputOutputReducer } from './input-output.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    InputOutputComponent,
    StatisticsComponent,
    DetailComponent,
    SortInputOutputPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('inputOutput', _inputOutputReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class InputOutputModule { }
