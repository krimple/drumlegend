import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DrumLegendGameModule } from './drum-legend/drum-legend-game.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DrumLegendGameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
