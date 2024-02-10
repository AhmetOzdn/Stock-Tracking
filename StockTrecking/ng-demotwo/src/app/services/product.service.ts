import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';
import { Product } from '../models/products';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'https://localhost:7023/api/Products?PageIndex=0&PageSize=100';
  private productUrl = 'https://localhost:7023/api/Products';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.url).pipe(
      map((data) => data.items as Product[]) // items'i doğrudan Product[] tipine dönüştür
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + 'products/' + id + '.json');
  }

  createProduct(product: Product): Observable<Product> {
    // burada token ile yetkili bir kişinin ürün eklemesi için gereken token değerini isteyen bir kod satırı yazdık.
    return this.authService.tokenModel.pipe(
      take(1), // "take" ulaşılmış olan datadan  ilk datayı alır
      //tap((tokenModel) => console.log(tokenModel)),  "tap" konsola yazdırmamızı sağlar
      exhaustMap((tokenModel) => { //  "exhaustMap" ise bir önceki değeri bekledikten sonra içindeki değeri döndürür
        return this.http.post<Product>(this.productUrl, product); // "+ user?.token" bu bilgiyi şuan eklemedik gerek yok
      })
    );
  }

  deleteProduct(id: any): Observable<Product> {
    const deleteUrl = `${this.productUrl}/${id}`;
    return this.http.delete<Product>(deleteUrl);
  }

  uptadeProduct(product: Product): Observable<Product> {
    const uptadeProduct = `${this.productUrl}`;
    return this.http.put<Product>(uptadeProduct, product);
  }
}
