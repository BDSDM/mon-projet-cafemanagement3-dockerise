import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  updateProductError: boolean = false;
  updateProductForm!: FormGroup; // ➔ Correction ici avec !

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // ➔ Récupère les données du produit injecté
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this.formBuilder.group({
      name: [this.data.product.name, [Validators.required]], // pré-rempli avec data.name
      price: [
        this.data.product.price,
        [
          Validators.required,
          Validators.min(0), // accepte 0
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // réel avec 0, 1 ou 2 décimales
        ],
      ],
    });
  }

  handleSubmit() {
    const formData = this.updateProductForm.value;

    const userId = this.authService.getStoredUserId(); // récupération userId

    if (!userId) {
      this.updateProductError = true;
      this.errorMessage = 'Utilisateur non authentifié.';
      return;
    }

    const updatedProduct = {
      name: formData.name,
      price: formData.price,
      userId: userId,
    };

    // ➔ Envoi ID produit + updatedProduct
    this.productService.update(this.data.product.id, updatedProduct).subscribe(
      (response) => {
        this.dialogRef.close(); // ferme la fenêtre
        window.location.reload(); // recharge la page pour voir les changements
      },
      (error) => {
        this.updateProductError = true;
        this.errorMessage = 'Erreur lors de la mise à jour du produit.';
      }
    );
  }
}
