import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowlingLaneModule } from './bowling-lanes/bowling-lane.module';

const routes: Routes = [
  { path: '', redirectTo: 'bowling-lanes', pathMatch: 'full' },
  { path: 'bowling-lanes', loadChildren: () => import('./bowling-lanes/bowling-lane.module').then(m => m.BowlingLaneModule) },
  { path: '**', redirectTo: 'bowling-lanes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
