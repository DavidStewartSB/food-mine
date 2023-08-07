import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models';

declare var paypal: any;
@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit {

  @Input() order!: Order 
  @ViewChild('paypal', {static: true})
  paypalElement!: ElementRef
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }


}