import { Injectable } from '@angular/core';
import { Product } from '../../../data/products';
import { Cart } from '../../../data/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart[] = [];

  constructor() {}

  getCart() {
    return this.cart;
  }

  addToCart(product: Product) {
    const productFound = this.cart.find((c) => c.product.id == product.id);
    if (productFound) {
      productFound.qty++;
    } else {
      this.cart.push({ product: product, qty: 1 });
    }
  }

  incrementQty(id: number) {
    const productFound = this.cart.find((c) => c.product.id == id);
    if (productFound) {
      if (productFound.qty < productFound.product.stock) {
        productFound.qty++;
      }
    }
  }

  decrementQty(id: number) {
    const productFound = this.cart.find((c) => c.product.id == id);
    if (productFound) {
      if (productFound.qty > 1) {
        productFound.qty--;
      }
      if (productFound.qty == 1) {
        this.deleteProduct(id);
      }
    }
  }

  deleteProduct(id: number) {
    this.cart = this.cart.filter((c) => c.product.id !== id);
  }

  getProductQty(productId: number): number {
    const item = this.cart.find((c) => c.product.id === productId);
    return item ? item.qty : 0;
  }

  calculateTotal() {
    return this.cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  }

  clearCart() {
    this.cart = [];
  }
}
