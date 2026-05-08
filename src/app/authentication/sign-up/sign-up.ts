import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthFacade } from '../auth-facade';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private _authFacade = inject(AuthFacade);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

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
    },
    { validators: [passwordMatchValidator()] },
  );

  readonly emailControl = this.signUpForm.controls.email;
  readonly passwordControl = this.signUpForm.controls.password;
  readonly confirmPasswordControl = this.signUpForm.controls.confirmPassword;

  signUpWithEmailAndPassword(): void {
    const email: string = this.emailControl.getRawValue();
    const password: string = this.passwordControl.getRawValue();

    try {
      this._authFacade.signUpWithEmailAndPassword(email, password);
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

