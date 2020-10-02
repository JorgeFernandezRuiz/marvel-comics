import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BuscarComponent} from './buscar/buscar.component';
import {AuthGuardService} from './services/auth-guard.service';
import {NoContentComponent} from './no-content/no-content.component';

const routes: Routes = [
  {path: 'buscar', component: BuscarComponent,  canActivate: [AuthGuardService]},
  { path: '', component: NoContentComponent },
  { path: '**',   component: NoContentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
