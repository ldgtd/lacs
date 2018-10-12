// Components
import Collapse from './components/Collapse';

document.addEventListener('DOMContentLoaded', function() {
  var ContainerNavCollapse = document.querySelector('#collapse-container-nav');
  if (ContainerNavCollapse) {
    new Collapse(ContainerNavCollapse);
  }
});

