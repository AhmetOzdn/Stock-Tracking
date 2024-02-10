import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin-guard';
//import { CustomerComponent } from './customer-list/customer/customer.component';
//import { ProductComponent }  from './product-list/product/product.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // ANA SAYFA
  { path: 'customers/create', component: CustomerCreateComponent ,canActivate:[AdminGuard]}, // FORMDAN DATAYA MÜŞTERİ EKLEME
  { path: 'products/create', component: ProductCreateComponent ,canActivate:[AdminGuard] }, // FORMDAN DATAYA ÜRÜN EKLEME
  { path: 'products', component: ProductListComponent ,canActivate:[AdminGuard]}, // ÜRÜNLER SAYFASI
  { path: 'customers', component: CustomerListComponent ,canActivate:[AdminGuard]}, // MÜŞTERİLER SAYFASI
  { path: 'register', component:RegisterComponent}, // REGİSTER KAYIT SAYFASI 
  { path: 'login', component:LoginComponent}, // LOGİN KAYIT SAYFASI 
 // KATEGORİ FİLTRELEMESİ  { path: 'products/category/:categoryId', component: ProductListComponent }, 
 // ÜRÜN DETAY SAYFASI     { path: 'products/:productId', component: ProductComponent }, 
 // MÜŞTERİ DETAY SAYFASI  { path: 'customers/:id', component: CustomerComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
