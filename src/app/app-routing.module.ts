import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BowlingLanesModule} from './bowling-lanes/bowling-lanes.module';

const routes: Routes = [
  { path: '', redirectTo: 'bowling-lanes', pathMatch: 'full' },
  { path: 'bowling-lanes', loadChildren: () => import('./bowling-lanes/bowling-lanes.module').then(m => m.BowlingLanesModule) },
  { path: '**', redirectTo: 'bowling-lanes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
