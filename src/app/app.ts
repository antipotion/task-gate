import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VersionBanner } from "./version-banner/version-banner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VersionBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
