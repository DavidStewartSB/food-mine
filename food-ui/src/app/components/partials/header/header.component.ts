import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/Users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('dropdownUser') dropdownUser!: ElementRef;

  cartQuantity = 0
  user!: User
  constructor(cartService: CartService, private userService: UserService) { 
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
  }

  
  toggleMobileMenu() {
    this.mobileMenu.nativeElement.classList.toggle('hidden');
  }

  toggleDropdown() {
    this.dropdownUser.nativeElement.classList.toggle('hidden');
  }
  logout() {
    this.userService.logout()
  }

}
