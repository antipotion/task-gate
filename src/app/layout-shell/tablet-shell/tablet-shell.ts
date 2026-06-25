import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tablet-shell',
  imports: [MatIconModule, MatButtonModule, NgClass],
  templateUrl: './tablet-shell.html',
  styleUrl: './tablet-shell.scss',
})
export class TabletShell {
  readonly withSecondary = input<boolean>(false);
  readonly isMenuExpanded = signal<boolean>(false);

  onToggleIsMenuExpanded(): void {
    this.isMenuExpanded.update((value) => !value);
  }
}
