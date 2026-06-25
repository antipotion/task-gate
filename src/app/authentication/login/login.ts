import { AfterViewInit, Component, inject, OnDestroy, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { ROUTES_PARAMS } from '../../app.routes';
import { Disclaimer } from '../../disclaimer/disclaimer';
import { AuthFacade } from '../auth-facade';
import { AUTH_ROUTE_PARAMS } from '../auth.routes';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements AfterViewInit, OnDestroy {
  private readonly _authFacade = inject(AuthFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);

  readonly loggingInLoading = signal<boolean>(false);
  readonly isAuthenticated$ = toObservable(this._authFacade.isAuthenticated);

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

  ngAfterViewInit(): void {
    this.openDisclaimerDialog();
  }

  async loginWithEmailAndPassword(): Promise<void> {
    const email: string = this.emailControl.getRawValue();
    const password: string = this.passwordControl.getRawValue();

    this.loggingInLoading.set(true);
    await this._authFacade.loginWithEmailAndPassword(email, password);

    // Only truthy value passes the filter(Boolean)
    await firstValueFrom(this.isAuthenticated$.pipe(filter(Boolean)));

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

    this.loggingInLoading.set(true);

    await this._authFacade.loginWithEmailAndPassword(email, password);

    this._router.navigate([ROUTES_PARAMS.project]);
  }

  openDisclaimerDialog(): void {
    this._dialog.open(Disclaimer);
  }

  ngOnDestroy(): void {
    this.loggingInLoading.set(false);
  }
}
