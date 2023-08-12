import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { StatisticsComponent } from '../input-output/statistics/statistics.component';
import { InputOutputComponent } from '../input-output/input-output.component';
import { DetailComponent } from '../input-output/detail/detail.component';
//import { AuthGuard } from '../services/auth.guard';

const routesChild: Routes = [{
  path: '', component: DashboardComponent, children: [
    { path: '', component: StatisticsComponent },
    { path: 'input-output', component: InputOutputComponent },
    { path: 'detail', component: DetailComponent },

  ], /*canActivate: [AuthGuard]*/
}]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesChild)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
