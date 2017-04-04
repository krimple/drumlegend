import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { SynthesizerModule } from 'ng-webaudio-synthesizer';
import { HttpModule } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        SynthesizerModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
