import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css']
})
export class AddPopupComponent {

  countries: any = ['Argentina', 'Austria', 'Belgium', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Italy', 'Mexico', 'Norway', 'Poland', 'Portugal', 'Puerto Rico', 'Spain', 'Sweden', 'Switzerland', 'UK', 'USA', 'Venezuela', 'Virgin Islands'];

  http: HttpClient;
  baseUrl: string;

  addForm = new FormGroup({
    id: new FormControl(''),
    companyName: new FormControl(''),
    name: new FormControl(''),
    title: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    region: new FormControl(''),
    postalCode: new FormControl(''),
    country: new FormControl(''),
    phoneNumber: new FormControl(''),
    fax: new FormControl(''),
  });

  onSubmit() {
    let str: string = 'add|' + this.addForm.controls['id'].value + '|' +
      this.addForm.controls['companyName'].value + '|' +
      this.addForm.controls['name'].value + '|' +
      this.addForm.controls['title'].value + '|' +
      this.addForm.controls['address'].value + '|' +
      this.addForm.controls['city'].value + '|' +
      this.addForm.controls['region'].value + '|' +
      this.addForm.controls['postalCode'].value + '|' +
      (this.addForm.controls['country'].value.test(/^\d/) ? this.addForm.controls['country'].value.substring(3) : this.addForm.controls['country'].value) + '|' +
      this.addForm.controls['phoneNumber'].value + '|' +
      this.addForm.controls['fax'].value;
    console.log(str);
    this.http.post(this.baseUrl, str).subscribe();
    
  }

  changeCountry(e) {
    this.addForm.controls['country'].setValue(e.target.value, {
      onlySelf: true
    })
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'login';
  }

}
