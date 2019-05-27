import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'app/_models';
import { ApiService } from 'app/_services/api.service';
import { Order } from 'app/_models/order';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurantID: number;
  customerNumber: number;
  private sub: any;

  private restaurantName: string;
  private appetizers: MenuItem[];
  private entrees: MenuItem[];
  private desserts: MenuItem[];
  private orders: Map<number, number>; // key: menuItem id, value: count

  private totalPrice: number;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute) {
    this.restaurantID = 0;
    this.totalPrice = 0;
    this.customerNumber = 2;
    this.sub = this.route.params.subscribe(params => {
      this.restaurantID += params['id'];
      
      // below should eventually be fetched from back-end server.
      if (this.restaurantID == 1) {
        this.restaurantName = "Din Tai Fung";
      } else if (this.restaurantID == 2) {
        this.restaurantName = "Olive Garden";
      } else if (this.restaurantID == 3) {
        this.restaurantName = "Southern Spice";
      } else if (this.restaurantID == 4) {
        this.restaurantName = "Mediterranean Kitchen";
      } else {
        this.restaurantName = "PF Chang's";
      }
      
      this.apiService.getAllMenuItems(this.restaurantID).subscribe(menuItems => {
        this.appetizers = menuItems.filter(i => i.itemCategory.categoryId == 1);
        this.entrees = menuItems.filter(i => i.itemCategory.categoryId == 2);
        this.desserts = menuItems.filter(i => i.itemCategory.categoryId == 3);
      });
      this.orders = new Map();
    })
  }

  ngOnInit() {

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private addToCart(item: MenuItem) {
    console.log('adding for: ' + item.itemID);
    if (this.orders.get(item.itemID) === undefined) {
      this.orders.set(item.itemID, 1);
    } else {
      this.orders.set(item.itemID, this.orders.get(item.itemID) + 1);
    }
    this.totalPrice = Number.parseFloat((this.totalPrice + item.price).toFixed(2));
  }

  private deleteFromCart(item: MenuItem) {
    console.log('removing for: ' + item.itemID);
    let count = this.orders.get(item.itemID);
    if (count !== undefined) {
      let newCount = count - 1;
      if (newCount == 0) {
        this.orders.delete(item.itemID);
      } else {
        this.orders.set(item.itemID, newCount);
        this.totalPrice = Number.parseFloat((this.totalPrice - item.price).toFixed(2));
      }
    }
  }

  private makeOrder() {
    let confirmedOrders = [];
    let m = this.orders;
    console.log('make orders!');
    m.forEach((k, v, m) => {
      console.log(`key:${k} value:${v} map:${m}`);
      confirmedOrders.push({
        menuItemId: v,
        quantity: k,
        orderTime: new Date(),
        customerId : this.customerNumber,
        restaurantID : this.restaurantID
      });
    })
    this.apiService.makeOrders(confirmedOrders);
    console.log('done posting orders!');
    this.router.navigate([`/order-cart/` + this.restaurantID]);
  }
}
