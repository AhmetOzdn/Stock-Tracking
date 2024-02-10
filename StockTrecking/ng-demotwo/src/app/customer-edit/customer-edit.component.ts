import { Component,Inject,} from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent {
  customer: Customer[];
  // Burada bi id tanımladım altta onu doldurdum inject ile öbür componente yolladım oradan da id sini çektim
  id;
  name;
  companyName;
  email;
  phoneNumber;
  adress;
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data, // "MAT_DIALOG_DATA" veriyi ana bileşenden bu bileşene aktarmamızı sağlıyor
    private router: Router //
  ) {
    this.id = data.id;
    this.name = data.name;
    this.companyName = data.companyName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.adress = data.adress;
  }

  // Update Product
  updateCustomer(
    customerName: any,
    companyName: any,
    email: any,
    phoneNumber: any,
    adress: any
  ) {
    const customer = {
      id: this.id,
      name: customerName.value,
      companyName: companyName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      //phoneNumber: parseInt(phoneNumber.value), number olunca ekle
      adress: adress.value,
    };

    console.log(customer);
    this.customerService.updateCustomer(customer).subscribe((sub) => {
      this.loadCustomer()
      this.router.navigate(['/customers']);
      
    });
  }


  loadCustomer(): void {
    this.customerService.getCustomers().subscribe(
      (data) => {
        this.customer = data;
      },
      (error) => {
        console.error('Ürünleri alma hatası:', error);
      }
    );
  }


  
}

