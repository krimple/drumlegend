import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Router, RouterModule, Routes} from '@angular/router';

import { SynthesizerModule } from './synthesizer';

import { AppComponent } from './app.component';
import {GamesModule} from './games/games.module';
import {GameListComponent} from './games/game-list.component';
import {DemoListComponent} from './demo-list.component';
import {DrumLegendComponent} from './games/drum-legend/drum-legend.component';

const routes: Routes = [
  { path: '', redirectTo: 'drum-legend', pathMatch: 'full' },
  { path: 'demos', component: DemoListComponent },
  { path: 'games', component: GameListComponent },
  { path: 'drum-legend', component: DrumLegendComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    DemoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SynthesizerModule,
    GamesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
