import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface pour l'utilisateur, complète avec d'autres champs si nécessaire
export interface User {
  id: number;
  name: string; // Ajoutez d'autres champs si nécessaire
}

// Interface pour le produit, qui contient un objet User
export interface Product {
  id?: number;
  name: string;
  price: number;
  userId: number; // 🔥 lien vers l'utilisateur
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/products'; // URL du backend

  constructor(private http: HttpClient) {}

  // Récupère tous les produits
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Récupère les produits d'un utilisateur par son ID
  getByUserId(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Récupère un produit par son ID
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crée un nouveau produit
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Met à jour un produit par son ID
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Supprime un produit par son ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
