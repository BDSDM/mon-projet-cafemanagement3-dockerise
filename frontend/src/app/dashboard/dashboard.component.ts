import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getStoredUserName() || '';
  }

  goToUsersManagement() {
    this.router.navigate(['/usermanagement']);
  }

  goToToDoList() {
    this.router.navigate(['/todolist']);
  }
  goToCookiesGame() {
    this.router.navigate(['/cookiesgame']);
  }
  logOut() {
    this.authService.logOut();
  }
  goToProductsManagement() {
    this.router.navigate(['/productmanagement']);
  }
  goToBuyProduct() {
    this.router.navigate(['/buyproduct']);
  }
}
