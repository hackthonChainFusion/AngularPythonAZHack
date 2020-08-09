import { Component, OnInit } from '@angular/core';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  datareceivedFromAPI: String = ''
    imgsrc = "./kpmg-logo.png"
    listIcon = faAppleAlt;
     constructor( private http: HttpClient) {}
     getDataApi(){
         this.http.get<{message : String}>('http://localhost:5000/taskslist')
            .subscribe((resp) => {
                console.log('spatra is received', resp.message)
                this.datareceivedFromAPI = resp.message
            })
     }

}
