import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../auth-facade';
import { RoleModel } from '../../auth.model';

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
    
    if (role === 'MEMBER') {
      this._router.navigate(['team', 'join-team'], { relativeTo: this._route.parent });
      return;
    }
    
    this._router.navigate(['team'], { relativeTo: this._route.parent });
  }
}
