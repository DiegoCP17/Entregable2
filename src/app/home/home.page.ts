import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // packages = [
  //   {
  //     place: 'Apartamentos J.O',
  //     location: 'Antioquia',
  //     bg:'/src/assets/Imagenes/pintor.jpg'
      
  //   },
  //   {
  //     place: 'Edificio los olivos',
  //     location: 'Cali',
  //     bg:'/src/assets/Imagenes/Electricista.jpg'
      
  //   },
  //   {
  //     place: 'Aguas Claras',
  //     location: 'Santa Marta',
  //     bg:'/src/assets/Imagenes/plomero.jpg'
      
  //   }
  // ]

  Salir() {
    
    alert("Ha Cerrado Sessión");
  }
  constructor() {}
  
}
