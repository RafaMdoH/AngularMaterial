import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // borrar los mensajes de alerta sobre el cambio de ruta a menos que el indicador 'keepAfterRouteChange' sea verdadero
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // solo guardar para un cambio de ruta
              this.keepAfterRouteChange = false;
          } else {
              // limpiar mensaje de alerta
              this.clear();
          }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next({ type: 'error', text: message });
  }

  clear() {
      // borrar llamando a subject.next () sin parámetros
      this.subject.next();
  }
}
