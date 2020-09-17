import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpDomainService {
  public domain = "http://106.15.238.105:8080/";
  constructor(public http: HttpClient) { }
  get(api) {
    return new Promise((resolve, reject) => {
      this.http.get(this.domain + api).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      })
    })
  }
  put(api, json) {
    return new Promise((resolve, reject) => {
      this.http.put(this.domain + api, json).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      })
    })
  }
  post(api, json) {
    return new Promise((resolve, reject) => {
      this.http.post(this.domain + api, json).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      })
    })
  }
  delete(api, json) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.domain + api, json).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      })
    })

  }
}
