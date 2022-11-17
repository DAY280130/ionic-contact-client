import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canLoad: [AutoLoginGuard],
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () =>
  //     import('./folder/folder.module').then((m) => m.FolderPageModule),
  // },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'add-contact',
    loadChildren: () =>
      import('./add-contact/add-contact.module').then(
        (m) => m.AddContactPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () =>
      import('./edit-contact/edit-contact.module').then(
        (m) => m.EditContactPageModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
