// Components
import Collapse from './components/Collapse';
import Navbar from './components/Navbar';

document.addEventListener('DOMContentLoaded', function() {
  var ContainerNavCollapse = document.querySelector('#collapse-container-nav');
  if (ContainerNavCollapse) {
    new Collapse(ContainerNavCollapse);
  }

  var linkNavbar = document.querySelectorAll('.navbar--mobile .nav__link');
  if (linkNavbar) {
    console.log(linkNavbar)
    linkNavbar.forEach(link => {
      link.addEventListener('click', () => {
        new Collapse(ContainerNavCollapse, 'hide');
      })
    });
  }
});

