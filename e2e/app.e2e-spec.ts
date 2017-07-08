import { AlexandriaCdPage } from './app.po';

describe('alexandria-cd App', () => {
  let page: AlexandriaCdPage;

  beforeEach(() => {
    page = new AlexandriaCdPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
