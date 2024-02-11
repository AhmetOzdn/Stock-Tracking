import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService 
  ) {}

  ngOnInit(): void {
    // ÜRÜNLERİN ID'lerini alarak seçim yapmak için burayı hazırladık
    this.route.params.subscribe((params) => {
      const id = params['customerId'];
      this.customerService.getCustomerById(id).subscribe(result => {
        this.customer = {...result, id:id}
      });
    });
  }


}
