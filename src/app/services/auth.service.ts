import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, user, Unsubscribe } from '@angular/fire/auth';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Firestore, collection, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as inputOutputActions from '../input-output/input-output.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userUnsubscribe!: Unsubscribe;
  private _user!: User | null
  get user() {
    return this._user
  }
  constructor(public auth: Auth, private firestore: Firestore, private store: Store<AppState>) { }

  initAuthListener() {
    authState(this.auth).subscribe(firebaseUser => {
      //console.log(firebaseUser?.uid);
      if (firebaseUser) {
        console.log(firebaseUser)
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, firebaseUser.uid, 'user'),

          (docUser: any) => {

            const data: any = docUser.data();
            console.log(data)
            const user = User.fromFirebase(data)
            this._user = user
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err => {
            console.log(err);
          })
        )

      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this._user = null
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(inputOutputActions.unSetItems())
      }

    });
  }
  async createUser(name: string, email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
    const newUser = new User(user.uid, name, user.email!);
    return await setDoc(doc(this.firestore, user.uid, 'user'), { ...newUser });
  }
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  logout() {
    return signOut(this.auth)
  }
  isAuth() {
    return authState(this.auth).pipe(
      map(firebaseUser => firebaseUser !== null)
    )
  }

}
