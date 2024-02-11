import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService], // Local Service olduğu için product service burada bu tanımlamayı yaptık
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  dialogOpen = false;

  constructor(
    // private route: ActivatedRoute,
    private customerService: CustomerService,
    private http: HttpClient,
    public dialogRef: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://localhost:7023/api/Customers?PageIndex=0&PageSize=10')
      .subscribe((data) => {
        this.customers = data.items;
      });
  }

  loadCustomer(): void {
    this.customerService.getCustomers().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        console.error('Ürünleri alma hatası:', error);
      }
    );
  }

  deleteCustomer(id: any): void {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        // Başarıyla silindiyse yapılacak işlemler
        console.log('Ürün başarıyla silindi.');
        // Ürünleri tekrar yükle
        this.loadCustomer();
      },
      (error) => {
        // Hata durumunda yapılacak işlemler
        console.error('Ürün silme hatası:', error);
        console.log(id);
      }
    );
  }
  

  //Customer-Edit Pop-up
  openDialog(customer:Customer): void {
    this.dialogRef.open(CustomerEditComponent,{
      data:{
        id : customer.id ,
        name: customer.name,
        companyName: customer.companyName,
        email : customer.email,
        phoneNumber : customer.phoneNumber,
        adress : customer.adress,

      }
    });
    
  }
}
