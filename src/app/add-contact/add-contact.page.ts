import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  nama: String;
  email: String;
  nohp: String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  addContact() {
    let url = this._apService.apiURL() + '/contacts';
    Http.request({
      method: 'POST',
      url: url,
      headers: { 'Content-Type': 'application/json' },
      data: {
        nama: this.nama,
        email: this.email,
        nohp: this.nohp,
      },
    }).then(
      (data) => {
        this.nama = '';
        this.email = '';
        this.nohp = '';
        this.alertController
          .create({
            header: 'Notifikasi',
            message: 'Berhasil Tambah Kontak',
            buttons: ['OK'],
          })
          .then((res) => {
            res.present();
          });
        this.router.navigateByUrl('/contact');
      },
      (error) => {
        this.alertController
          .create({
            header: 'Notifikasi',
            message: 'Gagal Tambah Kontak',
            buttons: ['OK'],
          })
          .then((res) => {
            res.present();
          });
      }
    );
  }
}
