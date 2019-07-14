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

  $('.tuongTac').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: false,
    speed: 300,
    arrows:false,
    dots:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  $('.doiTac').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: false,
    speed: 300,
    arrows:false,
    dots:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
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
