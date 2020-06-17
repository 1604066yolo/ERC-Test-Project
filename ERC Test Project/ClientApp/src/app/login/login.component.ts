import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  postID;

  public customers: Customer[];
  public displayedCustomers: Customer[];
  public showDone: boolean = false;
  public showHidden: boolean = false;
  
  public editable: string[] = [];
  public hidden: string[] = [];

  public editImgSrc = 'https://lh3.googleusercontent.com/-sgtSN3Xi5pQ/XuO8gfclnVI/AAAAAAAAAI0/kKK529nUi0csv-o_hjgtjCO3dpSceB6NwCK8BGAsYHg/s512/EditIcon.png';
  public checkImgSrc = 'https://lh3.googleusercontent.com/-EsXSWFe7Y8s/XuPeIZHJ85I/AAAAAAAAANI/nGIutrLn-fIn7Jyrp6b2u48O0J2Fq9YCQCK8BGAsYHg/s138/GreenCheckMark-removebg-preview.png';
  public hiddenImgSrc = 'https://lh3.googleusercontent.com/-SWaqT_rFrls/XuPOCFpWaYI/AAAAAAAAAKQ/4EwKwbwy79cQx-zOVDsx-FcO9tuQZWZIQCK8BGAsYHg/s512/EyeIcon.png';
  public shownImgSrc = 'https://lh3.googleusercontent.com/-2dA7SPTzfr4/XuPYkuOnMKI/AAAAAAAAAL8/MTfQQKlfSj8wezCfja2gHjfQIAPXyYJnQCK8BGAsYHg/s512/EyeIconNoSlash.png';

  private http: HttpClient;
  private baseUrl: string;

  countries: any = ['Argentina', 'Austria', 'Belgium', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Italy', 'Mexico', 'Norway', 'Poland', 'Portugal', 'Puerto Rico', 'Spain', 'Sweden', 'Switzerland', 'UK', 'USA', 'Venezuela', 'Virgin Islands'];

  editField: string;

  editForm = new FormGroup({
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
    fax: new FormControl('')
  });

  prefillInformation(id: string) {
    console.log('entered prefill()');
    let customer: Customer;
    for (let c of this.customers) {
      if (c.id == id) {
        customer = c;
      }
    }
    this.editForm.controls['id'].setValue(customer.id);
    this.editForm.controls['companyName'].setValue(customer.companyName);
    this.editForm.controls['name'].setValue(customer.name);
    this.editForm.controls['title'].setValue(customer.title);
    this.editForm.controls['address'].setValue(customer.address);
    this.editForm.controls['city'].setValue(customer.city);
    this.editForm.controls['region'].setValue(customer.region);
    this.editForm.controls['postalCode'].setValue(customer.postalCode);
    this.editForm.controls['country'].setValue(customer.country);
    this.editForm.controls['phoneNumber'].setValue(customer.phoneNumber);
    this.editForm.controls['fax'].setValue(customer.fax);

  }

  showHiddenM() {
    this.http.get<Customer[]>(this.baseUrl).subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
    this.showHidden = true;
  }

  hideHidden() {
    this.http.get<Customer[]>(this.baseUrl).subscribe(result => {
      this.customers = result.filter(n => n.active == 1);
    }, error => console.error(error));
    this.showHidden = false;
  }

  hideCustomer(){
    let str: string = 'hide|' + this.editForm.controls['id'].value;
    console.log(str);
    this.http.post(this.baseUrl, str).subscribe();
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'login';
    this.http.get<Customer[]>(this.baseUrl).subscribe(result => {
      this.customers = result.filter(n => n.active == 1);
    }, error => console.error(error));


  }

  onSubmit() {
    let str: string = 'edit|' + this.editForm.controls['id'].value + '|' +
      this.editForm.controls['companyName'].value + '|' +
      this.editForm.controls['name'].value + '|' +
      this.editForm.controls['title'].value + '|' +
      this.editForm.controls['address'].value + '|' +
      this.editForm.controls['city'].value + '|' +
      this.editForm.controls['region'].value + '|' +
      this.editForm.controls['postalCode'].value + '|' +
      (this.editForm.controls['country'].value.match(/^\d/) ? this.editForm.controls['country'].value.substring(3) : this.editForm.controls['country'].value) + '|' +
      this.editForm.controls['phoneNumber'].value + '|' +
      this.editForm.controls['fax'].value;
    console.log(str);
    this.http.post(this.baseUrl, str).subscribe();
    this.refreshTable();
  }

  refreshTable() {
    if (!this.showHidden) {
      this.http.get<Customer[]>(this.baseUrl).subscribe(result => {
        this.customers = result.filter(n => n.active == 1);
      }, error => console.error(error));
    } else {
      this.http.get<Customer[]>(this.baseUrl).subscribe(result => {
        this.customers = result;
      }, error => console.error(error));
    }
  }

  changeCountry(e) {
    this.editForm.controls['country'].setValue(e.target.value, {
      onlySelf: true
    })
  }

}

interface Customer {
  id: string;
  companyName: string;
  name: string;
  title: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  fax: string;
  active: number;
}
