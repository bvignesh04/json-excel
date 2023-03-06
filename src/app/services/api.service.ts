import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postValues(data:any){
    return this.http.post<any>("http://localhost:3000/formValues/",data)
  }
  getValues(){
    return this.http.get<any>("http://localhost:3000/formValues/");
  }
  getDropdownKeys(){
    return this.http.get<any>("http://localhost:3000/dropdownModelKeys/");
  }
}
