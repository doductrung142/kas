$(document).ready(function () {
    var listIndustry = {};
    var listStoreScale = {};
    var listLeadSource = {};

    $("#btn_register").on('click', function () {
        var __number = $("#phone_number").val() || ""; __number = __number.trim(); __number = __number.replaceAll(" ", "");
        if (__number != "") {
            auth(__number);
        } else {
            $.confirm({
                columnClass: 'col-md-4 col-sm-12 col-xs-12',
                useBootstrap: true,
                title: 'Thông báo',
                content: 'Vui lòng nhập số điện thoại!',
                buttons: {
                    cancel: {
                        text: 'Đóng',
                        action: function () {
                            $("#phone_number").focus();
                        }
                    },
                },

            });
        }
    });

    var getLinkForAdminV3 = function () {
        var __port = window.location.port || ''; __port = __port.trim();
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
    var loadDataAction = function (controller, action, data, fn, fn1) {
        controller = controller || '';
        action = action || '';
        data = data || {};
        fn = fn || function (result) { };
        fn1 = fn1 || function (param1, param2) { };
        var url = getLinkForAdminV3() + controller + '/' + action;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (result) {
                var __result = [];
                try {
                    __result = $.parseJSON(result) || [];
                } catch (ex) {
                    __result = result;
                }
                fn(__result);
            },
            error: function (param1, param2) {
                fn1(param1, param2);
            }
        });
    };


    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
        'size': 'normal',
        'callback': function (response) {
            onSignInSubmit();
        }
    });
    var auth = function (__number) {
        $("#status").html("");
        __number = "+" + __number; __number = __number.replace("+840", "0"); __number = __number.replace("+84", "0"); __number = __number.replace("+", ""); __number = '+84' + __number;
        firebase.auth().signInWithPhoneNumber(__number, recaptcha).then(function (e) {
            console.log('Text transfer successful');
            $.confirm({
                columnClass: 'col-md-6 col-sm-12 col-xs-12',
                useBootstrap: true,
                title: 'Nhập mã xác nhận đã gửi qua điện thoại',
                content: '' +
                    '<form style="display: flex;justify-content: center" method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">' +
                    '<input type="text" id="digit-1" class="digit-1" name="digit-1" data-next="digit-2" />' +
                    '<input type="text" id="digit-2" class="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />' +
                    '<input type="text" id="digit-3" class="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" />' +
                    ' <input type="text" id="digit-4" class="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />' +
                    '<input type="text" id="digit-5"class="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />' +
                    '<input type="text" id="digit-6" class="digit-6" name="digit-6" data-previous="digit-5" />' +
                    '</form>',
                buttons: {
                    cancel: {
                        text: 'Đóng'
                    },

                    formSubmit: {
                        text: 'Tiếp theo',
                        btnClass: 'btn-blue',
                        action: function () {
                            var digit1 = this.$content.find('.digit-1').val().toString();
                            var digit2 = this.$content.find('.digit-2').val().toString();
                            var digit3 = this.$content.find('.digit-3').val().toString();
                            var digit4 = this.$content.find('.digit-4').val().toString();
                            var digit5 = this.$content.find('.digit-5').val().toString();
                            var digit6 = this.$content.find('.digit-6').val().toString();
                            var __code = digit1 + digit2 + digit3 + digit4 + digit5 + digit6
                            e.confirm(__code).then(function (result) {
                                showFormRegister();
                            }).catch(function (error) {
                                $("#status").html("Mã OTP không hợp lệ. Vui lòng thử lại");
                            });
                        }
                    },
                },
                onContentReady: function () {
                    // bind to events
                    var jc = this;
                    jc.$content.find('.sms-code').on('click', function () {
                        jc.$content.find('.label-error').hide();
                    })
                    $('.digit-group').find('input').each(function () {
                        $(this).attr('maxlength', 1);
                        $(this).on('keyup', function (e) {
                            var parent = $($(this).parent());

                            if (e.keyCode === 8 || e.keyCode === 37) {
                                var prev = parent.find('input#' + $(this).data('previous'));

                                if (prev.length) {
                                    $(prev).select();
                                }
                            } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                                var next = parent.find('input#' + $(this).data('next'));

                                if (next.length) {
                                    $(next).select();
                                } else {
                                    if (parent.data('autosubmit')) {
                                        parent.submit();
                                    }
                                }
                            }
                        });
                    });
                }
            });

        })
            .catch(function (error) {
                $("#status").html(error);
            });
    };
    let loadProvice = () => {
        let $selector = $('#city');
        loadDataAction('', 'GetCity', {}, (res) => {
            res = res || [];
            $selector.html('<option value="">Chọn tỉnh/thành</option>');
            res.forEach((item) => {
                $selector.append('<option value="' + item.code + '">' + item.name + '</option>');
            });
        }, () => {
            $selector.html('<option value="">Chọn tỉnh/thành</option>');
        });
    };
    let loadDistrict = () => {
        let $selector = $('#district');
        let cityCode = ($('#city').val() || '').trim();
        $selector.html('<option value="">Chọn quận/huyện</option>');
        if (cityCode != '') {
            loadDataAction('', 'GetDistrict', { cityCode: cityCode }, (res) => {
                res = res || [];
                $selector.html('<option value="">Chọn quận/huyện</option>');
                res.forEach((item) => {
                    $selector.append('<option value="' + item.code + '">' + item.name + '</option>');
                });
            }, () => {
                $selector.html('<option value="">Chọn quận/huyện</option>');
            })
        }
    };
    let loadLeadSource = () => {
        listLeadSource = {};
        let $selector = $('#leadsource');
        $selector.html('<option value="">Chọn nguồn dẫn</option>');
        loadDataAction('', 'GetLeadSource', {}, (res) => {
            res = res || [];
            $selector.html('<option value="">Chọn nguồn dẫn</option>');
            var __source = getParam("source") || "";
            res.forEach((item) => {
                listLeadSource[item.Key] = item;
                if (item.Key == __source) {
                    $selector.append('<option selected value="' + item.Key + '">' + item.Value + '</option>');
                } else {
                    $selector.append('<option value="' + item.Key + '">' + item.Value + '</option>');
                }
            });
        }, () => {
            $selector.html('<option value="">Chọn nguồn dẫn</option>');
        })
    };
    let loadCampaign = () => {
        let $selector = $('#campaign');
        $selector.html('<option value="">Chọn chiến dịch</option>');
        loadDataAction('', 'GetCampaign', {}, (res) => {
            res = res || [];
            $selector.html('<option value="">Chọn chiến dịch</option>');
            res.forEach((item) => {
                let __selected = "";
                if (item.Code == "REG") {
                    __selected = "selected"
                }
                $selector.append('<option ' + __selected+' value="' + item.Code + '">' + item.Name + '</option>');
            });
        }, () => {
            $selector.html('<option value="">Chọn chiến dịch</option>');
        })
    };
    let loadIndustry = () => {
        let $selector = $('#industry');
        $selector.html('<option value="">Chọn ngành nghề</option>');
        loadDataAction('', 'GetMasterData', { type: "Industry" }, (res) => {
            res = res || [];
            $selector.html('<option value="">Chọn ngành nghề</option>');
            res.forEach((item) => {
                listIndustry[item.Key] = item;
                $selector.append('<option value="' + item.Key + '">' + item.Value + '</option>');
            });
        }, () => {
            $selector.html('<option value="">Chọn ngành nghề</option>');
        })
    };
    let loadStoreScale = () => {
        let $selector = $('#scale');
        $selector.html('<option value="">Chọn quy mô cửa hàng</option>');
        loadDataAction('', 'GetMasterData', { type: "StoreScale" }, (res) => {
            res = res || [];
            $selector.html('<option value="">Chọn quy mô cửa hàng</option>');
            res.forEach((item) => {
                listStoreScale[item.Key] = item;
                $selector.append('<option value="' + item.Key + '">' + item.Value + '</option>');
            });
        }, () => {
            $selector.html('<option value="">Chọn quy mô cửa hàng</option>');
        })
    };
    $('body').on('change', '#city', function () {
        loadDistrict();
    });
    var getParam = function (param) {
        param = param || ''; param = param.trim().toLowerCase();
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
    var showFormRegister = function () {
        var __phoneRegister = $("#phone_number").val() || "";
        $.confirm({
            columnClass: 'col-md-6 col-sm-12 col-xs-12',
            useBootstrap: true,
            title: 'Thông tin đăng ký',
            content: '' +
                '<form>' +
                '<div class="row">' +
                '<div class="col-md-4 col-sm-4 col-lg-4">' +
                '<div class="form-group">' +
                '<label for="code">Tên</label>' +
                '<input type="text" class="form-control ml-2 firstname"  id="firstname" placeholder="Tên">' +
                '</div>' +
                '</div>' +
                '<div class="col-md-8 col-sm-8 col-lg-8">' +
                '<div class="form-group">' +
                '<label for="code">Họ và tên lót</label>' +
                '<input type="text" class="form-control ml-2 lastname" id="lastname" placeholder="Họ và tên lót">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-12 col-sm-12 col-lg-12">' +
                '<div class="form-group">' +
                '<label for="phone">Ngành nghề</label>' +
                '<select type="text" class="form-control ml-2 industry" id="industry" ></select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-12 col-sm-12 col-lg-12">' +
                '<div class="form-group">' +
                '<label for="phone">Quy mô cửa hàng</label>' +
                '<select type="text" class="form-control ml-2 scale" id="scale" ></select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-12 col-sm-12 col-lg-12">' +
                '<div class="form-group">' +
                '<label for="phone">Tỉnh thành</label>' +
                '<select type="text" class="form-control ml-2 city" id="city" ></select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-6 col-sm-6 col-lg-6">' +
                '<div class="form-group">' +
                '<label for="phone">Quận Huyện</label>' +
                '<select type="text" class="form-control ml-2 district" id="district" ></select>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6 col-sm-6 col-lg-6">' +
                '<div class="form-group">' +
                '<label for="phone">Phường, xã</label>' +
                '<input type="text" class="form-control ml-2 ward" id="ward" >' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-12 col-sm-12 col-lg-12">' +
                '<div class="form-group">' +
                '<label for="inputAddress">Địa chỉ</label>' +
                '<input type="text" class="form-control ml-2 inputAddress" id="inputAddress" placeholder="Khu đô thị mới, Quận 2, Hồ Chí Minh">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-4 col-sm-4 col-lg-4 d-flex align-items-center">' +
                '<div class="form-group">' +
                '<label for="graded">Đã sử dụng POS</label>' +
                '<input type="checkbox" id="posed" class="posed" style="appearance: auto;width: auto;border: 1px solid #ddd;position: unset;opacity: 1;pointer-events: all;margin-left: 5px;margin-top: 5px;">' +
                '</div>' +
                '</div>' +
                '<div class="col-md-4 col-sm-4 col-lg-4">' +
                '<div class="form-group">' +
                '<label for="leadsource">Nguồn dẫn</label>' +
                '<select type="text" class="form-control ml-2 leadsource" id="leadsource" ></select>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-4 col-sm-4 col-lg-4">' +
                '<div class="form-group">' +
                '<label for="campaign">Chiến dịch</label>' +
                '<select type="text" class="form-control ml-2 campaign" id="campaign" ></select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</form>',
            buttons: {
                cancel: {
                    text: 'Đóng'
                },
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-blue',
                    action: function () {
                        var __fisrtname = this.$content.find('.firstname').val() || ""; __fisrtname = __fisrtname.trim();
                        var __lastname = this.$content.find('.lastname').val() || ""; __lastname = __lastname.trim();
                        var __industry = this.$content.find('.industry').val() || ""; __industry = __industry.trim();
                        var __scale = this.$content.find('.scale').val() || ""; __scale = __scale.trim();
                        var __city = this.$content.find('.city').val() || ""; __city = __city.trim();
                        var __district = this.$content.find('.district').val() || ""; __district = __district.trim();
                        var __ward = this.$content.find('.ward').val() || ""; __ward = __ward.trim();
                        var __inputAddress = this.$content.find('.inputAddress').val() || ""; __inputAddress = __inputAddress.trim();
                        var __posed = this.$content.find('.posed').is(":checked") ? "Đã sử dụng POS" : "Chưa sử dụng pos";
                        var __leadsource = this.$content.find('.leadsource').val() || ""; __leadsource = __leadsource.trim();
                        var __campaign = this.$content.find('.campaign').val() || ""; __campaign = __campaign.trim();
                        var __straddress = __inputAddress;
                        __straddress += __ward == "" ? "" : ", " + __ward;
                        __straddress += __district == "" ? "" : ", " + __district;
                        __straddress += __city == "" ? "" : ", " + __city;
                        __straddress += __straddress != "" ? "- Việt Nam" : "";
                        var __leadAdress = [];
                        __leadAdress.push({
                            Street: __inputAddress,
                            Ward: __ward,
                            District: __district,
                            Province: __city,
                            Country: "Việt Nam"
                        });
                        var __objectIndustry = {};
                        if (__industry != "") {
                            __objectIndustry = { Code: __industry, Name: (listIndustry[__industry] || {}).Value || "" }
                        }
                        var __ObjectStoreScale = {};
                        if (__scale != "") {
                            __ObjectStoreScale = { Code: __scale, Name: (listStoreScale[__scale] || {}).Value || "" }
                        }
                        var __ObjectLeadSource = {};
                        if (__leadsource != "") {
                            __ObjectLeadSource = { Code: __leadsource, Name: (listLeadSource[__leadsource] || {}).Value || "" }
                        }
                        if (__fisrtname == "") {
                            this.$content.find('.firstname').focus();
                            $.confirm({
                                columnClass: 'col-md-4 col-sm-12 col-xs-12',
                                useBootstrap: true,
                                title: 'Thông báo',
                                content: 'Vui lòng nhập tên!',
                                buttons: {
                                    cancel: {
                                        text: 'Đóng',
                                        action: function () { }
                                    },
                                },

                            });
                            return false;
                        } else if (__lastname == "") {
                            this.$content.find('.lastname').focus();
                            $.confirm({
                                columnClass: 'col-md-4 col-sm-12 col-xs-12',
                                useBootstrap: true,
                                title: 'Thông báo',
                                content: 'Vui lòng nhập họ và tên lót!',
                                buttons: {
                                    cancel: {
                                        text: 'Đóng',
                                        action: function () { }
                                    },
                                },

                            });
                            return false;
                        } else if (__industry == "") {
                            this.$content.find('.industry').focus();
                            $.confirm({
                                columnClass: 'col-md-4 col-sm-12 col-xs-12',
                                useBootstrap: true,
                                title: 'Thông báo',
                                content: 'Vui lòng chọn ngành nghề!',
                                buttons: {
                                    cancel: {
                                        text: 'Đóng',
                                        action: function () { }
                                    },
                                },

                            });
                            return false;
                        } else if (__scale == "") {
                            this.$content.find('.scale').focus();
                            $.confirm({
                                columnClass: 'col-md-4 col-sm-12 col-xs-12',
                                useBootstrap: true,
                                title: 'Thông báo',
                                content: 'Vui lòng chọn quy mô cửa hàng!',
                                buttons: {
                                    cancel: {
                                        text: 'Đóng',
                                        action: function () { }
                                    },
                                },

                            });
                            return false;
                        } else if (__leadsource == "") {
                            this.$content.find('.leadsource').focus();
                            $.confirm({
                                columnClass: 'col-md-4 col-sm-12 col-xs-12',
                                useBootstrap: true,
                                title: 'Thông báo',
                                content: 'Vui lòng chọn nguồn dẫn!',
                                buttons: {
                                    cancel: {
                                        text: 'Đóng',
                                        action: function () { }
                                    },
                                },

                            });
                            return false;
                        }
                        else if (__campaign == "") {
                            this.$content.find('.campaign').focus();
                            $.confirm({
                                columnClass: 'col-md-4 col-sm-12 col-xs-12',
                                useBootstrap: true,
                                title: 'Thông báo',
                                content: 'Vui lòng chọn chiến dịch!',
                                buttons: {
                                    cancel: {
                                        text: 'Đóng',
                                        action: function () { }
                                    },
                                },

                            });
                            return false;
                        } else {
                            var __userid = getParam("userid") || "";
                            var __data = {
                                userid: __userid,
                                firstname: __fisrtname,
                                lastname: __lastname,
                                phone: __phoneRegister,
                                note: __posed,
                                address: __straddress,
                                leadAddress: __leadAdress,
                                partnerAddresses: __leadAdress,
                                industry: __objectIndustry,
                                storescale: __ObjectStoreScale,
                                leadsource: __ObjectLeadSource,
                                campaign: __campaign
                            }
                            var res = CreateMember(__data);
                            if (res) {
                                $("#content_register").html(`<div class="alert alert-success font-weight-bold" style="font-size: 14px;" role="alert">
                                    <i class="fa fa-check" aria-hidden="true"></i>  Đã gửi yêu cầu!</br>
                                    Chúng tôi sẽ liên hệ với Quý khách hàng trong thời gian sớm nhất!</br>
                                    Cảm ơn Quý khách!
                                </div>`);
                                return true;
                            } else {
                                $("#content_register").html(`<div class="alert alert-danger font-weight-bold" style="font-size: 14px;" role="alert">
                                <i class="fa fa-times" aria-hidden="true"></i> Đã có lỗi xảy ra vui lòng thử lại sau
                              </div>`);
                                return true;
                            }
                        }
                        return false;
                    }
                },
            },
            onContentReady: function () {
                var jc = this;
                jc.$content.find('.name').on('click', function () {
                    jc.$content.find('.erro_name').hide();
                });
                loadIndustry();
                loadStoreScale();
                loadDistrict();
                loadProvice();
                loadLeadSource();
                loadCampaign();
            }
        });
    };

    var CreateMember = function (data) {
        return new Promise(function (resolve, reject) {
            loadDataAction('', 'SaveLandingPageKas', data, function (res) {
                res = res || {}
                if (res.SysErrCode != "1") {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, function () {
                resolve(false);
            })
        });

    }
});