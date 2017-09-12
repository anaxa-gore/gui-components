import { GuiComponentsPage } from './app.po';

describe('gui-components App', () => {
  let page: GuiComponentsPage;

  beforeEach(() => {
    page = new GuiComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gui works!');
  });
});
