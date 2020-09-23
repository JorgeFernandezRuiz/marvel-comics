import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SearchService} from '../services/search.service';
import {debounceTime  } from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  lastSearch :object;
  searchField: FormControl = new FormControl('', [Validators.required]);
  searchResults: any[] = [];
  length: any;
  pageSize: any;
  pageEvent: PageEvent;

  constructor(private searchService: SearchService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.lastSearch = JSON.parse(localStorage.getItem('lastSearch')) || {};
    console.log(this.lastSearch);

    this.searchField.valueChanges
    .pipe(debounceTime(300))
    .pipe(distinctUntilChanged())
    .subscribe(next => {
      this.searchResults = [];
      if (next !== '' ){
        const params = {};
        params['nameStartsWith'] = next;
        this.getData(params);

      }
    });
  }

  goToUrl(url: string ): void{
      window.open(url);
  }

  onPaginatorChange($event?: PageEvent) {
    console.log($event);
    const params = {};
    params['nameStartsWith'] = this.searchField.value;
    params['offset'] = ($event.pageSize * $event.pageIndex);
    this.getData(params);

    return $event;
  }

  getData( params ){
    localStorage.setItem('lastSearch',JSON.stringify(params));
    this.searchService.search(params).subscribe(
      res => {
        const characters = res.data;
        if (characters != null && characters.results != null && characters.results.length  > 0 ) {
          this.searchResults =  characters.results;
        }
        this.length = characters.total;
        this.pageSize  = characters.count;
      },
      error => {
        console.error(error);
        this.snackBar.open('Se ha producido un error en la busqueda', '',{
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

}
