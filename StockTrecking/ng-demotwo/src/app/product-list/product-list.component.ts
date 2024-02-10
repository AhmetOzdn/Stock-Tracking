import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditComponent } from '../product-edit/product-edit.component';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService], // Local Service olduğu için product service burada bu tanımlamayı yaptık
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  dialogOpen = false;

  constructor(private productService: ProductService,public dialogRef: MatDialog) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      // console.log(products); Kontrol Ettik Product Listesi Döndümü diye
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Ürünleri alma hatası:', error);
      }
    );
  }

  deleteProduct(id: any): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        // Başarıyla silindiyse yapılacak işlemler
        console.log('Ürün başarıyla silindi.');
        // Ürünleri tekrar yükle
        this.loadProducts();
      },
      (error) => {
        // Hata durumunda yapılacak işlemler
        console.error('Ürün silme hatası:', error);
      }
    );
  }

  //Product-Edit Pop-Up
  openDialog(product:Product): void {
    this.dialogRef.open(ProductEditComponent,{
      data:{
       id : product.id,
       name : product.name,
       brandName : product.brandName,
       sellerName : product.sellerName,
       productDetail : product.productDetail,
       stockAmount : product.stockAmount
      }
    });

  }
}
