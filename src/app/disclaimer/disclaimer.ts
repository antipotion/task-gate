import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-disclaimer',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './disclaimer.html',
  styleUrl: './disclaimer.scss',
})
export class Disclaimer {
  private readonly _disclaimerDialogRef = inject(MatDialogRef<Disclaimer>);

  onNoClick(): void {
    this._disclaimerDialogRef.close();
  }
}
