import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventListComponent } from './event-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'event-list', pathMatch: 'full' },
  {
    path: 'event-list',
    // component: EventListComponent,
    children: [
      {
        path: '',
        component: EventListComponent,
      },
      {
        path: 'edit-event/:Id',
        component: EditEventComponent,
      },
      {
        path: 'event-details/:Id',
        component: EventDetailsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventListRoutingModule { }
