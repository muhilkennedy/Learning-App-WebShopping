import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AlertModule } from './_alert';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[

  ]
})
export class SharedModule { }
