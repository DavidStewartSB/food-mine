import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/Users';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/UserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable()
   }

   public get currentUser(): User {
    return this.userSubject.value
   }

   login(userLogin: IUserLogin): Observable<User> {
      return this.http.post<User>(USER_LOGIN_URL, userLogin)
        .pipe(tap({
          next: (user) => {
            this.setUserToLocalStorage(user)
            this.userSubject.next(user);
            this.toastrService.success(
              `Bem vindo ${user.name}!`,
              "Login com sucesso"
            )
          },
          error: (err) => {
            this.toastrService.error(err.error,
              `Usuário ou senha inválidos`
            )
            console.log(err)
          }
        }))
   }
   register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(`${USER_REGISTER_URL}`, userRegister).pipe(
      tap({
        next: (user) => { 
          this.setUserToLocalStorage(user)
          this.userSubject.next(user) //notifica para os demais observables
          this.toastrService.success(
            `Bem vindo ao Food Store ${user.name}`,
            `Conta criada com sucesso`
          )
        },
        error: (err) => {
          this.toastrService.error(err.error, 
              `Falha ao criar conta`
            )
        }
      })
    )
   }

   logout() {
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY);
    window.location.reload()
   }

   private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
   }

   private getUserFromLocalStorage(): User {
    const useJson = localStorage.getItem(USER_KEY)
    if(useJson) return JSON.parse(useJson) as User;
    return new User();
   }
}
