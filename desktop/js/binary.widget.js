/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global editorBinary, pathFile, specialWidgets, Snap, widgetCallback */

//initInfoBinary();

function infoBinarySave(_callback) {
    var widget = {
        content: editorBinary.getValue(),
        logicalId: ($('#bsInfoBinaryDash').val() === "1" ? 'dashboard' : 'mobile') + ".info.binary." + $('#bsInfoBinaryName').val(),
        name: $('#bsInfoBinaryName').val(),
        nbUsedBy: "0",
        path: pathFile.replace('desktop/php','core/class') + "/../template/" + ($('#bsInfoBinaryDash').val() === "1" ? 'dashboard' : 'mobile') + "/cmd.info.binary." + $('#bsInfoBinaryName').val() + ".html",
        type: "info",
        subtype: "binary",
        version: $('#bsInfoBinaryDash').val() === "1" ? 'dashboard' : 'mobile'
    };
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
            return;
        },
        success: function (data) { 
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            notify("Créateur de Widget", 'widget de type info.binary ' + $('#bsInfoBinaryName').val() + ' créé avec succès', 'success');
            if(_callback !== undefined)
                _callback(data.result.path);
        }
    });
    
    if($('#bsInfoBinaryType').val() === "1"){
        var nomWidget = $('#bsInfoBinaryName').val();
        $.ajax({
            type: "POST",
            url: "plugins/widget/core/ajax/widget.ajax.php",
            data: {
                action: "imageCopie",
                pathDestFils: pathFile.replace('desktop/php','core/class') + "/../template/" + ($('#bsInfoBinaryDash').val() === "1" ? 'dashboard' : 'mobile') + "/cmd.info.binary." + nomWidget,
                name1 : $('#bsInfoBinaryImage1').val(), 
                name2 : $('#bsInfoBinaryImage2').val()
            },
            dataType: 'json',
            error: function (request, status, error) {
                handleAjaxError(request, status, error);
                return;
            },
            success: function (data) { 
                if (data.state !== 'ok') {
                    $('#div_alert').showAlert({message: data.result, level: 'danger'});
                    return;
                }

                notify("Copie d'images", 'Copie des images réussie pour le widget : ' + nomWidget, 'success');
                if(_callback !== undefined)
                    _callback(data.result.path);
            }
        });
    }
}
$('#modalInfoBinarySave').on('click', function () {
    infoBinarySave(widgetCallback);
    $('#modalInfoBinaryCancel').click();
});

function infoBinaryCancel() {
    $('#bsInfoBinaryWidgetOff').empty();
    $('#modalInfoBinarySave').prop('disabled',true);
    $('#bsInfoBinaryWidgetOn').empty();
    $('#bsInfoBinaryWidgetOff').parent().parent().hide();
    $('#bsInfoBinaryWidgetOn').parent().parent().hide();
    $('#bsInfoBinaryPreview1').attr('src', "");
    $('#bsInfoBinaryPreview2').attr('src', "");
    $('#bsInfoBinaryImage1').val('0');
    $('#bsInfoBinaryImage2').val('0');
    $('#bsInfoBinarySpecialCat1').val('');
    $('#bsInfoBinarySpecial1').val('');
    $('#bsInfoBinarySpecialCat2').val('');
    $('#bsInfoBinarySpecial2').val('');
    $('#bsInfoBinaryLabel1').empty();
    $('#bsInfoBinaryLabel2').empty();
    $('#bsInfoBinaryDash').val('1');
    $('#bsInfoBinaryType').val('0');
    $('#bsInfoBinaryIconSize1').val('2.5');
    $('#bsInfoBinaryIconSize2').val('2.5');
    $('#bsInfoBinaryIconCmd1').html('');
    $('#bsInfoBinaryIconCmd2').html('');
    $('#bsInfoBinaryPreviewSpec1').attr('src', "");
    $('#bsInfoBinaryPreviewSpec2').attr('src', "");
    $('#bsInfoBinaryLabelSpec1').empty();
    $('#bsInfoBinaryLabelSpec2').empty();
    $('#bsInfoBinaryName').val('');
    if (editorBinary !== null) {
        editorBinary.toTextArea();
        $('#bsViewInfoBinary').empty();
        editorBinary = null;
    }
}
$('#modalInfoBinaryCancel').on('click', function () {
    infoBinaryCancel();
    $('#bsInfoBinaryCategory').hide('fade');
    $('#bsPanelWidgetImages').show('fade');
});

$('#bsInfoBinarySvgSpecSize').on('change', function () {
    var height, width = $(this).val();
    if (myInfoBinarySvgPreview1.select('svg') !== null) {
        height = myInfoBinarySvgPreview1.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myInfoBinarySvgPreview1.select('svg').attr('height'))));
        myInfoBinarySvgPreview1.select('svg').attr({height: height, width: width});
        var temp = '<span class="col-sm-12 text-center">H:' + width + 'px - L:' + height + 'px</span>';
        $('#bsInfoBinaryLabelSpec1').empty();
        $('#bsInfoBinaryLabelSpec1').append(temp);
    }
    if (myInfoBinarySvgPreview2.select('svg') !== null) {
        height = myInfoBinarySvgPreview2.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myInfoBinarySvgPreview2.select('svg').attr('height'))));
        myInfoBinarySvgPreview2.select('svg').attr({height: height, width: width});
        var temp = '<span class="col-sm-12 text-center">H:' + width + 'px - L:' + height + 'px</span>';
        $('#bsInfoBinaryLabelSpec2').empty();
        $('#bsInfoBinaryLabelSpec2').append(temp);
        }
    bsInfoBinaryType();
});

$('#bsInfoBinarySvgSpecColor').on('change', function () {
    var color = $(this).val();
    if (myInfoBinarySvgPreview1.select('svg') !== null) {
        myInfoBinarySvgPreview1.selectAll('path').attr({fill: color});
    }
    if (myInfoBinarySvgPreview2.select('svg') !== null) {
        myInfoBinarySvgPreview2.selectAll('path').attr({fill: color});
    }
    bsInfoBinaryType();
});

$('#bsInfoBinarySpecialCat1').on('change', function () {
    if($(this).val() !== '')
        setSelectPackIcones($('#bsInfoBinarySpecial1'),$(this));
    else {
        $('#bsInfoBinarySpecial1').children(':gt(0)').remove();
        $('#bsInfoBinarySpecial1').val('');
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        $('.svgSpecView').prop('disabled', true);
        editorBinary.setValue(" ");
        $('#bsInfoBinaryPreviewSpec1').attr('src', "");
        $('#bsInfoBinaryLabelSpec1').empty();
        if (myInfoBinarySvgPreview1.select('svg') !== null)
            myInfoBinarySvgPreview1.select('svg').remove();
        $('#modalInfoBinaryActionSave').prop('disabled', true);
    }
});

$('#bsInfoBinarySpecialCat2').on('change', function () {
    if($(this).val() !== '')
        setSelectPackIcones($('#bsInfoBinarySpecial2'),$(this));
    else {
        $('#bsInfoBinarySpecial2').children(':gt(0)').remove();
        $('#bsInfoBinarySpecial2').val('');
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        $('.svgSpecView').prop('disabled', true);
        editorBinary.setValue(" ");
        $('#bsInfoBinaryPreviewSpec2').attr('src', "");
        $('#bsInfoBinaryLabelSpec2').empty();
        $('#modalInfoBinaryActionSave').prop('disabled',true);
        if (myInfoBinarySvgPreview2.select('svg') !== null)
            myInfoBinarySvgPreview2.select('svg').remove();
    }
});

$('#bsInfoBinaryType').on('change', function () {
    bsInfoBinaryType();
});
function bsInfoBinaryType() {
    switch ($('#bsInfoBinaryType').val()) {
        case "0":
            $('.widgetsView').hide();
            $('.specialView').hide();
            $('.JeedomView').show();
            if (myInfoBinarySvgPreview1.select('svg') !== null)
                myInfoBinarySvgPreview1.select('svg').clear();
            if (myInfoBinarySvgPreview2.select('svg') !== null)
                myInfoBinarySvgPreview2.select('svg').clear();
            checkInfoBinaryJeedomIcon();
            break;
        case "1":
            $('.specialView').hide();
            $('.JeedomView').hide();
            $('.widgetsView').show();
            checkInfoBinaryWidgetImage();
            if (myInfoBinarySvgPreview1.select('svg') !== null)
                myInfoBinarySvgPreview1.select('svg').clear();
            if (myInfoBinarySvgPreview2.select('svg') !== null)
                myInfoBinarySvgPreview2.select('svg').clear();
            break;
        case "2":
            $('.JeedomView').hide();
            $('.widgetsView').hide();
            $('.specialView').show();
            if (myInfoBinarySvgPreview1.select('svg') !== null)
                $('#bsInfoBinarySpecial1').change();
            if (myInfoBinarySvgPreview2.select('svg') !== null)
                $('#bsInfoBinarySpecial2').change();
            checkInfoBinarySpecial();
            break;
    }
}

function checkInfoBinaryJeedomIcon() {
    if ($('#bsInfoBinaryIconCmd2').html() !== '' && $('#bsInfoBinaryIconCmd1').html() !== '') {
        var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
        var text = getHtmlInfoBinaryJeedom(dashboard);
        editorBinary.setValue(text);
        if ($('#bsInfoBinaryName').val() !== '')
            $('#modalInfoBinarySave').prop('disabled', false);
        $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#", $('#bsInfoBinaryName').val()).replace(/#name_display#/g, "Prévisualisation"));
        $('#bsInfoBinaryWidgetOff').parent().parent().show();
        $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#", $('#bsInfoBinaryName').val()).replace(/#name_display#/g, "Prévisualisation"));
        $('#bsInfoBinaryWidgetOn').parent().parent().show();
		
		$('#bsInfoBinaryWidgetOff span').html($('#bsInfoBinaryIconCmd1').html());
		$('#bsInfoBinaryWidgetOn span').html($('#bsInfoBinaryIconCmd2').html());
        return true;
    }
    else {
        editorBinary.setValue('');
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        $('#modalInfoBinarySave').prop('disabled', true);
        return false;
    }
}

function checkInfoBinaryWidgetImage() {
    if ($('#bsInfoBinaryLabel1').text() === $('#bsInfoBinaryLabel2').text() && $('#bsInfoBinaryImage1').val() !== '0' && $('#bsInfoBinaryImage2').val() !== '0') {
        var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
        $('#bsInfoBinaryLabel1').css("color","");
        $('#bsInfoBinaryLabel2').css("color","");
        var text = getHtmlInfoBinaryImage(dashboard);
        editorBinary.setValue(text);
        if ($('#bsInfoBinaryName').val() !== '')
            $('#modalInfoBinarySave').prop('disabled', false);
            $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace(/#uid#/g, "Uid3").replace(/#displayName#/, "1").replace(/#state#/g, "0").replace(/#valueName#/, $('#bsInfoBinaryName').val()).replace(/#name_display#/g, "Prévisualisation"));           
			$('.cmd[data-cmd_uid=Uid3] img').attr({
				'src': 'plugins/widget/core/images/'+$('#bsInfoBinaryImage1').val()
			}).css({
				'width':'100%',
				'height':'auto'
			});
			$('.cmd[data-cmd_uid=Uid3]').css({
				'width':'100%',
				'height':'auto',
				'min-height':''
			});
            $('#bsInfoBinaryWidgetOff').parent().parent().show();


            $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace(/#uid#/g, "Uid4").replace(/#displayName#/, "1").replace(/#state#/g, "1").replace(/#valueName#/, $('#bsInfoBinaryName').val()).replace(/#name_display#/g, "Prévisualisation"));
			$('.cmd[data-cmd_uid=Uid4] img').attr({
				'src': 'plugins/widget/core/images/'+$('#bsInfoBinaryImage2').val()
			}).css({
				'width':'100%',
				'height':'auto'
			});
			$('.cmd[data-cmd_uid=Uid4]').css({
				'width':'100%',
				'height':'auto',
				'min-height':''
			});
            $('#bsInfoBinaryWidgetOn').parent().parent().show();
        return true;
    }
    else {
        editorBinary.setValue('');
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        $('#modalInfoBinarySave').prop('disabled', true);
        return false;
    }
}

function checkInfoBinarySpecial() {
    if (    $('#bsInfoBinaryLabelSpec1').text() === $('#bsInfoBinaryLabelSpec2').text() &&
            $('#bsInfoBinarySpecial2').val() !== '' &&
            specialWidgets[$('#bsInfoBinarySpecialCat1').find(':selected').index() - 1].extension === specialWidgets[$('#bsInfoBinarySpecialCat2').find(':selected').index() - 1].extension &&
            $('#bsInfoBinarySpecial2').val() !== '') {
        var dashboard = $('#bsInfoBinaryDash').val() === "1" ? true : false;
        $('#bsInfoBinaryLabelSpec1').css("color","");
        $('#bsInfoBinaryLabelSpec2').css("color","");
        $('#bsInfoBinarySpecialCat1').css("color", "");
        $('#bsInfoBinarySpecialCat2').css("color", "");
        var text = getHtmlInfoBinarySpecial(dashboard);
        editorBinary.setValue(text);
        if ($('#bsInfoBinaryName').val() !== '')
            $('#modalInfoBinarySave').prop('disabled', false);
        $('#bsInfoBinaryWidgetOff').html(text.replace(/#id#/g, "3").replace("#displayName#", "1").replace(/#state#/g, "0").replace("#valueName#", $('#bsInfoBinaryName').val()));
        $('#bsInfoBinaryWidgetOff').parent().parent().show();
        $('#bsInfoBinaryWidgetOn').html(text.replace(/#id#/g, "4").replace("#displayName#", "1").replace(/#state#/g, "1").replace("#valueName#", $('#bsInfoBinaryName').val()));
        $('#bsInfoBinaryWidgetOn').parent().parent().show();
        return true;
    }
    else {
        editorBinary.setValue('');
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        $('#modalInfoBinarySave').prop('disabled', true);
        return false;
    }
}

$('#bsInfoBinaryDash').on('change', function () {
    bsInfoBinaryType();
});

$('#bsInfoBinaryName').on('change', function () {
    bsInfoBinaryType();
});

var myInfoBinarySvgPreview1 = Snap('#bsInfoBinarySvgPreview1');

$('#bsInfoBinarySpecial1').on('change', function () {
    var image = $('#bsInfoBinarySpecial1').find(':selected').index() - 1;
    var list = $('#bsInfoBinarySpecialCat1').find(':selected').index() - 1;
    if (image === "") {
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        editorBinary.setValue(" ");
        $('#bsInfoBinaryPreviewSpec1').attr('src', "");
        $('#bsInfoBinaryLabelSpec1').empty();
        $('#modalInfoBinaryActionSave').prop('disabled',true);
        return;
    }
    if (specialWidgets[list].extension !== 'svg') {
        var img = new Image();
        img.src = "plugins/widget/core/special/" + specialWidgets[list].folder + specialWidgets[list].files[image];
        $('#bsInfoBinaryPreviewSpec1').attr('src', img.src);
        if (myInfoBinarySvgPreview1.select('svg') !== null)
            myInfoBinarySvgPreview1.select('svg').remove();
        img.on('load', function() {
            var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
            $('#bsInfoBinaryLabelSpec1').empty();
            $('#bsInfoBinaryLabelSpec1').append(temp);
            if (!checkInfoBinarySpecial() && $('#bsInfoBinaryLabelSpec2').text() !== '') {
                if(specialWidgets[$('#bsInfoBinarySpecialCat1').val()].extension === specialWidgets[$('#bsInfoBinarySpecialCat2').val()].extension)
                    $('#bsInfoBinaryLabelSpec1').css("color", "red");
                else
                    $('#bsInfoBinarySpecialCat1').css("color", "red");
            }
        });
    }
    else {
        $('.svgSpecView').prop('disabled', false);
        $('#bsInfoBinaryPreviewSpec1').attr('src', "");
        var snap = Snap.parse(specialWidgets[list].svg[image].snap);
        if(myInfoBinarySvgPreview1.select('svg') !== null)
            myInfoBinarySvgPreview1.select('svg').remove();
        myInfoBinarySvgPreview1.append(snap);
        var width = $('#bsInfoBinarySvgSpecSize').val();
        var height = myInfoBinarySvgPreview1.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myInfoBinarySvgPreview1.select('svg').attr('height'))));
        myInfoBinarySvgPreview1.select('svg').attr({height: height, width: width});
        myInfoBinarySvgPreview1.selectAll('path').attr({fill: $('#bsInfoBinarySvgSpecColor').val()});
        var temp = '<span class="col-sm-12 text-center">H:' + myInfoBinarySvgPreview1.select('svg').attr('width') + 'px - L:' + myInfoBinarySvgPreview1.select('svg').attr('height') + 'px</span>';
        $('#bsInfoBinaryLabelSpec1').empty();
        $('#bsInfoBinaryLabelSpec1').append(temp);
        if (!checkInfoBinarySpecial() && $('#bsInfoBinaryLabelSpec2').text() !== '') {
            if (specialWidgets[$('#bsInfoBinarySpecialCat1').val()].extension === specialWidgets[$('#bsInfoBinarySpecialCat2').val()].extension)
                $('#bsInfoBinaryLabelSpec1').css("color", "red");
            else
                $('#bsInfoBinarySpecialCat1').css("color", "red");
        }
    }
});

var myInfoBinarySvgPreview2 = Snap('#bsInfoBinarySvgPreview2');

$('#bsInfoBinarySpecial2').on('change', function () {
    var image = $('#bsInfoBinarySpecial2').find(':selected').index() - 1;
    var list = $('#bsInfoBinarySpecialCat2').find(':selected').index() - 1;
    if (image === "") {
        $('#bsInfoBinaryWidgetOff').empty();
        $('#bsInfoBinaryWidgetOn').empty();
        $('#bsInfoBinaryWidgetOff').parent().parent().hide();
        $('#bsInfoBinaryWidgetOn').parent().parent().hide();
        editorBinary.setValue(" ");
        $('#bsInfoBinaryPreviewSpec2').attr('src', "");
        $('#bsInfoBinaryLabelSpec2').empty();
        $('#modalInfoBinaryActionSave').prop('disabled',true);
        return;
    }
    if (specialWidgets[list].extension !== 'svg') {
        var img = new Image();
        img.src = "plugins/widget/core/special/" + specialWidgets[list].folder + specialWidgets[list].files[image];
        $('#bsInfoBinaryPreviewSpec2').attr('src', img.src);
        if (myInfoBinarySvgPreview2.select('svg') !== null)
            myInfoBinarySvgPreview2.select('svg').remove();
        img.on('load', function()  {
            var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
            $('#bsInfoBinaryLabelSpec2').empty();
            $('#bsInfoBinaryLabelSpec2').append(temp);
            if (!checkInfoBinarySpecial() && $('#bsInfoBinaryLabelSpec1').text() !== '') {
                if (specialWidgets[$('#bsInfoBinarySpecialCat1').val()].extension === specialWidgets[$('#bsInfoBinarySpecialCat2').val()].extension)
                    $('#bsInfoBinaryLabelSpec2').css("color", "red");
                else
                    $('#bsInfoBinarySpecialCat2').css("color", "red");
            }
        });
    }
    else {
        $('.svgSpecView').prop('disabled', false);
        $('#bsInfoBinaryPreviewSpec2').attr('src', "");
        var snap = Snap.parse(specialWidgets[list].svg[image].snap);
        if(myInfoBinarySvgPreview2.select('svg') !== null)
            myInfoBinarySvgPreview2.select('svg').remove();
        myInfoBinarySvgPreview2.append(snap);
        var width = $('#bsInfoBinarySvgSpecSize').val();
        var height = myInfoBinarySvgPreview2.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myInfoBinarySvgPreview2.select('svg').attr('height'))));
        myInfoBinarySvgPreview2.select('svg').attr({height: height, width: width});
        myInfoBinarySvgPreview2.selectAll('path').attr({fill: $('#bsInfoBinarySvgSpecColor').val()});
        var temp = '<span class="col-sm-12 text-center">H:' + myInfoBinarySvgPreview2.select('svg').attr('width') + 'px - L:' + myInfoBinarySvgPreview2.select('svg').attr('height') + 'px</span>';
        $('#bsInfoBinaryLabelSpec2').empty();
        $('#bsInfoBinaryLabelSpec2').append(temp);
        if (!checkInfoBinarySpecial() && $('#bsInfoBinaryLabelSpec1').text() !== '') {
            if (specialWidgets[$('#bsInfoBinarySpecialCat1').val()].extension === specialWidgets[$('#bsInfoBinarySpecialCat2').val()].extension)
                $('#bsInfoBinaryLabelSpec2').css("color", "red");
            else
                $('#bsInfoBinarySpecialCat2').css("color", "red");
        }
    }
});

$('#bsInfoBinaryInsertIcon1').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsInfoBinaryIconCmd1').html(_icon);
        checkInfoBinaryJeedomIcon();
    });
});

$('#bsInfoBinaryIconSize1').on('change', function () {
    $('#bsInfoBinaryIconSize2').val($(this).val());
    $('#bsInfoBinaryIconCmd1').css('font-size',$(this).val() + 'em');
    $('#bsInfoBinaryIconCmd2').css('font-size',$(this).val() + 'em');
    checkInfoBinaryJeedomIcon();
});

$('#bsInfoBinaryInsertIcon2').on('click', function () {
    chooseIcon(function (_icon) {
        $('#bsInfoBinaryIconCmd2').html(_icon);
        checkInfoBinaryJeedomIcon();
    });
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
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsInfoBinaryPreview1').attr('src', img.src);
    $(img).on('load', function() {
        var temp = '<span class="text-center">L:' + this.width + 'px - H:' + this.height + 'px</span>';
        $('#bsInfoBinaryLabel1').empty();
        $('#bsInfoBinaryLabel1').append(temp);      
        if(!checkInfoBinaryWidgetImage() && $('#bsInfoBinaryLabel2').text() !== '')
            $('#bsInfoBinaryLabel1').css("color","red");
    });
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
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsInfoBinaryPreview2').attr('src', img.src);
    $(img).on('load', function() {
        var temp = '<span class="text-center">L:' + this.width + 'px - H:' + this.height + 'px</span>';
        $('#bsInfoBinaryLabel2').empty();
        $('#bsInfoBinaryLabel2').append(temp);
        if(!checkInfoBinaryWidgetImage() && $('#bsInfoBinaryLabel1').text() !== '')
            $('#bsInfoBinaryLabel2').css("color","red");
    });
});

function getHtmlInfoBinaryJeedom(dashboard) {
    var html = "";
    var cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "0", 
                version: $('#bsInfoBinaryDash').val(),
                size: $('#bsInfoBinaryIconSize1').val(), 
                icon1: $('#bsInfoBinaryIconCmd1').html().replace(/\"/g, "'"), 
                icon2: $('#bsInfoBinaryIconCmd2').html().replace(/\"/g, "'")}) + 
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    var width, height;
    width = $('#bsInfoBinaryActionIconSize1').val() * 20 + 15;
    height = $('#bsInfoBinaryActionIconSize1').val() * 20 + 20;
    if (dashboard) {
        html += '<div style="width:90px; min-height:80px;" class="cmd #history# tooltips cmd-widget" data-type="info" data-subtype="binary" data-cmd_id="#id#" data-cmd_uid="#uid#" data-version="#version#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<div class="cmdName" style="font-weight: bold;font-size : 12px; #hideCmdName#">#name_display#</div>\n';
        html += '\t\t<span style="font-size: ' + $('#bsInfoBinaryIconSize1').val() + 'em;" class="iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="binary" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<span style="font-size: ' + $('#bsInfoBinaryIconSize1').val() + 'em;" class="iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }
    html += cdata;
    html += '\t<script>\n';
    html += '\t\tjeedom.cmd.update[\'#id#\'] = function(_options){\n';                                                             
    if (dashboard) {
      /*
        html += '\t\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").show();\n';
        html += '\t\t\t} else {\n';
        html += '\t\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").hide();\n';
        html += '\t\t\t}\n';
	*/
    }
    html += '\t\t\t\$(".iconCmd#uid#").empty();\n';
    html += '\t\t\tif (parseInt(_options.display_value) == 1) {\n';
    html += '\t\t\t\t$(".iconCmd#uid#").append("' + $('#bsInfoBinaryIconCmd2').html().replace(/\"/g, "'") + '");\n';
    html += '\t\t\t} else {\n';
    html += '\t\t\t\t$(".iconCmd#uid#").append("' + $('#bsInfoBinaryIconCmd1').html().replace(/\"/g, "'") + '");\n';
    html += '\t\t\t}\n';
    html += "\t\t\t$('.cmd[data-cmd_id=#id#]').attr('title','Valeur du '+_options.valueDate+', collectée le '+_options.collectDate);\n";                                                                                          
    html += '\t\t}\n';
    html += '\t\tjeedom.cmd.update[\'#id#\']({display_value:\'#state#\',valueDate:\'#valueDate#\',collectDate:\'#collectDate#\',alertLevel:\'#alertLevel#\'});\n';
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
}

function getHtmlInfoBinaryImage(dashboard) {
    var html = "";
	var mobDash = $('#bsInfoBinaryDash').val() == 0 ? 'mobile' : 'dashboard';
    var cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "1", 
                version: $('#bsInfoBinaryDash').val(),
                image1: $('#bsInfoBinaryImage1').val(), 
                image2: $('#bsInfoBinaryImage2').val()}) + 
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    var width, height, image1, image2;
    width = $('#bsInfoBinaryPreview2').width() + 15;
    height = $('#bsInfoBinaryPreview2').height() + 15;
    image1 = $('#bsInfoBinaryImage1').val();
    image2 = $('#bsInfoBinaryImage2').val();
    if (dashboard) {
        html += '<div style="padding:0;width:' + width + 'px;min-height:' + height + 'px;" class="cmd #history# tooltips cmd-widget container-fluid" data-type="info" data-subtype="binary" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<div class="row">\n';
        html += '\t\t<div class="center-block col-xs-12 h5 cmdName" id="cmdName#id#" style="margin-top:0; #hideCmdName#;">#name_display#</div>\n';
        html += '\t\t<div class="center-block col-xs-12 iconCmd#uid#"></div>\n';
        html += '\t</div>\n';
    }else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="binary" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<span style="font-size: 1.1em;" class="iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }
    html += cdata;
    html += '\t<script>\n';
  	html += '\t\tjeedom.cmd.update[\'#id#\'] = function(_options){\n';
    if (dashboard) {
     /* 
     	html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").show();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + (height + 20) + 'px");\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").hide();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + height + 'px");\n';
        html += '\t\t}\n';
      */
    }
   	html += '\t\t\t\$(".iconCmd#uid#").empty();\n';
    html += '\t\t\tif (parseInt(_options.display_value) == 1) {\n';
    html += '\t\t\t\t$(".iconCmd#uid#").append("<img src=\'plugins/widget/core/template/'+mobDash+'/cmd.info.binary.' + $('#bsInfoBinaryName').val() +'/'+ image2 + '\'>");\n';
    html += '\t\t\t} else {\n';
    html += '\t\t\t\t$(".iconCmd#uid#").append("<img src=\'plugins/widget/core/template/'+mobDash+'/cmd.info.binary.' + $('#bsInfoBinaryName').val() +'/'+ image1 + '\'>");\n';
    html += '\t\t\t}\n';
    html += "\t\t\t$('.cmd[data-cmd_id=#id#]').attr('title','Valeur du '+_options.valueDate+', collectée le '+_options.collectDate);\n";                                                                                          
    html += '\t\t}\n';
    html += '\t\tjeedom.cmd.update[\'#id#\']({display_value:\'#state#\',valueDate:\'#valueDate#\',collectDate:\'#collectDate#\',alertLevel:\'#alertLevel#\'});\n';
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
}

function getHtmlInfoBinarySpecial(dashboard) {
    var html = "";
    var width, height, image1, image2, cdata;
    var svg1 = $('#bsInfoBinarySpecial1').find(':selected').index() - 1;
    var list1 = $('#bsInfoBinarySpecialCat1').find(':selected').index() - 1;
    var svg2 = $('#bsInfoBinarySpecial2').find(':selected').index() - 1;
    var list2 = $('#bsInfoBinarySpecialCat2').find(':selected').index() - 1;
    cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "2",
                version: $('#bsInfoBinaryDash').val(),
                list1: $('#bsInfoBinarySpecialCat1').val(),
                special1: $('#bsInfoBinarySpecial1').val(),
                list2: $('#bsInfoBinarySpecialCat2').val(),
                special2: $('#bsInfoBinarySpecial2').val()}) +
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    if (specialWidgets[list1].extension !== 'svg') {
        width = $('#bsInfoBinaryPreviewSpec2').width() + 15;
        height = $('#bsInfoBinaryPreviewSpec2').height() + 15;
    }
    else {
        width = parseInt(myInfoBinarySvgPreview1.select('svg').attr('width')) + 15;
        height = parseInt(myInfoBinarySvgPreview1.select('svg').attr('height')) + 15;
        image1 = myInfoBinarySvgPreview1.select('svg').toString();
        image2 = myInfoBinarySvgPreview2.select('svg').toString();
    }
    if (dashboard) {
        html += '<div style="padding:0;width:' + width + 'px;min-height:' + height + 'px;" class="cmd #history# tooltips cmd-widget container-fluid" data-type="info" data-subtype="binary" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<div class="row">\n';
        html += '\t\t<div class="center-block col-xs-12 h5 cmdName" id="cmdName#id#" style="margin-top:0;"><strong>#valueName#</strong></div>\n';
        html += '\t\t<div class="center-block col-xs-12 iconCmd#uid#" style="vertical-align:middle;">\n';
        if (specialWidgets[list1].extension === 'svg') {
            html += '\t\t\t<div class="cmdSvg1#uid#">\n\t\t\t\t' + image1.replace(/\"/g, "'").replace(/(\r\n|\n|\r)/gm, "").replace(/>/g, ">\n\t\t\t\t") + '\n';
            html += '\t\t\t</div>\n';
            html += '\t\t\t<div class="cmdSvg2#uid#" style="display:none;">\n\t\t\t\t' + image2.replace(/\"/g, "'").replace(/(\r\n|\n|\r)/gm, "").replace(/>/g, ">\n\t\t\t\t") + '\n';
            html += '\t\t\t</div>\n';
        }
        html += '\t\t</div>\n';
        html += '\t</div>\n';
    }else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="binary" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<span style="font-size: 1.1em;" class="iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
        html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").show();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + (height + 20) + 'px");\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").hide();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + height + 'px");\n';
        html += '\t\t}\n';
    }
    if (specialWidgets[list1].extension !== 'svg')
        html += '\t\t\$(".iconCmd#uid#").empty();\n';
    html += '\t\tif ("#state#" == "1") {\n';
    if (specialWidgets[list1].extension !== 'svg')
        html += '\t\t\t$(".iconCmd#uid#").append("<img src=\'plugins/widget/core/special/' + specialWidgets[list2].folder + specialWidgets[list1].files[svg2] + '\'>");\n';
    else {
        html += '\t\t\t$(".cmdSvg1#uid#").hide();\n';
        html += '\t\t\t$(".cmdSvg2#uid#").show();\n';
    }
    html += '\t\t} else {\n';
    if (specialWidgets[list2].extension !== 'svg')
        html += '\t\t\t$(".iconCmd#uid#").append("<img src=\'plugins/widget/core/special/' + specialWidgets[list1].folder + specialWidgets[list1].files[svg1] + '\'>");\n';
    else {
        html += '\t\t\t$(".cmdSvg2#uid#").hide();\n';
        html += '\t\t\t$(".cmdSvg1#uid#").show();\n';
    }
    html += '\t\t}\n';
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
}
