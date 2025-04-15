import { Component } from '@angular/core';
import { CartService } from '../../services/cartService/cart.service';
import { Cart } from '../../../data/cart';
import { Product } from '../../../data/products';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: Cart[] = [];
  total: number = 0;

  constructor(private _cartService: CartService) {
    this.resetValues();
  }

  incrementQty(id: number) {
    this._cartService.incrementQty(id);
    this.resetValues();
  }

  decrementQty(id: number) {
    this._cartService.decrementQty(id);
    this.resetValues();
  }

  deleteProduct(id: number) {
    this._cartService.deleteProduct(id);
    this.resetValues();
  }

  isAddDisabled(product: Product): boolean {
    const qty = this._cartService.getProductQty(product.id);
    return qty >= product.stock;
  }

  getTotal() {
    this.total = this._cartService.calculateTotal();
  }

  resetValues() {
    this.cart = this._cartService.getCart();
    this.total = this._cartService.calculateTotal();
  }

  deleteAll() {
    this._cartService.clearCart();
    this.resetValues();
  }
}
