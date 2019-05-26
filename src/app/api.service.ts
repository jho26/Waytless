import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { MenuItem } from './_models';
import { map } from "rxjs/operators";
import { Order } from './_models/order';
import { Restaurant } from './_models/restaurant';
import { Waitlist } from './_models/waitlist';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http
  ) { 

  }

  public getAllMenuItems(restaurantID: number): Observable<MenuItem[]> {
    return this.http.get(API_URL + '/menuitems/' + restaurantID)
      .pipe(map((response) => {
        const items: MenuItem[] = response.json();
        console.log(items);
        return items;
      }));
  }

  public makeOrders(orders: Order[]) {
    orders.forEach(o => {
      console.log('posting order!');
      console.log(o);
      let response = this.http.post(API_URL + '/orders', {
        "menuitemId" : o.menuItemId,
        "quantity" : o.quantity,
        "orderTime": o.orderTime,
        "customerId" : o.customerId,
        "restaurantID" : o.restaurantID
      });
      response.subscribe(r => console.log(r));
    });
  }

  public getAllOrders(restaurantID: number, customerID: number): Observable<Order[]> {
    return this.http.get(API_URL + '/orders/' + restaurantID + '/' + customerID)
      .pipe(map((response) => {
        const items: Order[] = response.json();
        console.log(items);
        return items;
      }));
  }

  public getAllRestaurants() {
    return this.http.get(API_URL + '/restaurantlist')
    .pipe(map(response => {
      const restaurants: Restaurant[] = response.json();
      console.log(restaurants);
      return restaurants;
    }));
  }

  public getWaitlist(restaurantID: number): Observable<Waitlist[]> {
    return this.http.get(API_URL + '/waitlist/' + restaurantID)
      .pipe(map((response) => {
        const items: Waitlist[] = response.json();
        console.log(Waitlist);
        return items;
      }));
  }

  public notifyCustomer(restaurantID: number, queueID: number) {
    console.log("notifying customer..." + queueID);
    return this.http.get(API_URL + '/waitlist/' + restaurantID + '/notify/' + queueID, {}).subscribe(response => {
      console.log(response.status);
      });
  }

  public confirmCustomer(restaurantID: number, queueID: number) {
    console.log("confirming customer..." + queueID);
    return this.http.get(API_URL + '/waitlist/' + restaurantID + '/confirm/' + queueID, {}).subscribe(response => {
      console.log(response.status);
      });
  }

  public removeReservation(restaurantID: number, queueID: number) {
    console.log("removing reservation..." + queueID);
    return this.http.delete(API_URL + '/waitlist/' + restaurantID + '/' + queueID, {}).subscribe(response => {
      console.log(response.status);
      });
  }

  public updateGroupSize(restaurantID: number, queueID: number, groupSize: number) {
    console.log("Updating group gize for ..." + queueID + " in " + restaurantID);
    return this.http.patch(API_URL + '/waitlist/' + restaurantID + '/' + queueID, {"groupSize" : groupSize}).subscribe(response => {
      console.log(response.status);
      });
  }
}
