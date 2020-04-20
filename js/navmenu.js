(function() {
  var keys = {
    tab: 9,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13,
    space: 32,
    esc: 27
  };

  var navmenuButton = document.getElementById('navmenu1');
  var navmenuList = document.getElementById('dropdown-menu');
  var container = document.getElementById('navmenu-container');
  var navItems = navmenuList.querySelectorAll('a');
  var numOfItems = navItems.length;

  var isMenuOpen = false;
  var currentIndex = 0;

  navmenuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    container.classList.toggle("is-active");
    navItems[0].focus();
  })

  navmenuButton.addEventListener("keyup", (event) => {
    if (event.keyCode === keys.space) {  
      event.stopImmediatePropagation();
      container.classList.toggle("is-active");
      navItems[0].focus();
      isMenuOpen = !isMenuOpen;
    }
  });

  navmenuButton.addEventListener("keydown", event => {
    if (event.keyCode === keys.space) {
      event.preventDefault();
    }
  });


  container.addEventListener('keyup', (event) => {
    if (event.keyCode === keys.down) {
      currentIndex = (currentIndex + 1) % numOfItems;
      navItems[currentIndex].focus();
    }
    if (event.keyCode === keys.up) {
      currentIndex = (currentIndex - 1 + numOfItems) % numOfItems;
      navItems[currentIndex].focus();
    }
    if (event.keyCode === keys.space && isMenuOpen) {
      navItems[currentIndex].click();
    }
    
  })



  container.addEventListener('keydown', (event) => {
    if (event.keyCode === keys.down || event.keyCode === keys.up || event.keyCode === keys.space) {
      event.preventDefault();
    }
    if (event.keyCode === keys.tab || event.keyCode === keys.esc) {
      container.classList.remove("is-active");
      currentIndex = 0;
      navmenuButton.focus();
    }
  })
})()

