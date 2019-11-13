import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './component/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';
import { FormComponent } from './component/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './component/table/table.component';

@NgModule({
  declarations: [NavComponent, FormComponent, TableComponent],
  entryComponents: [FormComponent],
  imports: [
    CommonModule ,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
