import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

const USERNAME = 'myname';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  nama: String;
  email: String;
  nohp: String;
  namaUser: any;
  contacts: any[];
  constructor(
    public _apService: ApiService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) {
    this.getContacts();
  }

  ngOnInit() {
    this.sessionCheck();
    console.log(this.nama);
  }

  ionViewDidEnter() {
    console.log('jika selesai loading');
    this.getContacts();
  }

  async sessionCheck() {
    const username = await Preferences.get({ key: USERNAME });
    if (username && username.value) {
      this.namaUser = username.value;
    } else {
      this.namaUser = 'NAMASAIA';
    }
  }

  logout() {
    this.alertController
      .create({
        header: 'Perhatian',
        subHeader: 'Yakin Logout aplikasi ?',
        buttons: [
          {
            text: 'Batal',
            handler: (data: any) => {
              console.log('Canceled', data);
            },
          },
          {
            text: 'Yakin',
            handler: (data: any) => {
              //jika tekan yakin
              this.authService.logout();
              this.router.navigateByUrl('/', { replaceUrl: true });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  getContacts() {
    this._apService.getContacts().subscribe(
      (res: any) => {
        console.log('sukses', res);
        this.contacts = res;
      },
      (error: any) => {
        console.log('gagal', error);
        this.alertController
          .create({
            header: 'Notifikasi',
            message: 'Gagal memuat data kontak',
            buttons: ['OK'],
          })
          .then((res) => res.present());
      }
    );
  }

  deleteContact(id: any) {
    this.alertController
      .create({
        header: 'Perhatian',
        subHeader: 'Afa anda yakin?',
        buttons: [
          {
            text: 'Batal',
            handler: (data: any) => {
              console.log('dibatalkan', data);
            },
          },
          {
            text: 'Yakin bwang',
            handler: (data: any) => {
              // jika tekan yakin
              this._apService.deleteContact(id).subscribe(
                (res: any) => {
                  console.log('sukses hapus', res);
                  this.getContacts();
                },
                (error: any) => {
                  console.log('error', error);
                  this.alertController
                    .create({
                      header: 'Notifikasi',
                      message: 'gagal menghapus data kontak',
                      buttons: ['OK'],
                    })
                    .then((res) => {
                      res.present();
                    });
                }
              );
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
