import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) 
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm)
      else if(params.tag) {
        foodsObservable = this.foodService.getAllFoodsbyTag(params.tag)
      }
      else 
        foodsObservable = foodService.getAll()

        foodsObservable.subscribe({
          next: (res) => {this.foods = res; console.log(res)},
          error: (err) => {console.log(err)},
          complete: () => console.log("foods")
        })
    }
    
   )}

  ngOnInit(): void {
  }

}
