import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VersionBanner } from './version-banner/version-banner';
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VersionBanner, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
