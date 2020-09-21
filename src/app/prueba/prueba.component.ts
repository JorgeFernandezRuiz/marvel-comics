import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getDatosPrueba();
  }

  getDatosPrueba(){
    this.httpClient.get('/v1/public/series').subscribe();
  }

}
