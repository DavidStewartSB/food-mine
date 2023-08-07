import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {

  food!: Food

  constructor(activatedRoute: ActivatedRoute, private foodService: FoodService,private cartService: CartService, private router: Router) { 
    activatedRoute.params.subscribe((params) => {
      if(params.id)
         foodService.getFoodById(params.id).subscribe({
          next: (res) => {this.food = res},
          error: (err) => {console.log(err)},
          complete: () => console.log("foi")
         })
    })
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.food)
    this.router.navigateByUrl('/cart-page')
  }

}
