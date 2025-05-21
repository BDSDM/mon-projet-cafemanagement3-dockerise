import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cookiesgame',
  templateUrl: './cookiesgame.component.html',
  styleUrls: ['./cookiesgame.component.css'],
})
export class CookiesgameComponent {
  colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  currentColor: string = 'white'; // Valeur par défaut initiale
  role: string = ''; // Propriété de la classe
  userName: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadColorPreference();
    this.userName = this.authService.getStoredUserName();
  }
  reload() {
    this.userService.deletePreferredColor().subscribe(
      (response) => {
        console.log('Cookie supprimé avec succès', response);
        this.loadColorPreference();

        // Ajouter ici une action de confirmation, comme afficher un message utilisateur
      },
      (error) => {
        console.error('Erreur lors de la suppression du cookie', error);
      }
    );
  }
  logout() {
    this.authService.logOut();
  }
  goToCookiesGame() {}
  goToProfile() {}
  goToBuyProduct() {
    this.router.navigate(['/buyproduct']);
  }
  goToProductsManagement() {
    this.router.navigate(['/productmanagement']);
  }
  goToToDoList() {
    this.router.navigate(['/todolist']);
  }
  goToUsersManagement() {
    this.router.navigate(['/usermanagement']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  setColor(color: string): void {
    this.userService.setColorPreference(color).subscribe({
      next: () => {
        this.currentColor = color;
        console.log('Couleur définie avec succès:', color);
      },
      error: (error) => {
        console.error('Erreur lors de la définition de la couleur:', error);
      },
    });
  }

  loadColorPreference(): void {
    this.userService.getColorPreference().subscribe({
      next: (color) => {
        console.log('Couleur récupérée du backend:', color);
        this.currentColor = color || 'white'; // Applique la couleur récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la couleur:', error);
        this.currentColor = 'white'; // Définir la couleur par défaut en cas d'erreur
      },
    });
  }
}
