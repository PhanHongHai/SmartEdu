$(document).ready(function () {
 
  $(".owl-avcde").owlCarousel({
    animateOut: 'fadeOutLeft',
    animateIn: 'fadeInDown',
    items: 1,
    margin: 30,
    stagePadding: 30,
    smartSpeed: 250,
    slideTransition: 'ease-out',
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: true,
    loop: true,
    nav: true,
    navText: ''
  });

  $('.myCarousel').owlCarousel({
    loop: true,
    margin: 10, 
    autoplay: true,
    loop: true,
    autoplayTimeout: 6000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5,
        nav: true,
        loop: false
      }
    }
  });

  $('.owl-next').click(function () {
    $(".owl-carousel").trigger('next.owl.carousel');
  })
  // Go to the previous item
  $('.owl-prev').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    $(".owl-carousel").trigger('prev.owl.carousel', [300]);
  })
});
