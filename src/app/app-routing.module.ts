import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopComponent } from './components/stop/stop.component';
import { JourneyComponent } from './components/journey/journey.component';

const routes: Routes = [
  { path: '', redirectTo: '/journeys', pathMatch: 'full' }, // Default route
  { path: 'journeys', component: JourneyComponent },
  { path: 'stops', component: StopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
