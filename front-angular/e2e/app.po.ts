import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(): void {
    return browser.get('/');
  }

  getPageTitle(): void {
    return element(by.css('grand-app-root h1'))
      .getText();
  }

}
