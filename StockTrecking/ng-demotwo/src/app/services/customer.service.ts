import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';
import { Customer } from '../models/customer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root', // Bu servisin uygulama düzeyinde sağlandığını belirtir
})
export class CustomerService {
  private url = 'https://localhost:7023/api/Customers?PageIndex=0&PageSize=10';
  private customerUrl = 'https://localhost:7023/api/Customers';

  constructor(private http: HttpClient, private authService:AuthService,) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<any>(this.url).pipe(
      map((data) => data.items as Customer[]) // items'i doğrudan Customer[] tipine dönüştürür
    );
  }

  createCustomer(customer: Customer): Observable<Customer> {
     // burada token ile yetkili bir kişinin ürün eklemesi için gereken token değerini isteyen bir kod satırı yazdık.
     return this.authService.tokenModel.pipe(
      take(1), // "take" ulaşılmış olan datadan  ilk datayı alır
      //tap((tokenModel) => console.log(tokenModel)), "tap" konsola yazdırmamızı sağlar burada console'a token modeli konsola yazar
      exhaustMap((tokenModel) => {
        //  "exhaustMap" ise bir önceki değeri bekledikjten sonra içindeki değeri döndürür
        return this.http.post<Customer>(this.customerUrl, customer);; // "+ user?.token" bu bilgiyi şuan eklemedik gerek yok
      })
    );
    
  }

  getCustomerById(id: any): Observable<Customer> {
    return this.http.get<Customer>(this.url + 'customers/' + id);
  }

  deleteCustomer(id: any): Observable<Customer> {
    const deleteUrl = `${this.customerUrl}/${id}`;
    return this.http.delete<Customer>(deleteUrl);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const uptadeCustomer = `${this.customerUrl}`;
    return this.http.put<Customer>(uptadeCustomer, customer);
  }
}
