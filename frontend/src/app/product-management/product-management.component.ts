import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Product, ProductService } from '../services/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { catchError, forkJoin, of, tap } from 'rxjs';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent {
  // Implémentation de AfterViewInit
  username: string = '';
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  displayedColumns: string[] = [
    'name',
    'price',
    'userName',
    'update',
    'actions',
  ];

  products: Product[] = [];
  filterValue: string = '';

  // Déclaration de @ViewChild pour récupérer l'élément MatPaginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.tableData(); // Chargement des données à l'initialisation
    this.username = this.authService.getStoredUserName() || '';
  }

  ngAfterViewInit() {
    // Assigner le paginator à la dataSource une fois la vue initialisée
    this.dataSource.paginator = this.paginator;
  }
  pageEvent(event: any) {
    console.log('Page changed:', event);
    // Vous pouvez mettre à jour ici vos données ou effectuer des actions supplémentaires
  }
  handleCreateProductAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    this.dialog.open(CreateProductComponent, dialogConfig);
  }

  // Fonction pour récupérer les données des utilisateurs depuis le service
  tableData(): void {
    this.productService.getAll().subscribe((response: Product[]) => {
      this.products = response;
      console.log('produiiiiiiiiiiiiiiiiiiiii  ' + response);
      this.dataSource.data = this.products; // Affecter les données à la source de données
      // Assigner le paginator à la dataSource ici si nécessaire
    });
  }

  // Fonction de mise à jour d'un utilisateur
  handleUpdateAction(product: Product): void {
    if (product.id === undefined) {
      console.error('User ID is undefined. Cannot update.');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { product };

    const dialogRef = this.dialog.open(UpdateProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((updatedData: Product) => {
      if (updatedData) {
        this.productService
          .update(product.id as number, updatedData)
          .subscribe((updatedUser) => {
            const index = this.products.findIndex(
              (u) => u.id === updatedUser.id
            );
            if (index !== -1) {
              this.products[index] = updatedUser;
              this.dataSource.data = [...this.products];
            }
          });
      }
    });
  }

  // Fonction pour supprimer un utilisateur avec confirmation
  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '350px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.productService.delete(id).subscribe(
          () => {
            this.products = this.products.filter(
              (product) => product.id !== id
            );
            this.dataSource.data = [...this.products];
            console.log('Utilisateur supprimé avec succès.');
          },
          (error) => {
            console.error(
              "Erreur lors de la suppression de l'utilisateur",
              error
            );
          }
        );
      }
    });
  }

  // Appliquer le filtre sur la table des utilisateurs
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToProfile() {}

  // Fonction pour la gestion de la navigation
  goToUsersManagement() {
    this.router.navigate(['/usermanagement']);
  }

  goToToDoList() {
    this.router.navigate(['/todolist']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToCookiesGame() {
    this.router.navigate(['/cookiesgame']);
  }
  goToBuyProduct() {
    this.router.navigate(['/buyproduct']);
  }

  logOut() {
    this.authService.logOut();
  }

  // Fonction pour changer le statut d'un utilisateur
  toggleStatus(user: User): void {
    /* if (user.email === undefined) {
      console.error('User ID is undefined. Cannot toggle status.');
      return;
    }

    const newStatus = user.status === 'true' ? 'false' : 'true';
    this.userService.updateUserStatus(user.email, newStatus).subscribe({
      next: () => {
        user.status = newStatus;
        this.dataSource.data = [...this.users];
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
      },
    }); */
  }
}
