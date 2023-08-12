import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Subscription, filter } from 'rxjs';
import { InputOutputService } from '../services/input-output.service';
import * as actions from '../input-output/input-output.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs!: Subscription
  inputOutputSubs!: Subscription

  constructor(private store: Store<AppState>, private _inputOutputService: InputOutputService) { }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe()
    this.inputOutputSubs?.unsubscribe()
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').pipe(
      filter(auth => auth.user != null)
    ).subscribe(({ user }) => {
      this.inputOutputSubs = this._inputOutputService.initInputsOutputsListener(user!.uuid).subscribe(inputsOutputs => {
        this.store.dispatch(actions.setItems({ items: inputsOutputs }))
      })
    })
  }

}
