import { CanActivateFn } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { inject } from "@angular/core";

export const DayliGuard: CanActivateFn = (route, state) => {
   return inject(AuthService).isGetDayli();
}