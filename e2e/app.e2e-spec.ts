import { AngularUniversalHapijsPage } from './app.po';

describe('angular-universal-hapijs App', function() {
  let page: AngularUniversalHapijsPage;

  beforeEach(() => {
    page = new AngularUniversalHapijsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
