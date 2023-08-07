import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags?: Tag[];

  constructor(private foodService: FoodService) { 
   this.foodService.getAllTags().subscribe({
    next: (res) => {this.tags = res},
    error: (err) => {console.log(err)},
    complete: () => console.log('completo')
   })
  }

  ngOnInit(): void {
  }

}
