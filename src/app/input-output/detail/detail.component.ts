import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { InputOutput } from 'src/app/models/input-output.model';
import { InputOutputService } from 'src/app/services/input-output.service';
import Swal from 'sweetalert2';
import { AppStateWithInputOutput } from '../input-output.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  inputsOutputs: InputOutput[] = []
  inputsOutputsSubs!: Subscription

  constructor(private store: Store<AppStateWithInputOutput>, private _inputOutputService: InputOutputService) { }
  ngOnDestroy(): void {
    this.inputsOutputsSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.inputsOutputsSubs = this.store.select('inputOutput').subscribe(({ items }) => {
      console.log(items)
      this.inputsOutputs = items
    })
  }

  deleteItem(uuid: string) {
    this._inputOutputService.deleteItem(uuid).
      then(() => Swal.fire('Eliminado', 'Item Eliminado', 'success')).
      catch(() => Swal.fire('Error', 'No se pudo eliminar', 'error'))
  }

}
