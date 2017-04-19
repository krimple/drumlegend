import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DrumLegendGameModule } from './drum-legend/drum-legend-game.module';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        DrumLegendGameModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
      ]
    });
    TestBed.overrideComponent(AppComponent, {
      set: {
        template: '<h1>Hi there</h1>'
      }
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
