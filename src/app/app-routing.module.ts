import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PruebaComponent} from './prueba/prueba.component';
import {BuscarComponent} from './buscar/buscar.component';

const routes: Routes = [

  {path: 'prueba', component: PruebaComponent},
  {path: 'buscar', component: BuscarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
