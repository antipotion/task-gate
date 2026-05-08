import { computed, Injectable, signal } from '@angular/core';
import { auth } from '../../../environment/firebase.config';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuth {
  private readonly _auth: Auth = auth;
  private readonly _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);

  constructor() {
    onAuthStateChanged(this._auth, (user) => {
      this._user.set(user);
    });
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this._auth, email, password);
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this._auth, email, password);
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this._auth, provider);
  }
  
  async logout(): Promise<void> {
    await signOut(this._auth);
  }
}
