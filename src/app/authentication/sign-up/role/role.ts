import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../auth-facade';
import { RoleModel } from '../../auth.model';
import { AUTH_ROUTE_PARAMS } from '../../auth.routes';

@Component({
  selector: 'app-role',
  imports: [MatButtonModule],
  templateUrl: './role.html',
  styleUrl: './role.scss',
})
export class Role {
  private readonly _authFacade = inject(AuthFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  selectRole(role: RoleModel): void {
    this._authFacade.setUserRole(role);

    this._router.navigate([AUTH_ROUTE_PARAMS.signup], { relativeTo: this._route.parent });
  }
}
