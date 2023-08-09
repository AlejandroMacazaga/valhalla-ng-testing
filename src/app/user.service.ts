import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './models/user';
import { RegisterUser } from './models/register-user';
import { ApiPaths } from './enums/api-paths';
import { environment } from './environments/environment';
import { Observable, BehaviorSubject, of} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  

  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public getuserValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    let url = `${this.baseUrl}${ApiPaths.Login}`;
    return this.http.post<User>(url, {email, password}, this.httpOptions).pipe(
      map((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

      
  registerUser(user: RegisterUser): Observable<any> {
    let url = 'http://127.0.0.1:3333/api/v1/user/register';
    return this.http.put(url, user, this.httpOptions).pipe(
      tap((response: any) => {
        console.log(response);
      }),
      catchError((error: any) => {
        this.handleError('registerUser', error);
        return of(error);
      })
    );
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log("Error: " + message);
  }


}
