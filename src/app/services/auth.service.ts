import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, AuthProvider } from 'firebase/auth'
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
      .then(res => console.log(res))
      .catch( err => console.log(err))
    }

}
