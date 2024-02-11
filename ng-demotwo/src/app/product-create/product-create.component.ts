// product-create.component.ts
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../models/products';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  constructor(private productService: ProductService, private router: Router) {}

  //Model Driven Forms
  error: string = '';
  model: any = {}; // model ataması yapılacak

  saveProduct(productCreateForm: NgForm) {
    const product: Product = {
      id: null,
      brandName: this.model.brandName,
      sellerName: this.model.sellerName,
      name: this.model.customerName,
      productDetail: this.model.productDetail,
      stockAmount: parseInt(this.model.stockAmount),
      // isActive: !!isActive.checked,
      // categoryId: categoryId.value,
    };
    if (productCreateForm.valid) {
      this.productService.createProduct(product).subscribe((data) => {
        this.router.navigate(['/products']);
        
        
      });

      //console.log(product); eklenen product'ı consol'a yazdırır
    } else {
      this.error = 'Lütfen bilgileri kontrol edip formu tekrar doldurunuz.';
    }
  }
}
