import { Component } from '@angular/core';
import { Product, PRODUCTS } from '../../../data/products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cartService/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product: Product | undefined;
  products = PRODUCTS;

  constructor(
    private route: ActivatedRoute,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find((product) => product.id === id);
  }

  addToCart() {
    this._cartService.addToCart(this.product!);
  }
}
