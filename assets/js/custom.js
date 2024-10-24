// goToTop
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('#scroll').fadeIn();
    } else {
        $('#scroll').fadeOut();
    }
});
$('#scroll').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});


// HEADER ON SCROLL CHANGE
$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        var $pad = $(".nav-link");
        $pad.toggleClass('line-set', $(this).scrollTop() > $nav.height());
    });
});

$(document).ready(function(){
    $('li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });  
});

$(document).ready(function () {
  $(".projegallery").lightGallery({
    galleryId: 22,
    share: false,
    actualSize: false,
    thumbnail:false,
    download:false,
    autoplay:false,
    loop:false,
    closable:false,
    hideControlOnEnd:true,
    autoplayControls:false
  });
  $(".projegallery2").lightGallery({
    galleryId: 222,
    share: false,
    actualSize: false,
    thumbnail:false,
    download:false,
    autoplay:false,
    loop:false,
    closable:false,
    hideControlOnEnd:true,
    autoplayControls:false
  });
  $(".projegallery3").lightGallery({
    galleryId: 222,
    share: false,
    actualSize: false,
    thumbnail:false,
    download:false,
    autoplay:false,
    loop:false,
    closable:false,
    hideControlOnEnd:true,
    autoplayControls:false
  });
  $(".projeflrplan").lightGallery({
    selector: '.item',
    share: false,
    actualSize: false,
    thumbnail:false,
    download:false,
    autoplay:false,
    loop:false,
    closable:false,
    hideControlOnEnd:true,
    autoplayControls:false
  });
  $(".projectbanner").lightGallery({
    selector: 'this',
    share: false,
    actualSize: false,
    thumbnail:false,
    download:false,
    autoplay:false,
    loop:false,
    closable:false,
    hideControlOnEnd:true,
    autoplayControls:false
  });
    $('.owlhmsec').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        margin: 0,
        responsiveClass: true,
        smartSpeed: 1200,
        smartSpeed: 1500,
        autoplay: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            margin: 10
          },
          600: {
            items: 2,
            margin: 10
          },
          1000: {
            items: 4,
            margin: 30,
          }
        }
    });
    $('.owlgallerysec').owlCarousel({
      loop: false,
      nav: true,
      dots: false,
      margin: 0,
      responsiveClass: true,
      smartSpeed: 1200,
      smartSpeed: 1500,
      autoplay: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2,
          margin: 10
        },
        600: {
          items: 3,
          margin: 10
        },
        1000: {
          items: 5,
          margin: 10,
        }
      }
  });
    $('.owlprojectAmenities').owlCarousel({
      loop: false,
      nav: true,
      dots: false,
      margin: 0,
      smartSpeed: 1200,
      smartSpeed: 1500,
      autoplay: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2,
          margin: 10
        },
        600: {
          items: 3,
          margin: 10
        },
        1000: {
          items: 5,
          margin: 30,
        }
      }
  });
  $('.owllocation').owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    margin: 0,
    smartSpeed: 1200,
    smartSpeed: 1500,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
    }
});
  $('.projeflrplanowl').owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    margin: 0,
    smartSpeed: 1200,
    smartSpeed: 1500,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        margin: 10
      },
      600: {
        items: 3,
        margin: 10
      },
      1000: {
        items: 4,
        margin: 30,
      },
      1500: {
        items: 5,
        margin: 30,
      }
    }
});
  $('.otherproject').owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    margin: 0,
    smartSpeed: 1200,
    smartSpeed: 1500,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        margin: 10
      },
      600: {
        items: 3,
        margin: 10
      },
      1000: {
        items: 5,
        margin: 30,
      }
    }
});
    $('.awardsec').owlCarousel({
      loop: false,
      nav: true,
      dots: false,
      margin: 0,
      responsiveClass: true,
      smartSpeed: 1200,
      smartSpeed: 1500,
      autoplay: false,
      // slideTransition: 'linear',
      // autoplayTimeout: 3000,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1,
          margin: 10
        },
        1000: {
          items: 3,
          margin: 50,
        }
      }
    });
});

$(document).ready(function () {
  // set up normal loan calculation
  $(".calculator-loan").accrue();
  // set up the comparison calculator form.
  $(".calculator-compare").accrue({
    mode: "compare"
  });
  // set up the amortization schedule calculator
  $(".calculator-amortization").accrue({
    mode: "amortization"
  });
});
    // All IMG draggable false
    $('img').attr('draggable', false); 
    $('img').attr('loading', "lazy");

    // PARALLAX
    var image = document.getElementsByClassName('parallax');
    new simpleParallax(image, {
        orientation: 'left',
        transition: 'cubic-bezier(0,0,0,1)',
        delay: .6
    });

    var image2 = document.getElementsByClassName('parallax-top');
    new simpleParallax(image2, {   
        orientation: 'down',
        transition: 'cubic-bezier(0,0,0,1)',  
        delay: .6
    });
     
    var image3 = document.getElementsByClassName('parallax-top-small');
    new simpleParallax(image3, {
        orientation: 'down',
        transition: 'cubic-bezier(0,0,0,1)',
        scale: 1.15,
        delay: .6

    });
    

