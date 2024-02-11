import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})
export class CustomerCreateComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}
  error: string = '';
  model: any = {}; // model ataması yapılacak form kontrol için oluşturuldu
  saveCustomer(customerCreateForm: NgForm) {
    const customer = {
      id: null,
      name: this.model.name,
      companyName: this.model.companyName,
      email: this.model.email,
      phoneNumber: this.model.phoneNumber,
      //phoneNumber: parseInt(phoneNumber.value), number olunca ekle
      adress: this.model.adress,
    };

    if (customerCreateForm.valid) {
      this.customerService.createCustomer(customer).subscribe((data) => {
        this.router.navigate(['/customers']);
      });
    }else{
      this.error = "Lütfen bilgileri kontrol edip formu tekrar doldurunuz."
    }

  }
}
