import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/order'; // adapte si besoin

  constructor(private http: HttpClient) {}

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`);
  }
  createOrder(userId: number, order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create/${userId}`, order);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  validateOrdersByUser(userId: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/validate/user/${userId}`,
      {},
      { responseType: 'text' as 'json' }
    );
  }
}
