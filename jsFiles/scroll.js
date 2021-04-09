// This fades the names div away on scroll
$(function () {
    $(window).scroll(function () {
        var $scrollPercent = ($(document).scrollTop() / 100);
        if ($scrollPercent <= 1) {
            $('.header').css({ backgroundColor: 'rgba(0,0,0,' + $scrollPercent + ')' });
        }
    });
});



// This sets the nav bar so that it sticks to the top of the page after the names div fades away

$(document).scroll(function () {

    if ($(this).scrollTop() > 90) {
        $("nav").addClass("fixed-top");
    } else if ($(this).scrollTop() < 90) {
        $("nav").removeClass("fixed-top");
    }
});
