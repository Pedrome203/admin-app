import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputOutput } from '../models/input-output.model';
import { InputOutputService } from '../services/input-output.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styles: [
  ]
})
export class InputOutputComponent implements OnInit, OnDestroy {

  inputForm!: FormGroup
  type: string = 'Egreso'
  loading: boolean = false
  loadingSubs!: Subscription


  constructor(private store: Store<AppState>, private form: FormBuilder, private _inputOutputService: InputOutputService) { }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.inputForm = this.form.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required]]
    })

    this.loadingSubs = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  save() {
    this.store.dispatch(ui.isLoading())
    const { amount, description } = this.inputForm.value
    const inputOutput = new InputOutput(amount, description, this.type)
    this._inputOutputService.createInputOrOutput(inputOutput).then(
      () => {
        this.store.dispatch(ui.stopLoading())
        this.inputForm.reset()
        Swal.fire('Ok', `${this.type} Creado Correctamente`, 'success');
      }
    ).catch((err) => {
      this.store.dispatch(ui.stopLoading())
      Swal.fire('Error', `${err.message}`, 'error');

    })
  }
}
