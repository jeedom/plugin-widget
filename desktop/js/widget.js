
/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 */


editor = null;
var imagesWidgets = [];
updateListImages();

$('.pluginContainer').packery();

$("img.lazy").each(function () {
    var el = $(this);
    if (el.attr('data-original2') != undefined) {
        $("<img>", {
            src: el.attr('data-original'),
            error: function () {
                $("<img>", {
                    src: el.attr('data-original2'),
                    error: function () {
                        if (el.attr('data-original3') != undefined) {
                            $("<img>", {
                                src: el.attr('data-original3'),
                                error: function () {
                                    el.lazyload({
                                        event: "sporty"
                                    });
                                    el.trigger("sporty");
                                },
                                load: function () {
                                    el.attr("data-original", el.attr('data-original3'));
                                    el.lazyload({
                                        event: "sporty"
                                    });
                                    el.trigger("sporty");
                                }
                            });
                        } else {
                            el.lazyload({
                                event: "sporty"
                            });
                            el.trigger("sporty");
                        }
                    },
                    load: function () {
                        el.attr("data-original", el.attr('data-original2'));
                        el.lazyload({
                            event: "sporty"
                        });
                        el.trigger("sporty");
                    }
                });
            },
            load: function () {
                el.lazyload({
                    event: "sporty"
                });
                el.trigger("sporty");
            }
        });
    } else {
        el.lazyload({
            event: "sporty"
        });
        el.trigger("sporty");
    }
});

$('.bt_displayWidgetList').on('click', function () {
    $('.widget').hide();
    $('.widgetImageView').hide();
    $('#bsListWidgets').show();
    $('.widgetListDisplay').show();
    $('.li_widget').removeClass('active');
});

$(".li_widget").on('click', function (event) {
    $('#bsListWidgets').show();
    $('.widget').show();
    $('.widgetImageView').hide();
    $('.widgetListDisplay').hide();
    $('.li_widget').removeClass('active');
    $(this).addClass('active');
    printWidget($(this).attr('data-path'));
    return false;
});

if (getUrlVars('saveSuccessFull') == 1) {
    $('#div_alert').showAlert({message: '{{Sauvegarde effectué avec succès}}', level: 'success'});
}

if (getUrlVars('removeSuccessFull') == 1) {
    $('#div_alert').showAlert({message: '{{Suppression effectué avec succès}}', level: 'success'});
}

jwerty.key('ctrl+s', function (e) {
    e.preventDefault();
    saveWidget();
});

$('.widgetAction[data-action=save]').on('click', function () {
    saveWidget();
});

$('.widgetAction[data-action=remove]').on('click', function () {
    bootbox.confirm('{{Etes-vous sûr de vouloir supprimer le widget}} <span style="font-weight: bold ;">' + $('.widgetAttr[data-l1key=name]').value() + '</span> ?', function (result) {
        if (result) {
            removeWidget($('.widgetAttr[data-l1key=path]').value());
        }
    });
});

$('.widgetAction[data-action=copy]').on('click', function () {
    bootbox.prompt("{{Nom la copie du widget ?}}", function (result) {
        if (result) {
            copyWidget($('.widgetAttr[data-l1key=path]').value(), result);
        }
    });
});

$('.widgetAction[data-action=create]').on('click', function () {
    $('.widgetListDisplay').hide();
    $('#bsListWidgets').hide();
    $('.widget').hide();
    $('.widgetImageView').show();
});

$('.widgetAction[data-action=add]').on('click', function () {
    $.hideAlert();
    bootbox.prompt("Nom du widget ?", function (result) {
        if (result !== null) {
            addWidget(result);
        }
    });
});

$('#bt_shareOnMarket').on('click', function () {
    $('#md_modal').dialog({title: "Partager sur le market"});
    $('#md_modal').load('index.php?v=d&modal=market.send&type=widget&logicalId=' + encodeURI($('.widgetAttr[data-l1key=logicalId]').value()) + '&name=' + encodeURI($('.widgetAttr[data-l1key=logicalId]').value())).dialog('open');
});

$('#bt_applyWidget').on('click', function () {
    $('#md_modal').dialog({title: "Appliquer widget"});
    $('#md_modal').load('index.php?v=d&plugin=widget&modal=widget.apply&path=' + encodeURI($('.widgetAttr[data-l1key=path]').value())).dialog('open');
});

$('#bt_manageFiles').on('click', function () {
    $('#md_modal').dialog({title: "Gérer les dépendances"});
    $('#md_modal').load('index.php?v=d&plugin=widget&modal=widget.3rdparty&path=' + encodeURI($('.widgetAttr[data-l1key=path]').value())).dialog('open');
});

$('#bt_getFromMarket').on('click', function () {
    $('#md_modal').dialog({title: "Partager sur le market"});
    $('#md_modal').load('index.php?v=d&modal=market.list&type=widget').dialog('open');
});

if (getUrlVars('id') != '') {
    if ($('#ul_widget .li_widget[data-path="' + getUrlVars('id') + '"]').length != 0) {
        $('#ul_widget .li_widget[data-path="' + getUrlVars('id') + '"]').click();
    }
}
$('.widgetDisplayCard').on('click', function () {
    $('#ul_widget .li_widget[data-path="' + $(this).attr('data-path') + '"]').click();
});


$('body').delegate('.widgetAttr', 'change', function () {
    modifyWithoutSave = true;
});

$('#bt_insertIcon').on('click', function () {
    chooseIcon(function (_icon) {
        editor.replaceSelection(_icon);
    });
});

function printWidget(_path) {
    $.ajax({// fonction permettant de faire de l'ajax
        type: "POST", // methode de transmission des données au fichier php
        url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
        data: {
            action: "get",
            path: _path
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) { // si l'appel a bien fonctionné
            if (data.state != 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            $('.widget').setValues(data.result, '.widgetAttr');

            if (editor == null) {
                if (isset(data.result.content)) {
                    $('#ta_script').val(data.result.content);
                }
                setTimeout(function () {
                    editor = CodeMirror.fromTextArea(document.getElementById("ta_widgetContent"), {
                        lineNumbers: true,
                        mode: "text/html",
                        matchBrackets: true,
                        viewportMargin: Infinity
                    });
                }, 1);
            } else {
                if (isset(data.result.content)) {
                    editor.setValue(data.result.content);
                }
            }
            initTooltips();
            $('#div_widgetResult').empty();
            $('#div_widgetResult').append('<iframe src="index.php?v=d&plugin=widget&modal=widget.result&path=' + data.result.path + '" frameBorder="0" height="200"></iframe>');
            modifyWithoutSave = false;
        }
    });
}

function saveWidget() {
    $.hideAlert();
    var widget = $('.widget').getValues('.widgetAttr');
    widget = widget[0];
    if (editor != null) {
        widget.content = editor.getValue();
    }
    $.ajax({// fonction permettant de faire de l'ajax
        type: "POST", // methode de transmission des données au fichier php
        url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
        data: {
            action: "save",
            widget: json_encode(widget),
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) { // si l'appel a bien fonctionné
            if (data.state != 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            var vars = getUrlVars();
            var url = 'index.php?';
            for (var i in vars) {
                if (i != 'id' && i != 'saveSuccessFull' && i != 'removeSuccessFull' && i != undefined) {
                    url += i + '=' + vars[i].replace('#', '') + '&';
                }
            }
            url += 'id=' + data.result.path + '&saveSuccessFull=1';
            modifyWithoutSave = false;
            window.location.href = url;
        }
    });
}


function addWidget(_name) {
    $.ajax({// fonction permettant de faire de l'ajax
        type: "POST", // methode de transmission des données au fichier php
        url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
        data: {
            action: "add",
            name: _name,
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) { // si l'appel a bien fonctionné
            if (data.state != 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            var vars = getUrlVars();
            var url = 'index.php?';
            for (var i in vars) {
                if (i != 'id' && i != 'saveSuccessFull' && i != 'removeSuccessFull') {
                    url += i + '=' + vars[i].replace('#', '') + '&';
                }
            }
            url += 'id=' + data.result.path + '&saveSuccessFull=1';
            window.location.href = url;
        }
    });
}

function removeWidget(_path) {
    $.ajax({// fonction permettant de faire de l'ajax
        type: "POST", // methode de transmission des données au fichier php
        url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
        data: {
            action: "remove",
            path: _path,
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) { // si l'appel a bien fonctionné
            if (data.state != 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            var vars = getUrlVars();
            var url = 'index.php?';
            for (var i in vars) {
                if (i != 'id' && i != 'removeSuccessFull' && i != 'saveSuccessFull') {
                    url += i + '=' + vars[i].replace('#', '') + '&';
                }
            }
            url += 'removeSuccessFull=1';
            modifyWithoutSave = false;
            window.location.href = url;
        }
    });
}

function copyWidget(_path, _name) {
    $.ajax({// fonction permettant de faire de l'ajax
        type: "POST", // methode de transmission des données au fichier php
        url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
        data: {
            action: "copy",
            path: _path,
            name: _name,
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) { // si l'appel a bien fonctionné
            if (data.state != 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            var vars = getUrlVars();
            var url = 'index.php?';
            for (var i in vars) {
                if (i != 'id' && i != 'saveSuccessFull' && i != 'removeSuccessFull') {
                    url += i + '=' + vars[i].replace('#', '') + '&';
                }
            }
            url += 'id=' + data.result.path + '&saveSuccessFull=1';
            window.location.href = url;
        }
    });
}

$('#bsImagesView').on('click', '.bsDelDefaultImage', function () {
    var image = $(this).data('image');
    bootbox.confirm("{{Etes-vous sur de vouloir effacer cette image}}", function (result) {
        if (result) {
            removeImage({
                image: image,
                category: "",
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                },
                success: function (data) {
                    $('#bsImageMainWindow').val('0');
                    updateListImages($('#bsImageMainWindow').val());
                    notify("Suppression d'une Image", '{{Image supprimée avec succès}}', 'success');
                }
            });
        }
    });
});

$('#bsImagesFileload').fileupload({
    dataType: 'json',
    done: function (e, data) {
        if (data.result.state !== 'ok') {
            $('#div_alert').showAlert({message: data.result.result, level: 'danger'});
            return;
        }
        updateListImages();
        notify("{{Ajout d'une Image}}", '{{Image ajoutée avec succès}}', 'success');
    }
});

function updateListImages() {
    listImage({
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            var images = '';
            imagesWidgets = [];
            for (var i in data) {
                images += '<div class="media-left col-sm-2" style="min-width: 105px">';
                images += '<div class="well col-sm-12 noPaddingWell noPaddingLeft noPaddingRight noMarginBottom">';
                images += '<button type="button" class="pull-left btn btn-xs btn-danger bsDelDefaultImage" data-category="" data-image="' + data[i] + "\" title=\"{{Supprimer l'image}}\"><i class='fa fa-trash-o'></i></button>";
                images += '<div class="col-sm-6 noPaddingLeft noPaddingRight text-right pull-right" id="bsViewImageSize' + i + '"></div>';
                images += '</div>';
                images += '<img class="img-thumbnail center-block" src="plugins/widget/core/images/' + data[i] + '" alt="' + data[i] + '" id="bsViewImage' + i + '">';
                images += '<div class="well col-sm-12 noPaddingLeft noPaddingRight noPaddingWell text-center" id="bsViewImageWH' + i + '"></div>';
                images += '</div>';
                imagesWidgets.push(data[i]);
            }
            $('#bsImagesView').html('<div class="media">' + images + '</div>');
            for (var i in data) {
                addImage(data[i], i);
            }
        }
    });
}

function addImage(image, index) {
    var img = new Image();
    img.src = "plugins/widget/core/images/" + image + "";
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', img.src, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var size = Math.round(xhr.getResponseHeader('Content-Length') / 1024);
                $('#bsImagesView').find('#bsViewImageSize' + index).append('<strong class="text-right text-nowrap">' + size + 'Ko</strong>');
            }
        }
    };
    xhr.send(null);
    img.onload = function () {
        $('#bsImagesView').find('#bsViewImageWH' + index).append('<strong style="font-size:12px" class="text-nowrap">H: ' + this.width + ' - L:' + this.height + '</strong>');
    };
};

function listImage(_params) {
    var paramsRequired = [];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/widget/core/ajax/widget.ajax.php';
    paramsAJAX.data = {
        action: 'listImage'
    };
    $.ajax(paramsAJAX);
}

function removeImage(_params) {
    var paramsRequired = ['image'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/widget/core/ajax/widget.ajax.php';
    paramsAJAX.data = {
        action: 'removeImage',
        image: _params.image
    };
    $.ajax(paramsAJAX);
}

function setSelectImage(select) {
    var options = '<option value="0">{{Aucune}}</option>';
    for(var index in imagesWidgets) {
        options += '<option value="' + imagesWidgets[index] + '">' + imagesWidgets[index] + '</option>';        
    }
    select.html(options);
}

var editorOther = null;

$('#bt_OtherActionAdd').on('click', function () {
    //$('#md_modalWidget').dialog({title: "Widget Oher.Action", width:1050});
    //$('#md_modalWidget').load('index.php?v=d&plugin=widget&modal=other.widget' ).dialog('open');
    if (editorOther === null) {
        editorOther = CodeMirror.fromTextArea(document.getElementById("bsViewOther"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
    var image1,image2;
    if($('#bsOtherImage1').val() !== undefined && $('#bsOtherImage1').val() !== null && $('#bsOtherImage1').val() !== '0')
        image1 = $('#bsOtherImage1').val();
    else
        image1 = '0';
    if($('#bsOtherImage2').val() !== undefined && $('#bsOtherImage2').val() !== null && $('#bsOtherImage2').val() !== '0')
        image2 = $('#bsOtherImage2').val();
    else
        image2 = '0';
    $('#bsOtherImage1').empty();
    setSelectImage($('#bsOtherImage1'));
    $('#bsOtherImage1').val(image1);
    $('#bsOtherImage2').empty();
    setSelectImage($('#bsOtherImage2'));    
    $('#bsOtherImage2').val(image2);
    bsOtherActionType();
    $('#bsOtherImage1').val(image1);
    $('#bsCategory').hide();
    $('#bsInfoBinaryCategory').hide();
    $('#bsInfoNumericCategory').hide();
    $('#bsOtherActionCategory').show();
});

var editorBinary = null;

$('#bt_InfoBinaryAdd').on('click', function () {
    //$('#md_modalWidget').dialog({title: "Widget Info.Binary", width:1050});
    //$('#md_modalWidget').load('index.php?v=d&plugin=widget&modal=binary.widget' ).dialog('open');

    if (editorBinary === null) {
        editorBinary = CodeMirror.fromTextArea(document.getElementById("bsViewInfoBinary"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
    var image1,image2;
    if($('#bsInfoBinaryImage1').val() !== undefined && $('#bsInfoBinaryImage1').val() !== null && $('#bsInfoBinaryImage1').val() !== '0')
        image1 = $('#bsInfoBinaryImage1').val();
    else
        image1 = '0';
    if($('#bsInfoBinaryImage2').val() !== undefined && $('#bsInfoBinaryImage2').val() !== null && $('#bsInfoBinaryImage2').val() !== '0')
        image2 = $('#bsInfoBinaryImage2').val();
    else
        image2 = '0';
    $('#bsInfoBinaryImage1').empty();
    setSelectImage($('#bsInfoBinaryImage1'));
    $('#bsInfoBinaryImage1').val(image1);
    $('#bsInfoBinaryImage2').empty();
    setSelectImage($('#bsInfoBinaryImage2'));
    $('#bsInfoBinaryImage2').val(image2);
    bsInfoBinaryType();
    $('#bsCategory').hide();
    $('#bsInfoNumericCategory').hide();
    $('#bsOtherActionCategory').hide();
    $('#bsInfoBinaryCategory').show();
});

var editorNumeric = null;

$('#bt_InfoNumericAdd').on('click', function () {
    //$('#md_modalWidget').dialog({title: "Widget Info.Numeric", width:1050});
    //$('#md_modalWidget').load('index.php?v=d&plugin=widget&modal=numeric.widget' ).dialog('open');
    if (editorNumeric === null) {
        editorNumeric = CodeMirror.fromTextArea(document.getElementById("bsViewInfoNumeric"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    for (var index = 0; index < all; index++) {
        var image;
        if ($('#bsInfoNumericImage' + index).val() !== undefined && $('#bsInfoNumericImage' + index).val() !== null && $('#bsInfoNumericImage' + index).val() !== '0')
            image = $('#bsInfoNumericImage' + index).val();
        else
            image = '0';
        $('#bsInfoNumericImage' + index).empty();
        setSelectImage($('#bsInfoNumericImage' + index));
        $('#bsInfoNumericImage' + index).val(image);
    }
    $('#modalInfoNumericSave').prop('disabled',true);
    bsInfoNumericType();
    $('#bsCategory').hide();
    $('#bsInfoBinaryCategory').hide();
    $('#bsOtherActionCategory').hide();
    $('#bsInfoNumericCategory').show();
});