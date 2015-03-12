/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var editorOther = null;
initOtherAction();

function initOtherAction() {
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
};

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
    $('#bsOtherLabel1').empty();
    $('#bsOtherLabel2').empty();
    $('#bsOtherActionName').val('');
    if (editorOther !== null) {
        editorOther.toTextArea();
        editorOther = null;
        $('#bsViewOther').empty();
    }
    $('#md_modalWidget').dialog('close');
});

$('#bsOtherActionType').on('change', function () {
    bsOtherActionType();
});
function bsOtherActionType() {
    switch ($('#bsOtherActionType').val()) {
        case "0":
            $('.widgetsView').hide();
            $('.JeedomView').show();
            if ($('#bsOtherActionIconCmd2').html() !== '' && $('#bsOtherActionIconCmd1').html() !== '') {
                var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
                var text = getHtmlWidgetOtherAction(dashboard);
                editorOther.setValue(text);
                $('#modalOtherActionSave').prop('disabled', false);
                $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#",$('#bsOtherActionName').val()));
                $('#bsOtherWidgetOff').parent().parent().show();
                $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#",$('#bsOtherActionName').val()));
                $('#bsOtherWidgetOn').parent().parent().show();
            }
            else {
                editorOther.setValue('');
                $('#bsOtherWidgetOff').empty();
                $('#bsOtherWidgetOn').empty();
                $('#bsOtherWidgetOff').parent().parent().hide();
                $('#bsOtherWidgetOn').parent().parent().hide();
                $('#modalOtherActionSave').prop('disabled', true);
           }
            break;
        case "1":
            $('.JeedomView').hide();
            $('.widgetsView').show();
            if ($('#bsOtherLabel1').text() === $('#bsOtherLabel2').text() && $('#bsOtherImage1').val() !=='0' && $('#bsOtherImage2').val() !=='0') {
                var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
                var text = getHtmlWidgetOtherAction(dashboard);
                editorOther.setValue(text);
                $('#modalOtherActionSave').prop('disabled', false);
                $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0"));
                $('#bsOtherWidgetOff').parent().parent().show();
                $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1"));
                $('#bsOtherWidgetOn').parent().parent().show();
            }
            else {
                editorOther.setValue('');
                $('#bsOtherWidgetOff').empty();
                $('#bsOtherWidgetOn').empty();
                $('#bsOtherWidgetOff').parent().parent().hide();
                $('#bsOtherWidgetOn').parent().parent().hide();
                $('#modalOtherActionSave').prop('disabled', true);
           }
            break;
    }
}

$('#bsOtherActionInsertIcon1').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsOtherActionIconCmd1').html(_icon);
        if ($('#bsOtherActionIconCmd2').html() !== '') {
            var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
            var text = getHtmlWidgetOtherAction(dashboard);
            editorOther.setValue(text);
            $('#modalOtherActionSave').prop('disabled', false);
            $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#",$('#bsOtherActionName').val()));
            $('#bsOtherWidgetOff').parent().parent().show();
            $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#",$('#bsOtherActionName').val()));
            $('#bsOtherWidgetOn').parent().parent().show();
        }
    });
});

$('#bsOtherActionIconSize1').on('change', function () {
    $('#bsOtherActionIconSize2').val($(this).val());
    $('#bsOtherActionIconCmd1').css('font-size',$(this).val() + 'em');
    $('#bsOtherActionIconCmd2').css('font-size',$(this).val() + 'em');
    if ($('#bsOtherActionIconCmd2').html() !== '') {
        var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
        var text = getHtmlWidgetOtherAction(dashboard);
        editorOther.setValue(text);
        $('#modalOtherActionSave').prop('disabled', false);
        $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#",$('#bsOtherActionName').val()));
        $('#bsOtherWidgetOff').parent().parent().show();
        $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#",$('#bsOtherActionName').val()));
        $('#bsOtherWidgetOn').parent().parent().show();
    }
});

$('#bsOtherActionInsertIcon2').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsOtherActionIconCmd2').html(_icon);
        if ($('#bsOtherActionIconCmd1').html() !== '') {
            var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
            var text = getHtmlWidgetOtherAction(dashboard);
            editorOther.setValue(text);
            $('#modalOtherActionSave').prop('disabled', false);
            $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#",$('#bsOtherActionName').val()));
            $('#bsOtherWidgetOff').parent().parent().show();
            $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#",$('#bsOtherActionName').val()));
            $('#bsOtherWidgetOn').parent().parent().show();
        }
    });
});

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
                if (i != 'id' && i != 'saveSuccessFull' && i != 'removeSuccessFull') {
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
    $('#bsOtherLabel1').empty();
    $('#bsOtherLabel2').empty();
    $('#bsOtherActionName').val('');
    if (editorOther !== null) {
        editorOther.toTextArea();
        editorOther = null;
        $('#bsViewOther').empty();
    }
    $('#md_modalWidget').dialog('close');
});

$('#bsOtherActionDash').on('change', function () {
    if ($('#bsOtherLabel1').text() === $('#bsOtherLabel2').text()) {
        var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
        var text = getHtmlWidgetOtherAction(dashboard);
        editorOther.setValue(text);
        $('#modalOtherActionSave').prop('disabled', false);
        $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0"));
        $('#bsOtherWidgetOff').parent().parent().show();
        $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1"));
        $('#bsOtherWidgetOn').parent().parent().show();
    }
});

$('#bsOtherActionName').on('change', function () {
    bsOtherActionType();
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
    var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
    var img = new Image();
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsOtherPreview1').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsOtherLabel1').empty();
        $('#bsOtherLabel1').append(temp);      
        if($('#bsOtherLabel2').text() === "")
            return;
        if ($('#bsOtherLabel1').text() !== $('#bsOtherLabel2').text()) {
            $('#bsOtherLabel1').css('color', 'red');
            $('#modalOtherActionSave').prop('disabled', true);
            $('#bsOtherWidgetOff').empty();
            $('#bsOtherWidgetOn').empty();
            $('#bsOtherWidgetOff').parent().parent().hide();
            $('#bsOtherWidgetOn').parent().parent().hide();
            editorOther.setValue(" ");
        }
        else {
            $('#bsOtherLabel1').css('color','');                
            $('#bsOtherLabel2').css('color','');
            $('#modalOtherActionSave').prop('disabled',false);
            var text = getHtmlWidgetOtherAction(dashboard);
            editorOther.setValue(text);
            $('#bsOtherWidgetOff').html(text.replace(/#id#/g,"1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g,"0"));
            $('#bsOtherWidgetOff').parent().parent().show();
            $('#bsOtherWidgetOn').html(text.replace(/#id#/g,"2").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g,"1"));
            $('#bsOtherWidgetOn').parent().parent().show();
        }
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
    var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsOtherPreview2').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsOtherLabel2').empty();
        $('#bsOtherLabel2').append(temp);
        if($('#bsOtherLabel1').text() === "")
            return;
        if ($('#bsOtherLabel2').text() !== $('#bsOtherLabel1').text()) {
            $('#bsOtherLabel2').css('color', 'red');
            $('#modalOtherActionSave').prop('disabled', true);
            $('#bsOtherWidgetOff').empty();
            $('#bsOtherWidgetOn').empty();
            $('#bsOtherWidgetOff').parent().parent().hide();
            $('#bsOtherWidgetOn').parent().parent().hide();
            editorOther.setValue(" ");
        }
        else {
            $('#bsOtherLabel1').css('color', '');
            $('#bsOtherLabel2').css('color', '');
            $('#modalOtherActionSave').prop('disabled', false);
            var text = getHtmlWidgetOtherAction(dashboard);
            editorOther.setValue(text);
            $('#bsOtherWidgetOff').html(text.replace(/#id#/g,"1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g,"0"));
            $('#bsOtherWidgetOff').parent().parent().show();
            $('#bsOtherWidgetOn').html(text.replace(/#id#/g,"2").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g,"1"));
            $('#bsOtherWidgetOn').parent().parent().show();
        }
    };
});

function getHtmlWidgetOtherAction(dashboard) {
    var html = "";
    var width;
    var height;
    switch ($('#bsOtherActionType').val()) {
        case "0":
            width = $('#bsOtherActionIconSize1').val() * 20 + 15;
            height = $('#bsOtherActionIconSize1').val() * 20 + 20;
            break;
        case "1":
            width = $('#bsOtherPreview2').width() + 15;
            height = $('#bsOtherPreview2').height() + 20;
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
                html += '\t<script>\n';
                html += '\t\tvar temp = "#name#";\n';
                html += '\t\tif ("#displayName#" == 1 || "#displayName#" == "1") {\n';
                html += '\t\t\t$(".cmd[data-cmd_id=#id#] .cmdName").show();\n';
                html += '\t\t}\n';
                break;
            case "1":
                html += '<div style="width:' + width + 'px; height:' + height + 'px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="action" data-subtype="other" data-cmd_id="#id#">\n';
                html += '\t<div class="row">\n';
                html += '\t\t<h5 class="action center-block" style="vertical-align:middle;" id="iconCmd#id#"></h5>\n';
                html += '\t</div>\n';
                html += '\t<script>\n';
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
                html += '\t\t<span style="font-size: 1.1em;" class="action" id="iconCmd#id#"></span>\n';
                break;
        }
        html += '\t</center>\n';
        html += '\t<script>\n';
    }
    html += '\t\tif ("#state#" == "1" || "#state#" == 1) {\n';
    switch ($('#bsOtherActionType').val()) {
        case "0":
            html += '\t\t\t$("#iconCmd#id#").append("' + $('#bsOtherActionIconCmd2').html().replace(/\"/g,"'") + '");\n';
            break;
        case "1":
            html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/images/' + $('#bsOtherImage2').val() + '\'>");\n';
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
            html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/images/' + $('#bsOtherImage1').val() + '\'>");\n';
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

