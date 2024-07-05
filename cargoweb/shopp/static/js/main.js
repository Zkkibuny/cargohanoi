var $storeId = $('#checkStoreId').val();
$(document).ready(function () {
    var height = $('header').outerHeight();
    $(window).scroll(function () {
        if ($(this).scrollTop() >= height) {
            $('header').css('height',height);
            $('.header-content').addClass('fixed-top');
        }else if($(this).scrollTop() == 0){
            $('header').css('height','auto');
            $('.header-content').removeClass('fixed-top');
        }
    });

    $('.menu-bar').click(function () {
        // $('#box-background').fadeIn('fast');
        $('#menu-mobile').fadeIn('fast');
        $('#menu-mobile i').addClass('m-0');
        $('#menu-mobile .content-menu-mb').addClass('left-270');
    });
    $('.mobile-lv1 i').click(function () {
        $('.mobile-lv1 i').parent().css({'background':'none'});
        $(this).next('ul').slideToggle();
        $(this).toggleClass('rotate-180');
        $(this).parent().css({'background':' rgba(0,0,0,0.05)'});
    });
    $("#menu-mobile").click(function (e)
    {
        // Äá»‘i tÆ°á»£ng container
        var container = $(".content-menu-mb");
        // Náº¿u click bĂªn ngoĂ i Ä‘á»‘i tÆ°á»£ng container thĂ¬ áº©n nĂ³ Ä‘i
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            // $('#box-background').fadeOut(200);
            $('#menu-mobile').fadeOut(200);
            $('#menu-mobile>i').removeClass('m-0');
            $('#menu-mobile .content-menu-mb').removeClass('left-270');
        }
    });
    if(in_array($storeId,[175544,15113])) {
        $('.click_view').on('click', function () {
            $('ul.features').toggleClass('show');
            if ($('ul.features').hasClass('show')) {
                $(this).html('<i class="fas fa-angle-double-up"></i>');
            } else {
                $(this).html('<i class="fas fa-angle-double-down"></i>');
            }
        });
        if ($('ul.features').height() > 125) {
            $('.click_view').addClass('d-block');
        }
    }
    if($(window).width()<992){
        $('.open-cart').click(function (e) {
            e.preventDefault();
            // $('#box-background').fadeIn('fast');
            $('.cart-small').fadeIn('fast');
            $('.cart-small>i').addClass('m-0');
            $('.cart-small .cart-small__content').addClass('right-270');
        });

        $(".cart-small").click(function (e)
        {
            // Äá»‘i tÆ°á»£ng container
            var container = $(".cart-small__content");
            // Náº¿u click bĂªn ngoĂ i Ä‘á»‘i tÆ°á»£ng container thĂ¬ áº©n nĂ³ Ä‘i
            if (!container.is(e.target) && container.has(e.target).length === 0)
            {
                // $('#box-background').fadeOut(200);
                $('.cart-small').fadeOut(200);
                $('.cart-small>i').removeClass('m-0');
                $('.cart-small .cart-small__content').removeClass('right-270');
            }
        });

    }

    $('.open-find>a').click(function () {
        $('#box-background').fadeIn('fast');
        $('.left-page').fadeIn('fast');
        $('.left-page>i').addClass('m-0');
        $('.left-page .left-page__content').addClass('left-270');
    });

    $(".left-page").click(function (e)
    {
        // Äá»‘i tÆ°á»£ng container
        var container = $(".left-page__content");
        // Náº¿u click bĂªn ngoĂ i Ä‘á»‘i tÆ°á»£ng container thĂ¬ áº©n nĂ³ Ä‘i
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $('#box-background').fadeOut(200);
            $('.left-page').fadeOut(200);
            $('.left-page>i').removeClass('m-0');
            $('.left-page .left-page__content').removeClass('left-270');
        }
    });

    $('.open-search_mb>a').click(function () {
        $(this).next().toggleClass('d-none');
    });

    $(document).on('click', '.remove-cart', function () {
        var psId = $(this).attr('data-id');
        var check = confirm(msgRemoveCartItem + ' ?');
        if(check) {
            $.post(
                '/cart/remove',
                {
                    'psId' : psId,
                },
                function(rp){
                    window.location.href = document.URL;
                }
            );
        }
    });
    $(".send_contact").on('click', function() {
        AppAjax.post(
            '/contact/contacts',
            {
                'content' : $('.content_register').val(),
                'name' : $('.name_register').val(),
                'email' : $('.email_register').val(),
                'mobile' : $('.mobile_register').val(),
                'address' : $('.address_register').val()
            },
            function(rs){
                if (rs.code == 1) {
                    alert(rs.message);
                    location.reload();
                } else {
                    alert(rs.message);
                }
            }
        );
    });

    // if($(window).width()> 768){
    //     setTimeout(function () {
    //         $('.purchase-content:first').addClass('showP');
    //     }, 8000);
    //     setInterval( function(){
    //         if ($('.purchase-content:last').hasClass('showP')) {
    //             iNext = $('.purchase-content:first')
    //         } else {
    //             iNext = $('.purchase-content.showP').next()
    //         }
    //         var iShow = $('.purchase-content.showP');
    //         iShow.removeClass('showP');
    //         setTimeout(function () {
    //             iNext.addClass('showP')
    //         }, 8000)
    //     }, 16000 );
    //
    //     $('.close-purchase').click(function () {
    //         $('.purchase-content.showP').removeClass('showP')
    //     })
    //
    // }

    $('.cate-list a[href="javascript:"]').click(function () {
        if($(this).parent().hasClass('active')){
            $(this).parent().removeClass('active');
            $(this).next().slideUp();
        }else {
            $(this).parent().parent().children().removeClass('active');
            $(this).parent().parent().children().children('ul').slideUp();
            $(this).parent().addClass('active');
            $(this).next().slideToggle();
        }
    });
    $('.childsLv3').click(function () {
        if($(this).parent().hasClass('active')){
            $(this).parent().removeClass('active');
            $(this).next().slideUp();
        }else {
            $(this).parent().parent().children().removeClass('active');
            $(this).parent().parent().children().children('ul').slideUp();
            $(this).parent().addClass('active');
            $(this).next().slideToggle();
        }
    });

    var price_max = $('#price_to');
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: price_max.attr('data-max'),
        values: [parseInt($('#price_form').attr('data-size')),parseInt($('#price_to').attr('data-size'))],
        slide: function( event, ui ) {
            $('#price_form').text($.number(ui.values[0]) + 'Ä‘').attr('data-size',ui.values[0]);
            $('#price_to').text($.number(ui.values[1]) + 'Ä‘').attr('data-size',ui.values[1]);
            window.location.href = addFilter('price', ui.values[0] + ':'+ui.values[1], 3);
        }
    });


    if($(window).width() > 991){
        $('.open-user').click(function (e) {
            if($('#checkUser').val() != 1){
                e.preventDefault();
                if(!$('#signin-signup').length){
                    $('#modalUser').modal('show');
                }
            }
        });
    }

    var isSubmited = false;
    $(".registerForm").validationEngine({
        scroll: false, binded: false, showOneMessage: true,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
                $.post(
                    '/user/ajaxsignup',
                    {
                        'fullName': $('.txtFullName').val(),
                        'email': $('.registerForm .txtEmail').val(),
                        'password': $('.registerForm .pwdPass').val(),
                    },)
                    .done(function (rs) {
                        if (rs.code == 1) {
                            alert('ÄÄƒng kĂ½ thĂ nh cĂ´ng !');
                            window.location.href = '/user/signin';
                        } else {
                            isSubmited = false;
                            alert(rs.message);
                        }
                    })

            }
        }
    });

    $(".login-form").validationEngine({
        // scroll: false, binded: false, showOneMessage: true,
        onValidationComplete: function (form, status) {
            // if (status && !isSubmited) {
            //     isSubmited = true;
                $.post("/user/ajaxsignin",
                    {
                        'username': $('.login-form .txtEmail').val(),
                        'password': $('.login-form .pwdPass').val(),
                    },)
                    .done(function (rs) {
                        if (rs.code == 0) {
                            alert('TĂªn Ä‘Äƒng nháº­p hoáº·c máº­t kháº©u ko chĂ­nh xĂ¡c');
                        } else {
                            location.href = "/";
                        }
                    })

            }
        // }
    });


    /*---------------------search autocomplete--------------------------*/

    var search = $('.menu-pc input[name="q"]');
    var s = $('.searchFolding');
    var priceOld = 0,price = 0;
    var $class = '';
    search.autocomplete({
        source: function () {
            s.slideDown();
            $.post('/search/suggestion?q=' + search.val(),
                function (data) {
                    s.empty();
                    if (data.products) {
                        $.each(data.products, function (i, p) {
                            if(p.price <= 0 ){
                                $class= 'd-none';
                                price = 'LiĂªn há»‡';
                                priceOld = p.oldPrice;

                            }else if (p.moneyDiscount > 0){
                                $class= '';
                                priceOld = $.number (p.price , 0, ',', '.') +'â‚«';
                                price = $.number((p.price - p.moneyDiscount), 0, ',', '.') +'â‚«';
                            }else {
                                priceOld = 0;
                                $class = 'd-none';
                                if (p.oldPrice > 0) {
                                    $class = '';
                                    priceOld = $.number(p.oldPrice, 0, ',', '.') +'â‚«';
                                }
                                price = $.number( p.price , 0, ',', '.') +'â‚«';
                            }

                            s.append(
                                '<div class="item-search d-flex align-items-center">' +
                                '<div class="item-search__image"><a href="' + p.viewLink + '" class="d-block"><img src="'+ p.thumbnail +'"\n' +
                                'alt="" class="rounded-circle"></a></div>' +
                                '<div class="item-search__name"><a href="' + p.viewLink + '" class="sf-info">'+ p.name +'</a></div>' +
                                '<div class="item-search__price">' +
                                '<span class="item-search__price-old '+ $class +'">'+ priceOld +'</span>' +
                                '<span class="font-weight-bold">'+ price +'</span>' +
                                '</div>');
                        });
                    }
                }
            );
        }
    });
    search.keyup(function () {
        if (!$(this).val().length) {
            $('.searchFolding').slideUp();
        }
    }).focus(function () {
        if ($(this).val().length) {
            $('.searchFolding').slideDown();
        }
    }).blur(function () {
        if(!jQuery('.searchFolding a').click) {
            if (!$(this).val().length) {
                $(this).attr('placeholder', 'TĂ¬m kiáº¿m sáº£n pháº©m').val('');
            }
            $('.searchFolding').slideUp();
        }
    });


    $('.wishlist').click(function () {
        var t = $(this);
        var type = 5;
        if(t.hasClass('wishlist-added')){
            type = 6;
        }
        $.post(
            '/product/wishlistcookie', {
                'productId': t.parents('.product-item').attr('data-id'),
                'type': type
            },
            function (rs) {
                if (rs.code == 1) {
                    t.toggleClass('wishlist-added');
                    alert(rs.messages);
                }
            },
            'json'
        );
    }); //---add favorites

    var ps = [];
    $('.product-item').each(function () {
        var t = $(this);
        ps.push({id: t.attr('data-id')});
    });
    WishListLoad(ps);

    // ---------------- Ä‘Äƒng kĂ½ nháº­n tin --------------
    $('.btn-dk').click(function (e) {
        e.preventDefault();
        $.post('/newsletter/subscribe', {'mail': $('#contactFormEmail').val()},
            function (rs) {
                if (rs.code) {
                    alert(rs.message);
                    $('#contactFormEmail').val('');
                }else{
                    alert(rs.message);
                }

            }
        );
    });

    // hover image
    if(in_array($storeId,[142650,15113])){
        productLoadImage.load('.product-item','.productHover','image','lazyload');
    }

    if(!in_array($storeId,[66532,15113])) {
        var ps = [];
        $('.product-item').each(function () {
            var t = $(this);
            ps.push({storeId: $storeId, id: t.attr('data-id')});
        });
        InventoryLoad(ps);
    }


});

function WishListLoad(ps) {
    if (ps.length) {
        if ($('.checkCookies').val() != "") {
            var esult = JSON.parse($('.checkCookies').val());
            $.each(esult, function (key, vl) {
                if (vl <= 0) {
                    $('.product-item[data-id="' + key + '"] .wishlist').removeClass('wishlist-added');
                } else {
                    $('.product-item[data-id="' + key + '"] .wishlist').addClass('wishlist-added');
                }
            });
        }
    }
}
function InventoryLoad(ps) {
    if (ps.length) {
        checkInventory(ps, function (rs) {
            if (rs.inventories != "") {
                $.each(rs.inventories, function (key, vl) {
                    if (vl <= 0) {
                        $('.product-item[data-id = "' + key + '"] .product-item__image').append('<span class="sold-out">Háº¿t hĂ ng</span>')
                    }
                });
            }
        });
    }
};