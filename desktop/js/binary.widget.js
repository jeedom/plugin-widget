/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var editorBinary = null;
initInfoBinary();

function initInfoBinary() {
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
};

$('#modalInfoBinaryCancel').on('click', function () {
    $('#bsInfoBinaryWidgetOff').empty();
    $('#modalInfoBinarySave').prop('disabled',true);
    $('#bsInfoBinaryWidgetOn').empty();
    $('#bsInfoBinaryWidgetOff').parent().parent().hide();
    $('#bsInfoBinaryWidgetOn').parent().parent().hide();
    $('#bsInfoBinaryPreview1').attr('src', "");
    $('#bsInfoBinaryPreview2').attr('src', "");
    $('#bsInfoBinaryImage1').val('0');
    $('#bsInfoBinaryImage2').val('0');
    $('#bsInfoBinaryLabel1').empty();
    $('#bsInfoBinaryLabel2').empty();
    $('#bsInfoBinaryName').val('');
    if (editorBinary !== null) {
        editorBinary.toTextArea();
        $('#bsViewInfoBinary').empty();
        editorBinary = null;
    }
    $('#md_modalWidget').dialog('close');
});

$('#bsInfoBinaryType').on('change', function () {
    bsInfoBinaryType();
});
function bsInfoBinaryType() {
    switch ($('#bsInfoBinaryType').val()) {
        case "0":
            $('.widgetsView').hide();
            $('.JeedomView').show();
            if ($('#bsInfoBinaryIconCmd2').html() !== '' && $('#bsInfoBinaryIconCmd1').html() !== '') {
                var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
                var text = getHtmlWidgetInfoBinary(dashboard);
                editorBinary.setValue(text);
                $('#modalInfoBinarySave').prop('disabled',false);
                $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#", $('#bsInfoBinaryName').val()));
                $('#bsInfoBinaryWidgetOff').parent().parent().show();
                $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#", $('#bsInfoBinaryName').val()));
                $('#bsInfoBinaryWidgetOn').parent().parent().show();
            }
            else {
                editorBinary.setValue('');
                $('#bsInfoBinaryWidgetOff').empty();
                $('#bsInfoBinaryWidgetOn').empty();
                $('#bsInfoBinaryWidgetOff').parent().parent().hide();
                $('#bsInfoBinaryWidgetOn').parent().parent().hide();
                $('#modalInfoBinarySave').prop('disabled', true);
            }
            break;
        case "1":
            $('.JeedomView').hide();
            $('.widgetsView').show();
            if ($('#bsInfoBinaryLabel1').text() === $('#bsInfoBinaryLabel2').text() && $('#bsInfoBinaryImage1').val() !=='0' && $('#bsInfoBinaryImage2').val() !=='0') {
                var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
                var text = getHtmlWidgetInfoBinary(dashboard);
                editorBinary.setValue(text);
                $('#modalInfoBinarySave').prop('disabled',false);
                $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#", $('#bsInfoBinaryName').val()));
                $('#bsInfoBinaryWidgetOff').parent().parent().show();
                $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#", $('#bsInfoBinaryName').val()));
                $('#bsInfoBinaryWidgetOn').parent().parent().show();
            }
            else {
                editorBinary.setValue('');
                $('#bsInfoBinaryWidgetOff').empty();
                $('#bsInfoBinaryWidgetOn').empty();
                $('#bsInfoBinaryWidgetOff').parent().parent().hide();
                $('#bsInfoBinaryWidgetOn').parent().parent().hide();
                $('#modalInfoBinarySave').prop('disabled', true);
            }
            break;
    }
}

$('#bsInfoBinaryInsertIcon1').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsInfoBinaryIconCmd1').html(_icon);
        if ($('#bsInfoBinaryIconCmd2').html() !== '') {
            var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
            var text = getHtmlWidgetInfoBinary(dashboard);
            editorBinary.setValue(text);
            $('#modalInfoBinarySave').prop('disabled',false);
            $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOff').parent().parent().show();
            $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOn').parent().parent().show();
        }
    });
});

$('#bsInfoBinaryIconSize1').on('change', function () {
    $('#bsInfoBinaryIconSize2').val($(this).val());
    $('#bsInfoBinaryIconCmd1').css('font-size',$(this).val() + 'em');
    $('#bsInfoBinaryIconCmd2').css('font-size',$(this).val() + 'em');
    if ($('#bsInfoBinaryIconCmd2').html() !== '') {
        var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
        var text = getHtmlWidgetInfoBinary(dashboard);
        editorBinary.setValue(text);
        $('#modalInfoBinarySave').prop('disabled',false);
        $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#",$('#bsInfoBinaryName').val()));
        $('#bsInfoBinaryWidgetOff').parent().parent().show();
        $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#",$('#bsInfoBinaryName').val()));
        $('#bsInfoBinaryWidgetOn').parent().parent().show();
    }
});

$('#bsInfoBinaryInsertIcon2').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsInfoBinaryIconCmd2').html(_icon);
        if ($('#bsInfoBinaryIconCmd1').html() !== '') {
            var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
            var text = getHtmlWidgetInfoBinary(dashboard);
            editorBinary.setValue(text);
            $('#modalInfoBinarySave').prop('disabled',false);
            $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOff').parent().parent().show();
            $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOn').parent().parent().show();
        }
    });
});

$('#modalInfoBinarySave').on('click', function () {
    var widget = {
        content: editorBinary.getValue(),
        logicalId: $('#bsInfoBinaryDash').val() === "1" ? 'dashboard' : 'mobile' + ".info.binary." + $('#bsInfoBinaryName').val(),
        name: $('#bsInfoBinaryName').val(),
        nbUsedBy: "0",
        path: "plugins/widget/core/template/dashboard/cmd.info.binary." + $('#bsInfoBinaryName').val() + ".html",
        subtype: "info",
        type: "binary",
        version: $('#bsInfoBinaryDash').val() === "1" ? 'dashboard' : 'mobile'
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
            notify("Créateur de Widget", 'widget de type info.binary ' + $('#bsInfoBinaryName').val() + ' créé avec succès', 'success');
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
    $('#bsInfoBinaryWidgetOff').empty();
    $('#modalInfoBinarySave').prop('disabled',true);
    $('#bsInfoBinaryWidgetOn').empty();
    $('#bsInfoBinaryWidgetOff').parent().parent().hide();
    $('#bsInfoBinaryWidgetOn').parent().parent().hide();
    $('#bsInfoBinaryPreview1').attr('src', "");
    $('#bsInfoBinaryPreview2').attr('src', "");
    $('#bsInfoBinaryImage1').val('0');
    $('#bsInfoBinaryImage2').val('0');
    $('#bsInfoBinaryLabel1').empty();
    $('#bsInfoBinaryLabel2').empty();
    $('#bsInfoBinaryName').val('');
    if (editorBinary !== null) {
        editorBinary.toTextArea();
        $('#bsViewInfoBinary').empty();
        editorBinary = null;
    }
    $('#md_modalWidget').dialog('close');
});

$('#bsInfoBinaryDash').on('change', function () {
    if ($('#bsInfoBinaryLabel1').text() === $('#bsInfoBinaryLabel2').text()) {
        var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
        var text = getHtmlWidgetInfoBinary(dashboard);
        editorBinary.setValue(text);
        $('#modalInfoBinarySave').prop('disabled',false);
        $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#", $('#bsInfoBinaryName').val()));
        $('#bsInfoBinaryWidgetOff').parent().parent().show();
        $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#", $('#bsInfoBinaryName').val()));
        $('#bsInfoBinaryWidgetOn').parent().parent().show();
    }
});

$('#bsInfoBinaryName').on('change', function () {
    bsInfoBinaryType();
});

$('#bsInfoBinaryImage1').on('change', function () {
    var image = $('#bsInfoBinaryImage1').val();
    if (image === "0") {
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        $('#bsInfoBinaryPreview1').attr('src', "");
        $('#bsInfoBinaryLabel1').empty();
        $('#modalInfoBinarySave').prop('disabled',true);
        editorBinary.setValue(" ");
        return;
    }
    var img = new Image();
    var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsInfoBinaryPreview1').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsInfoBinaryLabel1').empty();
        $('#bsInfoBinaryLabel1').append(temp);      
        if($('#bsInfoBinaryLabel2').text() === "")
            return;
        if($('#bsInfoBinaryLabel1').text() !== $('#bsInfoBinaryLabel2').text()) {
            $('#bsInfoBinaryLabel1').css('color','red');
            $('#modalInfoBinarySave').prop('disabled', true);
            $('#bsInfoBinaryWidgetOff').empty();
            $('#bsInfoBinaryWidgetOn').empty();
            $('#bsInfoBinaryWidgetOff').parent().parent().hide();
            $('#bsInfoBinaryWidgetOn').parent().parent().hide();
            editorBinary.setValue(" ");
        }
        else {
            $('#bsInfoBinaryLabel1').css('color','');                
            $('#bsInfoBinaryLabel2').css('color','');
            $('#modalInfoBinarySave').prop('disabled',false);
            var text = getHtmlWidgetInfoBinary(dashboard);
            editorBinary.setValue(text);
            $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g,"3").replace("#displayName#","1").replace(/#state#/g,"0").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOff').parent().parent().show();
            $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g,"4").replace("#displayName#","1").replace(/#state#/g,"1").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOn').parent().parent().show();
        }
    };
});

$('#bsInfoBinaryImage2').on('change', function () {
    var image = $('#bsInfoBinaryImage2').val();
    if (image === "0") {
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        $('#bsInfoBinaryPreview2').attr('src', "");
        $('#bsInfoBinaryLabel2').empty();
        $('#modalInfoBinarySave').prop('disabled',true); 
        editorBinary.setValue(" ");
        return;
    }
    var img = new Image();
    var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsInfoBinaryPreview2').attr('src', img.src);
    img.onload = function () {
        var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsInfoBinaryLabel2').empty();
        $('#bsInfoBinaryLabel2').append(temp);
        if($('#bsInfoBinaryLabel1').text() === "")
            return;
        if($('#bsInfoBinaryLabel2').text() !== $('#bsInfoBinaryLabel1').text()) {
            $('#bsInfoBinaryLabel2').css('color','red');
            $('#modalInfoBinarySave').prop('disabled',true);
            $('#bsInfoBinaryWidgetOff').empty();
            $('#bsInfoBinaryWidgetOn').empty();
            $('#bsInfoBinaryWidgetOff').parent().parent().hide();
            $('#bsInfoBinaryWidgetOn').parent().parent().hide();
            editorBinary.setValue(" ");
        }
        else {
            $('#bsInfoBinaryLabel1').css('color','');
            $('#bsInfoBinaryLabel2').css('color','');
            $('#modalInfoBinarySave').prop('disabled',false);
            var text = getHtmlWidgetInfoBinary(dashboard);
            editorBinary.setValue(text);
            $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g,"3").replace("#displayName#","1").replace(/#state#/g,"0").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOff').parent().parent().show();
            $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g,"4").replace("#displayName#","1").replace(/#state#/g,"1").replace("#valueName#",$('#bsInfoBinaryName').val()));
            $('#bsInfoBinaryWidgetOn').parent().parent().show();
        }
    };
});

function getHtmlWidgetInfoBinary(dashboard) {
    var html = "";
    var width;
    var height;
    switch ($('#bsInfoBinaryType').val()) {
        case "0":
            width = $('#bsInfoBinaryIconSize1').val() * 20 + 15;
            height = $('#bsInfoBinaryIconSize1').val() * 20 + 20;
            break;
        case "1":
            width = $('#bsInfoBinaryPreview2').width() + 15;
            height = $('#bsInfoBinaryPreview2').height();
            break;
    }
    if (dashboard) {
        switch ($('#bsInfoBinaryType').val()) {
            case "0":
                html += '<div style="width:90px; min-height:80px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="action" data-subtype="other" data-cmd_id="#id#">\n';
                html += '\t<center>\n';
                html += '\t\t<span class="cmdName" style="font-weight: bold;font-size : 12px;display: none;">#valueName#</span><br>\n';
                html += '\t\t<span style="font-size: ' + $('#bsInfoBinaryIconSize1').val() + 'em;" class="action" id="iconCmd#id#"></span>\n';
                html += '\t</center>\n';
                break;
            case "1":
                html += '<div style="padding:0;width:' + width + 'px;min-height:' + height + 'px;" class="cmd #history# tooltips cmd-widget container-fluid" data-type="info" data-subtype="binary" data-cmd_id="#id#" title="#collectDate#">\n';
                html += '\t<div class="row">\n';
                html += '\t\t<div class="center-block col-xs-12 h5 cmdName" id="cmdName#id#" style="margin-top:0;"><strong>#valueName#</strong></div>\n';
                html += '\t\t<div class="center-block col-xs-12" id="iconCmd#id#"></div>\n';
                html += '\t</div>\n';
                break;
        }
    }
    else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="numeric" data-cmd_id="#id#" title="#collectDate#">\n';
        html += '\t<center>\n';
        switch ($('#bsInfoBinaryType').val()) {
            case "0":
                html += '\t\t<span style="font-size: ' + $('#bsInfoBinaryIconSize1').val() + 'em;" class="action" id="iconCmd#id#"></span>\n';
                break;
            case "1":
                html += '\t\t<span style="font-size: 1.1em;" class="action" id="iconCmd#id#"></span>\n';
                break;
        }
        html += '\t</center>\n';
    }
    html += '\t<script>\n';
    if (dashboard) {
        html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_id=#id#] .cmdName").show();\n';
        switch ($('#bsInfoBinaryType').val()) {
             case "1":
                html += '\t\t\t$(".cmd[data-cmd_id=#id#]").css("min-height", "' + (height + 30) + 'px");\n';
                break;
        }
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_id=#id#] .cmdName").hide();\n';
        switch ($('#bsInfoBinaryType').val()) {
            case "1":
                html += '\t\t\t$(".cmd[data-cmd_id=#id#]").css("min-height", "' + (height + 10) + 'px");\n';
                break;
        }
        html += '\t\t}\n';
    }
    html += '\t\tif ("#state#" == "1") {\n';
    switch ($('#bsInfoBinaryType').val()) {
        case "0":
            html += '\t\t\t$("#iconCmd#id#").append("' + $('#bsInfoBinaryIconCmd2').html().replace(/\"/g,"'") + '");\n';
            break;
        case "1":
            html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/images/' + $('#bsInfoBinaryImage2').val() + '\'>");\n';
            break;
    }
    html += '\t\t} else {\n';
    switch ($('#bsInfoBinaryType').val()) {
        case "0":
            html += '\t\t\t$("#iconCmd#id#").append("' + $('#bsInfoBinaryIconCmd1').html().replace(/\"/g,"'") + '");\n';
            break;
        case "1":
            html += '\t\t\t$("#iconCmd#id#").append("<img src=\'plugins/widget/core/images/' + $('#bsInfoBinaryImage1').val() + '\'>");\n';
            break;
    }
    html += '\t\t}\n';
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
}

