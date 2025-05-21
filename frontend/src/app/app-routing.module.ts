import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { UsermanagementGuard } from './guards/usermanagement.guard';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { CookiesgameComponent } from './cookiesgame/cookiesgame.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { BuyProductComponent } from './buy-product/buy-product.component';

const routes: Routes = [
  { path: 'reset-password', component: ConfirmResetPasswordComponent },
  {
    path: 'buyproduct',
    component: BuyProductComponent,
  },
  {
    path: 'productmanagement',
    component: ProductManagementComponent,
  },
  {
    path: 'cookiesgame',
    component: CookiesgameComponent,
  },
  {
    path: 'todolist',
    component: TodoListComponent,
  },
  {
    path: 'usermanagement',
    component: UsermanagementComponent,
    canActivate: [UsermanagementGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'home', component: HomeComponent }, // Route vers HomeComponent
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: 'home' }, // Gestion des routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
