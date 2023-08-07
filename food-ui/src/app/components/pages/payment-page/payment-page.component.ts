import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models';

declare var paypal: any;
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  order: Order = new Order();

   @ViewChild('paypal', {static: true})
  paypalElement!: ElementRef

  constructor(
    private orderService: OrderService, private router: Router,
    private cartService: CartService,
    private toastr: ToastrService,) { 
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order
        
      },
      error: (err) => {
        this.router.navigateByUrl('/checkout')
      },
    })

  }

  ngOnInit(): void {
    this.paypalHook()
  }

    paypalHook():void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'BRL',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastr.success(
                'Pagemento feito com sucesso!',
                'Concluído'
              );
            },
            error: (error) => {
              this.toastr.error('Falha ao efetuar o pagamento', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastr.error('Falha ao processar pagamento', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }


}
