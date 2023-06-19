import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleComponent } from './console.component';
import { DashboardContextComponent } from './inner-items/dashboard-context/dashboard-context.component';

import { ManageOrderComponent } from './inner-items/dashboard-context/order/manage-order/manage-order.component';
import { AddOrderComponent } from './inner-items/dashboard-context/order/manage-order/add-order/add-order.component';

import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import { DeleteOrderComponent } from './inner-items/dashboard-context/order/manage-order/delete-order/delete-order.component';



@NgModule({
  declarations: [
    ConsoleComponent,
    DashboardContextComponent,

    ManageOrderComponent,
    AddOrderComponent,
    DeleteOrderComponent
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatButtonModule,


  ]
})
export class ConsoleModule { }
