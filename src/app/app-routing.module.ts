import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'console',pathMatch:"full"},
  { path: 'process', loadChildren: () => import('./modules/process/process.module').then(m => m.ProcessModule) },
  { path: 'console', loadChildren: () => import('./modules/console/console.module').then(m => m.ConsoleModule) },
  { path: 'Share', loadChildren: () => import('./share/share.module').then(m => m.ShareModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
