import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

import { AuthService } from './core/services/auth/auth.service';
import { environment } from '../environments/environment.dev';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private auth = inject(AuthService);

  constructor() {
    this.login();
  }

  login() {
    this.auth.login(environment.username, environment.password).subscribe();
  }
}
