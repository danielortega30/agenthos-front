import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';

import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An error has occurred';

      if (error.status === HttpStatusCode.Unauthorized) {
        router.navigate(['/login']);
        errorMessage = 'Session expired. Please login again';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (Array.isArray(error.error?.message)) {
        errorMessage = error.error.message[0];
      }

      toastService.error(errorMessage);
      return throwError(() => error);
    }),
  );
};
