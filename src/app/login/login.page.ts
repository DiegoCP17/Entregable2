import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  User = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController ) { }

  ngOnInit() {}

  async login(user: User) {
    if (this.formValidation()){
      let loader = await this.loadingCtrl.create({
        message: "Espere un momento por favor..."
      });
      await loader.present();

      try{
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data =>{
          console.log(data);

          this.navCtrl.navigateRoot("home");
        })
      } catch (e:any) {
        e.message = "Usuario no registrado";
        let errorMessage = e.message || e.getLocalizeMessage();

        this.showToast(errorMessage);
      }

      await loader.dismiss();
    }
  }

  formValidation() {
    if (this.User.email) {
      this.showToast("Ingrese un correo");
      return false;
    }

    if (this.User.password) {
      this.showToast("Ingrese una contraseña");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 5000 //
    }).then(toastData => toastData.present());
  }
}
