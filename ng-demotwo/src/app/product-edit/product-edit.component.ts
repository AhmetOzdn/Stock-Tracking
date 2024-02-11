import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { Product } from '../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  products : Product[];
    // Burada bi id tanımladım altta onu doldurdum inject ile öbür componente yolladım oradan da id sini çektim
  id ;
  name ;
  brandName;
  sellerName ;
  productDetail ;
  stockAmount;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data, // "MAT_DIALOG_DATA" veriyi ana bileşenden bu bileşene aktarmamızı sağlıyor
    private router: Router //
  ) {{
    this.id = data.id;
    this.name = data.name;
    this.brandName = data.brandName;
    this.sellerName = data.sellerName;
    this.productDetail = data.productDetail;
    this.stockAmount = data.stockAmount;
  }}


  // Update Product
  uptadeProduct(
    name: any,
    brandName: any,
    sellerName: any,
    productDetail: any,
    stockAmount: any
  ) {
    const customer = {
      id: this.id,
      name: name.value,
      brandName: brandName.value,
      sellerName: sellerName.value,
      productDetail: productDetail.value,
      //phoneNumber: parseInt(phoneNumber.value), number olunca ekle
      stockAmount: stockAmount.value,
    };

    console.log(customer);
    this.productService.uptadeProduct(customer).subscribe((sub) => {
      this.loadCustomer()
      this.router.navigate(['/products']);
      
    });
  }

  loadCustomer(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Ürünleri alma hatası:', error);
      }
    );
  }
}
