/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global specialWidgets, editorNumeric, pathFile, Snap, widgetCallback */

//initInfoNumeric();

$('#bsInfoNumeric').slider({
    formatter: function (value) {
        return 'Valeur: ' + value;
    }
});

$('#bsInfoNumeric').on('slidestop', function () {
    bsInfoNumericType();
});

function infoNumericSave(_callback) {
    var widget = {
        content: editorNumeric.getValue(),
        logicalId: ($('#bsInfoNumericDash').val() === "1" ? 'dashboard' : 'mobile') + ".info.numeric." + $('#bsInfoNumericName').val(),
        name: $('#bsInfoNumericName').val(),
        nbUsedBy: "0",
        path: pathFile.replace('desktop/php','core/class') + "/../template/" + ($('#bsInfoNumericDash').val() === "1" ? 'dashboard' : 'mobile') + "/cmd.info.numeric." + $('#bsInfoNumericName').val() + ".html",
        type: "info",
        subtype: "numeric",
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
            if(_callback !== undefined)
                _callback(data.result.path);
        }
    });
}
$('#modalInfoNumericSave').on('click', function () {
    infoNumericSave(widgetCallback);
    $('#modalInfoNumericCancel').click();
});

function infoNumericCancel() {
    $('#bsInfoNumericPreview0').attr('src', "");
    $('#bsInfoNumericLabel0').empty();
    $('#bsInfoNumericName').val('');
    $('#bsInfoNumericImage0').val('0');
    $('#bsInfoNumericDash').val('1');
    $('#bsInfoNumericType').val('0');
    $('#bsInfoNumericSpecialCat0').val('');
    $('#bsInfoNumericSpecialIcon0').val('');
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
}
$('#modalInfoNumericCancel').on('click', function () {
    infoNumericCancel();
    $('#bsInfoNumericCategory').hide('fade');
    $('#bsPanelWidgetImages').show('fade');
});

$('#bsInfoNumericSvgSpecSize').on('change', function () {
    var height, width = $(this).val();
    for (var index = 0; index < myInfoNumericSvgPreview.length; index++) {
        if (myInfoNumericSvgPreview[index] !== null)
            if (myInfoNumericSvgPreview[index].select('svg') !== null) {
                height = myInfoNumericSvgPreview[index].select('svg').attr('height');
                height = Math.round(height * (width / parseInt(myInfoNumericSvgPreview[index].select('svg').attr('height'))));
                myInfoNumericSvgPreview[index].select('svg').attr({height: height, width: width});
                var temp = '<span class="col-sm-12 text-center">H:' + width + 'px - L:' + height + 'px</span>';
                $('#bsInfoNumericLabelSpec' + index).empty();
                $('#bsInfoNumericLabelSpec' + index).append(temp);
            }
    }
    bsInfoNumericType();
});

$('#bsInfoNumericSvgSpecColor').on('change', function () {
    var color = $(this).val();
    for (var index = 0; index < myInfoNumericSvgPreview.length; index++) {
        if (myInfoNumericSvgPreview[index] !== null)
            if (myInfoNumericSvgPreview[index].select('svg') !== null) {
                myInfoNumericSvgPreview[index].selectAll('path').attr({fill: color});
            }
    }
    bsInfoNumericType();
});

$('#bodyInfoNumeric').on('change', "select[name*='bsInfoNumericSpecialCat']", function () {
    var index = parseInt($(this).data('index'));
    if($(this).val() !== '')
        setSelectPackIcones($('#bsInfoNumericSpecialIcon' + index),$(this));
    else {
        $('#bsInfoNumericSpecialIcon' + index).children(':gt(0)').remove();
        $('#bsInfoNumericSpecialIcon' + index).val('');
        $('#bsInfoNumericPreviewSpec' + index).attr('src', "");
        $('#bsInfoNumericLabelSpec' + index).empty();
        $('#modalInfoNumericSave').prop('disabled',true);
        $('#bsInfoNumericWidgetOff').empty();
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        $('.svgSpecView').prop('disabled', true);
        editorNumeric.setValue(" ");
        if (myInfoNumericSvgPreview[index] !== null)
            if (myInfoNumericSvgPreview[index].select('svg') !== null)
                myInfoNumericSvgPreview[index].select('svg').remove();
        $('#modalInfoNumericActionSave').prop('disabled',true);
   }
});

$('#bsInfoNumericType').on('change', function () {
    bsInfoNumericType();
});

function bsInfoNumericType() {
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    switch ($('#bsInfoNumericType').val()) {
        case "0":
            $('.widgetsView').hide();
            $('.specialView').hide();
            $('.JeedomView').show();
            for (var index = 0; index < all; index++) {
                if (myInfoNumericSvgPreview[index] !== null)
                    if (myInfoNumericSvgPreview[index].select('svg') !== null)
                        myInfoNumericSvgPreview[index].select('svg').hide();
            }
            checkNumericJeedomIcon();
            break;
        case "1":
            $('.JeedomView').hide();
            $('.specialView').hide();
            $('.widgetsView').show();
            for (var index = 0; index < all; index++) {
                if (myInfoNumericSvgPreview[index] !== null)
                    if (myInfoNumericSvgPreview[index].select('svg') !== null)
                        myInfoNumericSvgPreview[index].select('svg').hide();
            }
            checkNumericWidgetImage();
            break;
         case "2":
           $('.JeedomView').hide();
            $('.widgetsView').hide();
            $('.specialView').show();
            for (var index = 0; index < all; index++) {
                if (myInfoNumericSvgPreview[index] !== null)
                    if (myInfoNumericSvgPreview[index].select('svg') !== null)
                        myInfoNumericSvgPreview[index].select('svg').show();
            }
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
        var text = getHtmlInfoNumericJeedom(dashboard);
        editorNumeric.setValue(text);
        if($('#bsInfoNumericName').val() !== '')
            $('#modalInfoNumericSave').prop('disabled', false);
        var minVal = parseInt($('#bsInfoNumericEcartMin0').val());
		var maxVal = parseInt($('#bodyInfoNumeric input[name*="bsInfoNumericEcartMax"]:last').val());
	
		var handle = $( "#custom-handle" );
		$( "#slider" ).slider({
		  min: minVal,
		  max: maxVal,
		  value: minVal,
		 slide: function( event, ui ) {
			handle.text( ui.value );
	
			
		},change: function( event, ui ) {
			if($('#bsInfoNumericWidgetOff .cmd .state').length > 0){
				jeedom.cmd.update[$('#bsInfoNumericWidgetOff div.cmd').data('cmd_id')]({display_value:$('#slider').slider('value')});
			}
		}
		});
		handle.text( $( "#slider" ).slider( "value" ) );
		text = text.replace(/#id#/g, "5").replace("#name_display#", "Prévisualisation").replace(/#uid#/g, "Uid5").replace(/#unite#/g, "°C").replace(/#state#/g, $('#slider').slider('value')).replace(/#displayHistory#/g, 'display:none;');
        
		text = text.replace("#valueName#", $('#bsInfoNumericName').val()).replace("#minValue#", minVal).replace("#maxValue#", maxVal);		
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
		var mobDash = $('#bsInfoNumericDash').val() == 0 ? 'mobile' : 'dashboard';
        var text = getHtmlInfoNumericImage(dashboard);
        editorNumeric.setValue(text);
        if($('#bsInfoNumericName').val() !== '')
            $('#modalInfoNumericSave').prop('disabled', false);
        var minVal = parseInt($('#bsInfoNumericEcartMin0').val());
		var maxVal = parseInt($('#bodyInfoNumeric input[name*="bsInfoNumericEcartMax"]:last').val());
	
		var handle = $( "#custom-handle" );
		$( "#slider" ).slider({
		  min: minVal,
		  max: maxVal,
		  value: minVal,
		 slide: function( event, ui ) {
			handle.text( ui.value );
	
			
		},change: function( event, ui ) {
			if($('#bsInfoNumericWidgetOff .cmd .state').length > 0){
				jeedom.cmd.update[$('#bsInfoNumericWidgetOff div.cmd').data('cmd_id')]({display_value:$('#slider').slider('value')});
				$('.cmd[data-cmd_uid=Uid5] img').css({
					'max-width': '50px'
				});
			}
		}
		});
		handle.text( $( "#slider" ).slider( "value" ) );
		text = text.replace(/#id#/g, "5").replace(/#name_display#/g, "Prévisualisation").replace(/#uid#/g, "Uid5").replace(/#unite#/g, "°C").replace(/#state#/g, $('#slider').slider('value')).replace(/#displayHistory#/g, 'display:none;');
        
		
		text = text.replace("#valueName#", $('#bsInfoNumericName').val()).replace("#minValue#", minVal).replace("#maxValue#", maxVal).replace("var srcImg = 'plugins/widget/core/template/"+mobDash+"/cmd.info.numeric."+$('#bsInfoNumericName').val(), "var srcImg = 'plugins/widget/core/images/");
        
		
		$('#bsInfoNumericWidgetOff').html(text);
		
		$('.cmd[data-cmd_uid=Uid5] img').css({
			'max-width': '50px'
		});
		
		$('.cmd[data-cmd_uid=Uid5]').css({
			'width':'100%',
			'height':'auto',
			'min-height':''
		});
		
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
        if ($('#bsInfoNumericSpecialCat0').val() !== "" && $('#bsInfoNumericSpecialCat' + index).val() !== "") {
            if (specialWidgets[$('#bsInfoNumericSpecialCat0').find(':selected').index() - 1].extension !== specialWidgets[$('#bsInfoNumericSpecialCat' + index).find(':selected').index() - 1].extension) {
                check = false;
                $('#bsInfoNumericSpecialCat' + index).css("color", "red");
            }
            else
                $('#bsInfoNumericSpecialCat' + index).css("color", "");
        }
    }
    if (check) {
        var dashboard = $('#bsInfoNumericDash').val() === "1" ? true : false;
        var text = getHtmlInfoNumericSpecial(dashboard);
        editorNumeric.setValue(text);
        if($('#bsInfoNumericName').val() !== '')
            $('#modalInfoNumericSave').prop('disabled', false);
        text = text.replace(/#id#/g, "5").replace("#displayName#", "1");//.replace("#state#", $('#bsInfoNumeric').bootstrapSlider('getValue'));
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

$('#bsInfoNumericDash').on('change', function () {
    bsInfoNumericType();
});

$('#bsInfoNumericName').on('change', function () {
    bsInfoNumericType();
});

var myInfoNumericSvgPreview = [];
myInfoNumericSvgPreview[0] = null;

$('#bodyInfoNumeric').on('change',"select[name*='bsInfoNumericSpecialIcon']", function () {
    var image = $(this).find(':selected').index() - 1;
    var index = $(this).data('index');
    var list = $('#bsInfoNumericSpecialCat' + index).find(':selected').index() - 1;
    if (image === "") {
        $('#bsInfoNumericPreviewSpec' + index).attr('src', "");
        $('#bsInfoNumericLabelSpec' + index).empty();
        $('#modalInfoNumericSave').prop('disabled',true);
        $('#bsInfoNumericWidgetOff').empty();
        $('#bsInfoNumericWidgetOff').parent().parent().hide();
        $('#modalInfoNumericSave').prop('disabled',true);
        editorNumeric.setValue(" ");
        return;
    }
    if (specialWidgets[list].extension !== 'svg') {
        var img = new Image();
        img.src = "plugins/widget/core/special/" + specialWidgets[list].folder + specialWidgets[list].files[image];
        $('#bsInfoNumericPreviewSpec' + index).attr('src', img.src);
        if (myInfoNumericSvgPreview[index] !== null)
            if (myInfoNumericSvgPreview[index].select('svg') !== null)
                myInfoNumericSvgPreview[index].select('svg').remove();
        img.on('load', function() {
            var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
            $('#bsInfoNumericLabelSpec' + index).empty();
            $('#bsInfoNumericLabelSpec' + index).append(temp);
            checkNumericSpecial();
        });
    }
    else {
        $('.svgSpecView').prop('disabled', false);
        $('#bsInfoNumericPreviewSpec' + index).attr('src', "");
        myInfoNumericSvgPreview[index] = Snap('#bsInfoNumericSvgPreview' + index);
        var snap = Snap.parse(specialWidgets[list].svg[image].snap);
        if(myInfoNumericSvgPreview[index].select('svg') !== null)
            myInfoNumericSvgPreview[index].select('svg').remove();
        myInfoNumericSvgPreview[index].append(snap);
        var width = $('#bsInfoNumericSvgSpecSize').val();
        var height = myInfoNumericSvgPreview[index].select('svg').attr('height');
        height = Math.round(height * (width / parseInt(myInfoNumericSvgPreview[index].select('svg').attr('height'))));
        myInfoNumericSvgPreview[index].select('svg').attr({height: height, width: width});
        myInfoNumericSvgPreview[index].selectAll('path').attr({fill: $('#bsInfoNumericSvgSpecColor').val()});
        var temp = '<span class="col-sm-12 text-center">H:' + myInfoNumericSvgPreview[index].select('svg').attr('width') + 'px - L:' + myInfoNumericSvgPreview[index].select('svg').attr('height') + 'px</span>';
        $('#bsInfoNumericLabelSpec' + index).empty();
        $('#bsInfoNumericLabelSpec' + index).append(temp);
        checkNumericSpecial();
    }
});

$('#bodyInfoNumeric').on('click',"button[name*='bsInfoNumericDel']", function () {
    var index = parseInt($(this).data('index'));
    $('#bodyInfoNumeric').children().eq(index).remove();
    if(myInfoNumericSvgPreview !== null)
        myInfoNumericSvgPreview.splice(index,1);
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
                    $(this).attr('id', 'bsInfoNumericSvgPreview' + indexTrReal);
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

function verifPlageAll(){
	$('#bodyInfoNumeric tr').each(function(i){
		var index = parseInt($("input[name*='bsInfoNumericEcartMin']",this).data('index'));
		var valMin = parseInt($("#bsInfoNumericEcartMin" + index).val());
	
		if( valMin >= parseInt($("#bsInfoNumericEcartMax" + index).val())){
			$('#bsInfoNumericEcartMax' + index).val(valMin+1);    
		}
		if(parseInt($("#bsInfoNumericEcartMin" + (index+1)).val())-1 != parseInt($("#bsInfoNumericEcartMax" + index).val()) ){
			$("#bsInfoNumericEcartMin" + (index+1)).val(parseInt($("#bsInfoNumericEcartMax" + index).val())+1);
		}
	});
	
}

$('#bodyInfoNumeric').on('change',"input[name*='bsInfoNumericEcartMax']", function () {
	verifPlageAll();
});
$('#bodyInfoNumeric').on('change',"input[name*='bsInfoNumericEcartMin']", function () {
	verifPlageAll();
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
    $(img).on('load', function() {
        var temp = '<span class="text-center">H:' + this.width + 'px - L:' + this.height + 'px</span>';
        $('#bsInfoNumericLabel' + index).empty();
        $('#bsInfoNumericLabel' + index).append(temp);      
        checkNumericWidgetImage();
    });
});

$('#bsInfoNumericAddEntry').on('click', function () {
    var index = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    var min = parseInt($('#bodyInfoNumeric').find("#bsInfoNumericEcartMax" + (index - 1)).val()) +1;
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
    html += '<input type="number" value="' + min + '" max="" data-index="' + index + '" class="form-control" name="bsInfoNumericEcartMin' + index + '" id="bsInfoNumericEcartMin' + index + '"/>';
    html += '</td>';
    html += '<td style="text-align: center; vertical-align: middle;">';
    html += '<input type="number" class="form-control" value="'+ (min+1) +'" max="" data-index="' + index + '" name="bsInfoNumericEcartMax' + index + '" id="bsInfoNumericEcartMax' + index + '"/>';
    html += '</td>';
    html += '<td style="text-align: center; vertical-align: middle;" id="bsInfoNumericSvgPreview' + index + '">';
    html += '<span style="font-size: 2.5em;font-weight: bold;margin-top: 5px;" class=" JeedomView" data-index="' + index + '" name="bsInfoNumericIconCmd' + index + '" id="bsInfoNumericIconCmd' + index + '"></span>';
    html += '<img src="" id="bsInfoNumericPreview' + index + '" class="img-responsive widgetsView" style="margin: 0px auto;">';
    html += '<img src="" id="bsInfoNumericPreviewSpec' + index + '" class="img-responsive specialView" style="margin: 0px auto;">';
    html += '</td>';
    html += '<td style=" vertical-align: middle;">';
    html += "<button type='button' class='form-control btn btn-danger' data-index='" + index + "' name='bsInfoNumericDel" + index + "' title=\"{{Supprimer l'éntrée}}\"><i class='fa fa-trash-o'></i></button>";
    html += '</td>';
    html += '</tr>';
    $('#bodyInfoNumeric').append(html);
    setSelectImage($('#bsInfoNumericImage' + index));
    setSelectPack($('#bsInfoNumericSpecialCat' + index));
    $('#modalInfoNumericSave').prop('disabled',true);
    myInfoNumericSvgPreview.push(null);
    bsInfoNumericType();
});

function getHtmlInfoNumericJeedom(dashboard) {
    var html = "", ecartMin = [], ecartMax = [], icons = [];
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    for (var index = 0; index < all; index++) {
        ecartMin.push($('#bsInfoNumericEcartMin' + index).val());
        ecartMax.push($('#bsInfoNumericEcartMax' + index).val());
        icons.push($('#bsInfoNumericIconCmd' + index).html());
    }
    var cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "0", 
                version: $('#bsInfoNumericDash').val(),
                size: $('#bsOtherActionIconSize0').val(), 
                min: ecartMin,
                max: ecartMax,
                icons: icons}) + 
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    var width, height;
    width = $('#bsInfoNumericIconSize0').val() * 20 + 15;
    height = $('#bsInfoNumericIconSize0').val() * 20 + 20;
    if (dashboard) {
        html += '<div style="min-width:120px; min-height:80px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="info" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#">\n'+
				'	<center>\n'+
				'		<div style="font-weight: bold;font-size : 12px;#hideCmdName#">#name_display#</div>\n'+
				'		<span style="font-size: '+$("#bsInfoNumericIconSize0").val()+'em;" class="iconCmd"></span>\n'+
				'		<div style="display:inline-block;">\n'+
				'			<span style="font-weight: bold;" class="pull-right">#unite#</span>\n'+
				'			<span style="font-size: 2em;font-weight: bold;" class="pull-right state"></span>\n'+
				'		</div>\n'+
				'		<div style="#displayHistory# font-size: 0.8em;" class="col-xs-12 center-block">\n'+
				'			<span title="Min" class="tooltips">#minHistoryValue#</span>|<span title="Moyenne" class="tooltips" >#averageHistoryValue#</span> | <span title="Max" class="tooltips">#maxHistoryValue#</span> <i class="#tendance#"></i>\n'+
				'		</div>\n'+
				'	</center>\n';
    }else {
        html += '<div class="cmd" data-type="info" data-version="#version#" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#">\n'+
				'	<center>\n'+
				'		<div style="font-size : 12px;#hideCmdName#">#name_display#</div>\n'+
				'		<span style="font-size: '+$("#bsInfoNumericIconSize0").val()+'em;" class="iconCmd"></span>\n'+
				'		<span style="font-size: 2em;" class="state">#state#</span>#unite#\n'+
				'	</center>\n';

    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
 /*       html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").show();\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").hide();\n';
        html += '\t\t}\n';
*/    
	}
	
	html +=	"	var iconUpdate#uid# = function (state){\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .iconCmd').empty();\n";
			
	for(var index = 0; index < all; index++) {
		html +=	"		if (state >= "+$('#bsInfoNumericEcartMin' + index).val()+" && state <= "+$('#bsInfoNumericEcartMax' + index).val()+") {\n"+
				"			$('.cmd[data-cmd_uid=#uid#] .iconCmd').append('"+$('#bsInfoNumericIconCmd' + index).html()+"');\n"+
				"		}\n";
	}
	 
	html +=	"		$('.cmd[data-cmd_uid=#uid#] .state').text(state);\n"+
			"	};\n"+
			"	jeedom.cmd.update['#id#'] = function(_options){\n"+
			"		$('.cmd[data-cmd_uid=#uid#]').attr('title','Valeur du '+_options.valueDate+', collectée le '+_options.collectDate)\n"+
			"		iconUpdate#uid#(_options.display_value);\n"+
			"	}\n"+
			"	jeedom.cmd.update['#id#']({display_value:'#state#',valueDate:'#valueDate#',collectDate:'#collectDate#',alertLevel:'#alertLevel#'});\n";
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
}

function getHtmlInfoNumericImage(dashboard) {
    var html = "", ecartMin = [], ecartMax = [], icons = [];
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    var mobDash = $('#bsInfoNumericDash').val() == 0 ? 'mobile' : 'dashboard';
	for (var index = 0; index < all; index++) {
        ecartMin.push($('#bsInfoNumericEcartMin' + index).val());
        ecartMax.push($('#bsInfoNumericEcartMax' + index).val());
        icons.push($('#bsInfoNumericImage' + index).val());
    }
    var cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "1",
                version: $('#bsInfoNumericDash').val(),
                size: $('#bsInfoNumericIconSize0').val(), 
                min: ecartMin,
                max: ecartMax,
                images: icons}) + 
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    var width, height;
    width = $('#bsInfoNumericPreview0').width() + 15;
    height = $('#bsInfoNumericPreview0').height() + 15;
    
	if (dashboard) {
        html += '<div style="min-width:120px; min-height:80px;" class="cmd tooltips cmd-widget cursor container-fluid" data-type="info" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#">\n'+
				'	<center>\n'+
				'		<div style="font-weight: bold;font-size : 12px;#hideCmdName#">#name_display#</div>\n'+
				'		<span style="font-size: '+$("#bsInfoNumericIconSize0").val()+'em;" class="iconCmd"></span>\n'+
				'		<div style="display:inline-block;">\n'+
				'			<span style="font-weight: bold;" class="pull-right">#unite#</span>\n'+
				'			<span style="font-size: 2em;font-weight: bold;" class="pull-right state"></span>\n'+
				'		</div>\n'+
				'		<div style="#displayHistory# font-size: 0.8em;" class="col-xs-12 center-block">\n'+
				'			<span title="Min" class="tooltips">#minHistoryValue#</span>|<span title="Moyenne" class="tooltips" >#averageHistoryValue#</span> | <span title="Max" class="tooltips">#maxHistoryValue#</span> <i class="#tendance#"></i>\n'+
				'		</div>\n'+
				'	</center>\n';
    }else {
        html += '<div class="cmd" data-type="info" data-version="#version#" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#">\n'+
				'	<center>\n'+
				'		<div style="font-size : 12px;#hideCmdName#">#name_display#</div>\n'+
				'		<span style="font-size: '+$("#bsInfoNumericIconSize0").val()+'em;" class="iconCmd"></span>\n'+
				'		<span style="font-size: 2em;" class="state">#state#</span>#unite#\n'+
				'	</center>\n';

    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
 /*       html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").show();\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").hide();\n';
        html += '\t\t}\n';
*/   
	}
	
	html +=	"   var srcImg = 'plugins/widget/core/template/"+mobDash+"/cmd.info.numeric."+$('#bsInfoNumericName').val()+"/';\n"+
			"	var iconUpdate#uid# = function (state){\n"+
			"		$('.cmd[data-cmd_uid=#uid#] .iconCmd').empty();\n";
			
	for(var index = 0; index < all; index++) {
		html +=	"		if (state >= "+$('#bsInfoNumericEcartMin' + index).val()+" && state <= "+$('#bsInfoNumericEcartMax' + index).val()+") {\n"+
				"			$('.cmd[data-cmd_uid=#uid#] .iconCmd').html('<img style=\"display: inline-block;\" src=\"'+srcImg+'"+ $('#bsInfoNumericImage' + index).val() + "\">');\n"+
				"		}\n";
	}
	 
	html +=	"		$('.cmd[data-cmd_uid=#uid#] .state').text(state);\n"+
			"	};\n"+
			"	jeedom.cmd.update['#id#'] = function(_options){\n"+
			"		$('.cmd[data-cmd_uid=#uid#]').attr('title','Valeur du '+_options.valueDate+', collectée le '+_options.collectDate)\n"+
			"		iconUpdate#uid#(_options.display_value);\n"+
			"	}\n"+
			"	jeedom.cmd.update['#id#']({display_value:'#state#',valueDate:'#valueDate#',collectDate:'#collectDate#',alertLevel:'#alertLevel#'});\n";
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
	
	
	
	
	
	
	
/*	
	if (dashboard) {
        html += '<div style="padding:0;width:' + width + 'px; min-height:' + height + 'px;" class="cmd #history# tooltips cmd-widget container-fluid" data-type="info" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<div class="row">\n';
        html += '\t\t<div class="center-block col-xs-12 h5 cmdName" style="margin-top:0;"><strong>#valueName#</strong></div>\n';
        html += '\t\t<div class="center-block col-xs-12 iconCmd#uid#"></div>\n';
        html += '\t</div>\n';
    }
    else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<span style="font-size: 1.1em;" class="iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
        html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").show();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + (height + 30) + 'px");\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").hide();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + (height + 10) + 'px");\n';
        html += '\t\t}\n';
    }
    html += '\t\tvar val = Math.round((#maxValue# - #minValue#) * #state# / 100)\n';
    html += '\t\t\$(".iconCmd#uid#").empty();\n';
    for (var index = 0; index < all; index++) {
        var image = $('#bsInfoNumericImage' + index).val();
        if (index === (all - 1))
            html += '\t\tif (val >= ' + $('#bsInfoNumericEcartMin' + index).val() + ' && val <= ' + $('#bsInfoNumericEcartMax' + index).val() + ') {\n';
        else
            html += '\t\tif (val >= ' + $('#bsInfoNumericEcartMin' + index).val() + ' && val < ' + $('#bsInfoNumericEcartMax' + index).val() + ') {\n';
        html += "\t\t\t$('.iconCmd#uid#').append('<img style=\"display: block;\" src=\"plugins/widget/core/images/" + image + "\"><span>'+val+'%</span>');\n";
        html += '\t\t}\n';
    }
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
*/
}

function getHtmlInfoNumericSpecial(dashboard) {
    var html = "";
    var html = "", ecartMin = [], ecartMax = [], icons = [];
    var all = $('#bodyInfoNumeric').find("select[name*='bsInfoNumericImage']").length;
    for (var index = 0; index < all; index++) {
        ecartMin.push($('#bsInfoNumericEcartMin' + index).val());
        ecartMax.push($('#bsInfoNumericEcartMax' + index).val());
        icons.push({list: $('#bsInfoNumericSpecialCat' + index).val(), icon: $('#bsInfoNumericSpecialIcon' + index).val()});
    }
    var cdata = '<!-- Ne Pas Supprimer -->\n' +
            '\t<script class="createWidgetInfo" type="text/javascript">//<![CDATA[' +
            JSON.stringify({
                type: "2",
                version: $('#bsInfoNumericDash').val(),        
                size: $('#bsInfoNumericIconSize0').val(), 
                min: ecartMin,
                max: ecartMax,
                specials: icons}) + 
            ']]></script>\n' +
            '<!-- Ne Pas Supprimer -->\n';
    var width, height, image;
    var list = $('#bsInfoNumericSpecialCat0').find(':selected').index() - 1;
    if (specialWidgets[list].extension !== 'svg') {
        width = $('#bsInfoNumericPreviewSpec0').width() + 15;
        height = $('#bsInfoNumericPreviewSpec0').height() + 15;
    }
    else {
        width = parseInt(myInfoNumericSvgPreview[0].select('svg').attr('width')) + 15;
        height = parseInt(myInfoNumericSvgPreview[0].select('svg').attr('height')) + 15;
    }
    if (dashboard) {
        html += '<div style="padding:0;width:' + width + 'px; min-height:' + height + 'px;" class="cmd #history# tooltips cmd-widget container-fluid" data-type="info" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<div class="row">\n';
        html += '\t\t<div class="center-block col-xs-12 h5 cmdName" style="margin-top:0;"><strong>#valueName#</strong></div>\n';
        html += '\t\t<div class="center-block col-xs-12 iconCmd#uid#">\n';
        if (specialWidgets[list].extension === 'svg') {
            for (var index = 0; index < all; index++) {
                image = myInfoNumericSvgPreview[index].select('svg').toString();
                html += '\t\t\t<div name="cmdSvg#uid#' + index + '">\n\t\t\t\t' + image.replace(/\"/g, "'").replace(/(\r\n|\n|\r)/gm, "").replace(/>/g, ">\n\t\t\t\t") + '\n';
                html += '\t\t\t</div>\n';
            }
        }
        html += '\t\t</div>\n';
        if (specialWidgets[list].extension === 'svg')
            html += '\t<span class="cmdTextSvg#uid#"></span>\n';
        html += '\t</div>\n';
    }
    else {
        html += '<div style="width:' + width + 'px;height:100%;" class="cmd #history# tooltips" data-type="info" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#" title="#collectDate#">\n';
        html += '\t<center>\n';
        html += '\t\t<span style="font-size: 1.1em;" class="iconCmd#uid#"></span>\n';
        html += '\t</center>\n';
    }
    html += cdata;
    html += '\t<script>\n';
    if (dashboard) {
        html += '\t\tif ("#displayName#" == "1") {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").show();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + (height + 30) + 'px");\n';
        html += '\t\t} else {\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#] .cmdName").hide();\n';
        html += '\t\t\t$(".cmd[data-cmd_uid=#uid#]").css("min-height", "' + (height + 10) + 'px");\n';
        html += '\t\t}\n';
    }
    html += '\t\tvar val = Math.round((#maxValue# - #minValue#) * #state# / 100)\n';
    if (specialWidgets[list].extension !== 'svg')
        html += '\t\t\$(".iconCmd#uid#").empty();\n';
    for (var index = 0; index < all; index++) {
        var listItem = $('#bsInfoNumericSpecialCat' + index).find(':selected').index() - 1;
        var svg = $('#bsInfoNumericSpecialIcon' + index).find(':selected').index() - 1;
        if (index === (all - 1))
            html += '\t\tif (val >= ' + $('#bsInfoNumericEcartMin' + index).val() + ' && val <= ' + $('#bsInfoNumericEcartMax' + index).val() + ') {\n';
        else
            html += '\t\tif (val >= ' + $('#bsInfoNumericEcartMin' + index).val() + ' && val < ' + $('#bsInfoNumericEcartMax' + index).val() + ') {\n';
        if (specialWidgets[list].extension !== 'svg')
            html += "\t\t\t$('.iconCmd#uid#').append('<img style=\"display: block;\" src=\"plugins/widget/core/special/" + specialWidgets[listItem].folder + specialWidgets[listItem].files[svg] + "\"><span>'+val+'%</span>');\n";
        else {
            html += "\t\t\t$('div[name*=\"cmdSvg#uid#\"]').hide();\n";
            html += "\t\t\t$('div[name=\"cmdSvg#uid#" + index + "\"]').show();\n";
            html += "\t\t\t$('.cmdTextSvg#uid#').text(val + \"%\");\n";
        }

        html += '\t\t}\n';
    }
    html += '\t</script>\n';
    html += '</div>\n';
    return html;
}
