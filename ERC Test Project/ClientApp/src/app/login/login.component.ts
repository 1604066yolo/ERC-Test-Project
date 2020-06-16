import { Component, Inject, OnInit, Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  postID;

  public customers: Customer[];
  public showDone: boolean = false;
  
  public editable: string[] = [];
  public hidden: string[] = [];

  public editImgSrc = 'https://lh3.googleusercontent.com/-sgtSN3Xi5pQ/XuO8gfclnVI/AAAAAAAAAI0/kKK529nUi0csv-o_hjgtjCO3dpSceB6NwCK8BGAsYHg/s512/EditIcon.png';
  public checkImgSrc = 'https://lh3.googleusercontent.com/-EsXSWFe7Y8s/XuPeIZHJ85I/AAAAAAAAANI/nGIutrLn-fIn7Jyrp6b2u48O0J2Fq9YCQCK8BGAsYHg/s138/GreenCheckMark-removebg-preview.png';
  public hiddenImgSrc = 'https://lh3.googleusercontent.com/-SWaqT_rFrls/XuPOCFpWaYI/AAAAAAAAAKQ/4EwKwbwy79cQx-zOVDsx-FcO9tuQZWZIQCK8BGAsYHg/s512/EyeIcon.png';
  public shownImgSrc = 'https://lh3.googleusercontent.com/-2dA7SPTzfr4/XuPYkuOnMKI/AAAAAAAAAL8/MTfQQKlfSj8wezCfja2gHjfQIAPXyYJnQCK8BGAsYHg/s512/EyeIconNoSlash.png';

  private http: HttpClient;
  private baseUrl: string;

  editField: string;

  displayOff() {

    console.log(this.hidden);

    for (let id of this.hidden) {
      const send = "hide|" + id;
      this.http.post<string>(this.baseUrl + 'login', send).subscribe();
    }

    this.editable = [];
    this.hidden = [];
    this.showDone = false;
  }

  refreshTable() {
    this.customers = null;
    this.http.get<Customer[]>(this.baseUrl + 'login').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }

  editOn(id: string) {
    this.editable.push(id);
  }

  editOff(id: string) {
    const index: number = this.editable.indexOf(id);
    if (index != -1) {
      this.editable.splice(index, 1);
    }
  }

  eyeShow(id: string) {
    const index: number = this.hidden.indexOf(id);
    if (index != -1) {
      this.hidden.splice(index, 1);
    }
  }

  eyeHide(id: string) {
    this.hidden.push(id);
    this.showDone = true;
  }

  unhide() {
    this.http.post<string>(this.baseUrl + 'login', 'unhide').subscribe();
  }

  updateList(id: string, parameter: string, event: any) {
    const editField = event.target.textContent;
    const send = 'edit|' + id + '|' + parameter + '|' + editField;
    console.log(send);
    this.http.post<string>(this.baseUrl + 'login', send).subscribe();
  }

  changeValue(event: any) {
    this.editField = event.target.textContent;
  }

  addCustomer(){
    this.http.post<string>(this.baseUrl + 'login', "add").subscribe();
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.http.get<Customer[]>(baseUrl + 'login').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }
}

interface Customer {
  id: number;
  name: string;
}
