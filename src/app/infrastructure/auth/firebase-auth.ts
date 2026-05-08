import { computed, Injectable, signal } from '@angular/core';
import { auth } from '../../../environment/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuth {
  private readonly _auth = auth;
  private readonly _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this._user.set(user);
    });
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }
  
  async logout(): Promise<void> {
    await signOut(auth);
  }
}
