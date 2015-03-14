/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//initInfoNumeric();

$('#bsInfoNumeric').bootstrapSlider({
    formatter: function (value) {
        return 'Valeur: ' + value;
    }
});

$('#bsInfoNumeric').on('slideStop', function () {
    bsInfoNumericType();
});

$('#modalInfoNumericCancel').on('click', function () {
    $('#bsInfoNumericPreview0').attr('src', "");
    $('#bsInfoNumericLabel0').empty();
    $('#bsInfoNumericName').val('');
    $('#bsInfoNumericImage0').val('0');
    $('#bsInfoNumericDash').val('1');
    $('#bsInfoNumericType').val('0');
    $('#bsInfoNumericEcartMax0').val('100');
    $('#bsInfoNumericIconSize0').val('2.5');
    $('#bsInfoNumericIconCmd0').html('');
    $('#bsInfoNumericPreviewSpec0').attr('src', "");
    $('#bsInfoNumericLabelSpec0').empty();
    $('#bodyInfoNumeric').children(':gt(0)').remove();
    if (editorNumeric !== null) {
        editorNumeric.toTextArea();
        editorNumeric = null;
        $('#bsViewInfoNumeric').empty();
    }
    //$('#md_modalWidget').dialog('close');
    $('#bsInfoNumericCategory').hide();
    $('#bsCategory').show();
});

$('#bodyInfoNumeric').on('change', "select[name*='bsInfoNumericSpecialCat']", function () {
    var index = parseInt($(this).data('index'));
    if($(this).val() !== '')
        setSelectPackIcones($('#bsInfoNumericSpecialIcon' + index),$(this).val());
    else {
        $('#bsInfoNumericSpecialIcon' + index).children(':gt(0)').remove();
        $('#bsInfoNumericPreviewSpec' + index).attr('src', "");
        $('#bsInfoNumericLabelSpec' + index).empty();
        $('#modalInfoNumericSave').prop('disabled',true);
        $('#bsInfoNumericWidgetOff').empty();
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        editorNumeric.setValue(" ");
    }
});

$('#bsInfoNumericType').on('change', function () {
    bsInfoNumericType();
});

function bsInfoNumericType() {
    switch ($('#bsInfoNumericType').val()) {
        case "0":
            $('.widgetsView').hide();
            $('.specialView').hide();
            $('.JeedomView').show();
            checkNumericJeedomIcon();
            break;
        case "1":
            $('.JeedomView').hide();
            $('.specialView').hide();
            $('.widgetsView').show();
            checkNumericWidgetImage();
            break;
         case "2":
           $('.JeedomView').hide();
            $('.widgetsView').hide();
            $('.specialView').show();
            checkNumericSpecial();
            break;
    }
}

function checkNumericJeedomIcon() {
    var check = true;
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    for (var index = 0; index < all; index++) {
        if ($('#bsInfoNumericIconCmd' + index).html() === '')
            check = false;
    }
    if (check) {
        var dashboard = $('#bsInfoNumericDash').val() === "1" ? true : false;
        var text = getHtmlWidgetInfoNumeric(dashboard);
        editorNumeric.setValue(text);
        if($('#bsInfoNumericName').val() !== '')
            $('#modalInfoNumericSave').prop('disabled', false);
        text = text.replace(/#id#/g, "5").replace("#displayName#", "1").replace("#state#", $('#bsInfoNumeric').bootstrapSlider('getValue'));
        text = text.replace("#valueName#", $('#bsInfoNumericName').val()).replace("#minValue#", "0").replace("#maxValue#", "100");
        $('#bsInfoNumericWidgetOff').html(text);
        $('#bsInfoNumericWidgetOff').parent().parent().show();
    }
    else {
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        $('#bsInfoNumericWidgetOff').empty();
        editorNumeric.setValue(" ");
        $('#modalInfoNumericSave').prop('disabled', true);
    }
}

function checkNumericWidgetImage() {
    var check = true;
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    if ($('#bsInfoNumericLabel0').text() === "") {
        check = false;
    }
    for(var index = 1; index < all; index++) {
        if ($('#bsInfoNumericLabel0').text() !== "" && $('#bsInfoNumericLabel0').text() !== $('#bsInfoNumericLabel' + index).text()) {
            check = false;
            $('#bsInfoNumericLabel' + index).css("color","red");
        }
        else
            $('#bsInfoNumericLabel' + index).css("color","");            
    }
    if (check) {
        var dashboard = $('#bsInfoNumericDash').val() === "1" ? true : false;
        var text = getHtmlWidgetInfoNumeric(dashboard);
        editorNumeric.setValue(text);
        if($('#bsInfoNumericName').val() !== '')
            $('#modalInfoNumericSave').prop('disabled', false);
        text = text.replace(/#id#/g, "5").replace("#displayName#", "1").replace("#state#", $('#bsInfoNumeric').bootstrapSlider('getValue'));
        text = text.replace("#valueName#", $('#bsInfoNumericName').val()).replace("#minValue#", "0").replace("#maxValue#", "100");
        $('#bsInfoNumericWidgetOff').html(text);
        $('#bsInfoNumericWidgetOff').parent().parent().show();
    }
    else {
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        $('#bsInfoNumericWidgetOff').empty();
        editorNumeric.setValue(" ");
        $('#modalInfoNumericSave').prop('disabled', true);
    }
}

function checkNumericSpecial() {
    var check = true;
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    if ($('#bsInfoNumericLabelSpec0').text() === "") {
        check = false;
    }
    for(var index = 1; index < all; index++) {
        if ($('#bsInfoNumericLabelSpec0').text() !== "" && $('#bsInfoNumericLabelSpec0').text() !== $('#bsInfoNumericLabelSpec' + index).text()) {
            check = false;
            $('#bsInfoNumericLabelSpec' + index).css("color","red");
        }
        else
            $('#bsInfoNumericLabelSpec' + index).css("color","");            
    }
    if (check) {
        var dashboard = $('#bsInfoNumericDash').val() === "1" ? true : false;
        var text = getHtmlWidgetInfoNumeric(dashboard);
        editorNumeric.setValue(text);
        if($('#bsInfoNumericName').val() !== '')
            $('#modalInfoNumericSave').prop('disabled', false);
        text = text.replace(/#id#/g, "5").replace("#displayName#", "1").replace("#state#", $('#bsInfoNumeric').bootstrapSlider('getValue'));
        text = text.replace("#valueName#", $('#bsInfoNumericName').val()).replace("#minValue#", "0").replace("#maxValue#", "100");
        $('#bsInfoNumericWidgetOff').html(text);
        $('#bsInfoNumericWidgetOff').parent().parent().show();
    }
    else {
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        $('#bsInfoNumericWidgetOff').empty();
        editorNumeric.setValue(" ");
        $('#modalInfoNumericSave').prop('disabled', true);
    }
}

$('#modalInfoNumericSave').on('click', function () {
    var widget = {
        content: editorNumeric.getValue(),
        logicalId: "dashboard.action.other." + $('#bsInfoNumericName').val(),
        name: $('#bsInfoNumericName').val(),
        nbUsedBy: "0",
        path: "plugins/widget/core/template/dashboard/cmd.action.other." + $('#bsInfoNumericName').val() + ".html",
        subtype: "info",
        type: "numeric",
        version: $('#bsInfoNumericDash').val() === "1" ? 'dashboard' : 'mobile'
    };
    $.ajax({// fonction permettant de faire de l'ajax
        type: "POST", // methode de transmission des données au fichier php
        url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
        data: {
            action: "create",
            widget: json_encode(widget)
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
            return;
        },
        success: function (data) { // si l'appel a bien fonctionné
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            notify("Créateur de Widget", 'widget de type action.other ' + $('#bsInfoNumericName').val() + ' créé avec succès', 'success');
            var vars = getUrlVars();
            var url = 'index.php?';
            for (var i in vars) {
                if (i !== 'id' && i !== 'saveSuccessFull' && i !== 'removeSuccessFull') {
                    url += i + '=' + vars[i].replace('#', '') + '&';
                }
            }
            url += 'id=' + data.result.path + '&saveSuccessFull=1';
            window.location.href = url;
        }
    });
    $('#bsInfoNumericPreview0').attr('src', "");
    $('#bsInfoNumericLabel0').empty();
    $('#bsInfoNumericName').val('');
    $('#bsInfoNumericImage0').val('0');
    $('#bsInfoNumericEcartMax0').val('100');
    $('#bsInfoNumericDash').val('1');
    $('#bsInfoNumericType').val('0');
    $('#bsInfoNumericIconSize0').val('2.5');
    $('#bsInfoNumericIconCmd0').html('');
    $('#bodyInfoNumeric').children(':gt(0)').remove();
    if (editorNumeric !== null) {
        editorNumeric.toTextArea();
        editorNumeric = null;
        $('#bsViewInfoNumeric').empty();
    }
    //$('#md_modalWidget').dialog('close');
    $('#bsInfoNumericCategory').hide();
    $('#bsCategory').show();
});

$('#bsInfoNumericDash').on('change', function () {
    bsInfoNumericType();
});

$('#bsInfoNumericName').on('change', function () {
    bsInfoNumericType();
});

$('#bodyInfoNumeric').on('click',"button[name*='bsInfoNumericDel']", function () {
    var index = parseInt($(this).data('index'));
    $('#bodyInfoNumeric').children().eq(index).remove();
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    $('#bodyInfoNumeric').find('tr:gt(0)').each(function (indexTr) {
        $(this).find('td').each(function (index) {
            var indexTrReal = indexTr + 1;
            switch (index) {
                case 0:
                    $(this).find('a').attr('name', 'bsInfoNumericInsertIcon' + indexTrReal);
                    $(this).find('a').attr('data-index', indexTrReal);
                    $(this).find('a').attr('id', 'bsInfoNumericInsertIcon' + indexTrReal);
                    $(this).find('select').eq(0).attr('name', 'bsInfoNumericImage' + indexTrReal);
                    $(this).find('select').eq(0).attr('data-index', indexTrReal);
                    $(this).find('select').eq(0).attr('id', 'bsInfoNumericImage' + indexTrReal);
                    $(this).find('select').eq(1).attr('name', 'bsInfoNumericSpecialCat' + indexTrReal);
                    $(this).find('select').eq(1).attr('data-index', indexTrReal);
                    $(this).find('select').eq(1).attr('id', 'bsInfoNumericSpecialCat' + indexTrReal);
                    $(this).find('select').eq(2).attr('name', 'bsInfoNumericSpecialIcon' + indexTrReal);
                    $(this).find('select').eq(2).attr('data-index', indexTrReal);
                    $(this).find('select').eq(2).attr('id', 'bsInfoNumericSpecialIcon' + indexTrReal);
                    break;
                case 1:
                    $(this).find('input').attr('name', 'bsInfoNumericIconSize' + indexTrReal);
                    $(this).find('input').attr('id', 'bsInfoNumericIconSize' + indexTrReal);
                    $(this).find('input').attr('data-index', indexTrReal);
                    $(this).find('label').eq(0).attr('id', 'bsInfoNumericLabel' + indexTrReal);
                    $(this).find('label').eq(1).attr('id', 'bsInfoNumericLabelSpec' + indexTrReal);
                    break;
                case 2:
                    $(this).find('input').attr('name', 'bsInfoNumericEcartMin' + indexTrReal);
                    $(this).find('input').attr('id', 'bsInfoNumericEcartMin' + indexTrReal);
                    $(this).find('input').attr('data-index', indexTrReal);
                    break;
                case 3:
                    $(this).find('input').attr('name', 'bsInfoNumericEcartMax' + indexTrReal);
                    $(this).find('input').attr('id', 'bsInfoNumericEcartMax' + indexTrReal);
                    $(this).find('input').attr('data-index', indexTrReal);
                    break;
                case 4:
                    $(this).find('span').attr('name', 'bsInfoNumericIconCmd' + indexTrReal);
                    $(this).find('span').attr('id', 'bsInfoNumericIconCmd' + indexTrReal);
                    $(this).find('span').attr('data-index', indexTrReal);
                    $(this).find('img').eq(0).attr('id', 'bsInfoNumericPreview' + indexTrReal);
                    $(this).find('img').eq(0).attr('alt', 'image ' + indexTrReal);
                    $(this).find('img').eq(1).attr('id', 'bsInfoNumericPreviewSpec' + indexTrReal);
                    $(this).find('img').eq(1).attr('alt', 'image ' + indexTrReal);
                    break;
                case 5:
                    $(this).find('button').attr('name', 'bsInfoNumericDel' + indexTrReal);
                    $(this).find('button').attr('data-index', indexTrReal);
                    break;
            }
        });
    });
    bsInfoNumericType();
});

$('#bodyInfoNumeric').on('change',"input[name*='bsInfoNumericEcartMin']", function () {
    var index = parseInt($(this).data('index'));
    if(index !== 0)
        $('#bodyInfoNumeric').find("#bsInfoNumericEcartMax" + (index - 1)).val($(this).val());
    bsInfoNumericType();
});

$('#bodyInfoNumeric').on('change',"input[name*='bsInfoNumericEcartMax']", function () {
    var index = parseInt($(this).data('index'));
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length - 1;
    if(index !== all)
        $('#bodyInfoNumeric').find("#bsInfoNumericEcartMin" + (index + 1)).val($(this).val());   
    bsInfoNumericType();
});

$('#bodyInfoNumeric').on('click', "a[name*='bsInfoNumericInsertIcon']", function () {
    var index = parseInt($(this).data('index'));
    chooseIcon(function (_icon) {
        $('#bsInfoNumericIconCmd' + index).html(_icon);
        checkNumericJeedomIcon();
    });
});

$('#bodyInfoNumeric').on('click', "input[name*='bsInfoNumericIconSize']", function () {
    var index = parseInt($(this).data('index'));
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    for (var nbCmd = 0; nbCmd < all; nbCmd++) {
        if (nbCmd !== index)
            $('#bsInfoNumericIconSize' + nbCmd).val($(this).val());
        $('#bsInfoNumericIconCmd' + nbCmd).css('font-size', $(this).val() + 'em');
    }
    checkNumericJeedomIcon();
});

$('#bodyInfoNumeric').on('change',"select[name*='bsInfoNumericSpecialIcon']", function () {
    var image = $(this).val();
    var index = $(this).data('index');
    if (image === "") {
        $('#bsInfoNumericPreviewSpec' + index).attr('src', "");
        $('#bsInfoNumericLabelSpec' + index).empty();
        $('#modalInfoNumericSave').prop('disabled',true);
        $('#bsInfoNumericWidgetOff').empty();
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        editorNumeric.setValue(" ");
        return;
    }
    var img = new Image();
    var dir = $('#bsInfoNumericSpecialCat' + index).val().split('.');
    img.src = "plugins/widget/core/special/" + dir + '/' + image;
    $('#bsInfoNumericPreviewSpec' + index).attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsInfoNumericLabelSpec' + index).empty();
        $('#bsInfoNumericLabelSpec' + index).append(temp);      
        checkNumericSpecial();
    };
});

$('#bodyInfoNumeric').on('change',"select[name*='bsInfoNumericImage']", function () {
    var image = $(this).val();
    var index = $(this).data('index');
    if (image === "0") {
        $('#bsInfoNumericPreview' + index).attr('src', "");
        $('#bsInfoNumericLabel' + index).empty();
        $('#modalInfoNumericSave').prop('disabled',true);
        $('#bsInfoNumericWidgetOff').empty();
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        editorNumeric.setValue(" ");
        return;
    }
    var img = new Image();
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsInfoNumericPreview' + index).attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsInfoNumericLabel' + index).empty();
        $('#bsInfoNumericLabel' + index).append(temp);      
        checkNumericWidgetImage();
    };
});

$('#bsInfoNumericAddEntry').on('click', function () {
    var index = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    var min = $('#bodyInfoNumeric').find("#bsInfoNumericEcartMax" + (index - 1)).val();
    var html = '<tr>';
    html += '<td style="text-align: center; vertical-align: middle;">';
    html += '<a class="btn btn-default btn-xs JeedomView" data-index="' + index + '" name="bsInfoNumericInsertIcon' + index + '" id="bsInfoNumericInsertIcon' + index + '" style=display:none"><i class="fa fa-flag"></i> Rechercher une icone</a>';
    html += '<select class="form-control widgetsView" value="" data-index="' + index + '" name="bsInfoNumericImage' + index + '" id="bsInfoNumericImage' + index + '"></select>';
    html += '<select class="form-control specialView" value="" data-index="' + index + '" name=" bsInfoNumericSpecialCat' + index + '" id="bsInfoNumericSpecialCat' + index + '" ><option value="">{{Aucune}}</option></select>';
    html += '<select class="form-control specialView" value="" data-index="' + index + '" name="bsInfoNumericSpecialIcon' + index + '" id="bsInfoNumericSpecialIcon' + index + '" ><option value="">{{Aucune}}</option></select>';
    html += '</td>';
    html += '<td style="text-align: center; vertical-align: middle;">';
    html += '<input type="number" class="form-control JeedomView" style=display:none" disabled value="2.5" min="1" max="5" step="0.2" data-index="' + index + '" name="bsInfoNumericIconSize' + index + '" id="bsInfoNumericIconSize' + index + '"/>';
    html += '<label class="col-sm-12 control-label widgetsView" id="bsInfoNumericLabel' + index + '"></label>';
    html += '<label class="col-sm-12 control-label specialView" id="bsInfoNumericLabelSpec' + index + '"></label>';
    html += '</td>';
    html += '<td style="text-align: center; vertical-align: middle;">';
    html += '<input type="number" value="' + min + '" max="100" data-index="' + index + '" class="form-control" name="bsInfoNumericEcartMin' + index + '" id="bsInfoNumericEcartMin' + index + '"/>';
    html += '</td>';
    html += '<td style="text-align: center; vertical-align: middle;">';
    html += '<input type="number" class="form-control" value="100" max="100" data-index="' + index + '" name="bsInfoNumericEcartMax' + index + '" id="bsInfoNumericEcartMax' + index + '"/>';
    html += '</td>';
    html += '<td style="text-align: center; vertical-align: middle;">';
    html += '<span style="font-size: 2.5em;font-weight: bold;margin-top: 5px;" class=" JeedomView" data-index="' + index + '" name="bsInfoNumericIconCmd' + index + '" id="bsInfoNumericIconCmd' + index + '"></span>';
    html += '<img src="" id="bsInfoNumericPreview' + index + '" class="img-responsive widgetsView" style="margin: 0px auto;" alt="Image ' + index + '">';
    html += '<img src="" id="bsInfoNumericPreviewSpec' + index + '" class="img-responsive specialView" style="margin: 0px auto;" alt="Image ' + index + '">';
    html += '</td>';
    html += '<td style=" vertical-align: middle;">';
    html += "<button type='button' class='form-control btn btn-danger' data-index='" + index + "' name='bsInfoNumericDel" + index + "' title=\"{{Supprimer l'éntrée}}\"><i class='fa fa-trash-o'></i></button>";
    html += '</td>';
    html += '</tr>';
    $('#bodyInfoNumeric').append(html);
    setSelectImage($('#bsInfoNumericImage' + index));
    setSelectPack($('#bsInfoNumericSpecialCat' + index));
    $('#modalInfoNumericSave').prop('disabled',true);
    bsInfoNumericType();
});

function getHtmlWidgetInfoNumeric(dashboard) {
    var html = "";
    var width, height;
    switch ($('#bsInfoNumericType').val()) {
        case "0":
            width = $('#bsInfoNumericIconSize0').val() * 20 + 15;
            height = $('#bsInfoNumericIconSize0').val() * 20 + 20;
            break;
        case "1":
            width = $('#bsInfoNumericPreview0').width() + 15;
            height = $('#bsInfoNumericPreview0').height() + 15;
            break;
        case "2":
            width = $('#bsInfoNumericPreviewSpec0').width() + 15;
            height = $('#bsInfoNumericPreviewSpec0').height() + 15;
            break;
    }
    if (dashboard) {
        switch ($('#bsInfoNumericType').val()) {
            case "0":
                html += '<div style="width:90px; min-height:80px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="action" data-subtype="other" data-cmd_id="#id#">\n';
                html += '\t<center>\n';
                html += '\t\t<span class="cmdName" style="font-weight: bold;font-size : 12px;display: none;">#valueName#</span><br>\n';
                html += '\t\t<span style="font-size: ' + $('#bsInfoNumericIconSize0').val() + 'em;" class="action" id="iconCmd#id#"></span>\n';
                html += '\t</center>\n';
                break;
            case "1":
            case "2":
                html += '<div style="padding:0;width:' + width + 'px; min-height:' + height + 'px;" class="cmd #history# tooltips cmd-widget container-fluid" data-type="info" data-subtype="binary" data-cmd_id="#id#" title="#collectDate#">\n';
                html += '\t<div class="row">\n';
                html += '\t\t<div class="center-block col-xs-12 h5 cmdName" style="margin-top:0;"><strong>#valueName#</strong></div>\n';
                html += '\t\t<div class="center-block col-xs-12" id="iconCmd#id#"></div>\n';
                html += '\t</div>\n';
                break;
        }
    }
    else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="numeric" data-cmd_id="#id#" title="#collectDate#">\n';
        html += '\t<center>\n';
        switch ($('#bsInfoNumericType').val()) {
            case "0":
                html += '\t\t<span style="font-size: ' + $('#bsInfoNumericIconSize1').val() + 'em;" class="action" id="iconCmd#id#"></span>\n';
                break;
            case "1":
            case "2":
                html += '\t\t<span style="font-size: 1.1em;" class="action" id="iconCmd#id#"></span>\n';
                break;
        }
        html += '\t</center>\n';
    }
    html += '\t<script>\n';
    if (dashboard) {
        html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_id=#id#] .cmdName").show();\n';
        switch ($('#bsInfoNumericType').val()) {
             case "1":
             case "2":
                html += '\t\t\t$(".cmd[data-cmd_id=#id#]").css("min-height", "' + (height + 30) + 'px");\n';
                break;
        }
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_id=#id#] .cmdName").hide();\n';
        switch ($('#bsInfoNumericType').val()) {
            case "1":
            case "2":
                html += '\t\t\t$(".cmd[data-cmd_id=#id#]").css("min-height", "' + (height + 10) + 'px");\n';
                break;
        }
        html += '\t\t}\n';
    }
    html += '\t\tvar temp = Math.round((#maxValue# - #minValue#) * #state# / 100)\n';
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    for (var index = 0; index < all; index++) {
        if (index === (all - 1))
            html += '\t\tif (temp >= ' + $('#bsInfoNumericEcartMin' + index).val() + ' && temp <= ' + $('#bsInfoNumericEcartMax' + index).val() + ') {\n';
        else
            html += '\t\tif (temp >= ' + $('#bsInfoNumericEcartMin' + index).val() + ' && temp < ' + $('#bsInfoNumericEcartMax' + index).val() + ') {\n';
        switch ($('#bsInfoNumericType').val()) {
            case "0":
                html += "\t\t\t$('#iconCmd#id#').append('" + $('#bsInfoNumericIconCmd' + index).html() + "');\n";
                html += "\t\t\t$('#iconCmd#id#').parent().append('<span style=\"font-size: 12px;\" ><br>'+temp+'%</span>');\n";
                break;
            case "1":
                html += "\t\t\t$('#iconCmd#id#').append('<img style=\"display: block;\" src=\"plugins/widget/core/images/" + $('#bsInfoNumericImage' + index).val() + "\"><span>'+temp+'%</span>');\n";
                break;
            case "2":
                var dir = $('#bsInfoNumericSpecialCat' + index).val().split('.');
                html += "\t\t\t$('#iconCmd#id#').append('<img style=\"display: block;\" src=\"plugins/widget/core/special/" + dir + '/' + $('#bsInfoNumericSpecialIcon' + index).val() + "\"><span>'+temp+'%</span>');\n";
                break;
        }
        html += '\t\t}\n';
    }
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
}

/*function initInfoNumeric() {
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
}*/
