import { NgModule } from '@angular/core';
import { Mpk225Adapter } from './mpk225-adapter';
import { KatPadAdapter } from './kat-pad-adapter';
@NgModule({
  providers: [
    Mpk225Adapter,
    KatPadAdapter
  ]
})
export class AdaptersModule { }
