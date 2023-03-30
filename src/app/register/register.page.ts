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
  if (this.formValidation(user)) { // Correctly pass the user object to formValidation()
    let loader = await this.loadingCtrl.create({
      message: "Espere por favor...."
    });
    await loader.present();

    try {
      const data = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password); // Use await instead of .then()
      console.log(data);

      this.navCtrl.navigateRoot("home");
    } catch (error:any) {
      error.message = "Error al Registrarse!";
      let errorMessage = error.message || error.getLocalizeMessage();

      this.showToast(errorMessage);
    }

    await loader.dismiss();

  }
}
formValidation(user: User) { // Correct the function name and accept the user object as a parameter
  if (!user.email) { // Use the user object to validate email and password
    this.showToast("Ingrese un Email");
    return false;
  }
  if (!user.password) {
    this.showToast("Ingrese una Contraseña");
    return false;
  }
  return true; // Return true here as validation passed
}

showToast(message: string) { // Pass the message parameter to showToast function
  this.toastCtrl.create({
    message: message, // Use the message parameter
    duration: 4000
  }).then(toastData => toastData.present());
}
}
