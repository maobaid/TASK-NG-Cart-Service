import { Component } from '@angular/core';
import { CartService } from '../../services/cartService/cart.service';
import { Cart } from '../../../data/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: Cart[] = [];
  constructor(private _cartService: CartService) {
    this.cart = _cartService.getCart();
  }

  incrementQty(id: number) {
    this._cartService.incrementQty(id);
  }

  decrementQty(id: number) {
    this._cartService.decrementQty(id);
    this.cart = this._cartService.getCart();
  }

  deleteProduct(id: number) {
    this._cartService.deleteProduct(id);
    this.cart = this._cartService.getCart();
  }
}
