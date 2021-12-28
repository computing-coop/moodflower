(function() {

  // Accordion
  var acc = document.getElementsByClassName("category");
  var i;
  for (i = 0; i < acc.length; i++) {
    if (acc[i].classList.contains('active') &&
        window.innerWidth > 600) {
      acc[i].classList.toggle('active');
      toggleList(acc[i]);
    }
    if (!acc[i].classList.contains('italics')) {
      acc[i].addEventListener("click", function() {
        let siblings = Array.prototype.filter.call(this.parentNode.children, function(child){
          return child !== this && child.classList.contains('category');
        });
        for (var j = 0; j < siblings.length; j++) {
          if (siblings[j].classList.contains('active') &&
              siblings[j] !== this) {
            toggleList(siblings[j]);
          }
        }
        toggleList(this);
      });
    }
  }

  // Mobile menu
  var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  var mobileMenu = document.querySelector('.nav-wrapper');
  mobileMenuBtn.addEventListener('click', function() {
    toggleList(this);
  });


  function toggleList(el) {
    el.classList.toggle("active");
    var panel = el.nextElementSibling;
    let offset = panel.scrollHeight;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = offset + "px";
    }


    // recursively set maxHeight for parents
    let parent = el.parentNode;
    while (parent) {
      if (parent.tagName === 'UL') {
        offset += parent.scrollHeight;
        parent.style.maxHeight = offset + "px";
      }
      parent = parent.parentNode;
    }
  }

  // Carousel (slick)
  $(document).ready(function(){
    $('.img-wrapper').slick({
      dots: true
    });
  });

  // Popup
  var popupEl = document.querySelector('.popup');
  popupEl.addEventListener('click', function() {
    popupEl.classList.toggle('active');
  });

  // Modal
  var modalBtns = document.querySelectorAll('.modal-btn');
  modalBtns.forEach(function(modalBtn) {
    modalBtn.addEventListener('click', function() {
      toggleModal(this.getAttribute('data-target'));
    })
  })
  var modalOverlay = document.querySelector('.modals .overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function() {
      closeModal();
    })
  }

  function toggleModal(id) {
    let modalsEl = document.querySelector('.modals');
    let modalEl = document.querySelector(`#${id}`);
    let modals = document.querySelectorAll('.modal.active');
    modals.forEach(function(modal) {
      if (modal.getAttribute('id') !== id) {
        modal.classList.remove('active');
      }
    });
    modalsEl.classList.toggle('active');
    modalEl.classList.toggle('active');
  }

  function closeModal() {
    let modalsEl = document.querySelector('.modals');
    let modals = document.querySelectorAll('.modal.active');
    modals.forEach(function(modal) {
      modal.classList.remove('active');
    });
    modalsEl.classList.remove('active');
  }

  var jarBtns = document.querySelectorAll('.modal .jar-btn');
  jarBtns.forEach(function(jarBtn) {
    jarBtn.addEventListener('click', function() {
      toggleModalPicture(this, 'jar');
    })
  })

  var packetBtns = document.querySelectorAll('.modal .packet-btn');
  packetBtns.forEach(function(packetBtn) {
    packetBtn.addEventListener('click', function() {
      toggleModalPicture(this, 'packet');
    })
  })

  function toggleModalPicture(btnEl, type) {
    let modalEl = btnEl.parentNode.parentNode.parentNode;
    if (type === 'packet') {
      modalEl.classList.add('show-packet')
    } else {
      modalEl.classList.remove('show-packet')
    }
  }

})();