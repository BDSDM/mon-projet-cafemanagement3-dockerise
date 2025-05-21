import { Component, ViewChild } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Order, OrderService } from '../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent {
  products: Product[] = [];
  selectedProduct!: Product;
  orders: Order[] = [];
  displayedColumns: string[] = ['name', 'status', 'actions'];
  userName: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getStoredUserName();
    this.loadOrders();
    this.username = this.authService.getStoredUserName() || '';

    this.productService.getAll().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  username: string = '';

  canValidateCommande(): boolean {
    const result =
      this.orders.length > 0 && // Vérifie qu'il y a au moins une commande
      this.orders.every(
        (order) => order.status?.trim()?.toLowerCase() !== 'vendu' // Toutes les commandes doivent avoir un statut différent de "vendu"
      );
    return result;
  }

  loadOrders() {
    const userId = this.authService.getStoredUserId();

    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes', err);
      },
    });
  }

  deleteUser(id: number): void {
    this.orderService.delete(id).subscribe({
      next: () => {
        this.orders = this.orders.filter((order) => order.id !== id);
      },
      error: (err) => {
        console.error('Erreur suppression commande:', err);
        alert('Erreur lors de la suppression.');
      },
    });
  }
  get soldOrders() {
    return this.orders.filter(
      (order) => order.status?.trim()?.toLowerCase() === 'vendu'
    );
  }

  get filteredOrders() {
    return this.orders.filter(
      (order) => order.status?.trim()?.toLowerCase() !== 'vendu'
    );
  }
  getTotalAmount(): number {
    return this.orders
      .filter((order) => order.status?.trim()?.toLowerCase() === 'vendu') // 👈 On garde SEULEMENT les vendus
      .reduce((sum, order) => {
        const matchingProduct = this.products.find(
          (product) => product.name === order.name
        );
        return sum + (matchingProduct?.price || 0);
      }, 0);
  }

  validerCommande() {
    if (this.orders.length > 0) {
      const userId = this.authService.getStoredUserId(); // On récupère l'id utilisateur lié aux commandes
      this.orderService.validateOrdersByUser(userId).subscribe({
        next: (response) => {
          console.log(response);

          this.loadOrders(); // Recharge la liste
          this.snackBar.open(
            'Commandes validées avec succès et mail de validation envoyé!',
            'Fermer',
            {
              duration: 5000,
            }
          );
        },
        error: (error) => {
          console.error('Erreur lors de la validation', error);
          this.snackBar.open('Erreur lors de la validation', 'Fermer', {
            duration: 3000,
          });
        },
      });
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  logout() {
    this.authService.logOut();
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
  panier(): void {
    const userId = this.authService.getStoredUserId();

    if (!userId || !this.selectedProduct) {
      console.warn('Utilisateur ou produit non sélectionné.');
      return;
    }

    const newOrder: Order = {
      id: 0, // L'ID sera généré par le backend
      name: this.selectedProduct.name,
      status: 'EN_ATTENTE', // ou tout autre statut initial
    };

    this.orderService.createOrder(userId, newOrder).subscribe({
      next: (createdOrder) => {
        console.log('Commande créée avec succès :', createdOrder);
        this.loadOrders();
      },
      error: (err) => {
        console.error('Erreur lors de la création de la commande :', err);
        alert("Erreur lors de l'ajout au panier");
      },
    });
  }
}
