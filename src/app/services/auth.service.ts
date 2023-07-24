import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, user } from '@angular/fire/auth';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth, private firestore: Firestore) { }

  initAuthListener() {
    authState(this.auth).subscribe(firebaseUser => {
      console.log(firebaseUser);
      console.log(firebaseUser?.uid);
      console.log(firebaseUser?.email);
    });
  }


  createUser(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(({ user }) => {
      const newUser = new User(user.uid, name, user.email!)
      return setDoc(doc(this.firestore, user.uid, 'user'), { ...newUser });
    })
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
