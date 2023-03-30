import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaneComponent } from './lane/lane.component';

const routes: Routes = [
  { path: '', redirectTo: 'lanes', pathMatch: 'full' },
  { path: 'lanes', component: LaneComponent },
  { path: '**', redirectTo: 'lanes' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class BowlingLaneRoutingModule { }
