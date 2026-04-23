import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateProject {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private navigateToProjectDashboard: () => Promise<boolean> = () =>
    this.router.navigate(['project-dashboard'], { relativeTo: this.route });

  projectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      console.log('Project Created:', projectData);
      // Here you can add logic to send the project data to a backend service or store it as needed.
      this.navigateToProjectDashboard();
    } else {
      console.log('Form is invalid');
    }
  }
}
