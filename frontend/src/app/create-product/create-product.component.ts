import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../global-constants';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  createProductError: boolean = false;
  createProductForm: any = FormGroup;
  passwordVisible: boolean = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreateProductComponent>
  ) {}

  ngOnInit(): void {
    this.createProductForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [
        null,
        [
          Validators.required,
          Validators.min(0), // accepte 0
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // réel avec 0 ou 2 décimales
        ],
      ],
    });
  }

  handleSubmit() {
    const formData = this.createProductForm.value;

    const userId = this.authService.getStoredUserId(); // 👈 récupération de l'ID utilisateur
    console.log('userid  ' + userId);

    if (!userId) {
      this.createProductError = true;
      this.errorMessage = 'Utilisateur non authentifié.';
      return;
    }

    const data = {
      name: formData.name,
      price: formData.price,
      userId: userId, // 👈 ajout de l’ID dans l’objet à envoyer
    };
    console.log('uuuuuuuuuuuuuuuserId' + userId);

    this.productService.create(data).subscribe(
      (response) => {
        this.dialogRef.close();
        window.location.reload();

        this.router.navigate(['/productmanagement']);
      },
      (error) => {
        this.createProductError = true;
        this.errorMessage = 'Erreur lors de la création du produit.';
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Inverser l'état de visibilité du mot de passe
  }
}
