var TimeFolow = 0;
var possitionMess = {
    topRight: 't r',
    rightTop: 'r t',
    topLeft: 't l',
    leftTop: 'l t',
    topCenter: 't c',
};
var typeMess = {
    error: 0,
    info: 1,
    warn: 2,
    success: 3
};
var emptyFn = function() {
    return false;
};
$.loadWidget = function(page) {
    var __page = page || '';
    if (__page != '') {
        var __url = 'widget/' + __page + '.html';
        $('#main-content').load(__url);
    }
};
$.loadPage = function(page, param) {
    var __param = param || {};
    __param.page = page || '';
    window.location.search = $.param(__param);
};
$.getParam = function(param) {
    param = param || '';
    param = param.trim().toLowerCase();
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        if (hash[0].toLowerCase() == param) {
            return decodeURIComponent(hash[1].replace('#top', ''));
        }
    }
    return "";
};

$.getHeight5lineReport = function() {
    var __height = window.innerHeight;
    return (__height - 230) + 'px';
};
checkexitValueInput = function(id) {
    id = (id || '').trim();
    if (id != '') {
        let $__selector = $('#' + id).find('input');
        $.each($__selector, (index, item) => {
            item = $(item);
            let value = (item.val() || '').trim();
            if (value != "" && !item.hasClass('email-item-772737') && !item.hasClass('select2-search__field')) {
                item.parents('.form-group').addClass('focused');
                item.addClass('filled');
            } else {
                if (!item.parents('.form-group').hasClass('select2-line') && !item.hasClass('email-item-772737') && !item.hasClass('select2-search__field')) {
                    item.parents('.form-group').removeClass('focused');
                    item.removeClass('filled');
                }
            }
        });
    }
};
$.loadInput = function() {
    $('input').focus(function() {
        $(this).parents('.form-group').addClass('focused');
    });
    $('input').blur(function() {
        var inputValue = $(this).val();
        if (inputValue == "" && !$(this).hasClass('email-item-772737') && !$(this).hasClass('select2-search__field')) {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
        }
    });
}
$.setHeightNew = function (header,content) { 
    var __heightHeader = $("#"+header).outerHeight(true);
    $("#"+content).css("height","calc(100vh - "+__heightHeader+"px)")
}
$.setMenu = function(nav) {
    var $menu = $('#main-menu');
    $('li[data-id="' + nav + '"]').addClass("active");
    $('li[data-id="' + nav + '"]').parent().show();
    $('li[data-id="' + nav + '"]').parent().parent().addClass('open');
};
$.visited = function(page, param) {
    var __data = {
        page: page,
        param: param
    };
    $.post('Visited', __data)
};

$.findBootstrapEnvironment = function() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-' + env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env;
        }
    }
};
$.getAvataString = function(str){
    str = (str || '').trim();
    let strReturn = '';
    if(str != ''){
        str = str.split(' ');
        if(str.length == 1){
            strReturn = str[0][0];
            strReturn += str[0][str[0].length - 1];
        } else{
            strReturn = str[0][0];
            strReturn += str[str.length - 1][0];
        }
        strReturn = strReturn.toUpperCase();
    }
    return strReturn;
};

//datetime = dd/MM/yyyy
$.getYear = function(datetime) {
    var __datetime = datetime || '';
    var kq = 1;
    var str = __datetime.split('/');
    if (str.length == 3)
        kq = str[2];

    return kq;
};

//datetime = dd/MM/yyyy
$.getMonth = function(datetime) {
    var __datetime = datetime || '';
    var kq = 1;
    var str = __datetime.split('/');
    if (str.length == 3)
        kq = str[1];

    return kq;
};

//datetime = dd/MM/yyyy
$.getDay = function(datetime) {
    var __datetime = datetime || '';
    var kq = 1;
    var str = __datetime.split('/');
    if (str.length == 3)
        kq = str[0];

    return kq;
};

//datetime = dd/MM/yyyy
$.getDateTime = function(datetime) {
    var __datetime = datetime || '';
    var year = parseInt($.getYear(__datetime));
    var month = parseInt($.getMonth(__datetime));
    var day = parseInt($.getDay(__datetime));

    var kq = new Date(year, month - 1, day);
    return kq;
};

//datetime = yyyy-MM-dd hh:mm:ss => dd/MM/yyyy
$.getDateTimeDMYfromYMD = function(datetime) {

    var kq = "";
    var __datetime = datetime || '';
    if (__datetime.length > 8) {
        __datetime = __datetime.split(" ")[0];
        var str = __datetime.split("-");
        if (str.length == 3) {
            kq = ((str[2].length > 1) ? "" : "0") + str[2] + "/" + ((str[1].length > 1) ? "" : "0") + str[1] + "/" + str[0];
        }
    }

    return kq;
};

//datetime => yyyy-MM-dd hh:mm:ss
$.getDateTimeString = function(datetime, istodate) {

    var kq = datetime.getFullYear() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getDate();
    if (istodate == '1') {
        kq = kq + ' 23:59:59';
    } else {
        kq = kq + ' 00:00:00';
    }

    return kq;
};

$.getDateTimeStringV2 = function(datetime) {
    var kq = datetime.getFullYear() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getDate() + ' ' + datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds();
    return kq;
};

$.getStringDateTimeForView = function(datetime, isTo) {
    var __isTo = isTo || 0;
    if (__isTo == 1) {
        return $.convertDateTimeToStringDate(datetime) + ' 23:59';
    } else {
        return $.convertDateTimeToStringDate(datetime) + ' 00:00';
    }
};

//datetime => yyyy/MM/dd
$.getDateString = function(datetime) {
    var __date = datetime.getDate();
    __date = __date <= 9 ? '0' + __date : __date;
    var __month = datetime.getMonth() + 1;
    __month = __month <= 9 ? '0' + __month : __month;
    var __year = datetime.getFullYear();

    return __year + '/' + __month + '/' + __date;
};
$.getDateStringV2 = function(datetime) {
    var __date = datetime.getDate();
    __date = __date <= 9 ? '0' + __date : __date;
    var __month = datetime.getMonth() + 1;
    __month = __month <= 9 ? '0' + __month : __month;
    var __year = datetime.getFullYear();

    return __date + '/' + __month + '/' + __year;
};
$.convertUTCDateToLocalDate = function(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
};

$.daysInMonth = function(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
};

$.getLinkForAdmin = function(action) {
    var __link = $('#layout-blank-link-href').val() || '';
    __link = __link.toLowerCase();
    __link = __link.replace('site', '');
    __link = __link.replace('admin/', '');
    __link = __link.replace('cash/', '');
    __link = __link.replace('crm/', '');
    __link = __link.replace('hrm/', '');
    __link = __link.replace('pos/', '');
    __link = __link.replace('purchase/', '');
    __link = __link.replace('salecontracts/', '');
    __link = __link.replace('sale/', '');
    __link = __link.replace('report/', '');
    __link = __link.replace('storage/', '');
    __link = __link.replace('task/', '');
    __link = __link.replace('project/');
    __link = __link.replace('hrm/');
    return __link;
};

$.getLinkForAdminV2 = function(action) {
    var __domain = window.location.host;
    var __link = $('#layout-blank-link-href').val() || '';
    __link = __link.toLowerCase();
    __link = __link.replace('site', '');
    __link = __link.replace('admin/', '');
    __link = __link.replace('cash/', '');
    __link = __link.replace('crm/', '');
    __link = __link.replace('pos/', '');
    __link = __link.replace('purchase/', '');
    __link = __link.replace('salecontracts/', '');
    __link = __link.replace('sale/', '');
    __link = __link.replace('report/', '');
    __link = __link.replace('storage/', '');
    __link = __link.replace('task/', '');
    __link = __link.replace('project/');
    __link = __domain + __link;
    return __link;
};

$.getLinkForAdminV3 = function() {
    var __port = window.location.port || '';
    __port = __port.trim();
    var __link = window.location.href || '';
    __link = __link.split('?');
    __link = __link[0].split('/') || [];
    try {
        if (__port != '') {
            __link = __link[0] + '/' + __link[1] + '/' + __link[2] + '/';
        } else {
            __link = __link[0] + '/' + __link[1] + '/' + __link[2] + '/' + __link[3] + '/';
        }
    } catch (ex) {
        __link = '';
    }
    return __link;
};


$.getLinkForImage = function() {
    var __port = window.location.port || '';
    __port = __port.trim();
    var __link = window.location.href || '';
    __link = __link.split('?');
    __link = __link[0].split('/') || [];
    try {
        if (__port != '') {
            __link = __link[0] + '/' + __link[1] + '/';
        } else {
            __link = __link[0] + '/' + __link[1] + '/' + __link[2] + '/';
        }
    } catch (ex) {
        __link = '';
    }
    return __link;
};


$.getLinkForController = function(action) {
    var __link = $('#layout-blank-link-href').val() || '';
    __link = __link.toLowerCase();
    __link = __link.replace('site', '');
    return __link;
};

$.isDateTimeFormat = function(stringDateTime) {
    if (stringDateTime == null || stringDateTime == '') {
        return false;
    } else {
        while (stringDateTime.indexOf('-') != -1) {
            stringDateTime = stringDateTime.replace('-', '/');
        }
        try {
            var __dataArray = stringDateTime.split(' ');
            var __array = __dataArray[0];
            __array = __array.split('/');
            var __array2 = __dataArray[1];
            __array2 = __array2.split(':');

            var __day = parseInt(__array[0].trim());
            var __month = parseInt(__array[1].trim());
            var __year = parseInt(__array[2].trim());
            var __hour = parseInt(__array2[0].trim());
            var __minute = parseInt(__array2[1].trim());
            var __date = new Date(__year, __month - 1, __day, __hour, __minute, 0);

            if (__date.getDate() == __day && __date.getMonth() + 1 == __month && __date.getFullYear() == __year && __date.getHours() == __hour && __date.getMinutes() == __minute) {
                return true;
            }

            return false;
        } catch (ex) {
            return false;
        }
    }
};
$.isDateFormat = function(stringDate) {
    if (stringDate == null || stringDate == '') {
        return false;
    } else {
        while (stringDate.indexOf('-') != -1) {
            stringDate = stringDate.replace('-', '/');
        }
        try {
            var __dataArray = stringDate.split('/');
            var __day = parseInt(__dataArray[0].trim());
            var __month = parseInt(__dataArray[1].trim());
            var __year = parseInt(__dataArray[2].trim());
            var __date = new Date(__year, __month - 1, __day, 0, 0, 0);
            if (__date.getDate() == __day && __date.getMonth() + 1 == __month && __date.getFullYear() == __year) {
                return true
            }
            return false;
        } catch (ex) {
            return false;
        }
    }
};
$.isTimeFormat = function(stringTime) {
    try {
        stringTime = stringTime.split(':');
        if (parseInt(stringTime[0]) >= 0 && parseInt(stringTime[0]) <= 23) {
            if (parseInt(stringTime[1]) >= 0 && parseInt(stringTime[1]) <= 59) {
                return true;
            }
        }
        return false;
    } catch (ex) {
        return false;
    }
};
$.isObjectDateTime = function(object) {
    try {
        if (object.getDate() >= 1 && object.getDate() <= 31) {
            if (object.getMonth() >= 0 && object.getMonth() <= 11) {
                if (object.getFullYear() > 0) {
                    if (object.getHours() >= 0 && object.getHours() <= 23) {
                        if (object.getMinutes() >= 0 && object.getMinutes() <= 59) {
                            if (object.getSeconds() >= 0 && object.getSeconds() <= 59) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    } catch (ex) {
        return false;
    }
};

$.isStringDateFuture = function(stringDate) {
    var __stringDate = stringDate || '';
    __stringDate = __stringDate.split(' ');
    __stringDate = __stringDate[0];
    if ($.isDateFormat(__stringDate)) {
        var __dateCur = new Date();
        var __date = $.convertDateStringToDateTime(__stringDate);
        if (__date.getFullYear() > __dateCur.getFullYear()) {
            return true;
        } else if (__date.getFullYear() == __dateCur.getFullYear()) {
            if (__date.getMonth() > __dateCur.getMonth()) {
                return true;
            } else if (__date.getMonth() == __dateCur.getMonth()) {
                if (__date.getDate() >= __dateCur.getDate()) {
                    return true;
                }
            }
        }
        return false;
    } else {
        return false;
    }
};

$.isStringDateTimeFuture = function(stringDateTime) {
    var __stringDateTime = stringDateTime || '';
    if ($.isDateTimeFormat(__stringDateTime)) {
        var __dateCur = new Date();
        var __date = $.convertDateTimeStringToDateTime(__stringDateTime);
        if (__date.getFullYear() > __dateCur.getFullYear()) {
            return true;
        } else if (__date.getFullYear() == __dateCur.getFullYear()) {
            if (__date.getMonth() > __dateCur.getMonth()) {
                return true;
            } else if (__date.getMonth() == __dateCur.getMonth()) {
                if (__date.getDate() > __dateCur.getDate()) {
                    return true;
                } else if (__date.getDate() == __dateCur.getDate()) {
                    if (__date.getHours() > __dateCur.getHours()) {
                        return true;
                    } else if (__date.getHours() == __dateCur.getHours()) {
                        if (__date.getMinutes() >= __dateCur.getMinutes())
                            return true;
                    }
                }
            }
        }
        return false;
    } else {
        return false;
    }
};

$.isDateFutureFromDate = function(dateTimeFrom, dateTimeFuture) {
    var __dateTimeFrom = dateTimeFrom || {};
    var __dateTimeFuture = dateTimeFuture || {};
    try {
        if (__dateTimeFuture.getFullYear() > __dateTimeFrom.getFullYear()) {
            return true;
        } else if (__dateTimeFuture.getFullYear() == __dateTimeFrom.getFullYear()) {
            if (__dateTimeFuture.getMonth() > __dateTimeFrom.getMonth()) {
                return true;
            } else if (__dateTimeFuture.getMonth() == __dateTimeFrom.getMonth()) {
                if (__dateTimeFuture.getDate() >= __dateTimeFrom.getDate())
                    return true;
            }
        }
        return false;
    } catch (ex) {}
    return false;
};

$.isDateTimeFutureFromDateTime = function(dateTimeFrom, dateTimeFuture) {
    var __dateTimeFrom = dateTimeFrom || {};
    var __dateTimeFuture = dateTimeFuture || {};
    try {
        if (__dateTimeFuture.getFullYear() > __dateTimeFrom.getFullYear()) {
            return true;
        } else if (__dateTimeFuture.getFullYear() == __dateTimeFrom.getFullYear()) {
            if (__dateTimeFuture.getMonth() > __dateTimeFrom.getMonth()) {
                return true;
            } else if (__dateTimeFuture.getMonth() == __dateTimeFrom.getMonth()) {
                if (__dateTimeFuture.getDate() > __dateTimeFrom.getDate()) {
                    return true;
                } else if (__dateTimeFuture.getDate() == __dateTimeFrom.getDate()) {
                    if (__dateTimeFuture.getHours() > __dateTimeFuture.getHours()) {
                        return true;
                    } else if (__dateTimeFuture.getHours() == __dateTimeFuture.getHours()) {
                        if (__dateTimeFuture.getMinutes() >= __dateTimeFuture.getMinutes())
                            return true
                    }
                }
            }
        }
        return false;
    } catch (ex) {}
    return false;
};

$.isFutureV2 = function(date) {
    var __dateCur = new Date();
    if ($.isObjectDateTime(date)) {
        if (date.getFullYear() > __dateCur.getFullYear()) {
            return true;
        } else if (date.getFullYear() == __dateCur.getFullYear()) {
            if (date.getMonth() > __dateCur.getMonth()) {
                return true;
            } else if (date.getMonth() == __dateCur.getMonth()) {
                if (date.getDate() >= __dateCur.getDate()) {
                    return true;
                }
            }
        }
        return false;
    } else {
        return false;
    }
};
$.convertStringToStringNumber = function(string, isDate) {
    var __string = string || '';
    __string = __string + '';
    var __isDate = isDate || false;
    try {
        __string = __string.toLowerCase();
    } catch (err) {
        __string = '';
    }

    var __stringReturn = '';
    var __flag = true;
    var __arrayNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];
    for (var i = 0; i < __string.length; i++) {
        for (var j = 0; j < __arrayNumber.length; j++) {
            if (__string[i] == __arrayNumber[j]) {
                if (__string[i] == '-') {
                    if (__isDate) {
                        __stringReturn += __string[i]
                    } else {
                        if (i == 0) {
                            __stringReturn += __string[i];
                        }
                    }
                } else if (__string[i] == '.') {
                    if (__flag) {
                        __stringReturn += __string[i];
                        __flag = false;
                    }
                } else {
                    __stringReturn += __string[i];
                }
                break;
            }
        }
    }
    __stringReturn = __stringReturn == '' ? '0' : __stringReturn;
    return __stringReturn;
};

$.removeUtf8 = function(string) {
    var __string = string || '';
    var __stringReturn = '';
    var __arrayChar = ['á', 'à', 'ả', 'ã', 'ạ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'đ', 'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'í', 'ì', 'ỉ', 'ĩ', 'ị', 'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ', 'Á', 'À', 'Ả', 'Ã', 'Ạ', 'Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'Đ', 'É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ', 'Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị', 'Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ'];
    var __arrayChar1 = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'd', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'y', 'y', 'y', 'y', 'y', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'D', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'Y', 'Y', 'Y', 'Y', 'Y'];
    for (var i = 0; i < __string.length; i++) {
        var __flag = true;
        for (var j = 0; j < __arrayChar.length; j++) {
            if (__string[i] == __arrayChar[j]) {
                __stringReturn += __arrayChar1[j];
                __flag = false;
                break;
            }
        }
        if (__flag) {
            __stringReturn += __string[i];
        }
    }
    return __stringReturn;
};

$.convertToFormatDefault = function(string) {
    var __string = string || '';
    __string = $.removeUtf8(__string);
    var __stringReturn = '';
    var __arrayNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    for (var i = 0; i < __string.length; i++) {
        for (var j = 0; j < __arrayNumber.length; j++) {
            if (__string[i] == __arrayNumber[j]) {
                __stringReturn += __string[i];
                break;
            }
        }
    }
    return __stringReturn;
};

$.convertToFormatDefaultV2 = function(string) {
    var __string = string || '';
    __string = $.removeUtf8(__string);
    var __stringReturn = '';
    var __arrayNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ', '-', '.'];
    for (var i = 0; i < __string.length; i++) {
        for (var j = 0; j < __arrayNumber.length; j++) {
            if (__string[i] == __arrayNumber[j]) {
                __stringReturn += __string[i];
                break;
            }
        }
    }
    __string = __stringReturn;
    __stringReturn = '';
    for (var i = 0; i < __string.length; i++) {
        if (i == 0 || i == __string.length - 1) {
            if (__string[i] != ' ') {
                __stringReturn += __string[i];
            }
        } else {
            if (!((__string[i] == __string[i + 1]) && __string[i] == ' ')) {
                __stringReturn += __string[i];
            }
        }
    }
    __stringReturn = $.trimEnd(__stringReturn, ' ');
    __stringReturn = $.trimStart(__stringReturn, ' ');
    //__stringReturn = __stringReturn.toLowerCase();
    return __stringReturn;
};
$.convertToFormatLinkCustom = function(string) {
    var __string = string || '';
    __string = $.removeUtf8(__string);
    var __stringReturn = '';
    var __arrayNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ', '-', '/'];
    for (var i = 0; i < __string.length; i++) {
        for (var j = 0; j < __arrayNumber.length; j++) {
            if (__string[i] == __arrayNumber[j]) {
                __stringReturn += __string[i];
                break;
            }
        }
    }
    __string = __stringReturn;
    __stringReturn = '';
    for (var i = 0; i < __string.length; i++) {
        if (i == 0 || i == __string.length - 1) {
            if (__string[i] != ' ') {
                __stringReturn += __string[i];
            }
        } else {
            if (!((__string[i] == __string[i + 1]) && __string[i] == ' ')) {
                __stringReturn += __string[i];
            }
        }
    }
    __stringReturn = $.trimEnd(__stringReturn, ' ');
    __stringReturn = $.trimStart(__stringReturn, ' ');
    while (__stringReturn.indexOf(' ') != -1) {
        __stringReturn = __stringReturn.replace(' ', '-');
    }
    return __stringReturn;
};
$.convertTolinkFormatDefault = function(string) {
    var __string = string || '';
    __string = $.convertToFormatDefaultV2(__string);
    while (__string.indexOf(' ') != -1) {
        __string = __string.replace(' ', '-');
    }
    return __string;
};

$.convertLongToStringDateTime = function(longDate) {
    try {
        longDate = $.convertLongToDateTime(longDate);
        if (longDate.getFullYear() == 3939 || longDate.getFullYear() == 1) {
            return '';
        } else {
            return $.convertDateTimeToStringDateTime(longDate);
        }
    } catch (ex) {
        return '';
    }
};
$.convertLongToStringDate = function(longDate) {
    try {
        longDate = $.convertLongToDateTime(longDate);
        if (longDate.getFullYear() == 3939 || longDate.getFullYear() == 1) {
            return '';
        } else {
            return $.convertDateTimeToStringDate(longDate);
        }
    } catch (ex) {
        return '';
    }
};
$.convertLongToDateTime = function(long) {
    long = long || '0';
    long = $.convertStringToStringNumber(long, true);
    long = parseInt(long);
    return new Date(long);
};
$.getStringDateTimeNow = function() {
    var __date = new Date();
    var day = __date.getDate() <= 9 ? '0' + __date.getDate() : __date.getDate();
    var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
    var year = __date.getFullYear();
    var hours = __date.getHours() <= 9 ? '0' + __date.getHours() : __date.getHours();
    var minute = __date.getMinutes() <= 9 ? '0' + __date.getMinutes() : __date.getMinutes();

    return day + '/' + month + '/' + year + ' ' + hours + ':' + minute;
};
$.getStringDateNow = function() {
    var __date = new Date();
    var day = __date.getDate() <= 9 ? '0' + __date.getDate() : __date.getDate();
    var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
    var year = __date.getFullYear();

    return day + '/' + month + '/' + year;
};

$.getStringTimeNow = function() {
    var __now = new Date();
    var __hours = __now.getHours();
    __hours = __hours <= 9 ? '0' + __hours : __hours;
    var __minute = __now.getMinutes();
    __minute = __minute <= 9 ? '0' + __minute : __minute;
    var __second = __now.getSeconds();
    __second = __second <= 9 ? '0' + __second : __second;
    return __hours + ':' + __minute + ':' + __second;
};

$.getStringDateAgo = function(day, month, year) {
    //if (year < 0) year = 0;
    var addmonth = Math.abs(month);
    var __nmonth = addmonth % 12;
    var __nyear = (addmonth - __nmonth) / 12;
    if (month > 0) {
        month = __nmonth;
        year += __nyear;
    } else if (month < 0) {
        month = -__nmonth;
        year += -__nyear;
    }
    //if (day < 0) day = 0;

    var __date = new Date();

    var nyear = __date.getFullYear() + year;
    if (nyear < 1) nyear = 1;

    var nmonth = __date.getMonth() + month;
    if (nmonth < 0) {
        nmonth = 11 + nmonth;
        nyear -= 1;
    }

    if (nmonth > 11) {
        nmonth = nmonth - 11;
        nyear += 1;
    }


    __date = __date.setFullYear(nyear, nmonth, __date.getDate());
    __date = new Date(__date);

    var nday = __date.getDate() + day;
    //if (nday > $.getDaysOfMonth(nyear, nmonth)) {
    //    var nexm = $.getNextMonth(nyear, nmonth);
    //    var nexy = $.getNextYear(nyear, nmonth);
    //    nday = $.getDaysOfMonth(prey, prem) + nday;
    //}

    //if (nday < 1) {
    //    var prem = $.getPreMonth(nyear, nmonth);
    //    var prey = $.getPreYear(nyear, nmonth);
    //    nday = $.getDaysOfMonth(prey, prem) + nday;
    //}

    __date = __date.setDate(nday);
    __date = new Date(__date);

    var __day = __date.getDate();
    __day = __day <= 9 ? '0' + __day : __day;
    var __month = __date.getMonth() + 1;
    __month = __month <= 9 ? '0' + __month : __month;
    var __year = __date.getFullYear();

    return __day + '/' + __month + '/' + __year;
};

$.getDaysOfCurrMonth = function() {
    var __date = $.getStringDateLastOfMonth();
    return __date.substring(0, 2);
};
$.getDaysOfMonth = function(year, month) {
    return new Date(year, month, 0).getDate();
};
$.getPreMonth = function(year, month) {
    if (month >= 1) return month - 1;
    return 11 - month;
};
$.getPreYear = function(year, month) {
    if (month >= 1) return year;
    return year - 1;
};
$.getNextMonth = function(year, month) {
    if (month <= 10) return month + 1;
    return month - 11;
};
$.getNextYear = function(year, month) {
    if (month <= 10) return year;
    return year + 1;
};

$.getString10Year = function() {
    var __date = new Date();
    var day = __date.getDate() <= 9 ? '0' + __date.getDate() : __date.getDate();
    var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
    var year = __date.getFullYear();
    year = year + 10;

    return day + '/' + month + '/' + year;
};

$.getStringTimeNowV2 = function() {
    var __now = new Date();
    var __hours = __now.getHours();
    __hours = __hours <= 9 ? '0' + __hours : __hours;
    var __minute = __now.getMinutes();
    __minute = __minute <= 9 ? '0' + __minute : __minute;
    return __hours + ':' + __minute;
};
$.getStringDateFirtOfMonth = function() {
    return $.getStringDateFirstOfMonth();
};
$.getStringDateFirstOfMonthPrevious = function() {
    var __date = new Date();
    var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth()) : (__date.getMonth());
    var year = __date.getFullYear();
    return '01/' + month + '/' + year;
};
$.getStringDateFirstOfMonth = function() {
    var __date = new Date();
    var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
    var year = __date.getFullYear();
    return '01/' + month + '/' + year;
};
$.getStringDateFirstOfYear = function() {
    var __date = new Date();
    var year = __date.getFullYear();
    return '01/01/' + year;
};
$.getStringDateFirtOfYear = function() {
    return $.getStringDateFirstOfYear();
};

$.getStringDateFirstOfWeek = function() {
    var __date = new Date();
    __date.setDate(__date.getDate() - __date.getDay());
    return $.convertDateTimeToStringDate(__date);
};
$.getStringDateFirtOfWeek = function() {
    return $.getStringDateFirstOfWeek();
};

$.getStringDateLastOfWeek = function() {
    var __date = new Date();
    __date.setDate(__date.getDate() + (6 - __date.getDay()));
    return $.convertDateTimeToStringDate(__date);
};

$.getStringDateLastOfMonth = function() {
    var __Now = new Date();
    var __date = new Date(__Now.getFullYear(), __Now.getMonth() + 1, 0);

    var day = __date.getDate() <= 9 ? '0' + __date.getDate() : __date.getDate();
    var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
    var year = __date.getFullYear();
    var hours = __date.getHours() <= 9 ? '0' + __date.getHours() : __date.getHours();
    var minute = __date.getMinutes() <= 9 ? '0' + __date.getMinutes() : __date.getMinutes();

    return day + '/' + month + '/' + year;
};

$.getStringDateLastOfYear = function() {
    var now = new Date();
    return '31/12/' + now.getFullYear();
};

$.convertDateTimeToStringDateTimeV2 = function(_date) {
    var __date = _date || {};
    var __stringDateTime = '';
    try {
        if (__date.getFullYear() == 1 || __date.getFullYear() == 3939) { return ''; }
        var day = __date.getDate() <= 9 ? '0' + __date.getDate() : __date.getDate();
        var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
        var year = __date.getFullYear();
        var hours = __date.getHours() <= 9 ? '0' + __date.getHours() : __date.getHours();
        var minute = __date.getMinutes() <= 9 ? '0' + __date.getMinutes() : __date.getMinutes();
        var second = __date.getSeconds() <= 9 ? '0' + __date.getSeconds() : __date.getSeconds();
        __stringDateTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minute + ':' + second;
        if (__stringDateTime.length < 10) { __stringDateTime = '' };
    } catch (ex) {
        return '';
    }

    return __stringDateTime;
};

$.convertDateTimeToStringDateTime = function(_date) {
    var __date = _date || {};
    var __stringDateTime = '';
    try {
        if (__date.getFullYear() == 1 || __date.getFullYear() == 3939) { return ''; }
        var day = __date.getDate() <= 9 ? '0' + __date.getDate() : __date.getDate();
        var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
        var year = __date.getFullYear();
        var hours = __date.getHours() <= 9 ? '0' + __date.getHours() : __date.getHours();
        var minute = __date.getMinutes() <= 9 ? '0' + __date.getMinutes() : __date.getMinutes();
        __stringDateTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minute;
        if (__stringDateTime.length < 10) { __stringDateTime = '' };
    } catch (ex) {
        return '';
    }

    return __stringDateTime;
};

$.convertDateTimeToStringDate = function(_date) {
    var __date = _date || {};
    var __stringDateTime = '';
    try {
        if (__date.getFullYear() == 1 || __date.getFullYear() == 3939) { return ''; }
        var day = __date.getDate() <= 9 ? '0' + __date.getDate() : __date.getDate();
        var month = __date.getMonth() <= 8 ? '0' + (__date.getMonth() + 1) : (__date.getMonth() + 1);
        var year = __date.getFullYear();
        __stringDateTime = day + '/' + month + '/' + year;
        if (__stringDateTime.length < 6) { __stringDateTime = '' };
    } catch (ex) {
        return '';
    }

    return __stringDateTime;
};

$.convertDateTimeStringToDateTime = function(DateTimeString) {
    if ($.isDateTimeFormat(DateTimeString)) {
        try {
            while (DateTimeString.indexOf('-') != -1) {
                DateTimeString = DateTimeString.replace('-', '/');
            }
            DateTimeString = DateTimeString.split(' ');
            var item1 = DateTimeString[0];
            var item2 = DateTimeString[1];

            item1 = item1.split('/');
            item2 = item2.split(':');

            var date = parseInt(item1[0].trim());
            var month = parseInt(item1[1].trim()) - 1;
            var year = parseInt(item1[2].trim());
            var hours = parseInt(item2[0].trim());
            var minute = parseInt(item2[1].trim());

            var __dateTime = new Date(year, month, date, hours, minute, 0, 0);
            return __dateTime;
        } catch (ex) {
            return null;
        }
    } else {
        return null;
    }
};
$.convertDateStringToDateTime = function(DateString, defaultValue) {
    if ($.isDateFormat(DateString)) {
        try {
            if (DateString.indexOf('-') != -1) {
                DateString = DateString.replaceAll('-', '/');
            }
            DateString = DateString.split('/');
            var date = parseInt(DateString[0].trim());
            var month = parseInt(DateString[1].trim()) - 1;
            var year = parseInt(DateString[2].trim());

            var __dateTime = new Date(year, month, date, 0, 0, 0, 0);
            return __dateTime;
        } catch (ex) {
            return defaultValue;
        }
    } else {
        return defaultValue;
    }
};
$.convertDateStringToDate = function(DateString) {
    return $.convertDateStringToDateTime(DateString);
};

$.convertToFormatFloat = function(number) {
    var __number = number || 0;
    __number = __number + '';
    __number = __number.split('.');
    var __length = 0;
    if (__number.length < 2) {
        __length = 2;
    } else {
        __length = __number[1].length;
        __length = (__length < 2) ? __length = 2 : __length;
    }
    return $.number(number, __length, '.', ',');
};

$.convertToFormatFloatRP = function(number, length) {
    var __number = number || 0;
    var __length = length || 0;
    if (__length == -1) {
        return $.convertToFormatFloat(__number)
    }
    return $.number(number, length, '.', ',');
};

$.convertToFormatInt = function(number) {
    number = number || 0;
    return $.number(number, 0, '.', ',');
};

$.convertToNumberFormatIntTime = function(number) {
    var __number = number || 0;
    __number += '';
    __number = parseInt(__number);
    if (__number < 0 && __number >= -9) {
        __number = __number * (-1);
        __number = '-0' + __number;
    } else if (__number >= 0 && __number <= 9) {
        __number = '0' + __number;
    } else {
        __number = __number + '';
    }
    return __number;
};

$.clearCompoBox = function(id) {
    id = id || '';
    var $__selector = $('#' + id + ' option');
    for (var i = 0; i < $__selector.length; i++) {
        var $__item = $($__selector[i]);
        if (i == 0) {
            $__item.prop('selected', 'selected');
        } else {
            $__item.prop('selected', '');
        }
    }
};

$.RoundTo = function(value, round) {
    value = value || 0;
    round = round || 0;

    return parseFloat(value.toFixed(round));
};

$.getHeight4lineReport = function() {
    var __height = window.innerHeight;
    return (__height - 198) + 'px';
};
$.getHeight4lineReportTableFullSreen = function() {
    var __height = window.innerHeight;
    return (__height + 50) + 'px';
};
$.getHeight4lineReportTableExitFullscreen = function() {
    var __height = window.innerHeight;
    return (__height - 294) + 'px';
};
$.getHeight4lineReportchartFullSreen = function() {
    var __height = window.innerHeight;
    return (__height + 100) + 'px';
};
$.getHeigh3lineReport = function() {
    var __height = window.innerHeight;
    return (__height - 164) + 'px';
};
$.getHeigh3lineReportFullscreen = function() {
    var __height = window.innerHeight;
    return (__height + 50) + 'px';
};
$.getHeigh3lineReportExitFullScreen = function() {
    var __height = window.innerHeight;
    return (__height - 260) + 'px';
};


$.setHeightContaint = function(idheader, idContent, isFullScreen, option) {
    var __idheader = idheader || '';
    var __idContent = idContent || '';
    var __isFullScreen = isFullScreen || false;
    var __option = option || 0;

    window.setTimeout(function() {
        var __height = window.innerHeight;
        var __heightHeader = $('#' + __idheader).height();
        var __heightFooterFix = $('.footer-container').height();
        __height = __height - __heightFooterFix - __option;
        if (!__isFullScreen) { __height = __height - __heightHeader; }
        $('#' + __idContent).css('height', __height + 'px');
    }, 2000);
};

$.setHeightContaintV2 = function(idContainer, idcontent, idheader, option) {
    idContainer = idContainer || '';
    idcontent = idcontent || '';
    idheader = idheader || '';
    option = option || 0;

    window.setTimeout(function() {
        var $__container = $('#' + idContainer);
        var $__header = $('#' + idheader);
        var __height = $__container.height();
        __height = __height - $__header.height() - option;
        $('#' + idcontent).css('height', __height + 'px');
    }, 2000);
};
$.setHeightContaintV3 = function (id, option) {
    try {
        option = option || 0;

        window.setTimeout(function () {
            let _a = $('#' + id);
            let _p = _a.offset();
            let _h = $(document).height();
            _a.css('height', (_h - _p.top - option) + 'px');
        }, 2000);
        
    } catch (error) {
        
    }
};

$.isMail = function(email) {
    var __email = email || '';
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(__email)) {
        return false;
    } else {
        return true;
    }
};

$.trimEnd = function(string, char) {
    var __string = string || '';
    var __char = char || '';
    if (__string != '' && (__string.length >= __char.length)) {
        var __end = __string.length;
        var __start = __end - __char.length;
        var __subString = __string.substring(__start, __end);
        if (__subString == __char) {
            __string = __string.substring(0, __start);
        }
    }
    return __string;
};

$.trimStart = function(string, char) {
    var __string = string || '';
    var __char = char || '';
    if (__string != '' && (__string.length >= __char.length)) {
        var __end = char.length;
        var __subString = __string.substring(0, __end);
        if (__subString == __char) {
            __string = __string.substring(__end, __string.length);
        }
    }
    return __string;
};

$.convertArrayStringToString = function(array) {
    var __array = array || [];
    var __stringReturn = '';
    for (var i = 0; i < __array.length; i++) {
        __stringReturn += __array[i] + ',';
    }
    __stringReturn = $.trimEnd(__stringReturn, ',');
    return __stringReturn;
};

$.getCookieCode = function(name) {
    var __name = name || '';
    var cname = __name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
        var begin = dc.indexOf(cname);
        if (begin != -1) {
            begin += cname.length;
            var end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return dc.substring(begin, end);
        }
    }
    return null;
};

$.setCookieCode = function(name, value) {
    var __link = 'SetCookie';
    var __data = { name: name, value: value };
    var __json = JSON.stringify(__data);

    $.ajax({
        type: "POST",
        url: "../DataServices.asmx/" + __link,
        data: __json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

        }
    });
};

$.deleteCookieCode = function(name) {
    var __name = name || '';
    if ($.getCookieCode()) {
        document.cookie = __name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT';
    }
};

$.isInteger = function(number) {
    if (isNaN(number)) {
        return false;
    } else {
        var __number = number + '';
        if (__number.indexOf('.') != -1) {
            return false;
        } else {
            return true;
        }
    }
};

$.compareStringTime = function(time1, time2) {
    //giá trị return: 0 = một trong hai giá trị giờ không đúng format, 1 = (time1 > time2), 2 = (time1 < time2), 3 = (time1 == time2)
    if ($.isTimeFormat(time1) && $.isTimeFormat(time2)) {
        time1 = time1.split(':');
        time2 = time2.split(':');
        if (parseInt(time1[0]) > parseInt(time2[0])) {
            return 1;
        } else if (parseInt(time1[0]) == parseInt(time2[0])) {
            if (parseInt(time1[1]) > parseInt(time2[1])) {
                return 1;
            } else if (parseInt(time1[1]) == parseInt(time2[1])) {
                if (parseInt(time1[2]) > parseInt(time2[2])) {
                    return 1;
                } else if (parseInt(time1[2]) == parseInt(time2[2])) {
                    return 3;
                } else {
                    return 2;
                }
            } else {
                return 2;
            }
        } else {
            return 2;
        }
    }
    return 0;
};

$.readNumberToWord = function(number) {
    var __number = number || 0;
    var __stringReturn = '';
    var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
    var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

    function DocSo3ChuSo(baso) {
        var tram;
        var chuc;
        var donvi;
        var KetQua = "";
        tram = parseInt(baso / 100);
        chuc = parseInt((baso % 100) / 10);
        donvi = baso % 10;
        if (tram == 0 && chuc == 0 && donvi == 0) return "";
        if (tram != 0) {
            KetQua += ChuSo[tram] + " trăm ";
            if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
        }
        if ((chuc != 0) && (chuc != 1)) {
            KetQua += ChuSo[chuc] + " mươi";
            if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
        }
        if (chuc == 1) KetQua += " mười ";
        switch (donvi) {
            case 1:
                if ((chuc != 0) && (chuc != 1)) {
                    KetQua += " mốt ";
                } else {
                    KetQua += ChuSo[donvi];
                }
                break;
            case 5:
                if (chuc == 0) {
                    KetQua += ChuSo[donvi];
                } else {
                    KetQua += " lăm ";
                }
                break;
            default:
                if (donvi != 0) {
                    KetQua += ChuSo[donvi];
                }
                break;
        }
        return KetQua;
    }

    function DocTienBangChu(SoTien) {
        var lan = 0;
        var i = 0;
        var so = 0;
        var KetQua = "";
        var tmp = "";
        var ViTri = new Array();
        if (SoTien < 0) return "Số tiền âm !";
        if (SoTien == 0) return "Không đồng !";
        if (SoTien > 0) {
            so = SoTien;
        } else {
            so = -SoTien;
        }
        if (SoTien > 8999999999999999) {
            //SoTien = 0;
            return "Số quá lớn!";
        }
        ViTri[5] = Math.floor(so / 1000000000000000);
        if (isNaN(ViTri[5]))
            ViTri[5] = "0";
        so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
        ViTri[4] = Math.floor(so / 1000000000000);
        if (isNaN(ViTri[4]))
            ViTri[4] = "0";
        so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
        ViTri[3] = Math.floor(so / 1000000000);
        if (isNaN(ViTri[3]))
            ViTri[3] = "0";
        so = so - parseFloat(ViTri[3].toString()) * 1000000000;
        ViTri[2] = parseInt(so / 1000000);
        if (isNaN(ViTri[2]))
            ViTri[2] = "0";
        ViTri[1] = parseInt((so % 1000000) / 1000);
        if (isNaN(ViTri[1]))
            ViTri[1] = "0";
        ViTri[0] = parseInt(so % 1000);
        if (isNaN(ViTri[0]))
            ViTri[0] = "0";
        if (ViTri[5] > 0) {
            lan = 5;
        } else if (ViTri[4] > 0) {
            lan = 4;
        } else if (ViTri[3] > 0) {
            lan = 3;
        } else if (ViTri[2] > 0) {
            lan = 2;
        } else if (ViTri[1] > 0) {
            lan = 1;
        } else {
            lan = 0;
        }
        for (i = lan; i >= 0; i--) {
            tmp = DocSo3ChuSo(ViTri[i]);
            KetQua += tmp;
            if (ViTri[i] > 0) KetQua += Tien[i];
            if ((i > 0) && (tmp.length > 0)); //KetQua += ',';
        }
        //if (KetQua.substring(KetQua.length - 1) == ',') {
        //    KetQua = KetQua.substring(0, KetQua.length - 1);
        //}
        KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
        return KetQua;
    }

    __stringReturn = DocTienBangChu(__number);
    return __stringReturn;
};

$.formatZeroNumber = function(number, numberZero) {
    var __number = number || 0;
    __number = __number + '';
    __number = $.convertStringToStringNumber(__number);
    var __dt = '';
    var __numberSub = '';
    var __numberZero = numberZero || 0;
    if (__number.indexOf('-') != -1) {
        __dt = '-';
        __number = number.replace('-', '');
    }
    if (__numberZero < 0) { __numberZero = 0; }
    if (__number.indexOf('.') != -1) {
        __numberSub = __number.substring(__number.indexOf('.'), __number.length + 1);
        __number = __number.substring(0, __number.indexOf('.'));
    }
    if (__number.length < __numberZero) {
        var __count = __numberZero - __number.length;
        for (var i = 0; i < __count; i++) {
            __number = '0' + __number;
        }
    }
    return __number + __numberSub;
};

$.getClientInfo = function() {
    var result;
    $.ajax({
        type: 'GET',
        url: 'https://ipapi.co/json/',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data;
        }
    });
    return result;
};

$.GetPrefixErr = function() {
    return 'Thông báo:';
};

$.checkPermissionEdit = function(isReadOnly, isEdit, isDelete) {
    //return 0: readOnly; 1: cho sửa; 2: cho xóa; 3:cho sửa và xóa

    var __isReadOnly = isReadOnly || 0;
    var __isEdit = isEdit || 0;
    var __isDelete = isDelete || 0;

    if (__isReadOnly == 1) {
        return 0;
    } else {
        if (__isEdit == 1 && __isDelete == 1) {
            return 3;
        }
        if (__isEdit == 1) {
            return 1;
        }
        if (__isDelete == 1) {
            return 2;
        }
        return 0;
    }
};


$.setNotify = function(_window, _Notification, strNotify) {

    _window.addEventListener('load', function() {
        strNotify = strNotify || '';
        if (strNotify != '') {
            // At first, let's check if we have permission for notification
            // If not, let's ask for it
            if (_window.Notification && _Notification.permission !== "granted") {
                _Notification.requestPermission(function(status) {
                    if (_Notification.permission !== status) {
                        _Notification.permission = status;
                    }
                });
            }

            if (_window.Notification && _Notification.permission === "granted") {
                //var i = 0;
                // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
                var interval = _window.setInterval(function() {
                    // Thanks to the tag, we should only see the "Hi! 9" notification 
                    var n = new Notification(strNotify, { tag: 'soManyNotification' });
                    //if (i++ == 1) {
                    _window.clearInterval(interval);
                    //}
                }, 200);
            }

            // If the user hasn't told if he wants to be notified or not
            // Note: because of Chrome, we are not sure the permission property
            // is set, therefore it's unsafe to check for the "default" value.
            else if (_window.Notification && _Notification.permission !== "denied") {
                _Notification.requestPermission(function(status) {
                    // If the user said okay
                    if (status === "granted") {
                        //var i = 0;
                        // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
                        var interval = _window.setInterval(function() {
                            // Thanks to the tag, we should only see the "Hi! 9" notification 
                            var n = new Notification(strNotify, { tag: 'soManyNotification' });
                            //if (i++ == 1) {
                            _window.clearInterval(interval);
                            //}
                        }, 200);
                    }

                    // Otherwise, we can fallback to a regular modal alert
                    else {
                        alert("Hi!");
                    }
                });
            }

            // If the user refuses to get notified
            else {
                // We can fallback to a regular modal alert
                alert("Hi!");
            }

        }
    });
};

$.reTurnTimeFormat = function(time, isTo) {
    var __time = time || '';
    var __isTo = isTo || false;
    __time = __time.split(':');
    try {
        __time[0] = parseInt(__time[0].trim());
        __time[1] = parseInt(__time[1].trim());
        if (__time[0] == 24 && __time[1] == 0) {
            __time[0] = 23;
            __time[1] = 59;
        }
        if (__time[0] < 0)
            __time[0] = 0;
        else if (__time[0] > 23)
            __time[0] = 23;
        if (__time[1] < 0)
            __time[1] = 0;
        else if (__time[1] > 59)
            __time[1] = 59;
        __time[0] = __time[0] <= 9 ? '0' + __time[0] : __time[0] + '';
        __time[1] = __time[1] <= 9 ? '0' + __time[1] : __time[1] + '';
        return __time[0] + ':' + __time[1];
    } catch (ex) {
        if (__isTo)
            return '23:59';
        else
            return '00:00';
    }
};

$.convertLongCToStringDate = function(longC) {
    longC = longC || 0;
    longC = longC - TimeFolow;
    if (longC > 0) {
        var ticksToMicrotime = longC / 10000;
        var epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
        var tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);
        tickDate = tickDate.setSeconds(tickDate.getSeconds() + 1);
        tickDate = new Date(tickDate);
        return $.convertDateTimeToStringDate(tickDate);
    }
    return '';
};

$.convertLongCToStringDateTimeV2 = function(longC) {
    longC = longC || 0;
    longC = longC - TimeFolow;
    if (longC > 0) {
        var ticksToMicrotime = longC / 10000;
        var epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
        var tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);
        tickDate = tickDate.setSeconds(tickDate.getSeconds() + 1);
        tickDate = new Date(tickDate);
        return $.convertDateTimeToStringDateTimeV2(tickDate);
    }
    return '';
};

$.convertLongCToStringDateTime = function(longC) {
    longC = longC || 0;
    longC = longC - TimeFolow;
    if (longC > 0) {
        var ticksToMicrotime = longC / 10000;
        var epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
        var tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);
        tickDate = tickDate.setSeconds(tickDate.getSeconds() + 1);
        tickDate = new Date(tickDate);
        return $.convertDateTimeToStringDateTime(tickDate);
    }
    return '';
};

$.convertLongCToDateTime = function(longC) {
    longC = longC || 0;
    longC = longC - TimeFolow;
    if (longC > 0) {
        var ticksToMicrotime = longC / 10000;
        var epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
        var tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);
        tickDate = tickDate.setSeconds(tickDate.getSeconds() + 1);
        tickDate = new Date(tickDate);
        return tickDate;
    }
    return null;
};


$.convertDateTimeToLongC = function(dateTime) {
    var __longC = 0;
    var __tick = dateTime.getTime();
    var __epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
    var __ticksToMicrotime = __tick + __epochMicrotimeDiff;
    __longC = __ticksToMicrotime * 10000;
    __longC += TimeFolow;
    return __longC;
};

$.convertStringDateTimeToLongC = function(stringDateTime) {
    var __longC = 0;
    var __dateTime = $.convertDateTimeStringToDateTime(stringDateTime);
    var __tick = __dateTime.getTime();
    var __epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
    var __ticksToMicrotime = __tick + __epochMicrotimeDiff;
    __longC = __ticksToMicrotime * 10000;
    __longC += TimeFolow;
    return __longC;
};

$.convertStringDateToLongC = function(dateTime) {
    var __longC = 0;
    try {
        var __dateTime = $.convertDateStringToDateTime(dateTime);
        var __tick = __dateTime.getTime();
        var __epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
        var __ticksToMicrotime = __tick + __epochMicrotimeDiff;
        __longC = __ticksToMicrotime * 10000;
        __longC += TimeFolow;
    } catch (ex) {}
    return __longC;
};

$.getLongCNow = function() {
    var __longC = 0;
    var __dateTime = new Date();
    var __tick = __dateTime.getTime();
    var __epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
    var __ticksToMicrotime = __tick + __epochMicrotimeDiff;
    __longC = __ticksToMicrotime * 10000;
    __longC += TimeFolow;
    return __longC;
};

$.loadConfigPage = function(module, fn, fn2) {
    var __module = module || '';
    var __fn = fn || function(res) {};
    var __fn2 = fn2 || function() {};
    var __json = JSON.stringify({ module: __module });
    $.ajax({
        type: "POST",
        url: $.getLinkForAdmin() + "SmacServices.asmx/GetDefaultValueOfVoucher",
        data: __json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            var __data = [];
            try {
                __data = JSON.parse(data.d);
            } catch (ex) {}
            __data = __data || [];
            __fn(__data);
        },
        error: function() {
            fn2();
        }
    });
};

$.loadDetailPermission = function(percode, fn, fn2) {
    var __percode = percode || '';
    var __fn = fn || function(res) {};
    var __fn2 = fn2 || function() {};
    var __json = JSON.stringify({ percode: __percode });
    $.ajax({
        type: "POST",
        url: $.getLinkForAdmin() + "SmacServices.asmx/GetPermissionsDetailForForm",
        data: __json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            var __data = [];
            try {
                __data = JSON.parse(data.d);
            } catch (ex) {}
            __data = __data || [];
            __fn(__data);
        },
        error: function() {
            fn2();
        }
    });
};

$.getStringDateTimeNowV2 = function(isTo) {
    var __isTo = isTo || 0;
    if (__isTo == 1) {
        return $.getStringDateNow() + ' 23:59';
    } else {
        return $.getStringDateNow() + ' 00:00';
    }
};

$.getStringDateTimeFlow = function(dateTime1, dateTime2) {
    var offset = dateTime2.getTime() - dateTime1.getTime();
    var days = Math.floor(offset / 1000 / 60 / 60 / 24);
    offset -= days * 1000 * 60 * 60 * 24;
    var hours = Math.floor(offset / 1000 / 60 / 60);
    offset -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(offset / 1000 / 60);
    //offset -= minutes * 1000 * 60;
    //var seconds = Math.floor(offset / 1000);
    var __stringReturn = '';
    if (days > 0) {
        __stringReturn = $.formatZeroNumber(days, 2) + ' ngày ';
        __stringReturn += $.formatZeroNumber(hours, 2) + ' giờ ';
        __stringReturn += $.formatZeroNumber(minutes, 2) + ' phút';
        //__stringReturn += $.formatZeroNumber(seconds,2) + ' giây';
    } else {
        if (hours > 0) {
            __stringReturn = $.formatZeroNumber(hours, 2) + ' giờ ';
            __stringReturn += $.formatZeroNumber(minutes, 2) + ' phút ';
            //__stringReturn += $.formatZeroNumber(seconds,2) + ' giây';
        } else {
            if (minutes > 0) {
                __stringReturn = $.formatZeroNumber(minutes, 2) + ' phút';
            }
        }
    }

    return __stringReturn;
};

$.getDateTimeFlow = function(dateTime1, dateTime2) {
    var __dataReturn = { day: 0, hour: 0, minute: 0, secont: 0 };
    var offset = dateTime2.getTime() - dateTime1.getTime();
    var days = Math.floor(offset / 1000 / 60 / 60 / 24);
    offset -= days * 1000 * 60 * 60 * 24;
    var hours = Math.floor(offset / 1000 / 60 / 60);
    offset -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(offset / 1000 / 60);
    offset -= minutes * 1000 * 60;
    var seconts = Math.floor(offset / 1000);

    __dataReturn.day = days;
    __dataReturn.hour = hours;
    __dataReturn.minute = minutes;
    __dataReturn.secont = seconts;
    return __dataReturn;
};

$.getDayFlow = function(dateTime1, dateTime2) {
    var offset = dateTime2.getTime() - dateTime1.getTime();
    var days = Math.floor(offset / 1000 / 60 / 60 / 24);
    return days;
};

$.getDayMonthYearFlow = function(dateTime1, dateTime2) {
    var __dataReturn = { day: 0, month: 0, year: 0, hour: 0, minute: 0, secont: 0 };
    if ($.getDayFlow(dateTime1, dateTime2) > 0) {
        while (0 == 0) {
            dateTime1 = new Date(dateTime1.setMonth(dateTime1.getMonth() + 1));
            var __dayCompare = $.getDayFlow(dateTime1, dateTime2);
            if (__dayCompare > 0) {
                __dataReturn.month += 1;
            } else if (__dayCompare < 0) {
                var __dateTime = new Date(dateTime1.getFullYear(), dateTime1.getMonth(), 0);
                __dataReturn.day = __dateTime.getDate() + __dayCompare;
                break
            } else {
                __dataReturn.month += 1;
                break;
            }
        }
        var __year = __dataReturn.month / 12 + '';
        if (__year.indexOf('.') != -1)
            __year = __year.substring(0, __year.indexOf('.'));
        __year = parseInt(__year);
        __dataReturn.year = __year;
        __dataReturn.month = __dataReturn.month - __dataReturn.year * 12;
        var __date = $.getDateTimeFlow(dateTime1, dateTime2);
        __dataReturn.hour = __date.hour;
        __dataReturn.minute = __date.minute;
        __dataReturn.secont = __date.secont;
    }
    return __dataReturn;
};

$.toStringDateTimeSubmit = function(date) {
    var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    var month = date.getMonth() <= 8 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var year = date.getFullYear();
    var hours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
    var minute = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minute;
};
$.convertXMLToXToJson = function(xml) {
    xml = xml || '';
    var x2js = new X2JS();
    var jsonObj = x2js.xml_str2json(xml);
    return jsonObj;
};
$.loadDataService = function(url, link, data, fn, fn1) {
    url = url || '';
    link = link || '';
    data = data || {};
    fn = fn || function(result) {};
    fn1 = fn1 || function(param1, param2) {};
    var json = JSON.stringify(data);
    var url = $.getLinkForAdminV3() + url + '/';
    $.ajax({
        url: url + link,
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        dataType: 'json',
        data: json,
        success: function(result) {
            var __result = [];
            try {
                __result = $.parseJSON(result.d) || [];
            } catch (ex) {
                __result = result.d;
            }
            fn(__result);
        },
        error: function(param1, param2) {
            fn1(param1, param2);
        }
    });
};
$.loadDataAPI = function(url, data, fn, fn1) {
    url = (url || '').trim();
    data = data || {};
    fn = fn || function(result) {};
    fn1 = fn1 || function(param1, param2) {};
    var json = JSON.stringify(data);
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        dataType: 'json',
        data: json,
        success: function(result) {
            fn(result);
        },
        error: function(param1, param2) {
            fn1(param1, param2);
        }
    });
};
$.CallAPIV2 = (controller, action, data, type, successFn, errorFn) => {
    var xmlhttp = new XMLHttpRequest();
    controller = controller || '';
    action = action || '';
    data = data || {};
    type = type || 'POST';
    successFn = successFn || function(result) {};
    errorFn = errorFn || function(param1, param2) {};
    let url = $.GetLinkAPI() + '/' + controller + '/' + action;

    var json = JSON.stringify(data);
    if (type == 'GET') {
        let _arr = [];
        Object.entries(data).forEach((val) => {
            _arr.push(val[0] + "=" + val[1]);
        });
        url += '?' + _arr.join('&');
        json = '';
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                successFn(myArr);
            } else {
                errorFn();
            }
        }

    };
    xmlhttp.open(type, url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xmlhttp.send(json);
};
$.callApi = function(url, data, fn, fn1) {
    fn = fn || function(result) {};
    fn1 = fn1 || function(param1, param2) {};
    if (data) {
        url += "?" + Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                fn(myArr);
            } else {
                fn1();
            }
        }

    };
    xmlhttp.open('get', url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xmlhttp.send();

};

$.loadDataAction = function(controller, action, data, fn, fn1) {
    controller = controller || '';
    action = action || '';
    data = data || {};
    fn = fn || function(result) {};
    fn1 = fn1 || function(param1, param2) {};
    var url = $.getLinkForAdminV3() + controller + '/' + action;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(result) {
            var __result = [];
            try {
                __result = $.parseJSON(result) || [];
            } catch (ex) {
                __result = result;
            }
            fn(__result);
        },
        error: function(param1, param2) {
            fn1(param1, param2);
        }
    });
};

$.checkIntNumber = function(value, min, option) {
    var __min = min || 0;
    var __value = value || '';
    var __option = option || 0;
    __value = $.convertStringToStringNumber(__value);
    __value = parseInt(__value);
    if (__value < __min) { __value = __min; }
    return $.convertToFormatFloatRP(__value, __option);
};

$.checkFloatNumber = function(value, min, length) {
    var __min = min || 0;
    var __length = length || 0;
    var __value = value || '';
    __value = $.convertStringToStringNumber(__value);
    __value = parseFloat(__value);
    if (__value < __min) { __value = __min; }
    return $.convertToFormatFloatRP(__value, __length);
};

$.addDate = function(dateTime, day, month, year) {
    var __dateTime = dateTime || {};
    var __day = day || 0;
    var __month = month || 0;
    var __year = year || 0;

    __dateTime = new Date(__dateTime.setDate(__dateTime.getDate() + __day));
    __dateTime = new Date(__dateTime.setMonth(__dateTime.getMonth() + __month));
    __dateTime = new Date(__dateTime.setYear(__dateTime.getFullYear() + __year));
    return __dateTime;
};

$.addDateFromNow = function(day, month, year) {
    var __date = new Date();
    return $.addDate(__date, day, month, year);
};

$.resetCompobox = function(id) {
    id = id || '';
    var $__selector = $('#' + id);
    var __value = $__selector.find('option:nth-child(1)').attr('value') || '';
    $__selector.val(__value);
};


getMessagePosition = function(position) {
    let __position = position.split(' ');
    let posCode = ["top", "middle", "bottom", "left", "center", "right"];
    let result = "";
    posCode.forEach(element => {
        if (element.indexOf(__position[0]) == 0) {
            if (result == "") {
                result += element;
            } else {
                result = element + result;
            }
        }
        if (__position[0] && element.indexOf(__position[1]) == 0) {
            result += " " + element;
        }
    });
    return result;
};

$.showValidatorMesage = function(content, typeNo, position, element) {
    if (typeNo == undefined) { typeNo = 0; }
    position = position || "t r"; //positon: t: top, m: middle, b: bottom, l: left, c: center, r: right
    content = content || "";
    let currPos = getMessagePosition(position);
    let type = ["error", "info", "warn", "success"]; //Kiểu thông báo 0, 1, 2, 3

    let styleoption = {
        html: `<div>\n<span data-notify-text></span>\n <br/>
                    <div class="btn-group pull-right">
                        <button class="btn btn-default" onclick="pauseNotify(this)">
                            <span class="fa fa-pause"></span>
                        </button>
                        <button class="btn btn-default" onclick="clearNotify(this)">
                            <span class="fa fa-times"></span>
                        </button>
                    </div>
                </div>`,
        classes: {
            base: {
                "font-weight": "bold",
                "padding": "8px 15px 8px 14px",
                "text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
                "background-color": "#fcf8e3",
                "border": "1px solid #fbeed5",
                "border-radius": "4px",
                "white-space": "wrap",
                "padding-left": "25px",
                "background-repeat": "no-repeat",
                "background-position": "3px 7px",
                "font-size": "16px",
                "z-index": "10000",
                "float": "left"
            },

            error: {
                "color": "#B94A48",
                "background-color": "#F2DEDE",
                "border-color": "#EED3D7",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtRJREFUeNqkVc1u00AQHq+dOD+0poIQfkIjalW0SEGqRMuRnHos3DjwAH0ArlyQeANOOSMeAA5VjyBxKBQhgSpVUKKQNGloFdw4cWw2jtfMOna6JOUArDTazXi/b3dm55socPqQhFka++aHBsI8GsopRJERNFlY88FCEk9Yiwf8RhgRyaHFQpPHCDmZG5oX2ui2yilkcTT1AcDsbYC1NMAyOi7zTX2Agx7A9luAl88BauiiQ/cJaZQfIpAlngDcvZZMrl8vFPK5+XktrWlx3/ehZ5r9+t6e+WVnp1pxnNIjgBe4/6dAysQc8dsmHwPcW9C0h3fW1hans1ltwJhy0GxK7XZbUlMp5Ww2eyan6+ft/f2FAqXGK4CvQk5HueFz7D6GOZtIrK+srupdx1GRBBqNBtzc2AiMr7nPplRdKhb1q6q6zjFhrklEFOUutoQ50xcX86ZlqaZpQrfbBdu2R6/G19zX6XSgh6RX5ubyHCM8nqSID6ICrGiZjGYYxojEsiw4PDwMSL5VKsC8Yf4VRYFzMzMaxwjlJSlCyAQ9l0CW44PBADzXhe7xMdi9HtTrdYjFYkDQL0cn4Xdq2/EAE+InCnvADTf2eah4Sx9vExQjkqXT6aAERICMewd/UAp/IeYANM2joxt+q5VI+ieq2i0Wg3l6DNzHwTERPgo1ko7XBXj3vdlsT2F+UuhIhYkp7u7CarkcrFOCtR3H5JiwbAIeImjT/YQKKBtGjRFCU5IUgFRe7fF4cCNVIPMYo3VKqxwjyNAXNepuopyqnld602qVsfRpEkkz+GFL1wPj6ySXBpJtWVa5xlhpcyhBNwpZHmtX8AGgfIExo0ZpzkWVTBGiXCSEaHh62/PoR0p/vHaczxXGnj4bSo+G78lELU80h1uogBwWLf5YlsPmgDEd4M236xjm+8nm4IuE/9u+/PH2JXZfbwz4zw1WbO+SQPpXfwG/BBgAhCNZiSb/pOQAAAAASUVORK5CYII=)"
            },
            success: {
                "color": "#468847",
                "background-color": "#DFF0D8",
                "border-color": "#D6E9C6",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNq0lctPE0Ecx38zu/RFS1EryqtgJFA08YCiMZIAQQ4eRG8eDGdPJiYeTIwHTfwPiAcvXIwXLwoXPaDxkWgQ6islKlJLSQWLUraPLTv7Gme32zoF9KSTfLO7v53vZ3d/M7/fIth+IO6INt2jjoA7bjHCJoAlzCRw59YwHYjBnfMPqAKWQYKjGkfCJqAF0xwZjipQtA3MxeSG87VhOOYegVrUCy7UZM9S6TLIdAamySTclZdYhFhRHloGYg7mgZv1Zzztvgud7V1tbQ2twYA34LJmF4p5dXF1KTufnE+SxeJtuCZNsLDCQU0+RyKTF27Unw101l8e6hns3u0PBalORVVVkcaEKBJDgV3+cGM4tKKmI+ohlIGnygKX00rSBfszz/n2uXv81wd6+rt1orsZCHRdr1Imk2F2Kob3hutSxW8thsd8AXNaln9D7CTfA6O+0UgkMuwVvEFFUbbAcrkcTA8+AtOk8E6KiQiDmMFSDqZItAzEVQviRkdDdaFgPp8HSZKAEAL5Qh7Sq2lIJBJwv2scUqkUnKoZgNhcDKhKg5aH+1IkcouCAdFGAQsuWZYhOjwFHQ96oagWgRoUov1T9kRBEODAwxM2QtEUl+Wp+Ln9VRo6BcMw4ErHRYjH4/B26AlQoQQTRdHWwcd9AH57+UAXddvDD37DmrBBV34WfqiXPl61g+vr6xA9zsGeM9gOdsNXkgpEtTwVvwOklXLKm6+/p5ezwk4B+j6droBs2CsGa/gNs6RIxazl4Tc25mpTgw/apPR1LYlNRFAzgsOxkyXYLIM1V8NMwyAkJSctD1eGVKiq5wWjSPdjmeTkiKvVW4f2YPHWl3GAVq6ymcyCTgovM3FzyRiDe2TaKcEKsLpJvNHjZgPNqEtyi6mZIm4SRFyLMUsONSSdkPeFtY1n0mczoY3BHTLhwPRy9/lzcziCw9ACI+yql0VLzcGAZbYSM5CCSZg1/9oc/nn7+i8N9p/8An4JMADxhH+xHfuiKwAAAABJRU5ErkJggg==)"
            },
            info: {
                "color": "#3A87AD",
                "background-color": "#D9EDF7",
                "border-color": "#BCE8F1",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYFAhkSsdes/QAAA8dJREFUOMvVlGtMW2UYx//POaWHXg6lLaW0ypAtw1UCgbniNOLcVOLmAjHZolOYlxmTGXVZdAnRfXQm+7SoU4mXaOaiZsEpC9FkiQs6Z6bdCnNYruM6KNBw6YWewzl9z+sHImEWv+vz7XmT95f/+3/+7wP814v+efDOV3/SoX3lHAA+6ODeUFfMfjOWMADgdk+eEKz0pF7aQdMAcOKLLjrcVMVX3xdWN29/GhYP7SvnP0cWfS8caSkfHZsPE9Fgnt02JNutQ0QYHB2dDz9/pKX8QjjuO9xUxd/66HdxTeCHZ3rojQObGQBcuNjfplkD3b19Y/6MrimSaKgSMmpGU5WevmE/swa6Oy73tQHA0Rdr2Mmv/6A1n9w9suQ7097Z9lM4FlTgTDrzZTu4StXVfpiI48rVcUDM5cmEksrFnHxfpTtU/3BFQzCQF/2bYVoNbH7zmItbSoMj40JSzmMyX5qDvriA7QdrIIpA+3cdsMpu0nXI8cV0MtKXCPZev+gCEM1S2NHPvWfP/hL+7FSr3+0p5RBEyhEN5JCKYr8XnASMT0xBNyzQGQeI8fjsGD39RMPk7se2bd5ZtTyoFYXftF6y37gx7NeUtJJOTFlAHDZLDuILU3j3+H5oOrD3yWbIztugaAzgnBKJuBLpGfQrS8wO4FZgV+c1IxaLgWVU0tMLEETCos4xMzEIv9cJXQcyagIwigDGwJgOAtHAwAhisQUjy0ORGERiELgG4iakkzo4MYAxcM5hAMi1WWG1yYCJIcMUaBkVRLdGeSU2995TLWzcUAzONJ7J6FBVBYIggMzmFbvdBV44Corg8vjhzC+EJEl8U1kJtgYrhCzgc/vvTwXKSib1paRFVRVORDAJAsw5FuTaJEhWM2SHB3mOAlhkNxwuLzeJsGwqWzf5TFNdKgtY5qHp6ZFf67Y/sAVadCaVY5YACDDb3Oi4NIjLnWMw2QthCBIsVhsUTU9tvXsjeq9+X1d75/KEs4LNOfcdf/+HthMnvwxOD0wmHaXr7ZItn2wuH2SnBzbZAbPJwpPx+VQuzcm7dgRCB57a1uBzUDRL4bfnI0RE0eaXd9W89mpjqHZnUI5Hh2l2dkZZUhOqpi2qSmpOmZ64Tuu9qlz/SEXo6MEHa3wOip46F1n7633eekV8ds8Wxjn37Wl63VVa+ej5oeEZ/82ZBETJjpJ1Rbij2D3Z/1trXUvLsblCK0XfOx0SX2kMsn9dX+d+7Kf6h8o4AIykuffjT8L20LU+w4AZd5VvEPY+XpWqLV327HR7DzXuDnD8r+ovkBehJ8i+y8YAAAAASUVORK5CYII=)"
            },
            warn: {
                "color": "#C09853",
                "background-color": "#FCF8E3",
                "border-color": "#FBEED5",
                "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABJlBMVEXr6eb/2oD/wi7/xjr/0mP/ykf/tQD/vBj/3o7/uQ//vyL/twebhgD/4pzX1K3z8e349vK6tHCilCWbiQymn0jGworr6dXQza3HxcKkn1vWvV/5uRfk4dXZ1bD18+/52YebiAmyr5S9mhCzrWq5t6ufjRH54aLs0oS+qD751XqPhAybhwXsujG3sm+Zk0PTwG6Shg+PhhObhwOPgQL4zV2nlyrf27uLfgCPhRHu7OmLgAafkyiWkD3l49ibiAfTs0C+lgCniwD4sgDJxqOilzDWowWFfAH08uebig6qpFHBvH/aw26FfQTQzsvy8OyEfz20r3jAvaKbhgG9q0nc2LbZxXanoUu/u5WSggCtp1anpJKdmFz/zlX/1nGJiYmuq5Dx7+sAAADoPUZSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdBgUBGhh4aah5AAAAlklEQVQY02NgoBIIE8EUcwn1FkIXM1Tj5dDUQhPU502Mi7XXQxGz5uVIjGOJUUUW81HnYEyMi2HVcUOICQZzMMYmxrEyMylJwgUt5BljWRLjmJm4pI1hYp5SQLGYxDgmLnZOVxuooClIDKgXKMbN5ggV1ACLJcaBxNgcoiGCBiZwdWxOETBDrTyEFey0jYJ4eHjMGWgEAIpRFRCUt08qAAAAAElFTkSuQmCC)"
            }
        }
    };
    $.notify.addStyle('message', styleoption);

    var opts;
    opts = {
        // whether to hide the notification on click
        clickToHide: false,
        // whether to auto-hide the notification
        autoHide: true,
        // if autoHide, hide after milliseconds
        autoHideDelay: 5000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5,
        // position defines the notification position though uses the defaults below
        position: currPos,
        // default positions
        elementPosition: 'bottom left',
        globalPosition: 'top right',
        // default style
        style: 'message',
        // default class (string or [string])
        className: type[typeNo],
        // show animation
        showAnimation: 'slideDown',
        // show animation duration
        showDuration: 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2
    };
    //element cần hiển thị thông báo. Nếu undentified thì hiển thị global
    if (element) {
        element.notify(content, opts);
    } else {
        $.notify(content, opts);
    }
};

var pauseNotify = function(e) {
    clearTimeout($.currNotification.autohideTimer);
};
var clearNotify = function(e) {
    $.currNotification.destroy();
};
var confirmNotify = function(element) {
    let __code = element.childNodes[1].childNodes[0].data;
    $.loadDataService('SmacServices.asmx', 'ConfirmNotigy', { code: __code }, function(res) {
        if (res.type == "success") {
            $.loadDataService('SmacServices.asmx', 'GetListNotifyIDByUserList', { UserList: res.user }, function(res) {
                if (res) {
                    $.Emit("2", { UserList: res, NotifyCode: __code });
                }
            }, function() {

            });
        }
    }, function() {

    });
};

$.showNotifyConfirm = function(content, typeNo, position, element, confirm) {
    if (typeNo == undefined) { typeNo = 3; }
    position = position || "t r"; //positon: t: top, m: middle, b: bottom, l: left, c: center, r: right
    content = content || "";
    let currPos = getMessagePosition(position);
    let type = ["error", "info", "warn", "success"]; //Kiểu thông báo 0, 1, 2, 3

    let styleoption = {
        html: '<div>\n<span data-notify-html="title"></span>\n<a onclick="confirmNotify(this)">Đã xem<span class="notify-code" data-notify-text="code" style="display: none;"></span></a></div>',
        classes: {
            base: {
                "font-weight": "bold",
                "padding": "8px 15px 8px 14px",
                "text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
                "background-color": "#fcf8e3",
                "border": "1px solid #fbeed5",
                "border-radius": "4px",
                "white-space": "nowrap",
                "padding-left": "25px",
                "background-repeat": "no-repeat",
                "background-position": "3px 7px",
                "font-size": "16px"
            },
        }
    };
    $.notify.addStyle('notify-confirm', styleoption);

    var opts;
    opts = {
        // whether to hide the notification on click
        clickToHide: true,
        // whether to auto-hide the notification
        autoHide: false,
        // if autoHide, hide after milliseconds
        autoHideDelay: 5000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5,
        // position defines the notification position though uses the defaults below
        position: currPos,
        // default positions
        elementPosition: 'bottom left',
        globalPosition: 'top right',
        // default style
        style: 'notify-confirm',
        // default class (string or [string])
        className: type[typeNo],
        // show animation
        showAnimation: 'slideDown',
        // show animation duration
        showDuration: 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2
    };
    //element cần hiển thị thông báo. Nếu undentified thì hiển thị global
    if (element) {
        element.notify({ title: content, code: confirm }, opts);
    } else {
        $.notify({ title: content, code: confirm }, opts);
    }
};

$(document).on('click', '.notifyjs-foo-base .no', function() {
    $(this).trigger('notify-hide');
});

$(document).on('click', '.notifyjs-foo-base .yes', function() {
    alert($(this).text() + " clicked!");
    $(this).trigger('notify-hide');
});

$.loadDataService('DataServices.asmx', 'GetCurServerDate', {}, function(res) {
    var __convertDateTimeStringToDateTime = function(DateTimeString) {
        try {
            while (DateTimeString.indexOf('-') != -1) {
                DateTimeString = DateTimeString.replace('-', '/');
            }
            DateTimeString = DateTimeString.split(' ');
            var item1 = DateTimeString[0];
            var item2 = DateTimeString[1];

            item1 = item1.split('/');
            item2 = item2.split(':');

            var date = parseInt(item1[0].trim());
            var month = parseInt(item1[1].trim()) - 1;
            var year = parseInt(item1[2].trim());
            var hours = parseInt(item2[0].trim());
            var minute = parseInt(item2[1].trim());
            var second = parseInt(item2[2].trim());

            var __dateTime = new Date(year, month, date, hours, minute, second, 0);
            return __dateTime;
        } catch (ex) {
            return null;
        }
    };
    var __convertStringDateTimeToLongC = function(stringDateTime) {
        var __longC = 0;
        var __dateTime = __convertDateTimeStringToDateTime(stringDateTime);
        var __tick = __dateTime.getTime();
        var __epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
        var __ticksToMicrotime = __tick + __epochMicrotimeDiff;
        __longC = __ticksToMicrotime * 10000;
        return __longC;
    };

    var __long = res.Code || '';
    __long = parseInt(__long.trim());
    var __string = res.Name || '';
    var __clienceLong = __convertStringDateTimeToLongC(__string);
    TimeFolow = __long - __clienceLong;
}, function() {

});

$.sortByAttribute = function(array, ...attrs) {
    // generate an array of predicate-objects contains
    // property getter, and descending indicator
    //asc: attr; desc: -attr
    let predicates = attrs.map(pred => {
        let descending = pred.charAt(0) === '-' ? -1 : 1;
        pred = pred.replace(/^-/, '');
        return {
            getter: o => o[pred],
            descend: descending
        };
    });
    // schwartzian transform idiom implementation. aka: "decorate-sort-undecorate"
    return array.map(item => {
            return {
                src: item,
                compareValues: predicates.map(predicate => predicate.getter(item))
            };
        })
        .sort((o1, o2) => {
            let i = -1,
                result = 0;
            while (++i < predicates.length) {
                if (o1.compareValues[i] < o2.compareValues[i]) result = -1;
                if (o1.compareValues[i] > o2.compareValues[i]) result = 1;
                if (result *= predicates[i].descend) break;
            }
            return result;
        })
        .map(item => item.src);
};

$.getAlignment = function(type, value) {
    //type: 0: string, 1: number, 2: datetime
    if (type == 'string') type = 0;
    if (type == 'number') type = 1;

    switch (type) {
        case 0:
            return 'left';
        case 1:
            return 'right';
        case 2:
            return 'center';
        case -1:
            if (value == undefined) return 'left';
            return $.getAlignment(typeof(value));
    }
};

$.replaceStr = function(str, key, value) {
    if (str != undefined) {
        str = str.replace(key, value);
        while (str.indexOf(key) > -1) {
            str = str.replace(key, value);
        };
    }
    return str;
};

$.multiple = function() {
    let result = 1;
    for (let index = 0; index < arguments.length; index++) {
        let e = arguments[index];
        let e1Num = 1;
        if (e < Math.ceil(e)) {
            let str = "kas" + e;
            str = str.substr(str.indexOf('.') + 1);
            str = str.length;
            e1Num = Math.pow(10, str);
        }
        let e2Num = 1;
        if (result < Math.ceil(result)) {
            let str = "kas" + result;
            str = str.substr(str.indexOf('.') + 1);
            str = str.length;
            e2Num = Math.pow(10, str);
        }
        result = ((result * e2Num) * (e * e1Num)) / e1Num / e2Num;
    }
    return result;
};
$.sum = function(list, field) {
    try {
        return _.reduce(list.map(a => { return a[field] }), function(memo, num) { return memo + num; }, 0);
    } catch (error) {

    }
    return 0;
};
$.enCodeHtml = function(str) {
    str = str || '';
    Encoder.EncodeType = "numerical";
    Encoder.EncodeType = "entity";
    return Encoder.htmlEncode(str);
};
$.deCodeHtml = function(str) {
    str = str || '';
    Encoder.EncodeType = "numerical";
    Encoder.EncodeType = "entity";
    return Encoder.htmlDecode(str);
};

String.prototype.replaceAll = function(find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

String.prototype.toUpperWord = function() {
    var arr = this.split(' ') || [];
    if (arr.length > 0) {
        arr.forEach(element => {
            if (element.trim().length > 0) {
                element = element.charAt(0).toUpperCase() + element.slice(1);
            }
        })
        return arr.join(' ');
    }
    return this;
};
String.prototype.toUpperSentence = function() {
    if (this != '') {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    return this;
};
$.toString = function(data, pathern) {
    if (typeof(data) == 'number') {
        let regex = new RegExp(/^0+$/);
        if (regex.test(pathern)) {
            data = data.toString();
            for (let index = 0; index < (pathern.length - data.length); index++) {
                data = '0' + data;
            }
            return data;
        }
    }
};
$.getLang = function(id, defaultValue) {
    try {
        let lang = $.getCookieCode("lang") || "";
        lang = lang == "" ? "vi" : lang.toLowerCase();
        let dict = dictionary || {};
        return (dict[id.toLowerCase()] || {})[lang] || defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

$.setLang = function() {
    try {
        if (arguments.length > 0) {
            let i = 0;
            while (i < (arguments.length - 1)) {
                let id = arguments[i];
                let value = arguments[i + 1];
                $('#' + id).html($.getLang(id, value));
                i = i + 2;
            }
        }
    } catch (e) {

    }
};

$.getDataSubmit = function(element, type, option) {
    try {
        /* type */
        //0: DateSubmit (yyyy-MM-dd HH:mm:ss)
        //1: StringListSubmit (string0,string1,...,stringn)
        //2: CheckBoxSubmit (unchecked:0, checked: 1)
        //3: Int submit
        //4: Float submit
        //5: val.trim()
        //6: <select>
        //7: CodeName
        //8: CodeNameKey
        /* option */
        //type_0: 
        //      0: Lấy from date, 
        //      1: Lấy to date, 
        //      2: Lấy data kiểu datetime (đầu vào dd/MM/yyyy HH:mm)
        //      3: Lấy iDate(yyyyMMdd)
        //      4: Lấy data kiểm datetime (đầu vào dd/MM/yyyy)
        //      5: Lấy DateLiteRoot
        //type_2: undetifined: unchecked:0, checked: 1, 1: False/True
        //type_6: text: seleted text, <string>: data-<string>
        if (type == 0) {
            if (option == undefined)
                if ($.isDateTimeFormat(element.val()))
                    return $.toStringDateTimeSubmit($.convertDateTimeStringToDateTime(element.val()));
                else
                    return $.toStringDateTimeSubmit($.convertDateStringToDateTime(element.val()));
            else if (option == 0) {
                return $.toStringDateTimeSubmit($.convertDateStringToDateTime(element.val()));
            } else if (option == 1) {
                let _date = $.convertDateStringToDateTime(element.val());
                _date = new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), 23, 59, 59, 999);
                return $.toStringDateTimeSubmit(_date);
            } else if (option == 2) {
                return $.convertDateTimeStringToDateTime(element.val());
            } else if (option == 3) {
                return $.getiDate($.convertDateStringToDateTime(element.val()));
            } else if (option == 4) {
                return $.convertDateStringToDate(element.val());
            } else if (option == 5) {
                return new DateLite($.getDataSubmit(element, 0, 4));
            }
        } else if (type == 1) {
            let _val = element.val();
            if ($.checkArray(_val))
                return $.convertArrayStringToString(_val);
            else if ($.checkString(_val))
                return _val;
            else
                return '';
        } else if (type == 2) {
            if (element.is(':checked')) return 1;
            return 0;
        } else if (type == 3) {
            let _val = element.val();
            _val = _val.replaceAll(',', '');
            _val = parseInt(_val);
            return _val;
        } else if (type == 4) {
            let _val = element.val();
            _val = _val.replaceAll(',', '');
            _val = parseFloat(_val);
            return _val;
        } else if (type == 5) {
            return element.val().trim();
        } else if (type == 6) {
            if (option == undefined) {
                return element.val();
            } else if (option == "text") {
                return $.getSeleted(element);
            } else {
                return $.getSeleted(element, option);
            }
        } else if (type == 7) {
            let _code = $.getDataSubmit(element, 6);

            if ($.checkString(_code)) {
                return {
                    Code: _code,
                    Name: $.getDataSubmit(element, 6, 'text')
                };
            }
            return null;
        } else if (type == 8) {
            let _code = $.getDataSubmit(element, 6);

            if ($.checkString(_code)) {
                return {
                    Code: _code,
                    Name: $.getDataSubmit(element, 6, 'text'),
                    Key: $.getDataSubmit(element, 6, 'key')
                };
            }
            return null;
        } else {
            return element.val();
        }
    } catch (error) {
        //console.log(error);
        //$.showValidatorMesage('Data error!!! [common.getDataSubmit]');
        return '';
    }

};

var ST = {
    StringDateTime: 0,
    StringList: 1,
    CheckBox: 2,
    Int: 3,
    Float: 4,
    ValTrim: 5,
    ComboBox: 6,
};
var STOpts = {
    StringDateTime: {
        From: 0,
        To: 1,
        DateTime: 2,
        iDate: 3,
        DateLiteRoot: 4
    },
    CheckBox: {
        Bool: 1
    },
};


$.getMonthNow = function() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var kq = month + '';
    if (kq.length == 1) kq = '0' + kq;
    return kq + '/' + year;
};

$.getSeleted = function(element, _data) {
    try {

        var _x = element[0].children;
        for (let index = 0; index < _x.length; index++) {
            const _e = _x.item(index);
            if (_e.nodeName == 'OPTION') {
                if (_e.selected == true) {
                    if (_data == undefined)
                        return _e.text;
                    else
                        return _e.dataset[_data];
                }
            } else {
                for (let i = 0; i < _e.children.length; i++) {
                    const element = _e.children.item(i);
                    if (element.nodeName == 'OPTION') {
                        if (element.selected == true) {
                            if (_data == undefined)
                                return element.text;
                            else
                                return element.dataset[_data];
                        }
                    }
                }
            }
            
        }

    } catch (error) {
        console.log(error);
    }
    return "";
};
$.getStringDayOfWeek = function(date) {
    let strReturn = '';
    try {
        switch (date.getDay()) {
            case 0:
                strReturn = 'Chủ nhật';
                break;
            case 1:
                strReturn = 'Thứ hai';
                break;
            case 2:
                strReturn = 'Thứ ba';
                break;
            case 3:
                strReturn = 'Thứ tư';
                break;
            case 4:
                strReturn = 'Thứ năm';
                break;
            case 5:
                strReturn = 'Thứ sáu';
                break;
            case 6:
                strReturn = 'Thứ bảy';
                break;
        }
    } catch (ex) { strReturn = ''; }
    return strReturn;
};

$.getAction = function() {
    let _link = window.location.pathname;
    let _arr = _link.split('/');
    return _arr[3];
};

$.getController = function() {
    let _link = window.location.pathname;
    let _arr = _link.split('/');
    return _arr[2];
};

$.getiDate = function(dateTime) {
    try {
        return dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.getDate();
    } catch (error) {
        return 0;
    }
};

$.checkArray = function(arr) {
    return arr != undefined && Array.isArray(arr) && arr.length > 0;
};

$.checkString = function(str) {
    return str != undefined && str != '' && str.trim() != '' && str != 'no_val';
};

$.loadPermisstionByUser = function(options) {
    options = options || {};
    options.fn = options.fn || function(res) {};
    $.loadDataService('SmacServices.asmx', 'CheckPerByUser', {}, function(res) {
        res = res || [];
        try {
            options.fn(res);
        } catch (error) {
            console.log(error);
        }
        // res.forEach(function(item, index) {
        //     if (item.Code == "updateData")
        //         updateData = item.Name || 0;
        //     else if (item.Code == "deleteData")
        //         deleteData = item.Name || 0;
        //     else if (item.Code == "restoreData")
        //         restoreData = item.Name || 0;
        //     else if (item.Code == "cleanData")
        //         cleanData = item.Name || 0;

        //     flatUser = true;
        // });
    }, function() {});
};

$.langGen = {
    site: {
        placeholder: $.getLang('site_choose', 'Chọn chi nhánh'),
        title: $.getLang('site_seleted', 'Đã chọn {0} chi nhánh'),
        all: $.getLang('all_site', 'Tất cả chi nhánh'),
        all_site: $.getLang('all_site_selected', 'Đã chọn tất cả chi nhánh')
    },
    dept: {
        placeholder: $.getLang('dept_choose', "Chọn phòng ban"),
        title: $.getLang('dept_choose', "Đã chọn {0} phòng ban"),
        all: $.getLang('dept_choose', 'Tất cả phòng ban'),
        allsite: $.getLang('dept_choose', 'Đã chọn tất cả phòng ban')
    },
    cost: {}
};

//Object
class DateLite {
    constructor(datetime) {
        try {
            let x = datetime.getFullYear();
        } catch (error) {
            datetime = new Date();
        }
        this.lDate = $.convertDateTimeToLongC(datetime);
        this.sDate = $.convertDateTimeToStringDate(datetime);
        this.iDate = $.getiDate(datetime); //yyyymmdd
        this.iYear = datetime.getFullYear();
        this.iYearNMonth = datetime.getFullYear() * 100 + datetime.getMonth() + 1;
        this.iMonth = datetime.getMonth() + 1;
        this.iDay = datetime.getDate();
        this.iHourNMinute = datetime.getHours() * 100 + datetime.getMinutes();
        this.iHour = datetime.getHours();
        this.iMinute = datetime.getMinutes();
        this.dayOfWeek = datetime.getDay();
    }
    getDateTime() {
        return $.convertLongCToDateTime(this.lDate);
    }
}
class CodeNameRoot {
    constructor(no, Code, Name) {
        this.no = no || 0;
        this.Code = Code || "";
        this.Name = Name || "";
    }
}