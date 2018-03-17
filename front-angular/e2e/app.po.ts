import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(): void {
    return browser.get('/');
  }

  getParagraphText(): void {
    return element(by.css('app-root h1'))
      .getText();
  }

}
