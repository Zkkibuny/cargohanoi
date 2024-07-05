$(document).ready(function () {
    if($('.banner-main').length) {
        $('.banner-main__content').slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            dotsClass: 'mb-0 p-0 slick-dots position-absolute d-flex',
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev d-block p-0 position-absolute rounded-circle"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next d-block p-0 position-absolute rounded-circle"><i class="fas fa-chevron-right"></i></button>'
        });
    }
    if($('.product-sale').length) {
        $('.product-sale__content').slick({
            infinite: true,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev border-0 d-block p-0 position-absolute"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next border-0 d-block p-0 position-absolute"><i class="fas fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    },
                }
            ]
        });
    }
    if($('.homeProductCategory').length){
        ajaxLoadView({
            view: 'productCategoryHome',
            delay: '500',
            onSuccess: function (rs) {
                $('.homeProductCategory').html(rs);
            }
        });
    }
});