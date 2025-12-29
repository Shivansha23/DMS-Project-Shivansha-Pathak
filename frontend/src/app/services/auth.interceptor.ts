import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  console.log('🔍 =================== INTERCEPTOR ===================');
  console.log('🔍 Request URL:', req.url);
  console.log('🔍 Request Method:', req.method);
  console.log('🔑 Token exists:', !!token);
  
  if (token) {
    console.log('🔑 Token (first 30 chars):', token.substring(0, 30) + '...');
    console.log('🔑 Token length:', token.length);
  }

  // Clone request and add authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Authorization header added to request');
    console.log('📋 Request headers:', req.headers.keys());
  } else {
    console.log('⚠️ No token found in localStorage - request will be sent without auth');
  }

  console.log('🔍 ==================================================');

  return next(req).pipe(
    catchError((error) => {
      console.error('❌ ================= HTTP ERROR =================');
      console.error('❌ Status:', error.status);
      console.error('❌ Message:', error.message);
      console.error('❌ Error body:', error.error);
      console.error('❌ ============================================');
      
      if (error.status === 401) {
        console.log('🔒 401 Unauthorized - Clearing storage and redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
