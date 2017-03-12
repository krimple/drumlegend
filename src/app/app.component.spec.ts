import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { GamesModule } from './games/games.module';
import { SynthesizerModule } from './synthesizer/synthesizer.module';
import { HttpModule } from '@angular/http';
import { PipelineService } from './synthesizer/services/pipeline/pipeline.service';
import { SequencerService } from './synthesizer/services/pipeline/processors/sequencer.service';
import { DrumPCMTriggeringService } from './synthesizer/services/pipeline/synthesis/drum-pcm-triggering.service';
import { MidiNoteService } from './synthesizer/services/pipeline/synthesis/midi-note.service';
import { SynthesisService } from './synthesizer/services/pipeline/synthesis/synthesis.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        GamesModule,
        SynthesizerModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        PipelineService,
        SequencerService,
        DrumPCMTriggeringService,
        MidiNoteService,
        SynthesisService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
