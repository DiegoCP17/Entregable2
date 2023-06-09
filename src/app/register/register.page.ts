import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: '../register/register.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class RegisterPage implements OnInit {
  
  User = {} as User;
  

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  async register(user: User) {
  if (this.formValidation(user)) { 
    let loader = await this.loadingCtrl.create({
      message: "Espere por favor...."
    });
    await loader.present();

    try {
      await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(data => {
        console.log(data);

        this.navCtrl.navigateRoot("home");
      }); 

    } catch (error:any) {
      error.message = "Error al Registrarse!";
      let errorMessage = error.message || error.getLocalizeMessage();

      this.showToast(errorMessage);
    }

    await loader.dismiss();

  }
}
formValidation(user: User) { 
  if (!this.User.email) { 
    this.showToast("Ingrese un Email");
    return false;
  }
  if (!this.User.password) {
    this.showToast("Ingrese una Contraseña");
    return false;
  }
  return true; 
}

showToast(message: string) { 
  this.toastCtrl.create({
    message: message, 
    duration: 4000
  }).then(toastData => toastData.present());
}

}
