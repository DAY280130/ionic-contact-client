import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  nama: String;
  email: String;
  nohp: String;
  contacts: any[];
  constructor(
    public _apService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.getContacts();
  }

  ngOnInit() {
    console.log('cek fungsi halaman event init jalan');
  }

  ionViewDidEnter() {
    console.log('jika selesai loading');
    this.getContacts();
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
