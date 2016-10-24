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


 /* global jeedom, CodeMirror, Infinity, jwerty, bootbox, Snap, editor */

 editor = null;
 var imagesWidgets = [];
 var specialWidgets = [];
 updateListImages();
 updateListSvgs();
 updateListFonts($('#bsFontsView'));
 getSideBarList();

 var modifyContainer = true;

 function getSideBarList(_path) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "sidebar"
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            $('#ul_widget').empty();
            $('#ul_widget').append(data.result);
            modifyWithoutSave = false;
            if (_path !== undefined && _path !== '') {
                if ($('#ul_widget .li_widget[data-path="' + _path + '"]').length !== 0)
                    $('#ul_widget .li_widget[data-path="' + _path + '"]').click();
            }
            else {
                $('.bt_displayWidgetList').click();
            }
        }
    });
}

$("#in_filter").on('keydown',function(){
    $('.li_widget').show();
    var search = $(this).value();
    $('.li_widget a').each(function(){
        if($(this).text().toLowerCase().indexOf(search) < 0){
            $(this).closest('.li_widget').hide();
        }
    });
});

function getContainer() {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "container"
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            $('.pluginContainer').remove();
            $('.widgetListDisplay legend').after($('<div class="pluginContainer">').html(data.result));
            $('.pluginContainer').packery();
            $('.filterAcionWidget').change();
            $("img.lazy").lazyload({
                container: $(".pluginContainer"),
                event : "sporty",
                skip_invisible : false
            });
            $("img.lazy").trigger("sporty");
            $("img.lazy").each(function () {
                var el = $(this);
                if (el.attr('data-original2') !== undefined) {
                    $("<img>", {
                        src: el.attr('data-original'),
                        error: function () {
                            $("<img>", {
                                src: el.attr('data-original2'),
                                error: function () {
                                    if (el.attr('data-original3') !== undefined) {
                                        $("<img>", {
                                            src: el.attr('data-original3'),
                                            error: function () {
                                                el.lazyload({
                                                    event: "sporty"
                                                });
                                                el.trigger("sporty");
                                            },
                                            
                                        });
                                    } else {
                                        el.lazyload({
                                            event: "sporty"
                                        });
                                        el.trigger("sporty");
                                    }
                                },
                               
                            });
},

});
} else {
    el.lazyload({
        event: "sporty"
    });
    el.trigger("sporty");
}
});
}
});
}

$('.bt_displayWidgetList').on('click', function () {
    $('.widget').hide('fade');
    $('.widgetImageView').hide('fade');
    $('.widgetFontsView').hide('fade');
    $('#bsListWidgets').show('fade');
    $('.widgetListDisplay').show('fade');
    $('.li_widget').removeClass('active');
    if(modifyContainer === true) {
        getContainer();
        modifyContainer = false;
    }
});

$('.widgetAttr[data-l1key=type]').on('change',function(){
    $('.widgetAttr[data-l1key=subtype] option').hide();
    $('.widgetAttr[data-l1key=subtype] option[data-type='+$(this).value()+']').show();
});

$("#ul_widget").on('click', ".li_widget", function (event) {
    $('.widgetFontsView').hide('fade');
    $('.widgetImageView').hide('fade');
    $('.widgetListDisplay').hide('fade');
    $('#bsListWidgets').show('fade');
    $('.widget').show('fade');
    $('.li_widget').removeClass('active');
    $(this).addClass('active');
    printWidget($(this).attr('data-path'), printWidgetCallback);
    return false;
});

if (getUrlVars('saveSuccessFull') === 1) {
    $('#div_alert').showAlert({message: '{{Sauvegarde effectué avec succès}}', level: 'success'});
}

if (getUrlVars('removeSuccessFull') === 1) {
    $('#div_alert').showAlert({message: '{{Suppression effectué avec succès}}', level: 'success'});
}

jwerty.key('ctrl+s', function (e) {
    e.preventDefault();
    saveWidget();
});

$('.widgetAction[data-action=save]').on('click', function () {
    saveWidget(widgetCallback);
});

$('.widgetAction[data-action=remove]').on('click', function () {
    bootbox.confirm('{{Etes-vous sûr de vouloir supprimer le widget}} <span style="font-weight: bold ;">' + $('.widgetAttr[data-l1key=name]').value() + '</span> ?', function (result) {
        if (result) {
            removeWidget($('.widgetAttr[data-l1key=path]').value(), widgetCallback);
            getContainer();
        }
    });
});

$('.widgetAction[data-action=copy]').on('click', function () {
 bootbox.dialog({
    title: "{{Choisissez vos paramètres}}",
    message: '<div class="row">' +
    '<div class="col-md-12"> ' +
    '<form class="form-horizontal">' +
    '<div class="form-group">' +
    '<label class="col-sm-4 control-label">{{Nom du widget}}</label>' +
    '<div class="col-sm-6">' +
    '<input type="text" class="form-control" id="widgetNameCopy" placeholder="{{Nom du widget}}"/>' +
    '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="col-sm-4 control-label">{{Version}}</label>' +
    '<div class="col-sm-6">' +
    '<select class=" form-control" id="widgetVersionCopy" value="' + $('.widgetAttr[data-l1key="version"]').val() + '">' +
    '<option value="dashboard">{{Dashboard}}</option>' +
    '<option value="mobile">{{Mobile}}</option>' +
    '</select>' +
    '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="col-sm-4 control-label">{{Type}}</label>' +
    '<div class="col-sm-6">' +
    '<select class="form-control" id="widgetTypeCopy" value="' + $('.widgetAttr[data-l1key="type"]').val() + '">' +
    $('.widgetAttr[data-l1key="type"]').html() +
    '</select>' +
    '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="col-sm-4 control-label">{{Sous-type}}</label>' +
    '<div class="col-sm-6">' +
    '<select class="form-control" id="widgetSubtypeCopy" value="' + $('.widgetAttr[data-l1key="subtype"]').val() + '">' +
    $('.widgetAttr[data-l1key="subtype"]').html() +
    '</select>' +
    '</div>' +
    '</div>' +
    '</form>' +
    '</div>' +
    '</div>',
    buttons: {
        cancel: {
            label: "{{Annuler}}",
            className: "btn-default"
        },
        success: {
            label: "{{Ajouter}}",
            className: "btn-success",
            callback: function () {
                var result = {};
                result.name = $('#widgetNameCopy').value();
                result.version = $('#widgetVersionCopy').value();
                result.type = $('#widgetTypeCopy').value();
                result.subtype = $('#widgetSubtypeCopy').value();
                copyWidget($('.widgetAttr[data-l1key=path]').value(), result, widgetCallback);
            }
        }
    }
});
});

$('.widgetAction[data-action=create]').on('click', function () {
    $('.widgetListDisplay').hide('fade');
    $('#bsListWidgets').hide('fade');
    $('.widget').hide('fade');
    $('.widgetFontsView').hide('fade');
    $('.widgetImageView').show('fade');
});

$('.widgetAction[data-action=fonts]').on('click', function () {
    $('.widgetListDisplay').hide('fade');
    $('#bsListWidgets').hide('fade');
    $('.widget').hide('fade');
    $('.widgetImageView').hide('fade');
    $('.widgetFontsView').show('fade');
});

$('.widgetAction[data-action=add]').on('click', function () {
    $.hideAlert();
    if ($('#bt_expertMode').attr('state') !== '1') {
        bootbox.prompt("Nom du widget ?", function (result) {
            if (result !== null) {
                result.name = result;
                addWidget(result, widgetCallback);
            }
        });
    }
    else {
        bootbox.dialog({
            title: "{{Choisissez vos paramètres}}",
            message: '<div class="row">' +
            '<div class="col-md-12"> ' +
            '<form class="form-horizontal">' +
            '<div class="form-group">' +
            '<label class="col-sm-4 control-label">{{Nom du widget}}</label>' +
            '<div class="col-sm-6">' +
            '<input type="text" class="form-control" id="widgetNameAdd" placeholder="{{Nom du widget}}"/>' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            '<label class="col-sm-4 control-label">{{Version}}</label>' +
            '<div class="col-sm-6">' +
            '<select class=" form-control" id="widgetVersionAdd">' +
            '<option value="dashboard">{{Dashboard}}</option>' +
            '<option value="mobile">{{Mobile}}</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            '<label class="col-sm-4 control-label">{{Type}}</label>' +
            '<div class="col-sm-6">' +
            '<select class="form-control" id="widgetTypeAdd">' +
            $('.widgetAttr[data-l1key="type"]').html() +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            '<label class="col-sm-4 control-label">{{Sous-type}}</label>' +
            '<div class="col-sm-6">' +
            '<select class="form-control" id="widgetSubtypeAdd">' +
            $('.widgetAttr[data-l1key="subtype"]').html() +
            '</select>' +
            '</div>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>',
            buttons: {
                cancel: {
                    label: "{{Annuler}}",
                    className: "btn-default"
                },
                success: {
                    label: "{{Ajouter}}",
                    className: "btn-success",
                    callback: function () {
                        var result = {};
                        result.name = $('#widgetNameAdd').value();
                        result.version = $('#widgetVersionAdd').value();
                        result.type = $('#widgetTypeAdd').value();
                        result.subtype = $('#widgetSubtypeAdd').value();
                        if (result.name !== null && result.name !== '') {
                            addWidget(result, widgetCallback);
                        }
                    }
                }
            }
        });
}
});

$('#bt_editWidget').on('click', function () {
    var textWidget = null;
    if (editor !== null)
        textWidget = editor.getValue().match(/\[CDATA\[(.*)\]]/);
    else
        textWidget = $('#ta_script').val().match(/\[CDATA\[(.*)\]]/);
    if(!is_array(textWidget))
        return; //erreur impossible normalement
    var widgetDetails = JSON.parse(textWidget[1]);
    var widget = $('.widget').getValues('.widgetAttr');
    widget = widget[0];
    widgetDetails.name = widget.name;
    //console.log(widgetDetails);
    $('.widgetListDisplay').hide();
    $('#bsListWidgets').hide();
    $('.widget').hide();
    $('.widgetImageView').show();
    switch (widget.type + '.' + widget.subtype) {
        case "action.other":
        if (editorOther === null) {
            editorOther = CodeMirror.fromTextArea(document.getElementById("bsViewOther"), {
                lineNumbers: true,
                mode: "text/html",
                matchBrackets: true,
                viewportMargin: Infinity
            });
        }
        $('#bsInfoBinaryCategory').hide();
        $('#bsInfoNumericCategory').hide();
        $('#bsPanelWidgetImages').hide();
        $('#bsOtherActionCategory').show();
        $('#bsOtherSvgSpecColor').val('#000');
        $('#bsOtherSvgSpecSize').val('64');
        setSelectImage($('#bsOtherImage1'));
        setSelectImage($('#bsOtherImage2'));
        setSelectPack($('#bsOtherSpecialCat1'));
        setSelectPack($('#bsOtherSpecialCat2'));
        $('#bsOtherActionCategory').setValues(widgetDetails, '.actionOtherAttr');
        bsOtherActionType();
        break;
        case "info.binary":
        if (editorBinary === null) {
            editorBinary = CodeMirror.fromTextArea(document.getElementById("bsViewInfoBinary"), {
                lineNumbers: true,
                mode: "text/html",
                matchBrackets: true,
                viewportMargin: Infinity
            });
        }
        $('#bsInfoNumericCategory').hide();
        $('#bsOtherActionCategory').hide();
        $('#bsInfoBinaryCategory').show();
        $('#bsInfoBinarySvgSpecColor').val('#000');
        $('#bsInfoBinarySvgSpecSize').val('64');
        setSelectImage($('#bsInfoBinaryImage1'));
        setSelectImage($('#bsInfoBinaryImage2'));
        setSelectPack($('#bsInfoBinarySpecialCat1'));
        setSelectPack($('#bsInfoBinarySpecialCat2'));
        $('#bsInfoBinaryCategory').setValues(widgetDetails, '.infoBinaryAttr');
        bsInfoBinaryType();
        $('#bsPanelWidgetImages').hide();
        break;
        case "info.numeric":
        if (editorNumeric === null) {
            editorNumeric = CodeMirror.fromTextArea(document.getElementById("bsViewOther"), {
                lineNumbers: true,
                mode: "text/html",
                matchBrackets: true,
                viewportMargin: Infinity
            });
        }
        $('#bsInfoBinaryCategory').hide();
        $('#bsOtherActionCategory').hide();
        $('#bsInfoNumericCategory').show();
        $('#bsInfoNumericSvgSpecColor').val('#000');
        $('#bsInfoNumericSvgSpecSize').val('64');
        var all = widgetDetails.min.length;
        setSelectImage($('#bsInfoNumericImage0'));
        setSelectPack($('#bsInfoNumericSpecialCat0'));
        for (var index = 0; index < all; index++) {
            if(index > 0)
                $('#bsInfoNumericAddEntry').click();
            $('#bsInfoNumericEcartMin' + index).val(widgetDetails.min[index]);
            $('#bsInfoNumericEcartMax' + index).val(widgetDetails.max[index]);
            switch (widgetDetails.type) {
                case "0":
                $('#bsInfoNumericIconCmd' + index).html(widgetDetails.icons[index]);
                break;
                case "1":
                $('#bsInfoNumericImage' + index).val(widgetDetails.images[index]);
                break;
                case "2":
                $('#bsInfoNumericSpecialCat' + index).val(widgetDetails.specials[index].list);
                $('#bsInfoNumericSpecialIcon' + index).val(widgetDetails.specials[index].icon);
                break;
            }
        }
        $('#bsInfoNumericCategory').setValues(widgetDetails, '.infoNumericAttr');
        bsInfoNumericType();
        $('#bsPanelWidgetImages').hide();
        break;
    }
});

$('#bt_shareOnMarket').on('click', function () {
    $('#md_modal').dialog({title: "Partager sur le market"});
    $('#md_modal').load('index.php?v=d&modal=update.send&repo=market&type=widget&logicalId=' + encodeURI($('.widgetAttr[data-l1key=logicalId]').value()) + '&name=' + encodeURI($('.widgetAttr[data-l1key=logicalId]').value())).dialog('open');
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
    $('#md_modal').load('index.php?v=d&modal=update.list&type=widget&repo=market').dialog('open');
});

if (getUrlVars('id') !== '') {
    if ($('#ul_widget .li_widget[data-path="' + getUrlVars('id') + '"]').length !== 0) {
        $('#ul_widget .li_widget[data-path="' + getUrlVars('id') + '"]').click();
    }
}
$('body').on('click', '.widgetDisplayCard', function () {
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

function getWidgetExemple(_path) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "exemple",
            path: _path
        },
        dataType: 'json',
        global : false,
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            $('#div_widgetResult').empty();
            $('#div_widgetResult').append(data.result);
        }
    });
}

function printWidgetCallback(data) {
    $('#bt_editWidget').hide();
    if (editor === null) {
        setTimeout(function () {
            if (editor !== null) {
                var textWidget = editor.getValue().match(/\[CDATA\[(.*)\]]/);
                if (is_array(textWidget)) {
                    $('#bt_editWidget').show();
                }
            }
        }, 1);
    } else {
        if (isset(data.result.content)) {
            var textWidget = data.result.content.match(/\[CDATA\[(.*)\]]/);
            if (is_array(textWidget)) {
                $('#bt_editWidget').show();
            }
        }
    }
}
function printWidget(_path, _callback) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "get",
            path: _path
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            $('.widget').setValues(data.result, '.widgetAttr');
            if (editor === null) {
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
            getWidgetExemple(data.result.path);
            modifyWithoutSave = false;
            if(_callback !== undefined)
                _callback(data);
        }
    });
}

function widgetCallback(_path) {
    getSideBarList(_path);
}

function saveWidget(_callback) {
    $.hideAlert();
    var widget = $('.widget').getValues('.widgetAttr');
    widget = widget[0];
    if (editor !== null) {
        widget.content = editor.getValue();
    }
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "save",
            widget: json_encode(widget)
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            modifyContainer = true;
            if(_callback !== undefined)
                _callback(data.result.path);
        }
    });
}

function addWidget(_data, _callback) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "add",
            data: _data
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            console.log(data);
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            modifyContainer = true;
            if(_callback !== undefined)
                _callback(data.result.path);
        }
    });
}

function removeWidget(_path, _callback) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "remove",
            path: _path
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            modifyContainer = true;
            if(_callback !== undefined)
                _callback();
        }
    });
}

function copyWidget(_path, _data, _callback) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "copy",
            path: _path,
            data: _data
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            console.log(data);
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            modifyContainer = true;
            if(_callback !== undefined)
                _callback(data.result.path);
        }
    });
}

$('#bsSpecialFileload').fileupload({
    dataType: 'json',
    dropZone: "#bsSpecialPanel",
    done: function (e, data) {
        if (data.result.state !== 'ok') {
            $('#div_alert').showAlert({message: data.result.result, level: 'danger'});
            return;
        }
        updateListSvgs();
        notify("{{Ajout Spécial}}", '{{Pack ajouté avec succès}}', 'success');
    }
});

$('#bsSpecialView').on('click', '.bsDelSvg', function () {
    var svg = $(this).data('svg');
    bootbox.confirm("{{Etes-vous sur de vouloir effacer ce Svg}}", function (result) {
        if (result) {
            $.ajax({
                type: "POST",
                url: "plugins/widget/core/ajax/widget.ajax.php",
                data: {
                    action: "removeSvg",
                    special: svg
                },
                dataType: 'json',
                error: function (request, status, error) {
                    handleAjaxError(request, status, error);
                },
                success: function (data) {
                    if (data.state !== 'ok') {
                        $('#div_alert').showAlert({message: data.result, level: 'danger'});
                        return;
                    }
                    updateListSvgs();
                    notify("Suppression Spécial", '{{Pack supprimé avec succès}}', 'success');
                }
            });
        }
    });
});

function updateListSvgs() {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "listSvg"
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            data = data.result;
            specialWidgets = data;
            for (var index in specialWidgets) {
                var filename = specialWidgets[index].name.split('.');
                specialWidgets[index].name = filename[0] + ' - ' + specialWidgets[index].extension.toUpperCase();
                if (specialWidgets[index].extension === "svg")
                    for (var nbIcons in specialWidgets[index].files) {
                        specialWidgets[index].svg[nbIcons].snap = specialWidgets[index].svg[nbIcons].snap.replace(/<?[^>]*>/, "").replace(/<!DOCTYPE[^>]*>/, "").replace(/<!--[^>]*>/, "");
                    }
                }
                setTimeout('createSpecialHtml()', 1000);
            }
        });
}

function createSpecialHtml() {
    var special = '<div class="media">';
    var special = '';
    for (var i in specialWidgets) {
        special += '<div class="media-left col-sm-6" style="min-width: 100px">';
        special += '<div class="well col-sm-12 noPaddingWell noPaddingLeft noPaddingRight noMarginBottom">';
        special += '<button type="button" class="pull-left btn btn-xs btn-danger bsDelSvg" data-svg="' + specialWidgets[i].name + "\" title=\"{{Supprimer le Svg}}\"><i class='fa fa-trash-o'></i></button>";
        special += '<strong class="col-sm-6 noPaddingLeft noPaddingRight text-right pull-right" id="bsVieSvgSize' + i + '">' + specialWidgets[i].name + '</strong>';
        special += '</div>';
        special += '<div class="col-sm-12 center-block" id="bsViewSvg' + i + '">';
        var row = 0;
        for (var nbIcons in specialWidgets[i].files) {
            row++;
            if (row === 1)
                special += '<div class="row" style="padding-top: 5px;">';
            if (specialWidgets[i].extension === 'svg') {
                var filename = specialWidgets[i].files[nbIcons].split('.');
                special += '<div class="col-sm-2 center-block" title="' + specialWidgets[i].files[nbIcons] + '" id="bsSvgLoadSpecial' + filename[0].replace(/[-:?().]/g,'') + nbIcons + '"></div>';
            }
            else
                special += '<div class="col-sm-2 center-block"><img style="min-width: 32px; min-height: 32px;" class="img-thumbnail center-block" src="plugins/widget/core/special/' + specialWidgets[i].folder + specialWidgets[i].files[nbIcons] + '" title="' + specialWidgets[i].files[nbIcons] + '" alt="' + specialWidgets[i].files[nbIcons] + '"></div>';
            if (row === 6) {
                special += '</div>';
                row = 0;
            }
        }
        if (row !== 6) {
            special += '</div>';
        }
        special += '</div>';
        special += '</div>';
    }
    special += '</div>';
    $('#bsSpecialView').empty();
    $('#bsSpecialView').html(special);
    for (var index in specialWidgets) {
        if (specialWidgets[index].extension === "svg")
            for (var nbIcons in specialWidgets[index].files) {
                var filename = specialWidgets[index].files[nbIcons].split('.');
                var mySvg = Snap('#bsSvgLoadSpecial' + filename[0].replace(/[-:?().]/g,'') + nbIcons);
                var snap = Snap.parse(specialWidgets[index].svg[nbIcons].snap);
                mySvg.append(snap);
                var width = mySvg.select('svg').attr("width");
                var height = (mySvg.select('svg').attr("height") * 32) / width;
                mySvg.select('svg').attr({width: "32"});
                mySvg.selectAll('path').attr({fill: getRandomColor()});
                mySvg.select('svg').attr({height: height});
            }
        }
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $('#bsImagesFileload').fileupload({
        dataType: 'json',
        url: "plugins/widget/core/ajax/widget.ajax.php?action=imageUpload",
        dropZone: "#bsImagesPanel",
        done: function (e, data) {
            if (data.result.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result.result, level: 'danger'});
                return;
            }
            updateListImages();
            $('#collapseTwo').collapse('show');
            notify("{{Ajout d'une Image}}", '{{Image ajoutée avec succès}}', 'success');
        }
    });

    $('#bsImagesView').on('click', '.bsDelImage', function () {
        var image = $(this).data('image');
        bootbox.confirm("{{Etes-vous sur de vouloir effacer cette image}}", function (result) {
            if (result) {
                $.ajax({
                    type: "POST",
                    url: "plugins/widget/core/ajax/widget.ajax.php",
                    data: {
                        action: "removeImage",
                        image: image
                    },
                    dataType: 'json',
                    error: function (request, status, error) {
                        handleAjaxError(request, status, error);
                    },
                    success: function (data) {
                        if (data.state !== 'ok') {
                            $('#div_alert').showAlert({message: data.result, level: 'danger'});
                            return;
                        }
                        updateListImages();
                        notify("Suppression d'une Image", '{{Image supprimée avec succès}}', 'success');
                    }
                });
            }
        });
});

function updateListImages() {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "listImage"
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            var images = '';
            imagesWidgets = [];
            data = data.result;
            for (var i in data) {
                images += '<div class="media-left col-sm-2" style="min-width: 105px">';
                images += '<div class="well col-sm-12 noPaddingWell noPaddingLeft noPaddingRight noMarginBottom">';
                images += '<button type="button" class="pull-left btn btn-xs btn-danger bsDelImage" data-image="' + data[i] + "\" title=\"{{Supprimer l'image}}\"><i class='fa fa-trash-o'></i></button>";
                images += '<div class="col-sm-6 noPaddingLeft noPaddingRight text-right pull-right" id="bsViewImageSize' + i + '"></div>';
                images += '</div>';
                images += '<img class="img-thumbnail center-block" src="plugins/widget/core/images/' + data[i] + '" alt="' + data[i] + '" title="' + data[i] + '" id="bsViewImage' + i + '">';
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
  /* img.on('load', function() {
        $('#bsImagesView').find('#bsViewImageWH' + index).append('<strong style="font-size:12px" class="text-nowrap">H: ' + this.width + ' - L:' + this.height + '</strong>');
    });*/
};

function setSelectImage(select) {
    var options = '<option value="0">{{Aucune}}</option>';
    for(var index in imagesWidgets) {
        options += '<option value="' + imagesWidgets[index] + '">' + imagesWidgets[index] + '</option>';        
    }
    select.html(options);
}

function setSelectPack(select) {
    var options = '<option value="">{{Aucune}}</option>';
    for (var index in specialWidgets) {
        options += '<option value="' + specialWidgets[index].name + '">' + specialWidgets[index].name + '</option>';
    }
    select.html(options);
}

function setSelectPackIcones(select, value) {
    var options = '<option value="">{{Aucune}}</option>';
    var list = value.find(':selected').index() - 1;
    for(var index in specialWidgets[list].files) {
        var filename = specialWidgets[list].files[index].split('.');
        options += '<option value="' + specialWidgets[list].files + '">' + filename[0] + '</option>';
    }
    select.html(options);
}

var editorOther = null;

$('#bt_OtherActionAdd').on('click', function () {
    if (editorOther === null) {
        editorOther = CodeMirror.fromTextArea(document.getElementById("bsViewOther"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
    $('#bsInfoBinaryCategory').hide();
    $('#bsInfoNumericCategory').hide();
    $('#bsOtherActionCategory').show('fade');
    var image1,image2,imageSpec1,imageSpec2;
    if($('#bsOtherImage1').val() !== undefined && $('#bsOtherImage1').val() !== null && $('#bsOtherImage1').val() !== '0')
        image1 = $('#bsOtherImage1').val();
    else
        image1 = '0';
    if($('#bsOtherImage2').val() !== undefined && $('#bsOtherImage2').val() !== null && $('#bsOtherImage2').val() !== '0')
        image2 = $('#bsOtherImage2').val();
    else
        image2 = '0';
    if($('#bsOtherSpecialCat1').val() !== undefined && $('#bsOtherSpecialCat1').val() !== null && $('#bsOtherSpecialCat1').val() !== '0')
        imageSpec1 = $('#bsOtherSpecialCat1').val();
    else
        imageSpec1 = '';
    if($('#bsOtherSpecialCat2').val() !== undefined && $('#bsOtherSpecialCat2').val() !== null && $('#bsOtherSpecialCat2').val() !== '0')
        imageSpec2 = $('#bsOtherSpecialCat2').val();
    else
        imageSpec2 = '';
    $('#bsOtherSvgSpecColor').val('#000');
    $('#bsOtherSvgSpecSize').val('64');
    setSelectImage($('#bsOtherImage1'));
    $('#bsOtherImage1').val(image1);
    setSelectImage($('#bsOtherImage2'));    
    $('#bsOtherImage2').val(image2);
    setSelectPack($('#bsOtherSpecialCat1'));    
    $('#bsOtherSpecialCat1').val(imageSpec1);
    setSelectPack($('#bsOtherSpecialCat2'));    
    $('#bsOtherSpecialCat2').val(imageSpec2);
    bsOtherActionType();
    $('#bsPanelWidgetImages').hide('fade');
});

var editorBinary = null;

$('#bt_InfoBinaryAdd').on('click', function () {
    if (editorBinary === null) {
        editorBinary = CodeMirror.fromTextArea(document.getElementById("bsViewInfoBinary"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
    $('#bsInfoNumericCategory').hide();
    $('#bsOtherActionCategory').hide();
    $('#bsInfoBinaryCategory').show('fade');
    var image1,image2,imageSpec1,imageSpec2;
    if($('#bsInfoBinaryImage1').val() !== undefined && $('#bsInfoBinaryImage1').val() !== null && $('#bsInfoBinaryImage1').val() !== '0')
        image1 = $('#bsInfoBinaryImage1').val();
    else
        image1 = '0';
    if($('#bsInfoBinaryImage2').val() !== undefined && $('#bsInfoBinaryImage2').val() !== null && $('#bsInfoBinaryImage2').val() !== '0')
        image2 = $('#bsInfoBinaryImage2').val();
    else
        image2 = '0';
    if($('#bsInfoBinarySpecialCat1').val() !== undefined && $('#bsInfoBinarySpecialCat1').val() !== null && $('#bsInfoBinarySpecialCat1').val() !== '0')
        imageSpec1 = $('#bsInfoBinarySpecialCat1').val();
    else
        imageSpec1 = '';
    if($('#bsInfoBinarySpecialCat2').val() !== undefined && $('#bsInfoBinarySpecialCat2').val() !== null && $('#bsInfoBinarySpecialCat2').val() !== '0')
        imageSpec2 = $('#bsInfoBinarySpecialCat2').val();
    else
        imageSpec2 = '';
    $('#bsInfoBinarySvgSpecColor').val('#000');
    $('#bsInfoBinarySvgSpecSize').val('64');
    setSelectImage($('#bsInfoBinaryImage1'));
    $('#bsInfoBinaryImage1').val(image1);
    setSelectImage($('#bsInfoBinaryImage2'));
    $('#bsInfoBinaryImage2').val(image2);
    setSelectPack($('#bsInfoBinarySpecialCat1'));    
    $('#bsInfoBinarySpecialCat1').val(imageSpec1);
    setSelectPack($('#bsInfoBinarySpecialCat2'));    
    $('#bsInfoBinarySpecialCat2').val(imageSpec2);
    bsInfoBinaryType();
    $('#bsPanelWidgetImages').hide('fade');
});

var editorNumeric = null;

$('#bt_InfoNumericAdd').on('click', function () {
    if (editorNumeric === null) {
        editorNumeric = CodeMirror.fromTextArea(document.getElementById("bsViewInfoNumeric"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
    $('#bsInfoBinaryCategory').hide();
    $('#bsOtherActionCategory').hide();
    $('#bsInfoNumericCategory').show('fade');
    $('#bsInfoNumericSvgSpecColor').val('#000');
    $('#bsInfoNumericSvgSpecSize').val('64');
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    for (var index = 0; index < all; index++) {
        var image, imageSpec;
        if ($('#bsInfoNumericImage' + index).val() !== undefined && $('#bsInfoNumericImage' + index).val() !== null && $('#bsInfoNumericImage' + index).val() !== '0')
            image = $('#bsInfoNumericImage' + index).val();
        else
            image = '0';
        if ($('#bsInfoNumericSpecialCat' + index).val() !== undefined && $('#bsInfoNumericSpecialCat' + index).val() !== null && $('#bsInfoNumericSpecialCat' + index).val() !== '0')
            imageSpec = $('#bsInfoNumericSpecialCat' + index).val();
        else
            imageSpec = '';
        setSelectImage($('#bsInfoNumericImage' + index));
        $('#bsInfoNumericImage' + index).val(image);
        setSelectPack($('#bsInfoNumericSpecialCat' + index));
        $('#bsInfoNumericSpecialCat' + index).val(imageSpec);
    }
    $('#modalInfoNumericSave').prop('disabled',true);
    bsInfoNumericType();
    $('#bsPanelWidgetImages').hide('fade');
});


/******************* filtragre *****************/

$('.filterAcionWidget').on('change', function() {
    filterWidget($('#ul_widget').children());
    filterWidget($('.pluginContainer').children());
    $('.pluginContainer').packery();
});

function filterWidget(view) {
    var stateDesk = $('#filterDesktop').prop('checked');
    var stateMob = $('#filterMobile').prop('checked');
    var stateAction = $('#filterAction').prop('checked');
    var stateInfo = $('#filterInfo').prop('checked');
    var stateOther = $('#filterOther').prop('checked');
    var stateSlider = $('#filterSlider').prop('checked');
    var stateBinary = $('#filterBinary').prop('checked');
    var stateNumeric = $('#filterNumeric').prop('checked');
    var stateString = $('#filterString').prop('checked');
    var stateNbUsed = $('#filterNbUsed').prop('checked');
    if( stateOther || stateSlider)
        stateAction = true;
    if( stateBinary || stateNumeric || stateString)
        stateInfo = true;
    if(stateNbUsed === false &&stateDesk === false && stateMob === false && stateAction === false && stateInfo === false && stateOther === false && stateSlider === false && stateBinary === false && stateNumeric === false && stateString === false) {
        view.show();
        return;
    }
    
    var kids = view.filter(function () {
        var isFind = true;
        var desktop = $(this).find('.fa-desktop').length === 0 ? false : true;
        var nbUsed = $(this).find('.badge').text();
        console.log(nbUsed);
        if(stateNbUsed === true && nbUsed === '0')
            isFind = false;
        if (stateDesk === false && stateMob === false && stateNbUsed === true)
            return isFind;
        if (stateDesk === false && stateMob === false && stateNbUsed === false)
            isFind = false;
        if((desktop === true && stateDesk === false) || (desktop === false && stateMob === false))
            isFind = false;
        if((stateDesk === false && stateMob === false) && (stateAction === true || stateOther === true || stateSlider === true || stateInfo === true  || stateBinary === true || stateNumeric === true || stateString === true))
            isFind = true;
        return isFind;
    });
    
    var kidsAtion = kids.filter(function () {
        var isFind = true;
        var type = $(this).find('.fa-exclamation-circle').length === 0 ? "info" : "action";
        var subtype = $(this).find('.label').text();
        var nbUsed = $(this).find('.badge').text();
        if(stateNbUsed === true && nbUsed === '0')
            isFind = false;
        if(type === 'info')
            return false;
        if((stateAction === false && stateOther === false && stateSlider === false && stateNbUsed === false) && (stateInfo === true  || stateBinary === true || stateNumeric === true || stateString === true))
            return false;
        if((stateDesk === true || stateMob === true || stateNbUsed === true) && (stateAction === false && stateOther === false && stateSlider === false))
            return isFind;
        if(stateDesk === false && stateMob === false && stateAction === true && stateOther === false && stateSlider === false)
            return (type === 'action' && stateAction === true);
        if(type === 'action' && stateAction === false)
            isFind = false;
        if(stateAction === true && stateOther === false && stateSlider === false)
            return isFind;
        if((subtype === 'other' && stateOther === false) || (subtype === 'slider' && stateSlider === false))
            isFind = false;
        return isFind;
    });

var kidsInfo = kids.filter(function () {
    var isFind = true;
    var type = $(this).find('.fa-exclamation-circle').length === 0 ? "info" : "action";
    var subtype = $(this).find('.label').text();
    if(type === 'action')
        return false;
    if((stateAction === true || stateOther === true || stateSlider === true && stateNbUsed === false) && (stateInfo === false  && stateBinary === false && stateNumeric === false && stateString === false))
        return false;
    if((stateDesk === true || stateMob === true || stateNbUsed === true) && (stateInfo === false && stateBinary === false && stateNumeric === false && stateString === false))
        return isFind;
    if(stateDesk === false && stateMob === false && stateInfo === true && stateBinary === false && stateNumeric === false && stateString === false)
        return (type === 'info' && stateInfo === true);
    if(type === 'info' && stateInfo === false)
        isFind = false;
    if(stateInfo === true  && stateBinary === false && stateNumeric === false && stateString === false)
        return isFind;
    if((subtype === 'binary' && stateBinary === false) || (subtype === 'numeric' && stateNumeric === false) || (subtype === 'string' && stateString === false))
        isFind = false;
    return isFind;
});

view.hide();
kidsAtion.each(function () {
    $(this).show();
});
kidsInfo.each(function () {
    $(this).show();
});
}
