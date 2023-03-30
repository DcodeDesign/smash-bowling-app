import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bowling-lane', pathMatch: 'full' },
  { path: 'bowling-lane', loadChildren: () => import('./bowling-lane/bowling-lane.module').then(m => m.BowlingLaneModule) },
  { path: '**', redirectTo: 'bowling-lane' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
