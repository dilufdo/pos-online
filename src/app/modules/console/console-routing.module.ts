import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleComponent } from './console.component';
import {DashboardContextComponent} from "./inner-items/dashboard-context/dashboard-context.component";
import {ManageOrderComponent} from "./inner-items/dashboard-context/order/manage-order/manage-order.component";
import {AddOrderComponent} from "./inner-items/dashboard-context/order/manage-order/add-order/add-order.component";

const routes: Routes = [{ path: '', component: ConsoleComponent,children:[
    {path:'',redirectTo:'/console/playground/order/add',pathMatch:'full'},
    {path:'playground',component:DashboardContextComponent,children:[
        {path:'',redirectTo:'/console/playground/order',pathMatch:'full'},
        {path:'order',component:ManageOrderComponent,children:[
            {path:'',redirectTo:'/console/playground/order/add',pathMatch:'full'},
            {path:'add',component:AddOrderComponent}
          ]}
      ]},
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
