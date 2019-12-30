(function() {

  // Accordion
  var acc = document.getElementsByClassName("category");
  var i;
  for (i = 0; i < acc.length; i++) {
    if (acc[i].classList.contains('active')) {
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

})();