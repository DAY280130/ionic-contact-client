import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
    // redirectTo: 'contact',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'add-contact',
    loadChildren: () =>
      import('./add-contact/add-contact.module').then(
        (m) => m.AddContactPageModule
      ),
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () =>
      import('./edit-contact/edit-contact.module').then(
        (m) => m.EditContactPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
