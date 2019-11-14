import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User[]>(`${environment.url_Api}/user/authenticate`, { email, password })
        .pipe(map(user => {
            // login successful
            if (user.length > 0) {
                // almacenar detalles de usuario en almacenamiento local para mantener al usuario conectado entre actualizaciones de página
                localStorage.setItem('currentUser', JSON.stringify(user[0]));
                this.currentUserSubject.next(user[0]);
                return user[0];
            } else {
              // si no se encuetra ningún usuario se retorna un mensaje de error
              throw new Error('Nombre de usuario o contraseña incorrecto');
            }

        }));
  }

  logout() {
    // eliminar usuario del almacenamiento local para cerrar sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
