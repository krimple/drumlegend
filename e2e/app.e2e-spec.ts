import { DrumlegendPage } from './app.po';

describe('drumlegend App', () => {
  let page: DrumlegendPage;

  beforeEach(() => {
    page = new DrumlegendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
