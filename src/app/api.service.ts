import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  //Link API
  apiURL() {
    return 'http://localhost:8000/api';
  }

  getContacts() {
    return this.http.get(this.apiURL() + '/contacts');
  }

  getContact(id: any) {
    return this.http.get(this.apiURL() + '/contacts/' + id);
  }

  deleteContact(id: any) {
    return this.http.delete(this.apiURL() + '/contacts/' + id);
  }
}
