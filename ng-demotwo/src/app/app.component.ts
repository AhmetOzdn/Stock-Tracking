import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService], // Local Service olduğu için product service burada bu tanımlamayı yaptık
})
export class AppComponent implements OnInit {
  title = 'StockTracking';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin(); //auto login'i sayfa yüklenince çağırır
  }
}
