(function() {
  var tablist = document.querySelectorAll('[role="tablist"]')[0];
  var tabs;
  var panels;

  generateArrays();

  function generateArrays() {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  }

  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13,
    space: 32
  };

  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  for (let i = 0; i < tabs.length; ++i) {
    addListeners(i);
  }

  function addListeners(index) {
    tabs[index].addEventListener("click", clickEventListener);
    tabs[index].addEventListener("keydown", keydownEventListener);
    tabs[index].addEventListener("keyup", keyupEventListener);

    tabs[index].index = index;
  }

  function clickEventListener(event) {
    var tab = event.currentTarget;
    activateTab(tab, false);
  }

  function keydownEventListener(event) {
    var key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        focusLastTab();
        break;
      case keys.home:
        event.preventDefault();
        focusFirstTab();
        break;
    }
  }

  function keyupEventListener(event) {
    var key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
      case keys.enter:
      case keys.space:
        activateTab(event.target);
        break;
    }
  }

  function determineOrientation(event) {
    var key = event.keyCode;

    if (key === keys.left || key === keys.right) {
      switchTabOnArrowPress(event);
    }
  }

  function switchTabOnArrowPress(event) {
    var pressed = event.keyCode;

    if (direction[pressed]) {
      var target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        } else if (pressed === keys.left) {
          focusLastTab();
        } else if (pressed === keys.right) {
          focusFirstTab();
        }
      }
    }
  }

  function activateTab(tab, setFocus) {
    setFocus = setFocus || true;
    deactivateTabs();

    tab.removeAttribute("tabindex");

    tab.setAttribute("aria-selected", "true");
    tab.classList.add("is-active");

    var controls = tab.getAttribute("aria-controls");

    var panel = document.getElementById(controls);
    panel.classList.add('is-active');

    if (setFocus) {
      tab.focus();
    }
  }

  function deactivateTabs() {
    for (let t = 0; t < tabs.length; t++) {
      tabs[t].setAttribute("tabindex", "-1");
      tabs[t].setAttribute("aria-selected", "false");
      tabs[t].classList.remove("is-active");
    }

    for (let p = 0; p < panels.length; p++) {
      panels[p].classList.remove("is-active");
    }
  }

  function focusFirstTab() {
    tabs[0].focus();
  }

  function focusLastTab() {
    tabs[tabs.length - 1].focus();
  }
})();
