import { Component, inject, OnDestroy, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../auth-facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnDestroy {
  private _authFacade = inject(AuthFacade);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  readonly signUpLoading = signal<boolean>(false);

  signUpForm = new FormGroup(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      firstName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: [passwordMatchValidator()] },
  );

  readonly emailControl = this.signUpForm.controls.email;
  readonly passwordControl = this.signUpForm.controls.password;
  readonly confirmPasswordControl = this.signUpForm.controls.confirmPassword;
  readonly firstNameControl = this.signUpForm.controls.firstName;
  readonly lastNameControl = this.signUpForm.controls.lastName;

  async signUpWithEmailAndPassword(): Promise<void> {
    const email: string = this.emailControl.getRawValue().trim();
    const password: string = this.passwordControl.getRawValue().trim();
    const firstName: string = this.firstNameControl.getRawValue().trim();
    const lastName: string = this.lastNameControl.getRawValue().trim();

    try {
      this.signUpLoading.set(true);
      await this._authFacade.signUpWithEmailAndPassword(email, password, firstName, lastName);
    } catch (error) {
      console.error(error);
    }

    if (this._authFacade.user()) {
      this._router.navigate(['project']);
    }
  }

  onLogin(): void {
    this._router.navigate([''], { relativeTo: this._route.parent });
  }

  ngOnDestroy(): void {
    this.signUpLoading.set(false);
  }
}

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;

    const passwordValue: string = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword');
    const confirmPasswordValue: string = confirmPassword?.value;

    if (!passwordValue && !confirmPasswordValue) return null;

    if (passwordValue !== confirmPasswordValue) {
      confirmPassword?.setErrors({
        ...(confirmPassword.errors ?? {}),
        passwordMismatch: true,
      });

      return {
        passwordMismatch: true,
      };
    }

    if (confirmPassword?.hasError('passwordMismatch')) {
      const errors = { ...confirmPassword.errors };
      delete errors['passwordMismatch'];

      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
}
