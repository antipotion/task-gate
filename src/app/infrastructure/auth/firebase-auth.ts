import { computed, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../../../environment/firebase.config';

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

  async register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }

  async logout(): Promise<void> {
    return signOut(this._auth);
  }
}
