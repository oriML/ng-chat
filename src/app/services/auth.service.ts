import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, AuthProvider, User as gUser } from 'firebase/auth'
import { User } from '../models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

    public signInWithGoogle(){
      this.authLogin(new GoogleAuthProvider())
    }

    private authLogin(provider: AuthProvider){
      return this.afAuth.signInWithPopup(provider)
      .then(({user}) => {this.setUserData(user as gUser)})
      .catch( err => console.log(err))
    }

    private setUserData(user?: gUser): Promise<void> | void {
      if(!user) return;

      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user?.uid}`
      )

      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL
      }

      return userRef.set(userData, {
        merge: true
      })
    }

}
