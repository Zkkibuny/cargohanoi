/*---- load ADDRESS - Checkout page ----*/
$(function () {

    Address.load('#cityId', '#districtId','#wardId');
    CustomerShipFee.load('#cityId','#districtId','#ship_fee', '#showTotalMoney', '#coupon');
    CheckCouponCode.load('#cityId','#districtId', '#coupon','#getCoupon','#txtCode','#ship_fee', '#showTotalMoney');

//    $('input[name="bkVpoint"]').keyup(function () {
//        var t = $(this), num_only = /^\d+$/,
//            max = parseInt(t.attr('data-max'));
//        if (!t.val().match(num_only)) {
//            t.val(0);
//        }
//        if (t.val() > max) {
//            t.val(max);
//        }
//    });
//
//    $('.item-Bank').on('click', function (e) {
//        $('.listBankWrp .form-group').removeClass('active');
//        $('#baokimPmMethodId').val('Bank');
//        $(this).parents('.form-group').addClass('active');
//        $('.item-Bank').find("input[name='banks']").prop("checked", false);
//        $(this).find("input[name='banks']").prop("checked", true);
//        let bankId = $(this).attr('data-bankId'),
//            bankAccountNumber = $(this).attr('data-bankNumber'),
//            bankAccountHolder = $(this).attr('data-bankHolder'),
//            bankName = $(this).attr('data-bankName'),
//            resultContainer = $('.rs_' + bankAccountNumber),
//            amount = $('#showTotalMoney').attr('value');
//        if ($('#showTotalMoney').attr('current-value') !== undefined) {
//            amount = $('#showTotalMoney').attr('current-value');
//        }
//        GetQRPaymentCode.load(bankId, bankAccountNumber, bankAccountHolder, bankName, resultContainer, amount);
//        e.preventDefault();
//    });

//    /*-----------chosse payment menthod ----------*/
//    $('input[name="paymentMethod"]').change(function () {
//        var t = $(this), baokimId = $('input[name="baokimBankPaymentMethodId"]');
//        var parent = $(this).parents('div.b');
//        $('input[name="paymentMethodName"]').val(t.attr('title'));
//        $('.listBank.active .notice').html(msgSelectBank);
//        baokimId.removeAttr('value');
//        $('input[name="bankName"]').removeAttr('value');
//        if (t.hasClass('baokim')) {
//            baokimId.val('Baokim');
//        }
//        if (t.hasClass('cod')) {
//            baokimId.val('cod');
//        }
//        if (t.hasClass('momo')) {
//            baokimId.val(t.val());
//        }
//        if (t.hasClass('online')) {
//            baokimId.val(t.val());
//        }
//        $('.listBank').slideUp();
//        $('.listBank>span').removeClass('active');
//        parent.find('.listBank').slideDown();
//        $('.listBank .bankItem').removeClass('active');
//        $(t.attr('data-show')).addClass('active');
//
//        if (t.hasClass('default')) {
//            baokimId.val(t.attr('data-baokimPmId'));
//        }

//        if($('.onlyOneBank').length && !$('.listBankWrp').hasClass('deactive_bank')){
//            $('.listBankWrp .form-group').removeClass('active').addClass('active');
//            baokimId.val('Bank');
//            $('.listBankWrp .form-group.active .item-Bank').find("input[name='banks']").prop("checked", true);
//            let bankId = $('.listBankWrp .form-group.active .item-Bank').attr('data-bankId'),
//                bankAccountNumber = $('.listBankWrp .form-group.active .item-Bank').attr('data-bankNumber'),
//                bankAccountHolder = $('.listBankWrp .form-group.active .item-Bank').attr('data-bankHolder'),
//                bankName = $('.listBankWrp .form-group.active .item-Bank').attr('data-bankName'),
//                resultContainer = $('.rs_' + bankAccountNumber),
//                amount = $('#showTotalMoney').attr('value');
//            if($('#showTotalMoney').attr('current-value') !== undefined){
//                amount = $('#showTotalMoney').attr('current-value');
//            }
//            $('#'+bankAccountNumber).attr('checked', true);
//            GetQRPaymentCode.load(bankId,bankAccountNumber,bankAccountHolder,bankName,resultContainer, amount);
//        }
//    });

//    $('.listBank>span').click(function () {
//        $('#baokimPmMethodId').val($(this).attr('baokimPmId'));
//        $('.listBank>span').removeClass('active');
//        $(this).addClass('active');
//    });
//
//    $('.listBank .bankItem').click(function () {
//        $('input[name="baokimBankPaymentMethodId"]').val($(this).attr('data-baokimPmId'));
//        $('input[name="bankName"]').val($(this).attr('title'));
//        $('.listBank .bankItem').removeClass('active');
//        $(this).addClass('active');
//        $(this).parent('.listBank').find('.notice').html(msgSelected + ': <b>' + $(this).attr('title') + '</b>');
//    });

//    $('input[name="address"]').click(function () {
//        var t = $(this);
//        Address.getDistricts(t.attr('c'), '#districtId', t.attr('d'));
//        $('input[name="customerName"]').val(t.attr('n'));
//        $('input[name="customerMobile"]').val(t.attr('p'));
//        $('input[name="customerEmail"]').val(t.attr('e'));
//        $('select[name="customerCityId"]').val(t.attr('c'));
//        $('input[name="customerAddress"]').val(t.attr('a'));
//    });

});



/*----- Accept & Order ----*/
$(function () {
    var isSubmited = false;

    $("#formCheckOut").validationEngine({
        scroll: false,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;

                $.fancybox.open({
                    src: '#progressbar',
                    type: 'inline',
                    opts: {
                        closeBtn: false,
                        padding: 0,
                        modal: true,
                        afterShow: function () {
                            $("#progressbar").progressbar({
                                value: false
                            });
                        }
                    }
                });

                $.ajax({
                    url: '/order/save/',
                    type: 'POST',
                    data: $('#formCheckOut').serialize(),
                    dataType: 'json',
                    success: function (rs) {
                        if (rs.code) {
                            if (rs.redirect) {
                                window.location.href = rs.redirect;
                            }
                        } else {
                            $.fancybox.close();
                            isSubmited = false;
                            alert(rs.messages.join('\n'));
                                console.log($('#formCheckOut').serialize())
                        }
                    },
                    error: function (xhr, status, error) {
                        $.fancybox.close();
                        isSubmited = false;
                        alert('An error occurred: ' + xhr.status + ' ' + xhr.statusText);
                            console.log($('#formCheckOut').serialize())
                    }
                });
            }
        }
    });
});
