/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//initOtherAction();

$('#modalOtherActionCancel').on('click', function () {
    $('#bsOtherWidgetOff').empty();
    $('#bsOtherWidgetOn').empty();
    $('#bsOtherWidgetOff').parent().parent().hide();
    $('#bsOtherWidgetOn').parent().parent().hide();
    $('#modalOtherActionSave').prop('disabled',true);
    $('#bsOtherPreview1').attr('src', "");
    $('#bsOtherPreview2').attr('src', "");
    $('#bsOtherImage1').val('0');
    $('#bsOtherImage2').val('0');
    $('#bsOtherSpecialCat1').val('');
    $('#bsOtherSpecial1').val('');
    $('#bsOtherSpecialCat2').val('');
    $('#bsOtherSpecial2').val('');
    $('#bsOtherActionDash').val('1');
    $('#bsOtherActionType').val('0');
    $('#bsOtherActionIconSize1').val('2.5');
    $('#bsOtherActionIconSize2').val('2.5');
    $('#bsOtherActionIconCmd1').html('');
    $('#bsOtherActionIconCmd2').html('');
    $('#bsOtherPreviewSpec1').attr('src', "");
    $('#bsOtherPreviewSpec2').attr('src', "");
    $('#bsOtherLabelSpec1').empty();
    $('#bsOtherLabelSpec2').empty();
    $('#bsOtherLabel1').empty();
    $('#bsOtherLabel2').empty();
    $('#bsOtherActionName').val('');
    if (editorOther !== null) {
        editorOther.toTextArea();
        editorOther = null;
        $('#bsViewOther').empty();
    }
    //$('#md_modalWidget').dialog('close');
    $('#bsOtherActionCategory').hide();
    $('#bsCategory').show();
});

$('#bsOtherSpecialCat1').on('change', function () {
    if($(this).val() !== '')
        setSelectPackIcones($('#bsOtherSpecial1'),$(this).val());
    else {
        $('#bsOtherSpecial1').children(':gt(0)').remove();
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        editorOther.setValue(" ");
        $('#bsOtherPreviewSpec1').attr('src', "");
        $('#bsOtherLabelSpec1').empty();
        $('#modalOtherActionSave').prop('disabled',true);
     }
});

$('#bsOtherSpecialCat2').on('change', function () {
    if($(this).val() !== '')
        setSelectPackIcones($('#bsOtherSpecial2'),$(this).val());
    else {
        $('#bsOtherSpecial2').children(':gt(0)').remove();
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        editorOther.setValue(" ");
        $('#bsOtherPreviewSpec2').attr('src', "");
        $('#bsOtherLabelSpec2').empty();
        $('#modalOtherActionSave').prop('disabled',true);
     }
});

$('#bsOtherActionType').on('change', function () {
    bsOtherActionType();
});
function bsOtherActionType() {
    switch ($('#bsOtherActionType').val()) {
        case "0":
            $('.widgetsView').hide();
            $('.specialView').hide();
            $('.JeedomView').show();
            checkOtherJeedomIcon();
            break;
        case "1":
            $('.specialView').hide();
            $('.JeedomView').hide();
            $('.widgetsView').show();
            checkOtherWidgetImage();
            break;
        case "2":
            $('.JeedomView').hide();
            $('.widgetsView').hide();
            $('.specialView').show();
            checkOtherSpecial();
            break;
    }
}

function checkOtherJeedomIcon() {
    if ($('#bsOtherActionIconCmd2').html() !== '' && $('#bsOtherActionIconCmd1').html() !== '') {
        var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
        var text = getHtmlWidgetOtherAction(dashboard);
        editorOther.setValue(text);
        if ($('#bsOtherActionName').val() !== '')
            $('#modalOtherActionSave').prop('disabled', false);
        $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOff').parent().parent().show();
        $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOn').parent().parent().show();
        return true;
    }
    else {
        editorOther.setValue('');
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        $('#modalOtherActionSave').prop('disabled', true);
        return false;
    }
}

function checkOtherWidgetImage() {
    if ($('#bsOtherLabel1').text() === $('#bsOtherLabel2').text() && $('#bsOtherImage1').val() !== '0' && $('#bsOtherImage2').val() !== '0') {
        var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
        $('#bsOtherLabel1').css("color","");
        $('#bsOtherLabel2').css("color","");
        var text = getHtmlWidgetOtherAction(dashboard);
        editorOther.setValue(text);
        if ($('#bsOtherActionName').val() !== '')
            $('#modalOtherActionSave').prop('disabled', false);
        $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOff').parent().parent().show();
        $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOn').parent().parent().show();
        return true;
    }
    else {
        editorOther.setValue('');
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        $('#modalOtherActionSave').prop('disabled', true);
        return false;
    }
}

function checkOtherSpecial() {
    if ($('#bsOtherLabelSpec1').text() === $('#bsOtherLabelSpec2').text() && $('#bsOtherSpecial1').val() !== '' && $('#bsOtherSpecial2').val() !== '') {
        var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
        $('#bsOtherLabelSpec1').css("color","");
        $('#bsOtherLabelSpec2').css("color","");
        var text = getHtmlWidgetOtherAction(dashboard);
        editorOther.setValue(text);
        if ($('#bsOtherActionName').val() !== '')
            $('#modalOtherActionSave').prop('disabled', false);
        $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOff').parent().parent().show();
        $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOn').parent().parent().show();
        return true;
    }
    else {
        editorOther.setValue('');
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        $('#modalOtherActionSave').prop('disabled', true);
        return false;
    }
}

$('#modalOtherActionSave').on('click', function () {
    var widget = {
        content: editorOther.getValue(),
        logicalId: $('#bsOtherActionDash').val() === "1" ? 'dashboard' : 'mobile' + ".action.other." + $('#bsOtherActionName').val(),
        name: $('#bsOtherActionName').val(),
        nbUsedBy: "0",
        path: "plugins/widget/core/template/dashboard/cmd.action.other." + $('#bsOtherActionName').val() + ".html",
        subtype: "other",
        type: "action",
        version: $('#bsOtherActionDash').val() === "1" ? 'dashboard' : 'mobile'
    };
    $.ajax({
        type: "POST", 
        url: "plugins/widget/core/ajax/widget.ajax.php", 
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
            notify("Créateur de Widget", 'widget de type action.other ' + $('#bsOtherActionName').val() + ' créé avec succès', 'success');
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
    $('#bsOtherWidgetOff').empty();
    $('#bsOtherWidgetOn').empty();
    $('#bsOtherWidgetOff').parent().parent().hide();
    $('#bsOtherWidgetOn').parent().parent().hide();
    $('#modalOtherActionSave').prop('disabled',true);
    $('#bsOtherPreview1').attr('src', "");
    $('#bsOtherPreview2').attr('src', "");
    $('#bsOtherImage1').val('0');
    $('#bsOtherImage2').val('0');
    $('#bsOtherSpecialCat1').val('');
    $('#bsOtherSpecial1').val('');
    $('#bsOtherSpecialCat2').val('');
    $('#bsOtherSpecial2').val('');
    $('#bsOtherActionDash').val('1');
    $('#bsOtherActionType').val('0');
    $('#bsOtherActionIconSize1').val('2.5');
    $('#bsOtherActionIconSize2').val('2.5');
    $('#bsOtherActionIconCmd1').html('');
    $('#bsOtherActionIconCmd2').html('');
    $('#bsOtherPreviewSpec1').attr('src', "");
    $('#bsOtherPreviewSpec2').attr('src', "");
    $('#bsOtherLabelSpec1').empty();
    $('#bsOtherLabelSpec2').empty();
    $('#bsOtherLabel1').empty();
    $('#bsOtherLabel2').empty();
    $('#bsOtherActionName').val('');
    if (editorOther !== null) {
        editorOther.toTextArea();
        editorOther = null;
        $('#bsViewOther').empty();
    }
    //$('#md_modalWidget').dialog('close');
    $('#bsOtherActionCategory').hide();
    $('#bsCategory').show();
});

$('#bsOtherActionDash').on('change', function () {
    bsOtherActionType();
});

$('#bsOtherActionName').on('change', function () {
    bsOtherActionType();
});

$('#bsOtherSpecial1').on('change', function () {
    var image = $('#bsOtherSpecial1').val();
    if (image === "") {
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        editorOther.setValue(" ");
        $('#bsOtherPreviewSpec1').attr('src', "");
        $('#bsOtherLabelSpec1').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        return;
    }
    var img = new Image();
    var dir = $('#bsOtherSpecialCat1').val().split('.');
    img.src = "plugins/widget/core/special/" + dir + '/' + image;
    $('#bsOtherPreviewSpec1').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsOtherLabelSpec1').empty();
        $('#bsOtherLabelSpec1').append(temp);      
        if(!checkOtherSpecial() && $('#bsOtherLabelSpec2').text() !== '')
            $('#bsOtherLabelSpec1').css("color","red");
    };
});

$('#bsOtherSpecial2').on('change', function () {
    var image = $('#bsOtherSpecial2').val();
    if (image === "") {
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        editorOther.setValue(" ");
        $('#bsOtherPreviewSpec2').attr('src', "");
        $('#bsOtherLabelSpec2').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        return;
    }
    var img = new Image();
    var dir = $('#bsOtherSpecialCat2').val().split('.');
    img.src = "plugins/widget/core/special/" + dir + '/' + image;
    $('#bsOtherPreviewSpec2').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsOtherLabelSpec2').empty();
        $('#bsOtherLabelSpec2').append(temp);      
        if(!checkOtherSpecial() && $('#bsOtherLabelSpec1').text() !== '')
            $('#bsOtherLabelSpec2').css("color","red");
    };
});

$('#bsOtherActionInsertIcon1').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsOtherActionIconCmd1').html(_icon);
        checkOtherJeedomIcon();
    });
});

$('#bsOtherActionInsertIcon2').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsOtherActionIconCmd2').html(_icon);
        checkOtherJeedomIcon();
    });
});

$('#bsOtherActionIconSize1').on('change', function () {
    $('#bsOtherActionIconSize2').val($(this).val());
    $('#bsOtherActionIconCmd1').css('font-size',$(this).val() + 'em');
    $('#bsOtherActionIconCmd2').css('font-size',$(this).val() + 'em');
    checkOtherJeedomIcon();
});

$('#bsOtherImage1').on('change', function () {
    var image = $('#bsOtherImage1').val();
    if (image === "0") {
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        editorOther.setValue(" ");
        $('#bsOtherPreview1').attr('src', "");
        $('#bsOtherLabel1').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        return;
    }
    var img = new Image();
    img.src = "plugins/widget/core/images/" + image;
    $('#bsOtherPreview1').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsOtherLabel1').empty();
        $('#bsOtherLabel1').append(temp);      
        if(!checkOtherWidgetImage() && $('#bsOtherLabel2').text() !== '')
            $('#bsOtherLabel1').css("color","red");
    };
});

$('#bsOtherImage2').on('change', function () {
    var image = $('#bsOtherImage2').val();
    if (image === "0") {
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        $('#bsOtherPreview2').attr('src', "");
        $('#bsOtherLabel2').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        editorOther.setValue(" ");
        return;
    }
    var img = new Image();
    img.src = "plugins/widget/core/images/" + image;
    $('#bsOtherPreview2').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsOtherLabel2').empty();
        $('#bsOtherLabel2').append(temp);
        if(!checkOtherWidgetImage() && $('#bsOtherLabel1').text() !== '')
            $('#bsOtherLabel2').css("color","red");
    };
});

function getHtmlWidgetOtherAction(dashboard) {
    var html = "";
    var width, height, image1, image2, dir1, dir2;
    switch ($('#bsOtherActionType').val()) {
        case "0":
            width = $('#bsOtherActionIconSize1').val() * 20 + 15;
            height = $('#bsOtherActionIconSize1').val() * 20 + 20;
            break;
        case "1":
            width = $('#bsOtherPreview2').width() + 15;
            height = $('#bsOtherPreview2').height() + 15;
            image1 = $('#bsOtherImage1').val();
            image2 = $('#bsOtherImage2').val();
            break;
        case "2":
            width = $('#bsOtherPreviewSpec2').width() + 15;
            height = $('#bsOtherPreviewSpec2').height() + 15;
            image1 = $('#bsOtherSpecial1').val();
            image2 = $('#bsOtherSpecial2').val();
            dir1 = $('#bsOtherSpecialCat1').val().split('.');
            dir2 = $('#bsOtherSpecialCat2').val().split('.');
            break;
    }
    if (dashboard) {
        switch ($('#bsOtherActionType').val()) {
            case "0":
                html += '<div style="width:90px; min-height:80px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="action" data-subtype="other" data-cmd_id="#id#">\n';
                html += '\t<center>\n';
                html += '\t\t<span class="cmdName" style="font-weight: bold;font-size : 12px;display: none;">#valueName#</span><br>\n';
                html += '\t\t<span style="font-size: ' + $('#bsOtherActionIconSize1').val() + 'em;" class="action" id="iconCmd#id#"></span>\n';
                html += '\t</center>\n';
                break;
            case "1":
            case "2":
                html += '<div style="width:' + width + 'px; height:' + height + 'px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="action" data-subtype="other" data-cmd_id="#id#">\n';
                html += '\t<div class="row">\n';
                html += '\t\t<center><span class="cmdName" style="font-weight: bold;font-size : 12px;display: none;">#valueName#</span></center>\n';
                html += '\t\t<h5 class="action center-block" style="vertical-align:middle;" id="iconCmd#id#"></h5>\n';
                html += '\t</div>\n';
                break;
        }      
    }
    else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="numeric" data-cmd_id="#id#" title="#collectDate#">\n';
        html += '\t<center>\n';
        switch ($('#bsOtherActionType').val()) {
            case "0":
                html += '\t\t<span style="font-size: ' + $('#bsOtherActionIconSize1').val() + 'em;" class="action" id="iconCmd#id#"></span>\n';
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
        switch ($('#bsOtherActionType').val()) {
             case "1":
             case "2":
                html += '\t\t\t$(".cmd[data-cmd_id=#id#]").css("min-height", "' + (height + 20) + 'px");\n';
                break;
        }
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_id=#id#] .cmdName").hide();\n';
        switch ($('#bsOtherActionType').val()) {
            case "1":
            case "2":
                html += '\t\t\t$(".cmd[data-cmd_id=#id#]").css("min-height", "' + height + 'px");\n';
                break;
        }
        html += '\t\t}\n';
    }
    html += '\t\tif ("#state#" == "1" || "#state#" == 1) {\n';
    switch ($('#bsOtherActionType').val()) {
        case "0":
            html += '\t\t\t$("#iconCmd#id#").append("' + $('#bsOtherActionIconCmd2').html().replace(/\"/g,"'") + '");\n';
            break;
        case "1":
            html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/images/' + image2 + '\'>");\n';
            break;
        case "2":
           html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/special/' + dir2 + '/' + image2 + '\'>");\n';
            break;
    }
    html += '\t\t\tif (jeedom.cmd.normalizeName("#name#") == "on") {\n';
    html += '\t\t\t\t$(".cmd[data-cmd_id=#id#]").hide();\n';
    html += '\t\t\t}\n';
    html += '\t\t} else {\n';
    switch ($('#bsOtherActionType').val()) {
        case "0":
            html += '\t\t\t$("#iconCmd#id#").append("' + $('#bsOtherActionIconCmd1').html().replace(/\"/g,"'") + '");\n';
            break;
        case "1":
            html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/images/' + image1 + '\'>");\n';
            break;
        case "2":
            html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/special/' + dir1 + '/' + image1 + '\'>");\n';
            break;
    }
    html += '\t\t\tif (jeedom.cmd.normalizeName("#name#") == "off") {\n';
    html += '\t\t\t\t$(".cmd[data-cmd_id=#id#]").hide();\n';
    html += '\t\t\t}\n';
    html += '\t\t}\n';
    html += '\t\t$(".cmd[data-cmd_id=#id#] .action").off();\n';
    html += '\t\t$(".cmd[data-cmd_id=#id#] .action").on("click", function() {\n';
    html += '\t\t\tjeedom.cmd.execute({id: "#id#"});\n';
    html += '\t\t});\n';
    html += "\t<\/script>\n";
    html += '</div>\n';

    return html;
}

/*function initOtherAction() {
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
};*/

