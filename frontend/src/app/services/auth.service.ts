import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../confirm-logout-dialog/confirm-logout-dialog.component';
import { UserService } from './user.service';
import { RefreshTokenPopupComponent } from '../refresh-token-popup/refresh-token-popup.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/auth'; // URL backend

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      responseType: 'text',
    });
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  getStoredUserId(): number {
    const userId = localStorage.getItem('id');
    return userId ? +userId : 0; // Si l'ID est trouvé, on le convertit en nombre, sinon on retourne 0
  }
  getStoredUserEmail(): string | null {
    return localStorage.getItem('sub');
  }
  getStoredBoolean(): boolean {
    return JSON.parse(localStorage.getItem('showPopup') || 'false');
  }

  getStoredUserName(): string {
    return localStorage.getItem('name') || '';
  }
  getStoredUserRole(): string {
    return localStorage.getItem('role') || '';
  }

  refreshToken() {
    const dialogRef = this.dialog.open(RefreshTokenPopupComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // L'utilisateur a cliqué sur "Oui"
        this.executeRefreshToken();
      } else {
        // L'utilisateur a cliqué sur "Non" → ne rien faire
        console.log('Session non prolongée.');
      }
    });
  }
  private executeRefreshToken() {
    this.userService.refreshAccessToken().subscribe({
      next: (newToken) => {
        localStorage.setItem('token', newToken);
        console.log('Token mis à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors du rafraîchissement :', err);
        this.userService.logoutFromApp();
      },
    });
  }

  logOut() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si l'utilisateur confirme la déconnexion
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
      }
    });
  }
}
