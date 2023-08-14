$(document).ready(function () {
  isLogedIn = localStorage.getItem('isLoggedIn');
  if (isLogedIn === 'false') {
    window.location.href = "../index.html";
    return;
  }

  $(".navbar a").click(function (event) {
    event.preventDefault();

    $(".navbar li").removeClass("active");
    $(this).parent().addClass("active");

    const contentId = $(this).attr("href").substring(1);
    loadContent(contentId);

    history.pushState(null, null, $(this).attr("href"));
  });

  window.addEventListener("popstate", function () {
    const contentId = window.location.hash.substring(1);
    loadContent(contentId);
  });

  function loadContent(contentId) {
    console.log(`Hello : ${contentId}`);
    $(".content").load(`${contentId}.html`);
  }

  // Load initial content
  loadContent("orders");
  
  $('#logout-button').click(function () {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = "../index.html";
    alert('Logged out');
  });
});
