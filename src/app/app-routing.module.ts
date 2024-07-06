import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'contact-add',
    loadChildren: () => import('./pages/contact-add/contact-add.module').then((o) => o.ContactAddModule),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then((o) => o.ContactsModule),
  },
  {
    path: 'contact/:id',
    loadChildren: () => import('./pages/contact/contact.module').then((a) => a.ContactModule),
  },
  { path: '**', redirectTo: '/contacts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
