import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  onCreateTeam(): void {
    this._router.navigate(['create-team'], { relativeTo: this._route });
  }

  onJoinTeam(): void {
    this._router.navigate(['join-team'], { relativeTo: this._route });
  }
}
