(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();


// aria - live
(function() {
  const notification = document.getElementById('time-alert')
  notification.innerText = 'Welcome to accessibility homework'
  let countOfMin = 0;
  setInterval(() => {
    countOfMin++;
    notification.innerText = `You wasted ${60 * countOfMin} seconds of your life`
  }, 60000)
})();