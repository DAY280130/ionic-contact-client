import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Http } from '@capacitor-community/http';
import { Preferences } from '@capacitor/preferences';

const TOKEN_KEY = 'mytoken';
const USERNAME = 'myname';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  login() {
    if (this.username != null && this.password != null) {
      let url = this.authService.apiURL() + '/login';
      Http.request({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: {
          username: this.username,
          password: this.password,
        },
      }).then(
        async (respond: any) => {
          console.log(respond);
          if (respond.data.login_status == 'success') {
            this.username = '';
            this.password = '';
            Preferences.set({ key: TOKEN_KEY, value: respond.data.token });
            Preferences.set({ key: USERNAME, value: respond.data.username });
            location.reload();
          } else {
            this.alertController
              .create({
                header: 'Notifikasi',
                message: 'Username atau Password salah',
                buttons: ['OK'],
              })
              .then((res) => {
                res.present();
              });
          }
        },
        (err) => {
          this.alertController
            .create({
              header: 'Notifikasi',
              message: 'Gagal Login, Periksa Koneksi Internet' + err,
              buttons: ['OK'],
            })
            .then((res) => {
              res.present();
            });
        }
      );
    } else {
      this.alertController
        .create({
          header: 'Notifikasi',
          message: 'Username dan Password Tidak Boleh Kosong',
          buttons: ['OK'],
        })
        .then((res) => {
          res.present();
        });
    }
  }
}
