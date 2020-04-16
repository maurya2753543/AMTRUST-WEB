import { Injectable } from '@angular/core';
import { Router, CanActivate,  ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
//import { LocalStorageService } from '../../services/local-storage.service';

/*DI class for checking security as authguard*/
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router, 
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            return true;
        }
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}