const DrawerInitiator = {
  init({ button, drawer, content }) {
    if (!button || !drawer || !content) {
      console.error('DrawerInitiator init parameters missing');
      return;
    }

    button.addEventListener('click', (event) => {
      this.toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this.closeDrawer(event, drawer);
    });
  },

  toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
    console.log('Drawer toggled');

    const navElement = document.querySelector('.nav');
    if (navElement) {
      navElement.classList.toggle('nav--active');
    } else {
      console.error('.nav element not found');
    }
  },

  closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
    console.log('Drawer closed');

    const navElement = document.querySelector('.nav');
    if (navElement) {
      navElement.classList.remove('nav--active');
    } else {
      console.error('.nav element not found');
    }
  },
};

export default DrawerInitiator;
