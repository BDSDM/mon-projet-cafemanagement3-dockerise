import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ Import nécessaire
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { ConfirmLogoutDialogComponent } from './confirm-logout-dialog/confirm-logout-dialog.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RefreshTokenPopupComponent } from './refresh-token-popup/refresh-token-popup.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { UpdateComponent } from './update/update.component';
import { AdminRequiredComponent } from './admin-required/admin-required.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { CookiesgameComponent } from './cookiesgame/cookiesgame.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,

    ConfirmLogoutDialogComponent,

    RefreshTokenPopupComponent,
    UsermanagementComponent,
    ConfirmDeleteComponent,
    UpdateComponent,
    AdminRequiredComponent,
    RequestResetPasswordComponent,
    ConfirmResetPasswordComponent,
    CookiesgameComponent,
    TodoListComponent,
    ProductManagementComponent,
    UpdateProductComponent,
    CreateProductComponent,
    BuyProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
