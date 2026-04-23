import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFacade } from '../../application/facades/project-facade';
import type { Project } from '../project.types';
@Component({
  selector: 'app-create-project',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-project.html',
  styleUrl: './create-project.scss',
  providers: [provideNativeDateAdapter(), ProjectFacade],
})
export class CreateProject {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectFacade = inject(ProjectFacade);

  private navigateToProjectDashboard: (id: string) => Promise<boolean> = (id: string) =>
    this.router.navigate(['project-dashboard', id], { relativeTo: this.route });

  loading = signal<boolean>(false);

  projectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
  });

  async onSubmit(): Promise<void> {
    if (this.projectForm.valid) {
      const formResult = this.projectForm.value;

      if (!formResult.projectName || !formResult.deadline) {
        console.error('Form is valid but required fields are missing');
        return;
      }

      const projectData: Omit<Project, 'id'> = {
        name: formResult.projectName,
        deadline: formResult.deadline,
      };
      this.loading.set(true);
      const projectId = await this.projectFacade.addProject(projectData);
      console.log('Project Created:', projectData);
      this.navigateToProjectDashboard(projectId);
      this.loading.set(false);
    } else {
      console.log('Form is invalid');
    }
  }
}
