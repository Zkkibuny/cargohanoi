(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* TrÆ°á»ng nĂ y báº¯t buá»™c",
                    "alertTextCheckboxMultiple": "* Vui lĂ²ng chá»n má»™t tĂ¹y chá»n",
                    "alertTextCheckboxe": "* Checkbox nĂ y báº¯t buá»™c",
                    "alertTextDateRange": "* Cáº£ hai trÆ°á»ng ngĂ y thĂ¡ng Ä‘á»u báº¯t buá»™c"
                },
                "requiredInFunction": {
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* GiĂ¡ trá»‹ cá»§a trÆ°á»ng pháº£i lĂ  test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* KhĂ´ng Ä‘Ăºng ",
                    "alertText2": "Khoáº£ng ngĂ y thĂ¡ng"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* KhĂ´ng Ä‘Ăºng ",
                    "alertText2": "Khoáº£ng thá»i gian"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* Tá»‘i thiá»ƒu ",
                    "alertText2": " sá»‘ kĂ½ tá»± Ä‘Æ°á»£c cho phĂ©p"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* Tá»‘i Ä‘a ",
                    "alertText2": " sá»‘ kĂ½ tá»± Ä‘Æ°á»£c cho phĂ©p"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* Báº¡n pháº£i Ä‘iá»n má»™t trong nhá»¯ng trÆ°á»ng sau"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* GiĂ¡ trá»‹ nhá» nháº¥t lĂ  "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* GiĂ¡ trá»‹ lá»›n nháº¥t lĂ  "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* NgĂ y kĂ©o dĂ i tá»›i "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* NgĂ y Ä‘Ă£ qua "
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Tá»‘i Ä‘a ",
                    "alertText2": " sá»‘ tĂ¹y chá»n Ä‘Æ°á»£c cho phĂ©p"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Vui lĂ²ng chá»n ",
                    "alertText2": " cĂ¡c tĂ¹y chá»n"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* GiĂ¡ trá»‹ cĂ¡c trÆ°á»ng khĂ´ng giá»‘ng nhau"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Sá»‘ tháº» tĂ­n dá»¥ng sai"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
                    "alertText": "* Sá»‘ Ä‘iá»‡n thoáº¡i sai"
                },
                "email": {
                    // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                    "regex": /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm,
                    "alertText": "* Äá»‹a chá»‰ thÆ° Ä‘iá»‡n tá»­ sai"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* KhĂ´ng Ä‘Ăºng lĂ  sá»‘ nguyĂªn"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* KhĂ´ng Ä‘Ăºng lĂ  sá»‘ tháº­p phĂ¢n"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* NgĂ y sai, pháº£i cĂ³ Ä‘á»‹nh dáº¡ng YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Äá»‹a chá»‰ IP sai"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* URL sai"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Chá»‰ Ä‘iá»n sá»‘"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Chá»‰ Ä‘iá»n chá»¯"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* KhĂ´ng Ä‘Æ°á»£c chá»©a kĂ½ tá»± Ä‘áº·c biá»‡t"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* TĂªn nĂ y Ä‘Æ°á»£c dĂ¹ng",
                    "alertTextLoad": "* Äang xĂ¡c nháº­n, vui lĂ²ng chá»"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* TĂªn ngÆ°á»i dĂ¹ng nĂ y cĂ³ thá»ƒ dĂ¹ng Ä‘Æ°á»£c",
                    "alertText": "* TĂªn ngÆ°á»i dĂ¹ng nĂ y Ä‘Ă£ Ä‘Æ°á»£c sá»­ dá»¥ng",
                    "alertTextLoad": "* Äang xĂ¡c nháº­n, vui lĂ²ng chá»"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* TĂªn nĂ y Ä‘Æ°á»£c dĂ¹ng",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* TĂªn nĂ y cĂ³ thá»ƒ dĂ¹ng",
                    // speaks by itself
                    "alertTextLoad": "* Äang xĂ¡c nháº­n, vui lĂ²ng chá»"
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* TĂªn nĂ y Ä‘Æ°á»£c dĂ¹ng",
	                    // speaks by itself
	                    "alertTextLoad": "* Äang xĂ¡c nháº­n, vui lĂ²ng chá»"
	                },
                "validate2fields": {
                    "alertText": "* Vui lĂ²ng nháº­p vĂ o HELLO"
                },
	            //tls warning:homegrown not fielded
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* NgĂ y sai"
                },
                //tls warning:homegrown not fielded
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* NgĂ y sai hoáº·c Ä‘á»‹nh dáº¡ng ngĂ y sai",
                    "alertText2": "Äá»‹nh dáº¡ng Ä‘Ăºng lĂ : ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM hay ",
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            }
            };

        }
    };

    $.validationEngineLanguage.newLang();

})(jQuery);