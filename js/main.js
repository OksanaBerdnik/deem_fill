$(function() {
    $("#style-switcher").on('click', function(e) {
        e.preventDefault();
        $(".color-switcher").fadeToggle();
    });
    $("#style-switcher").on('blur', function(e) {
        $(".color-switcher").fadeToggle();
    });

    $('.portfolio').slick({
        slidesToShow: 1,
        slideToScroll: 1,
        dots: true,
        autoplay: true,
        variableWidth: true,
        nextArrow: '<div class="next-arrow-custom">' +
            '<button type="button" class="next-arrow-custom__btn">' +
            '<svg height="51" width="51">' +
            '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nextArrow">' +
            '</use></svg>' +
            '</button>' +
            '</div>',
        prevArrow: false
    });


    $('.gallery').slick({
        slidesToShow: 1,
        slideToScroll: 1,
        dots: false,
        autoplay: false,
        // variableWidth: true,
        nextArrow: '<button type="button" class="arrows nextArrow customArrow"><svg height="50" width="50"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nextArrow"></use></svg></button>',
        prevArrow: '<button type="button" class="arrows prevArrow"><svg height="30" width="30"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_left"></use></svg></button>'

    });

    $('.to').each(function() {
        var slideNumber = $(this).closest('.portfolio-item').find('.slick-slide:not(.slick-cloned)').length;
        $(this).html(slideNumber);
    })

    $('.nextArrow, .prevArrow').on('click', function () {
        var currentSlide = $(this).closest('.slick-slider').find('.slick-active').index();
        var slideNumber = $(this).closest('.slick-slider').find('.slick-slide:not(.slick-cloned)').length;
        $(this).closest('.portfolio-item').find('.from').html(currentSlide);
        $(this).closest('.portfolio-item').find('.to').html(slideNumber);
    });

    $('.slick-active .portfolio__article').fadeIn();

    $('.portfolio').on('beforeChange', function(){
        $('.portfolio__article').fadeOut();
    });


    $('.portfolio').on('afterChange', function(){
        $('.slick-active .portfolio__article').fadeIn();
    });

    $('.burger').on('click', function () {
        $(this, '.mobile-menu').toggleClass('open-menu');
        $('.shadow').fadeToggle();
        $('.mobile-menu').slideToggle();
    });

    $('.shadow').on('click', function () {
        $('.mobile-menu, .burger').removeClass('open-menu');
        $('.shadow').fadeOut();
        $('.mobile-menu').slideUp();
    });

    $('.phone-number').on('click', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var operator = $(this).attr('data-operator');
        var number = $(this).attr('data-number');

        $('#operator').html(operator);
        $('#phoneNumber').html(number);
        $('#phoneNumber').attr('href', 'tel:' + operator + number);

    })
});


function myMap() {
    var mapCanvas = document.getElementById("googleMap");
    var myCenter = new google.maps.LatLng(49.448399, 32.057533);
    var mapOptions = {center: myCenter, zoom: 18};
    var map = new google.maps.Map(mapCanvas,mapOptions);
    var marker = new google.maps.Marker({
        position: myCenter,
        icon: "/img/pointer.png"
    });
    marker.setMap(map);
}