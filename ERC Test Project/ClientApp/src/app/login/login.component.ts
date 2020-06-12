import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  postID;

  public customers: Customer[];

  private http: HttpClient;
  private baseUrl: string;

  editField: string;

  updateList(id: string, parameter: string, event: any) {
    const editField = event.target.textContent;
    const send = id + '|' + parameter + '|' + editField;
    console.log(send);
    this.http.post<string>(this.baseUrl + 'login', send).subscribe();
  }

  changeValue(event: any) {
    this.editField = event.target.textContent;
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
