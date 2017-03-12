import {NgModule} from '@angular/core';
import {DrumLegendGameModule} from './drum-legend/drum-legend-game.module';
import {GameListComponent} from './game-list.component';
@NgModule({
  imports: [
    DrumLegendGameModule
  ],
  declarations: [
    GameListComponent
  ],
  exports: [
    DrumLegendGameModule
  ]
})
export class GamesModule {}
