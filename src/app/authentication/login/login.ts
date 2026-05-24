import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
import { AuthFacade } from '../auth-facade';
import { AUTH_ROUTE_PARAMS } from '../auth.routes';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _authFacade = inject(AuthFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  readonly emailControl = this.loginForm.controls.email;
  readonly passwordControl = this.loginForm.controls.password;

  async loginWithEmailAndPassword(): Promise<void> {
    const email: string = this.emailControl.getRawValue();
    const password: string = this.passwordControl.getRawValue();

    await this._authFacade.loginWithEmailAndPassword(email, password);

    this._router.navigate([ROUTES_PARAMS.project]);
  }

  loginWithGoogle(): void {
    this._authFacade.loginWithGoogle();
  }

  onSignUp(): void {
    this._router.navigate([AUTH_ROUTE_PARAMS.role], { relativeTo: this._route });
  }

  async onDemoAccountLogin(): Promise<void> {
    const email: string = 'demouser@email.com';
    const password: string = '123456789';

    this.loginForm.patchValue({ email, password });

    await this._authFacade.loginWithEmailAndPassword(email, password);

    this._router.navigate([ROUTES_PARAMS.project]);
  }
}
