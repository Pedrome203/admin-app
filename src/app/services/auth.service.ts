import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, user, Unsubscribe } from '@angular/fire/auth';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Firestore, collection, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userUnsubscribe!: Unsubscribe;

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
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err => {
            console.log(err);
          })
        )

      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unSetUser());
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
