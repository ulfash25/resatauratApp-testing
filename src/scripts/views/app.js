import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;

    this.initialAppShell();
  }

  initialAppShell() {
    DrawerInitiator.init({
      button: this.button,
      drawer: this.drawer,
      content: this.content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this.content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });

    const loadDetailElem = document.getElementById('loadDetail');
    if (loadDetailElem) {
      loadDetailElem.addEventListener('click', async () => {
        const module = await import('./pages/detail');
        module.loadRestaurantDetail();
      });
    }
  }
}

export default App;
