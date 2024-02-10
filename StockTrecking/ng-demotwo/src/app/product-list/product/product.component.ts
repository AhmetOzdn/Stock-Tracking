import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // Dışarıdan bir ürün almak için kullanılır
  // @Output() unSelectEvent = new EventEmitter<void>
  // unselectProduct(){
  //   this.unSelectEvent.emit(); // burada alt kompenentten aldığımız bilgiyi üst komponette göstermek için ilk önce output parametresini kullandık daha sonra unselectproduct'ı burada tekrar tanımlayarak içerisinde eventemmitter ile emit işlemi(gönderme) yaprak sçildiğinde "unselectProduct"ı çağırmasını istedik bunuda seçimi kaldırılmasını istediğimiz card'a vererek orada ((unSelectEvent)="unselectProduct()") tanımlamasınyla orada çağırdık.
  // }

  product: Product | undefined;
  products: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService 
  ) {}

  ngOnInit(): void {
    // ÜRÜNLERİN ID'lerini alarak seçim yapmak için burayı hazırladık
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      this.productService.getProductById(id).subscribe(result => {
        this.product = {...result, id:id}
      });
    });
  }
}
