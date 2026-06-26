import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-team',
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './add-team.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './add-team.scss',
})
export class AddTeam {}
