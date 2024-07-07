$(document).ready(function () {
    var $storeId = $('#checkStoreId').val();
    $('.detail-product_big-Slide>div').slick({
        infinite: false,
        asNavFor: '.detail-product_small-Slide',
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev d-block p-0 position-absolute border-0"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next d-block p-0 position-absolute border-0"><i class="fas fa-chevron-right"></i></button>'
    });

    if ($('.detail-product_small-Slide').length) {
        $('.detail-product_small-Slide').slick({
            infinite: false,
            dotsClass: 'mb-0 p-0 slick-dots position-absolute d-flex',
            focusOnSelect: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev d-block p-0 position-absolute border-0"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next d-block p-0 position-absolute border-0"><i class="fas fa-chevron-right"></i></button>'
        });
    }
    if(in_array($storeId, [66532,15113])) {
        $('.detail-product_big-Slide>div').slick('slickGoTo', 1);
    }
    $(".item-thumb").click(function () {
        slideIndex = $(this).index();
        $('.detail-product_big-Slide>div').slick('slickGoTo', slideIndex);
        $('.item-thumb').removeClass('slick-current');
        $(this).addClass('slick-current');
    });
    if(!in_array($storeId, [66532])) {
        $('.open-tabs').click(function () {
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
                $(this).next().slideUp();
            } else {
                $('.tab-item').removeClass('active');
                $('.tab-item .content-tab').slideUp();
                $(this).parent().addClass('active');
                $(this).next().slideToggle();

            }
        });
    }
    if(in_array($storeId, [66532])) {
        $('.content-tab iframe').parent().addClass('active');
    }
    if($('.product-related').length){
        $('.product-related .content').slick({
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
    var timer;
    $("#quantity").keyup(function () {
        $("#quantity-fixed").val($(this).val())
        clearTimeout(timer);
        timer = setTimeout(alertMax, 500)
    });
    $("#quantity-fixed").keyup(function () {
        $("#quantity").val($(this).val())
        clearTimeout(timer);
        timer = setTimeout(alertMax, 500)
    });

    $(".number-minus").click(function () {
        var qtt = $("#quantity").val() * 1;
        var min = $("#quantity").attr('min') * 1;
        if (qtt > min) {
            $('#quantity').val(qtt - 1);
            $('#quantity-fixed').val(qtt - 1);
        } else {
            alert('Bạn chỉ có thể mua ít nhất ' + min + ' sản phẩm')
            $('#quantity').val(min);
            $('#quantity-fixed').val(min);
        }
    });
    $(".number-plus").click(function () {
        var qtt = $("#quantity").val() * 1;
        var max = $("#quantity").attr('max') * 1;
        if (qtt < max) {
            $('#quantity').val(qtt + 1);
            $('#quantity-fixed').val(qtt + 1);
        } else if (qtt > 1 && qtt > max) {
            alert('Bạn chỉ có thể mua ít nhất ' + max + ' sản phẩm');
            $('#quantity').val(max);
            $('#quantity-fixed').val(max);
        }
    });

    $('.size-option').click(function(event) {
                event.preventDefault();
                var selectedSize = $(this).data('size');
                $('#selectedSize').val(selectedSize);
            });

    $('.add-to-cart').click(function(event) {

        event.preventDefault();
        var productId = $('#productId').val();
        var size = $('#selectedSize').val();
        var color = $('#selectedColor').val();
        var quantity = $('#quantity').val();

        if (!size ) {
            alert('Vui lòng chọn size!');

            return;

        }
        if ( !color) {
            alert('Vui lòng chọn màu!');
            return;
        }

        $.ajax({
            type: 'POST',
            url: addToCartUrl,
            data: {
                'product_id': productId,
                'size': size,
                'color': color,
                'quantity': quantity,
                'csrfmiddlewaretoken': csrftoken
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function(response) {
                if (response.success) {
                    alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
                    location.reload();
                } else {
                    alert('Thêm sản phẩm vào giỏ hàng thất bại.');
                }
            },
            error: function(xhr, errmsg, err) {
                alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.');
                console.error(errmsg);
            }
        });
    });


    $('.quick-to-cart').click(function(event) {
       event.preventDefault();
        var productId = $('#productId').val();
        var size = $('#selectedSize').val();
        var color = $('#selectedColor').val();
        var quantity = $('#quantity').val();

        if (!size || !quantity) {
            alert('Vui lòng chọn size!');
            return;
        }

        $.ajax({
            type: 'POST',
            url: addToCartUrl,
            url: addToCartUrl,
            data: {
                'product_id': productId,
                'size': size,
                'color':color,
                'quantity': quantity,
                'csrfmiddlewaretoken': csrftoken
            },
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function(response) {
                if (response.success) {
//                    alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
                    window.location.href = checkoutUrl; // Make sure checkoutUrl is defined in your template
//                    location.reload();
                } else {
                    alert('Thêm sản phẩm vào giỏ hàng thất bại.');
                }
            },
            error: function(xhr, errmsg, err) {
                alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.');
                console.error(errmsg);
            }
        });
    });

    $('.group-buy__fixed .add-to-cart').on('click', function () {
        if (  $('.add-to-cart').attr('ck') == 0) {
            $('html,body').animate({
                scrollTop: $('.product-infomation').offset().top - 100
            }, 'slow');
        }
    });

    $('.size a').click(function () {
        var t = $(this), size = $('.size a'), qty = $('#quantity'), atc = $('.add-to-cart,.quick-to-cart');
        if (!t.hasClass('active')) {
            size.removeClass('active');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', 'Vui lĂ²ng chá»n mĂ u trÆ°á»›c!');
                $('#quantity,#quantity-fixed').val(1);
            } else {
                if (t.attr('qty')) {
                    t.addClass('active');
                    qty.attr('max', t.attr('qty'));
                    atc.attr('selid', t.attr('selid')).removeAttr('title').attr('ck', 1).removeClass('unsel').addClass('active');
                    renderPrice(t.attr('price'),t.attr('oldPrice'),t.attr('data-code'),t.attr('moneydiscount'));
                    $('#quantity,#quantity-fixed').val(1);
                }
            }
        }
    });

    $('.color a').click(function () {
        var t = $(this), size = $('.size a'), qty = $('#quantity'), atc = $('.add-to-cart,.quick-to-cart'), attrs = {};
        if(in_array($storeId, [33854, 15113])) {
            var src = $(this).attr('data-src');
            $('.detail-product_big-Slide img').attr("src", src);
        }
        if (!t.hasClass('active')) {
            $('.color a').removeClass('active');
            if (size.length > 1) {
                size.removeClass('active deactive');
                size.removeAttr('title');
                t.addClass('active');
                atc.removeClass('active').attr('title', 'Vui lĂ²ng chá»n kĂ­ch cá»¡ !');
                attrs[$('.color').attr('column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                   /* $.post(
                        '/product/child?psId=' + $('.add-to-cart').attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if (rs.data.available <= 0) {
                                    t.addClass('deactive').attr('title', msgOutofStock).removeAttr('qtt');
                                } else {
                                    t.attr('qty', rs.data.available).attr('selId', rs.data.id);
                                    t.attr('price', rs.data.price).attr('oldprice', rs.data.oldPrice).attr('data-code', rs.data.code).attr('moneyDiscount',rs.data.moneyDiscount);
                                }
                            } else {
                                t.addClass('deactive').attr('title', 'Sáº£n pháº©m táº¡m thá»i háº¿t hĂ ng!').removeAttr('qty');
                            }
                        },
                        'json'
                    );*/
                });

            } else {
                if (t.attr('qty')) {
                    t.addClass('active');
                    atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel').addClass('active');
                    renderPrice(t.attr('price'),t.attr('oldPrice'),t.attr('data-code'),t.attr('moneydiscount'));
                    $('#quantity,#quantity-fixed').val(1);
                }
            }
        } else {
            if (size.length == 0) {
                atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel').addClass('active');
            }
        }

        if(in_array($storeId, [66532,142650, 146054,62506])) {
            var pIdsAttr = (t.attr('data-pIds')).split(',');
            var ps = [];
            ps.push({id: pIdsAttr, code: 1, storeId: $storeId});
            if (ps.length) {
                getallchildimg(ps, function (rs) {
                    if (rs.images.length > 0) {
                        var img_slide_main = $('.detail-product_big-Slide>div');
                        var img_slide_nav = $('.detail-product_small-Slide');
                        img_slide_main.slick('unslick').empty();
                        img_slide_nav.slick('unslick').empty();
                        $.each(rs.images, function (vl) {
                            img_slide_main.append();
                            img_slide_nav.append();
                            img_slide_main.append('' +
                                '<div class="">\n' +
                                '<a href="' + rs.images[vl] + '" class="d-block position-relative" data-fancybox="gallery"\n' +
                                'rel="group">\n' +
                                '<img data-sizes="auto" class="lazyload" src="/img/lazyLoading.gif"\n' +
                                'data-src="' + rs.images[vl] + '"\n' +
                                'alt="image">\n' +
                                '<button class="openZoom position-absolute p-0 rounded-circle text-center">\n' +
                                '<i class="fas fa-expand-alt"></i>\n' +
                                '</button>\n' +
                                '</a>\n' +
                                '</div>' +
                                '');
                            img_slide_nav.append('' +
                                '<div class="item-thumb">\n' +
                                '<a href="javascript:" class="d-block position-relative">\n' +
                                '<img class="position-absolute"\n' +
                                'src="' + rs.images[vl] + '"\n' +
                                'alt="image">\n' +
                                '</a>\n' +
                                '</div>' +
                                '');
                        });
                        $('.detail-product_big-Slide>div:not(.sale)').slick({
                            infinite: false,
                            asNavFor: '.detail-product_small-Slide',
                            speed: 1000,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            prevArrow: '<button type="button" class="slick-prev d-block p-0 position-absolute border-0"><i class="fas fa-chevron-left"></i></button>',
                            nextArrow: '<button type="button" class="slick-next d-block p-0 position-absolute border-0"><i class="fas fa-chevron-right"></i></button>'
                        });

                        if ($('.detail-product_small-Slide').length) {
                            $('.detail-product_small-Slide').slick({
                                infinite: false,
                                dotsClass: 'mb-0 p-0 slick-dots position-absolute d-flex',
                                focusOnSelect: true,
                                speed: 1000,
                                slidesToShow: 4,
                                slidesToScroll: 1,
                                prevArrow: '<button type="button" class="slick-prev d-block p-0 position-absolute border-0"><i class="fas fa-chevron-left"></i></button>',
                                nextArrow: '<button type="button" class="slick-next d-block p-0 position-absolute border-0"><i class="fas fa-chevron-right"></i></button>'
                            });
                        }
                        $(".item-thumb").click(function () {
                            slideIndex = $(this).index();
                            $('.detail-product_big-Slide>div:not(.sale)').slick('slickGoTo', slideIndex);
                            $('.item-thumb').removeClass('slick-current');
                            $(this).addClass('slick-current');
                        });
                    }
                });
            }
        }
    });


    globalBuyBtnScrollFunc();

    $("#send_contact").on('click', function () {


        var t = $(this);
        var $formcontact = $("#contactIndex");
        var content = t.parents('.form-lien-he').find('input[name="product"]').val() + ' --- ' + t.parents(".form-lien-he").find('textarea[name="content"]').val();
        var data = $formcontact.serialize() + '&content=' + content;
        if ($formcontact.validationEngine('validate')) {
            $.post('/contact/contacts', data,
                function (rs) {
                    if (rs.code == 1) {
                        alert(rs.message);
                        // location.reload();
                    } else {
                        alert(rs.message);
                    }
                }
            );
        }


        // if ($formcontact.validationEngine('validate')) {
        //     $.post('/contact/contacts', $formcontact.serialize(),
        //         function (rs) {
        //             if (rs.code == 1) {
        //                 alert(rs.message);
        //                 // location.reload();
        //             } else {
        //                 alert(rs.message);
        //             }
        //         }
        //     );
        // }
    });

    //// check
    function setupSelection(listSelector, inputId, clearSizeSelection = false) {
        const links = document.querySelectorAll(listSelector);
        const selectedInput = document.getElementById(inputId);

        links.forEach(link => {
            link.addEventListener("click", function(event) {
                // Nếu click vào màu, xóa lựa chọn kích thước
                if (clearSizeSelection) {
                    clearSelectedSize();
                }

                // Nếu phần tử là unavailable, ngăn chặn sự kiện click
                if (this.classList.contains('unavailable')) {
                    event.preventDefault();
                    return;
                }

                // Xóa trạng thái selected của các liên kết khác
                links.forEach(l => l.classList.remove("selected"));
                this.classList.add("selected");

                // Cập nhật giá trị input được chọn
                selectedInput.value = this.getAttribute("value");
                //console.log(`Selected value for ${inputId}: ` + selectedInput.value); // For debugging purposes

                // Gọi hàm kiểm tra tồn kho sau khi chọn màu hoặc kích thước
                checkInventory();
            });
        });
    }

    function clearSelectedSize() {
        const sizeLinks = document.querySelectorAll(".list-size a");
        sizeLinks.forEach(link => link.classList.remove("selected"));
        document.getElementById("selectedSize").value = "";
    }

    // Thiết lập lựa chọn cho kích thước và màu sắc
    setupSelection(".list-size a", "selectedSize");
    setupSelection(".list-color a", "selectedColor", true); // Thêm tham số thứ ba để xóa lựa chọn kích thước khi chọn màu

    // Chọn mục màu đầu tiên làm mặc định khi trang được tải
    const firstColorLink = document.querySelector(".list-color a");
   // console.log(firstColorLink)
    if (firstColorLink) {
        firstColorLink.classList.add("selected","active");

        document.getElementById("selectedColor").value = firstColorLink.getAttribute("value");
        checkInventory(); // Kiểm tra tồn kho ngay khi trang tải
    }

});

function alertMax() {
    if ($("#quantity").val() * 1 > $("#quantity").attr("max") * 1) {
        alert("Bà£n chì‰ mua Ä‘Æ°Æ¡̀£c tĂ´̀i Ä‘a " + $("#quantity").attr("max") + " sà‰n phĂ¢̀‰m!");
        $("#quantity").val($("#quantity").attr("max"));
        $("#quantity-fixed").val($("#quantity").attr("max"));
    }
    if ($("#quantity-fixed").val() * 1 > $("#quantity").attr("max") * 1) {
        alert("Bà£n chì‰ mua Ä‘Æ°Æ¡̀£c tĂ´̀i Ä‘a " + $("#quantity").attr("max") + " sà‰n phĂ¢̀‰m!");
        $("#quantity").val($("#quantity").attr("max"));
        $("#quantity-fixed").val($("#quantity").attr("max"));
    }
}

function globalBuyBtnScrollFunc() {
    var $area = $('.group-buy__fixed');
    var $item = $('.group-buy');
    var pdFooter = $area.outerHeight();
    $(window).scroll(function(){
        try {
            var iCurrentHeightPos = $(this).scrollTop() + $(this).height(),
                iButtonHeightPos = $item.offset().top - $('.header-content ').outerHeight();
            if (iCurrentHeightPos > iButtonHeightPos || iButtonHeightPos < $(this).scrollTop() + $item.height()) {
                if (iButtonHeightPos < $(this).scrollTop() - $item.height()) {
                    $('footer').css('padding-bottom',pdFooter);
                    $area.addClass('active');
                } else {
                    $area.removeClass('active');
                }
            } else {
                $('footer').css('padding-bottom',0);
                $area.addClass('active');
            }
        } catch(e) { }
    });
}



function renderPrice($price,$priceOld,$code,$discount){
    // var n = $('.detail-product-name a'),
    var $spPrice = $('.price-box .pro-price .number'),
        $spOld = $('.price-box .price-old .number'),
        $spcode = $('.product_meta .pro-code');

    if ($code){
        $spcode.html($code);
    }else{
        $spcode.html('');
    }

    if($price <= 0 ){
        $spPrice.html('LiĂªn há»‡');
        if($priceOld<=0){
            $spOld.html('');
            $('.price-box .price-old').addClass('d-none');
        }
        $('.price-box .curent').addClass('d-none');
    }else if ($discount > 0){
        $spPrice.html($.number($price,0,',','.'));
        $spOld.html($.number((Number($price) + Number($discount)),0,',','.'));
        $('.price-box .price-old').removeClass('d-none');
        $('.price-box .curent').removeClass('d-none');
    }else {
        $('.price-box .curent').removeClass('d-none');
        if ($priceOld > 0) {
            $('.price-box .price-old').removeClass('d-none');
            $spOld.html($.number($priceOld,0,',','.'));
        }else{
            $spOld.html('');
            $('.price-box .price-old').addClass('d-none');
        }
        $spPrice.html($.number($price,0,',','.'));
    }


}

$(document).ready(
function() {

});

function checkInventory() {
        var productId = $('#productId').val();
        var colorId = $('#selectedColor').val();

        if (colorId) {
            $.ajax({
                url: '/check_inventory/',  // URL của view kiểm tra tồn kho
                type: 'GET', // Hoặc 'POST' nếu yêu cầu sử dụng phương thức POST
                data: {
                    'product_id': productId,
                    'color_id': colorId
                },
                success: function(response) {
                    if (response.size_stock) {
                        var sizeStock = response.size_stock;
                        $('.list-size a').each(function() {
                            var sizeId = $(this).attr('value');
                            // Gán id vào các liên kết kích thước từ sizeStock
                            if (sizeStock[sizeId] > minQuanityCheck) {
                                $(this).removeClass('unavailable').addClass('available');
                            } else {
                                $(this).removeClass('available').addClass('unavailable');
                            }
                        });
                       // console.log(sizeStock);
                    } else {
                        console.error('Invalid response format');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('AJAX request failed:', status, error);
                }
            });
        }
    }