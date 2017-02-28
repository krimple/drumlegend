import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SynthesizerModule } from './synthesizer';

import { AppComponent } from './app.component';
import { GameModule } from './game/';
import { GameComponentsModule } from './game/components/game-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SynthesizerModule,
    GameModule,
    GameComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
