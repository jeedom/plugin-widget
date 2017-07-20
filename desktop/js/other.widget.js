/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global editorOther, specialWidgets, pathFile, Snap, widgetCallback */

//initOtherAction();

function otherActionSave(_callback) {
    var widget = {
        content: editorOther.getValue(),
        logicalId: ($('#bsOtherActionDash').val() === "1" ? 'dashboard' : 'mobile') + ".action.other." + $('#bsOtherActionName').val(),
        name: $('#bsOtherActionName').val(),
        nbUsedBy: "0",
        path: pathFile.replace('desktop/php','core/class') + "/../template/" + ($('#bsOtherActionDash').val() === "1" ? 'dashboard' : 'mobile') + "/cmd.action.other." + $('#bsOtherActionName').val() + ".html",
        subtype: "other",
        type: "action",
        version: $('#bsOtherActionDash').val() === "1" ? 'dashboard' : 'mobile'
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
        success: function (data) { // si l'appel a bien fonctionné
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            notify("Créateur de Widget", 'widget de type action.other ' + $('#bsOtherActionName').val() + ' créé avec succès', 'success');
            if(_callback !== undefined)
                _callback(data.result.path);
        }
    });
	if($('#bsOtherActionType').val() === "1"){
		var nomWidget = $('#bsOtherActionName').val();
		$.ajax({
			type: "POST",
			url: "plugins/widget/core/ajax/widget.ajax.php",
			data: {
				action: "imageCopie",
				pathDestFils: pathFile.replace('desktop/php','core/class') + "/../template/" + ($('#bsOtherActionDash').val() === "1" ? 'dashboard' : 'mobile') + "/cmd.action.other." + nomWidget,
				name1 : $('#bsOtherImage1').val(), 
				name2 : $('#bsOtherImage2').val()
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
$('#modalOtherActionSave').on('click', function () {
    otherActionSave(widgetCallback);
    $('#modalOtherActionCancel').click();
});

function otherActionCancel() {
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
        $('#bsViewInfoBinary').empty();
        editorOther = null;
    }
}
$('#modalOtherActionCancel').on('click', function () {
    otherActionCancel();
    $('#bsOtherActionCategory').hide('fade');
    $('#bsPanelWidgetImages').show('fade');
});

$('#bsOtherSvgSpecSize').on('change', function () {
    var height, width = $(this).val();
    if (myOtherSvgPreview1.select('svg') !== null) {
        height = myOtherSvgPreview1.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myOtherSvgPreview1.select('svg').attr('height'))));
        myOtherSvgPreview1.select('svg').attr({height: height, width: width});
        var temp = '<span class="col-sm-12 text-center">H:' + width + 'px - L:' + height + 'px</span>';
        $('#bsOtherLabelSpec1').empty();
        $('#bsOtherLabelSpec1').append(temp);
    }
    if (myOtherSvgPreview2.select('svg') !== null) {
        height = myOtherSvgPreview2.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myOtherSvgPreview2.select('svg').attr('height'))));
        myOtherSvgPreview2.select('svg').attr({height: height, width: width});
        var temp = '<span class="col-sm-12 text-center">H:' + width + 'px - L:' + height + 'px</span>';
        $('#bsOtherLabelSpec2').empty();
        $('#bsOtherLabelSpec2').append(temp);
    }
    bsOtherActionType();
});

$('#bsOtherSvgSpecColor').on('change', function () {
    var color = $(this).val();
    if (myOtherSvgPreview1.select('svg') !== null) {
        myOtherSvgPreview1.selectAll('path').attr({fill: color});
    }
    if (myOtherSvgPreview2.select('svg') !== null) {
        myOtherSvgPreview2.selectAll('path').attr({fill: color});
    }
    bsOtherActionType();
});

$('#bsOtherSpecialCat1').on('change', function () {
    if($(this).val() !== '')
        setSelectPackIcones($('#bsOtherSpecial1'),$(this));
    else {
        $('#bsOtherSpecial1').children(':gt(0)').remove();
        $('#bsOtherSpecial1').val('');
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        $('.svgSpecView').prop('disabled', true);
        editorOther.setValue('');
        $('#bsOtherPreviewSpec1').attr('src', "");
        $('#bsOtherLabelSpec1').empty();
        if (myOtherSvgPreview1.select('svg') !== null)
            myOtherSvgPreview1.select('svg').remove();
        $('#modalOtherActionSave').prop('disabled',true);
     }
});

$('#bsOtherSpecialCat2').on('change', function () {
    if($(this).val() !== '')
        setSelectPackIcones($('#bsOtherSpecial2'),$(this));
    else {
        $('#bsOtherSpecial2').children(':gt(0)').remove();
        $('#bsOtherSpecial2').val('');
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        $('.svgSpecView').prop('disabled', true);
        editorOther.setValue('');
        $('#bsOtherPreviewSpec2').attr('src', "");
        $('#bsOtherLabelSpec2').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        if (myOtherSvgPreview2.select('svg') !== null)
            myOtherSvgPreview2.select('svg').remove();
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
            if (myOtherSvgPreview1.select('svg') !== null)
                myOtherSvgPreview1.select('svg').clear();
            if (myOtherSvgPreview2.select('svg') !== null)
                myOtherSvgPreview2.select('svg').clear();
            checkOtherJeedomIcon();
            break;
        case "1":
            $('.specialView').hide();
            $('.JeedomView').hide();
            $('.widgetsView').show();
            if (myOtherSvgPreview1.select('svg') !== null)
                myOtherSvgPreview1.select('svg').clear();
            if (myOtherSvgPreview2.select('svg') !== null)
                myOtherSvgPreview2.select('svg').clear();
            checkOtherWidgetImage();
            break;
        case "2":
            $('.JeedomView').hide();
            $('.widgetsView').hide();
            $('.specialView').show();
            if (myOtherSvgPreview1.select('svg') !== null)
               $('#bsOtherSpecial1').change();
            if (myOtherSvgPreview2.select('svg') !== null)
                $('#bsOtherSpecial2').change();
            checkOtherSpecial();
            break;
    }
}

function checkOtherJeedomIcon() {
    if ($('#bsOtherActionIconCmd2').html() !== '' && $('#bsOtherActionIconCmd1').html() !== '') {
        var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
        var text = getHtmlOtherJeedom(dashboard);
        editorOther.setValue(text);
        if ($('#bsOtherActionName').val() !== '')
            $('#modalOtherActionSave').prop('disabled', false);
        $('#bsOtherWidgetOff').html(text.replace(/#id#/g, "1").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "0").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOff').parent().parent().show();
        $('#bsOtherWidgetOn').html(text.replace(/#id#/g, "2").replace("#displayName#", "1").replace("jeedom.cmd.execute", "\/\/jeedom.cmd.execute").replace(/#state#/g, "1").replace("#valueName#", $('#bsOtherActionName').val()));
        $('#bsOtherWidgetOn').parent().parent().show();
		
		$('#bsOtherWidgetOff span').html($('#bsOtherActionIconCmd1').html());
		$('#bsOtherWidgetOn span').html($('#bsOtherActionIconCmd2').html());
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
        var text = getHtmlOtherImage(dashboard);
        editorOther.setValue(text);
        if ($('#bsOtherActionName').val() !== ''){
			$('#modalOtherActionSave').prop('disabled', false);
			$('#bsOtherWidgetOff').html(text.replace(/#id#/g, "3").replace(/#uid#/g, "Uid3").replace(/#displayName#/, "1").replace(/#state#/g, "1").replace(/#valueName#/, $('#bsOtherActionName').val()).replace(/#name#/g, "off").replace(/#cmdColor#/g, "#4CDFC2").replace(/#name_display#/g, "Prévisualisation"));           
			$('.cmd[data-cmd_uid=Uid3] img').attr({
				'src': 'plugins/widget/core/images/'+$('#bsOtherImage1').val()
			}).css({
				'width':'100%',
				'height':'auto'
			});
			$('#bsOtherWidgetOff').parent().parent().show();
		
			$('#bsOtherWidgetOn').html(text.replace(/#id#/g, "4").replace(/#uid#/g, "Uid4").replace(/#displayName#/, "1").replace(/#state#/g, "0").replace(/#valueName#/, $('#bsOtherActionName').val()).replace(/#name#/g, "on").replace(/#cmdColor#/g, "#4CDFC2").replace(/#name_display#/g, "Prévisualisation"));
			$('.cmd[data-cmd_uid=Uid4] img').attr({
				'src': 'plugins/widget/core/images/'+$('#bsOtherImage2').val()
			}).css({
				'width':'100%',
				'height':'auto'
			});
			$('#bsOtherWidgetOn').parent().parent().show();
		}
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
    if (    $('#bsOtherLabelSpec1').text() === $('#bsOtherLabelSpec2').text() && 
            $('#bsOtherSpecial1').val() !== '' &&
            specialWidgets[$('#bsOtherSpecialCat1').find(':selected').index() - 1].extension === specialWidgets[$('#bsOtherSpecialCat2').find(':selected').index() - 1].extension &&
            $('#bsOtherSpecial2').val() !== '') {
        var dashboard = $('#bsOtherActionDash').val() === "1" ? true : false;
        $('#bsOtherLabelSpec1').css("color","");
        $('#bsOtherLabelSpec2').css("color","");
        $('#bsOtherSpecialCat1').css("color", "");
        $('#bsOtherSpecialCat2').css("color", "");
        var text = getHtmlOtherSpecial(dashboard);
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

$('#bsOtherActionDash').on('change', function () {
    bsOtherActionType();
});

$('#bsOtherActionName').on('change', function () {
    bsOtherActionType();
});

var myOtherSvgPreview1 = Snap('#bsOtherSvgPreview1');

$('#bsOtherSpecial1').on('change', function () {
    var image = $('#bsOtherSpecial1').find(':selected').index() - 1;
    var list = $('#bsOtherSpecialCat1').find(':selected').index() - 1;
    if (image === "") {
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        editorOther.setValue('');
        $('#bsOtherPreviewSpec1').attr('src', "");
        $('#bsOtherLabelSpec1').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        return;
    }
    if (specialWidgets[list].extension !== 'svg') {
        var img = new Image();
        $('.svgSpecView').prop('disabled', true);
        img.src = "plugins/widget/core/special/" + specialWidgets[list].folder + specialWidgets[list].files[image];
        $('#bsOtherPreviewSpec1').attr('src', img.src);
        if (myOtherSvgPreview1.select('svg') !== null)
            myOtherSvgPreview1.select('svg').remove();
       img.on('load', function() {
            var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
            $('#bsOtherLabelSpec1').empty();
            $('#bsOtherLabelSpec1').append(temp);
            if (!checkOtherSpecial() && $('#bsOtherLabelSpec2').text() !== '') {
                if(specialWidgets[$('#bsOtherSpecialCat1').val()].extension === specialWidgets[$('#bsOtherSpecialCat2').val()].extension)
                    $('#bsOtherLabelSpec1').css("color", "red");
                else
                    $('#bsOtherSpecialCat1').css("color", "red");
            }
        });
    }
    else {
        $('.svgSpecView').prop('disabled', false);
        $('#bsOtherPreviewSpec1').attr('src', "");
        var snap = Snap.parse(specialWidgets[list].svg[image].snap);
        if(myOtherSvgPreview1.select('svg') !== null)
            myOtherSvgPreview1.select('svg').remove();
        myOtherSvgPreview1.append(snap);
        var width = $('#bsOtherSvgSpecSize').val();
        var height = myOtherSvgPreview1.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myOtherSvgPreview1.select('svg').attr('height'))));
        myOtherSvgPreview1.select('svg').attr({height: height, width: width});
        myOtherSvgPreview1.selectAll('path').attr({fill: $('#bsOtherSvgSpecColor').val()});
        var temp = '<span class="col-sm-12 text-center">H:' + myOtherSvgPreview1.select('svg').attr('width') + 'px - L:' + myOtherSvgPreview1.select('svg').attr('height') + 'px</span>';
        $('#bsOtherLabelSpec1').empty();
        $('#bsOtherLabelSpec1').append(temp);
        if (!checkOtherSpecial() && $('#bsOtherLabelSpec2').text() !== '') {
            if (specialWidgets[$('#bsOtherSpecialCat1').val()].extension === specialWidgets[$('#bsOtherSpecialCat2').val()].extension)
                $('#bsOtherLabelSpec1').css("color", "red");
            else
                $('#bsOtherSpecialCat1').css("color", "red");
        }
    }
});

var myOtherSvgPreview2 = Snap('#bsOtherSvgPreview2');

$('#bsOtherSpecial2').on('change', function () {
    var image = $('#bsOtherSpecial2').find(':selected').index() - 1;
    var list = $('#bsOtherSpecialCat2').find(':selected').index() - 1;
    if (image === "") {
        $('#bsOtherWidgetOff').empty();
        $('#bsOtherWidgetOn').empty();
        $('#bsOtherWidgetOff').parent().parent().hide();
        $('#bsOtherWidgetOn').parent().parent().hide();
        editorOther.setValue('');
        $('#bsOtherPreviewSpec2').attr('src', "");
        $('#bsOtherLabelSpec2').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        return;
    }
    if (specialWidgets[list].extension !== 'svg') {
        var img = new Image();
        $('.svgSpecView').prop('disabled', true);
        img.src = "plugins/widget/core/special/" + specialWidgets[list].folder + specialWidgets[list].files[image];
        $('#bsOtherPreviewSpec2').attr('src', img.src);
        if (myOtherSvgPreview2.select('svg') !== null)
            myOtherSvgPreview2.select('svg').remove();
        img.on('load', function()  {
            var temp = '<span class="col-sm-12 text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
            $('#bsOtherLabelSpec2').empty();
            $('#bsOtherLabelSpec2').append(temp);
            if (!checkOtherSpecial() && $('#bsOtherLabelSpec1').text() !== '') {
                if(specialWidgets[$('#bsOtherSpecialCat1').val()].extension === specialWidgets[$('#bsOtherSpecialCat2').val()].extension)
                    $('#bsOtherLabelSpec2').css("color", "red");
                else
                    $('#bsOtherSpecialCat2').css("color", "red");
            }
        });
    }
    else {
        $('.svgSpecView').prop('disabled', false);
        $('#bsOtherPreviewSpec2').attr('src', "");
        var snap = Snap.parse(specialWidgets[list].svg[image].snap);
        if(myOtherSvgPreview2.select('svg') !== null)
            myOtherSvgPreview2.select('svg').remove();
        myOtherSvgPreview2.append(snap);
        var width = $('#bsOtherSvgSpecSize').val();
        var height = myOtherSvgPreview2.select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myOtherSvgPreview2.select('svg').attr('height'))));
        myOtherSvgPreview2.select('svg').attr({height: height, width: width});
        myOtherSvgPreview2.selectAll('path').attr({fill: $('#bsOtherSvgSpecColor').val()});
        var temp = '<span class="col-sm-12 text-center">H:' + myOtherSvgPreview2.select('svg').attr('width') + 'px - L:' + myOtherSvgPreview2.select('svg').attr('height') + 'px</span>';
        $('#bsOtherLabelSpec2').empty();
        $('#bsOtherLabelSpec2').append(temp);
        if (!checkOtherSpecial() && $('#bsOtherLabelSpec1').text() !== '') {
            if (specialWidgets[$('#bsOtherSpecialCat1').val()].extension === specialWidgets[$('#bsOtherSpecialCat2').val()].extension)
                $('#bsOtherLabelSpec2').css("color", "red");
            else
                $('#bsOtherSpecialCat2').css("color", "red");
        }
    }
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
        editorOther.setValue('');
        $('#bsOtherPreview1').attr('src', "");
        $('#bsOtherLabel1').empty();
        $('#modalOtherActionSave').prop('disabled',true);
        return;
    }
    var img = new Image();
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsOtherPreview1').attr('src', img.src);
	$(img).on('load', function() {
        var temp = '<span class="text-center">L:' + this.width + 'px - H:' + this.height + 'px</span>';
        $('#bsOtherLabel1').empty();
        $('#bsOtherLabel1').append(temp);      
        if(!checkOtherWidgetImage() && $('#bsOtherLabel2').text() !== '')
            $('#bsOtherLabel1').css("color","red");
    });
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
        editorOther.setValue('');
        return;
    }
    var img = new Image();
    img.src = "plugins/widget/core/images/" + image + "";
    $('#bsOtherPreview2').attr('src', img.src);
    $(img).on('load', function() {
        var temp = '<span class="text-center">L:' + this.width + 'px - H:' + this.height + 'px</span>';
        $('#bsOtherLabel2').empty();
        $('#bsOtherLabel2').append(temp);
        if(!checkOtherWidgetImage() && $('#bsOtherLabel1').text() !== '')
            $('#bsOtherLabel2').css("color","red");
    });
});

function getHtmlOtherJeedom(dashboard) {
    var html = "";
    var width, height;
    var cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "0", 
                version: $('#bsOtherActionDash').val(),
                size: $('#bsOtherActionIconSize1').val(), 
                icon1: $('#bsOtherActionIconCmd1').html().replace(/\"/g, "'"), 
                icon2: $('#bsOtherActionIconCmd2').html().replace(/\"/g, "'")}) + 
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    width = $('#bsOtherActionIconSize1').val() * 20 + 15;
    height = $('#bsOtherActionIconSize1').val() * 20 + 20;
    if (dashboard) {
        html += '<div style="width:90px; min-height:80px;" class="cmd tooltips cmd-widget cursor" data-type="action" data-subtype="other" data-cmd_id="#id#" data-cmd_uid="#uid#">\n';
        html += '\t<center>\n';
        html += '\t\t<span class="cmdName" style="font-weight: bold;font-size : 12px;display: none;">#valueName#</span><br>\n';
        html += '\t\t<span style="font-size: ' + $('#bsOtherActionIconSize1').val() + 'em; font-weight: bold; margin-top: 5px;" class="iconCmd"></span>\n';
        html += '\t</center>\n';
    } 
	else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="action" data-subtype="other" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<span style="font-size: ' + $('#bsOtherActionIconSize1').val() + 'em;" class="action" id="iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
 /*       html += '\t\tif (\'#displayName#\' == \'1\') {\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#] .cmdName\').show();\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#] .cmdName\').hide();\n';
        html += '\t\t}\n';
*/
    }
/*    html += '\t\t\$(\'.iconCmd#uid#\').empty();\n';
    html += '\t\tif (\'#state#\' == \'1\') {\n';
    html += '\t\t\t$(\'.iconCmd#uid#\').append("' + $('#bsOtherActionIconCmd2').html().replace(/\"/g, "'") + '");\n';
    html += '\t\t\tif (jeedom.cmd.normalizeName(\'#name#\') == \'on\') {\n';
    html += '\t\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').hide();\n';
    html += '\t\t\t}\n';
    html += '\t\t} else {\n';
    html += '\t\t\t$(\'.iconCmd#uid#\').append("' + $('#bsOtherActionIconCmd1').html().replace(/\"/g, "'") + '");\n';
    html += '\t\t\tif (jeedom.cmd.normalizeName(\'#name#\') == \'off\') {\n';
    html += '\t\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').hide();\n';
    html += '\t\t\t}\n';
    html += '\t\t}\n';
    html += '\t\t$(\'.cmd[data-cmd_uid=#uid#] .action\').off();\n';
    html += '\t\t$(\'.cmd[data-cmd_uid=#uid#] .action\').on(\'click\', function() {\n';
    html += '\t\t\tjeedom.cmd.execute({id: \'#id#\'});\n';
    html += '\t\t});\n';
*/

	html += "	if(jeedom.cmd.normalizeName('#name#') == 'on'){\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .iconCmd').append('"+$('#bsOtherActionIconCmd2').html()+"');\n"+
			"	}else{\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .iconCmd').append('"+$('#bsOtherActionIconCmd1').html()+"');\n"+
			"	}\n"+
			"	  \n"+
			"	jeedom.cmd.update['#id#'] = function(_options){\n"+
			"		if(jeedom.cmd.normalizeName('#name#') == 'on'){	\n"+
			"		  if(parseInt(_options.display_value) >= 1 ) {\n"+
			"			  $('.cmd[data-cmd_uid=#uid#]').hide();\n"+
			"		  }else{\n"+
			"			  $('.cmd[data-cmd_uid=#uid#]').show();\n"+
			"		  }\n"+
			"		}else{\n"+
			"		  if(parseInt(_options.display_value) <= 0 ) {\n"+
			"				$('.cmd[data-cmd_uid=#uid#]').hide();\n"+
			"			}else{\n"+
			"				$('.cmd[data-cmd_uid=#uid#]').show();\n"+
			"			}\n"+
			"		}\n"+
			"	}\n"+
			"	jeedom.cmd.update['#id#']({display_value:'#state#'});\n"+
			"	\n"+
			"	$('.cmd[data-cmd_uid=#uid#] .iconCmd').on('click', function () {\n"+
			"		jeedom.cmd.execute({id: '#id#'});\n"+
			"	});\n";
			
    html += "\t<\/script>\n";
    html += '</div>\n';
    return html;
}

function getHtmlOtherImage(dashboard) {
    var html = "";
	var mobDash = $('#bsOtherActionDash').val() == 0 ? 'mobile' : 'dashboard';
    var cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "1", 
                version: $('#bsOtherActionDash').val(),
                image1: $('#bsOtherImage1').val(), 
                image2: $('#bsOtherImage2').val()}) + 
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    var width, height, image1, image2, nameWidget;
    width = $('#bsOtherPreview2').width() + 15;
    height = $('#bsOtherPreview2').height() + 15;
    image1 = $('#bsOtherImage1').val();
    image2 = $('#bsOtherImage2').val();
	nameWidget = $('#bsOtherActionName').val();
    
	if (dashboard) {
        html += '<div style="width:' + width + 'px; height:' + height + 'px; display: inline !important;" class="cmd reportModeHidden cmd-widget" data-type="action" data-subtype="other" data-cmd_id="#id#" data-cmd_uid="#uid#" data-version="#version#">\n';
    //    html += '\t<div class="row">\n';
    //    html += '\t\t<center><span class="cmdName" style="font-weight: bold;font-size : 12px;display: none;">#valueName#</span></center>\n';
    //    html += '\t\t<h5 class="action center-block iconCmd#uid#" style="vertical-align:middle;"></h5>\n';
    //    html += '\t</div>\n';
		html += '\t<a class="btn btn-sm btn-default action cmdName tooltips" title="#name#" style="background-color:#cmdColor# !important;border-color : transparent !important;"></a>\n';
    } else {
        html += '<div style="width:' + width + 'px;height:100%;vertical-align: top;"  data-version="#version#" class="cmd" data-type="action" data-subtype="other" data-cmd_id="#id#" data-cmd_uid="#uid#">\n';
    //    html += '\t<center>\n';
    //    html += '\t\t<span style="font-size: 1.1em;" class="action iconCmd#uid#"></span>\n';
    //    html += '\t</center>\n';
		html += '\t<a class="action ui-btn ui-mini ui-btn-inline ui-btn-raised" style="background-color:#cmdColor# !important;"></a>\n';
    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
    /*    html += '\t\tif (\'#displayName#\' == \'1\') {\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#] .cmdName\').show();\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').css(\'min-height\', \'' + (height + 20) + 'px\');\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#] .cmdName\').hide();\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').css(\'min-height\', \'' + height + 'px\');\n';
        html += '\t\t}\n';
   */ }
    
	
	html += "   var srcImgOn = 'plugins/widget/core/template/"+mobDash+"/cmd.action.other."+nameWidget+"/"+image2+"';\n"+
			"	var srcImgOff = 'plugins/widget/core/template/"+mobDash+"/cmd.action.other."+nameWidget+"/"+image1+"';\n"+
			"\n"+
			"	if(jeedom.cmd.normalizeName('#name#') == 'on'){\n"+
			"	  if('#state#' != ''){\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .btn').append('<img src=\"'+srcImgOff+'\">');\n"+
			"	  }else{\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .btn').append('<img src=\"'+srcImgOn+'\">');\n"+
			"	}\n"+
			"	}else{\n"+
			"		if('#state#' != ''){\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .btn').append('<img src=\"'+srcImgOn+'\">');\n"+
			"	  }else{\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .btn').append('<img src=\"'+srcImgOff+'\">');\n"+
			"	  }\n"+
			"	}\n"+
			"	\n"+
			"	jeedom.cmd.update['#id#'] = function(_options){\n"+
			"		if(parseInt(_options.display_value) != 'NaN'){\n"+
			"		  if(jeedom.cmd.normalizeName('#name#') == 'on'){\n"+
			"			if(parseInt(_options.display_value) >= 1 ) {\n"+
			"				$('.cmd[data-cmd_uid=#uid#]').hide();\n"+
			"			}else{\n"+
			"				$('.cmd[data-cmd_uid=#uid#]').show();\n"+
			"			}\n"+
			"		  }else{\n"+
			"			if(parseInt(_options.display_value) <= 0 ) {\n"+
			"				  $('.cmd[data-cmd_uid=#uid#]').hide();\n"+
			"			  }else{\n"+
			"				  $('.cmd[data-cmd_uid=#uid#]').show();\n"+
			"			  }\n"+
			"		  }\n"+
			"		}\n"+
			"	}\n"+
			"	jeedom.cmd.update['#id#']({display_value:'#state#'});\n"+
			"	\n"+
			"	$('.cmd[data-cmd_uid=#uid#]:last .action').on('click', function () {\n"+
			"		jeedom.cmd.execute({id: '#id#'});\n"+
			"	});\n";

    html += "\t<\/script>\n";
    html += '</div>\n';
    return html;
}

function getHtmlOtherSpecial(dashboard) {
    var html = "";
            ']]></script>\n';
    var width, height, image1, image2, cdata;
    var svg1 = $('#bsOtherSpecial1').find(':selected').index() - 1;
    var list1 = $('#bsOtherSpecialCat1').find(':selected').index() - 1;
    var svg2 = $('#bsOtherSpecial2').find(':selected').index() - 1;
    var list2 = $('#bsOtherSpecialCat2').find(':selected').index() - 1;
    cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "2",
                version: $('#bsOtherActionDash').val(),
                list1: $('#bsOtherSpecialCat1').val(),
                special1: $('#bsOtherSpecial1').val(),
                list2: $('#bsOtherSpecialCat2').val(),
                special2: $('#bsOtherSpecial2').val()}) +
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    if (specialWidgets[list1].extension !== 'svg') {
        width = $('#bsOtherPreviewSpec2').width() + 15;
        height = $('#bsOtherPreviewSpec2').height() + 15;
    }
    else {
        width = parseInt(myOtherSvgPreview1.select('svg').attr('width')) + 15;
        height = parseInt(myOtherSvgPreview1.select('svg').attr('height')) + 15;
        image1 = myOtherSvgPreview1.select('svg').toString();
        image2 = myOtherSvgPreview2.select('svg').toString();
    }
    if (dashboard) {
        html += '<div style="width:' + width + 'px; height:' + height + 'px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="action" data-subtype="other" data-cmd_id="#id#" data-cmd_uid="#uid#">\n';
        html += '\t<div class="row">\n';
        html += '\t\t<center><span class="cmdName" style="font-weight: bold;font-size : 12px;display: none;">#valueName#</span></center>\n';
        html += '\t\t<div class="action center-block iconCmd#uid#" style="vertical-align:middle;">\n';
        if (specialWidgets[list1].extension === 'svg') {
            html += '\t\t\t<div class="cmdSvg1#uid#">\n\t\t\t\t' + image1.replace(/\"/g, "'").replace(/(\r\n|\n|\r)/gm, "").replace(/>/g, ">\n\t\t\t\t") + '\n';
            html += '\t\t\t</div>\n';
            html += '\t\t\t<div class="cmdSvg2#uid#" style="display:none;">\n\t\t\t\t' + image2.replace(/\"/g, "'").replace(/(\r\n|\n|\r)/gm, "").replace(/>/g, ">\n\t\t\t\t") + '\n';
            html += '\t\t\t</div>\n';
        }
        html += '\t\t</div>\n';
        html += '\t</div>\n';
    }
    else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="action" data-subtype="other" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<span style="font-size: 1.1em;" class="action iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
        html += '\t\tif (\'#displayName#\' == \'1\') {\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#] .cmdName\').show();\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').css(\'min-height\', \'' + (height + 20) + 'px\');\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#] .cmdName\').hide();\n';
        html += '\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').css(\'min-height\', \'' + height + 'px\');\n';
        html += '\t\t}\n';
    }
    if (specialWidgets[list1].extension !== 'svg')
        html += '\t\t\$(\'.iconCmd#uid#\').empty();\n';
    html += '\t\tif (\'#state#\' == \'1\') {\n';
    if (specialWidgets[list1].extension !== 'svg') {
        html += '\t\t\t$(\'.iconCmd#uid#\').append(\'<img src=\'plugins/widget/core/special/' + specialWidgets[list2].folder + specialWidgets[list1].files[svg2] + '\'>\');\n';
        html += '\t\t\tif (jeedom.cmd.normalizeName(\'#name#\') == \'on\') {\n';
        html += '\t\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').hide();\n';
        html += '\t\t\t}\n';
    }
    else {
        html += '\t\t\t$(\'.cmdSvg1#uid#\').hide();\n';
        html += '\t\t\t$(\'.cmdSvg2#uid#\').show();\n';
    }
    html += '\t\t} else {\n';
    if (specialWidgets[list2].extension !== 'svg') {
        html += '\t\t\t$(\'.iconCmd#uid#\').append(\'<img src=\'plugins/widget/core/special/' + specialWidgets[list1].folder + specialWidgets[list2].files[svg1] + '\'>\');\n';
        html += '\t\t\tif (jeedom.cmd.normalizeName(\'#name#\') == \'off\') {\n';
        html += '\t\t\t\t$(\'.cmd[data-cmd_uid=#uid#]\').hide();\n';
        html += '\t\t\t}\n';
    }
    else {
        html += '\t\t\t$(\'.cmdSvg2#uid#\').hide();\n';
        html += '\t\t\t$(\'.cmdSvg1#uid#\').show();\n';
    }
    html += '\t\t}\n';
    html += '\t\t$(\'.cmd[data-cmd_uid=#uid#] .action\').off();\n';
    html += '\t\t$(\'.cmd[data-cmd_uid=#uid#] .action\').on(\'click\', function() {\n';
    html += '\t\t\tjeedom.cmd.execute({id: \'#id#\'});\n';
    html += '\t\t});\n';
    html += "\t<\/script>\n";
    html += '</div>\n';
    return html;
}
