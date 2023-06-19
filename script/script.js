let header = $("header");
let navbarToggler = $(".navbar-toggler");
let menuContainer = $(".menuContainer");
let mainMenuOptions = $(".mainMenuOptions");
let collapsibleNavbar = $("#collapsibleNavbar");
//page loader
$(window).load(function () {
  $("#loading").hide();
});
//hide collapsible navbar on mobile screen while click on menu options
mainMenuOptions.click(function () {
  collapsibleNavbar.removeClass("show");
});
//window scroll event for transparent hadder
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 15) {
    header.removeClass("transparentHeader").addClass("primaryBG");
  } else {
    header.addClass("transparentHeader").removeClass("primaryBG");
  }
});
//add class on navbar toggler to menu container
navbarToggler.click(function () {
  menuContainer.addClass("primaryBG");
});
//window resize event
function checkForWindowResize() {
  if (window.innerWidth >= 768) {
    menuContainer.removeClass("primaryBG");
  } else {
    menuContainer.addClass("primaryBG");
  }
}
window.addEventListener("resize", checkForWindowResize);
// $(document).on("ready", function () {
// belowe code is for jquery scroll spy
var sectionIds = $(".mainMenu").find(".nav-link");
$(document).scroll(function () {
  sectionIds.each(function () {
    var container = $(this).attr("href");
    var containerOffset = $(container).offset().top;
    var containerHeight = $(container).outerHeight();
    var containerBottom = containerOffset + containerHeight;
    var scrollPosition = $(document).scrollTop();
    if (
      scrollPosition < containerBottom - 20 &&
      scrollPosition >= containerOffset - 20
    ) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });
  // });
  // slick slider
  $(".regular")
    .not(".slick-initialized")
    .slick({
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: 1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });
});
//animation project items
var $animation_element = $(".animation-element");
var $window = $(window);
function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = window_height + window_top_position;
  $.each($animation_element, function () {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = element_height + element_top_position;
    if (
      element_bottom_position >= window_top_position &&
      element_top_position <= window_bottom_position
    ) {
      $element.addClass("in-view");
    } else {
      $element.removeClass("in-view");
    }
  });
}
$window.on("scroll resize", check_if_in_view);
$window.trigger("scroll");
//text animation on home page
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
  var that = this;
  var delta = 200 - Math.random() * 100;
  if (this.isDeleting) {
    delta /= 2;
  }
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  setTimeout(function () {
    that.tick();
  }, delta);
};
window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
