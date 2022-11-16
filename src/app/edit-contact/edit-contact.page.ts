import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  id: any;
  nama: String;
  email: String;
  nohp: String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      console.log(this.id);
      this.getContact(this.id);
    });
  }

  ngOnInit() {}

  getContact(id: any) {
    this._apService.getContact(id).subscribe(
      (res: any) => {
        console.log('sukses', res);
        let contact = res;
        this.nama = contact.nama;
        this.email = contact.email;
        this.nohp = contact.nohp;
      },
      (error: any) => {
        console.log('error', error);
        alert('gagal mengambil data');
      }
    );
  }

  editContact() {
    let url = this._apService.apiURL() + '/contacts/' + this.id;
    Http.request({
      method: 'PUT',
      url: url,
      headers: { 'Content-Type': 'application/json' },
      data: {
        nama: this.nama,
        email: this.email,
        nohp: this.nohp,
      },
    }).then(
      (data) => {
        this.alertController
          .create({
            header: 'Notifikasi',
            message: 'Berhasil Edit Kontak',
            buttons: ['OK'],
          })
          .then((res) => {
            res.present();
          });
        this.router.navigateByUrl('/contact');
      },
      (err) => {
        this.alertController
          .create({
            header: 'Notifikasi',
            message: 'Gagal Edit Kontak',
            buttons: ['OK'],
          })
          .then((res) => {
            res.present();
          });
      }
    );
  }
}
