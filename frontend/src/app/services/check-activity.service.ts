import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { RefreshTokenPopupComponent } from '../refresh-token-popup/refresh-token-popup.component';

@Injectable({
  providedIn: 'root',
})
export class CheckActivityService {
  private checkInterval = 1000; // Vérifie toutes les secondes
  private jwtHelper = new JwtHelperService();
  private hasCalledLambda = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  startChecking() {
    setInterval(() => {
      const token = this.authService.getToken();

      if (!token) return;

      const decoded = this.jwtHelper.decodeToken(token);

      if (!decoded || !decoded.exp) return;

      const expiresInMs = decoded.exp * 1000 - Date.now();

      // Appelle refreshToken() à 20 secondes de l'expiration
      if (expiresInMs <= 20000 && expiresInMs > 0 && !this.hasCalledLambda) {
        this.refreshToken(); // ← ici tu appelles ta méthode
        this.hasCalledLambda = true;
      }

      // Token expiré → déconnexion
      if (this.jwtHelper.isTokenExpired(token)) {
        this.dialog.closeAll();
        this.userService.logoutFromApp();
      }
    }, this.checkInterval);
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
        this.hasCalledLambda = false; // Réinitialiser hasCalledLambda pour permettre un nouvel appel
      }
    });
  }

  private executeRefreshToken() {
    this.userService.refreshAccessToken().subscribe({
      next: (newToken) => {
        localStorage.setItem('token', newToken);
        console.log('Token mis à jour avec succès');
        this.hasCalledLambda = false; // Réinitialise le flag après un rafraîchissement réussi
      },
      error: (err) => {
        console.error('Erreur lors du rafraîchissement :', err);
        this.userService.logoutFromApp();
      },
    });
  }
}
