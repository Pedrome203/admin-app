import { Injectable } from '@angular/core';
import { Firestore, collectionSnapshots, deleteDoc } from '@angular/fire/firestore';
import { InputOutput } from '../models/input-output.model';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputOutputService {

  constructor(private firestore: Firestore, private _authService: AuthService) { }

  createInputOrOutput(inputOutput: InputOutput) {
    delete inputOutput.uuid
    const collectionInstance = collection(this.firestore, this._authService.user?.uuid ? this._authService.user.uuid : '', 'user', 'items')
    return addDoc(collectionInstance, { ...inputOutput })
  }

  initInputsOutputsListener(uuid: string) {
    return collectionSnapshots(
      collection(this.firestore, uuid, 'user', 'items')
    ).pipe(map((items) => {
      console.log(items)
      return items.map(_document => ({
        uuid: _document.id,
        ..._document.data() as any
      }))
    }))
  }

  deleteItem(uuid: string) {
    return deleteDoc(doc(this.firestore, this._authService.user!.uuid, 'user', 'items', uuid))
  }
}
