import { CanActivateFn } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const NotPremiumGuard: CanActivateFn = (route, state) => {
   return inject(AuthService).isPremium() ? true : inject(Router).createUrlTree(['/home']);
}