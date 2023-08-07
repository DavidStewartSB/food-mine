import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.scss']
})
export class OrderTrackPageComponent implements OnInit {

  public order!: Order
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrder()
  }


 getOrder() {
    const params = this.activatedRoute.snapshot.params

    if(!params.orderId) return;

    this.orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order
    })
  }

}
