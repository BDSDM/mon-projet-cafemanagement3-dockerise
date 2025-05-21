import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.css'],
})
export class ConfirmResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  error: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  confirmReset() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      this.message = '';
      return;
    }

    this.resetPasswordService
      .confirmPasswordReset(this.token, this.newPassword)
      .subscribe(
        (response) => {
          this.message = response;
          this.error = '';
          this.snackBar.open('Mot de passe modifié avec succès', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          this.error = error.error.message || 'Une erreur est survenue.';
          this.message = '';
        }
      );
  }

  annuler() {
    this.router.navigate(['/login']);
  }
}
