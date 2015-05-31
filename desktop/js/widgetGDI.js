/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global CodeMirror, editor, Infinity, pathFile, bootbox */

$('#bsListWidgets').jeedomBarDialog({
    'close': false, 
    'dockable': true, 
    'accordeon': true, 
    'width': 400});
$('#bsListWidgets').jeedomBarDialog('dock', -7, '<i class="fa fa-square"></i>');
$('#widgetFontsView').jeedomBarDialog({
    'target': '#bsListWidgets',
    'dockable': true, 
    'posDock': '-8', 
    'dockText': '<i class="icon divers-numbers"></i>', 
    'multi': true, 
    'accordeon': true, 
    'width': 300});
$('#widgetFontsView').jeedomBarDialog('setModal',{
    'modal': '#bsPanelWidgetFonts',
    'width': 660,
    'header': 'Fonts'
});

$('#widgetDetailsView').jeedomBarDialog({
    'target': '#bsListWidgets', 
    'dockable': true, 
    'multi': true, 
    'posDock': '-9', 
    'dockText': '<i class="fa fa-square"></i>', 
    'accordeon': true, 
    'height': 'auto', 
    'width': 1000});
/*$('#widgetDetailsView').jeedomBarDialog('setModal',{
    'modal': '#widgetCodeView',
    'width': 660,
    'header': 'Code'
});*/

$('#bsEasyModeView').jeedomBarDialog({
    'target': '#bsListWidgets', 
    'dockable': true, 
    'multi': true, 
    'posDock': '-10', 
    'dockText': '<i class="fa fa-picture-o"></i>', 
    'accordeon': true, 
    'width': 350});
$('#bsEasyModeView').jeedomBarDialog('setModal',{
    'modal': '#bsPanelWidgetImages',
    'width': 800,
    'header': 'Bibliothèques'
});
$('#bsEasyModeView').jeedomBarDialog('setModal',{
    'modal': '#bsOtherActionCategory',
    'width': 830,
    'header': 'Widget Other.Action'
});
$('#bsEasyModeView').jeedomBarDialog('setModal',{
    'modal': '#bsInfoBinaryCategory',
    'width': 830,
    'header': 'Widget Info.Binary'
});
$('#bsEasyModeView').jeedomBarDialog('setModal',{
    'modal': '#bsInfoNumericCategory',
    'width': 830,
    'header': 'Widget Info.Numeric'
});

$('#bsHaloCategory').jeedomBarDialog({
    'target': '#bsListWidgets', 
    'dockable': true, 
    'multi': true, 
    'posDock': '-11', 
    'dockText': '<i class="icon jeedom-lumiere-on"></i>', 
    'accordeon': true, 
    //'height': 'auto', 
    'width': 300});

getSideBarListGDI();
fontsColByLine = 6;
$('#widgetCodeView').resizable({
    resize: function (event, ui) {
        if (editor !== null)
            editor.setSize($('#widgetCodeView').innerWidth() - 30, $('#widgetCodeView').innerHeight() - 60);
    },
    stop: function (event, ui) {
    }
});
$('.widgetAction[data-action=addGDI]').on('click', function () {
    $.hideAlert();
    bootbox.prompt("Nom du widget ?", function (result) {
        if (result !== null) {
            addWidget(result, widgetGDICallback());
        }
    });
});
$('.widgetAction[data-action=createGDI]').on('click', function () {
    $('#widgetFontsView').jeedomBarDialog('closeAccordeon');
    $('#widgetDetailsView').jeedomBarDialog('hide');
    $('#bsEasyModeView').jeedomBarDialog('show');
    $('#bsEasyModeView').jeedomBarDialog('showModal','EasyModeView');
});
$('.widgetAction[data-action=fontsGDI]').on('click', function () {
    $('#widgetDetailsView').jeedomBarDialog('hide');
    $('#bsEasyModeView').jeedomBarDialog('closeAccordeon');
    $('#widgetFontsView').jeedomBarDialog('show');
    $('#widgetFontsView').jeedomBarDialog('showModal','Liste');
    updateListImagesThemes();
});

$("#ul_widget").on('click', ".li_widgetGDI", function (event) {
    $('.li_widgetGDI').removeClass('active');
    $(this).addClass('active');
    printWidget($(this).attr('data-path'), printWidgetGDICallback);
    $('#widgetFontsView').jeedomBarDialog('hide');
    $('#bsEasyModeView').jeedomBarDialog('hide');
    $('#widgetDetailsView').jeedomBarDialog('show');
    setTimeout(function () {
        editor.setSize('100%', '100%');
    }, 500);
});

$('#bt_OtherActionAddGDI').on('click', function () {
    if (editorOther === null) {
        editorOther = CodeMirror.fromTextArea(document.getElementById("bsViewOther"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
    $('#bsOtherActionName').parent().removeClass('has-error');
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
    $('#bsEasyModeView').jeedomBarDialog('hideModal','EasyModeView');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Other');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Binary');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Numeric');
    setTimeout(function() {
        $('#bsEasyModeView').jeedomBarDialog('showModal','Other');
    }, 500);
});
$('#bt_InfoBinaryAddGDI').on('click', function () {
    if (editorBinary === null) {
        editorBinary = CodeMirror.fromTextArea(document.getElementById("bsViewInfoBinary"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
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
    $('#bsEasyModeView').jeedomBarDialog('hideModal','EasyModeView');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Other');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Binary');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Numeric');
    setTimeout(function() {
        $('#bsEasyModeView').jeedomBarDialog('showModal','Binary');
    }, 500);
});
$('#bt_InfoNumericAddGDI').on('click', function () {
    if (editorNumeric === null) {
        editorNumeric = CodeMirror.fromTextArea(document.getElementById("bsViewInfoNumeric"), {
            lineNumbers: true,
            mode: "text/html",
            matchBrackets: true,
            viewportMargin: Infinity
        });
    }
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
    $('#bsEasyModeView').jeedomBarDialog('hideModal','EasyModeView');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Other');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Numeric');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Binary');
    setTimeout(function() {
        $('#bsEasyModeView').jeedomBarDialog('showModal','Numeric');
    }, 500);
});
$('.bsHaloSlider').on('slideStop', function () {
    $('#bsHaloCreate').css({
        'width': $('#bsHaloWidth').bootstrapSlider('getValue') + 'px',
        'height': $('#bsHaloHeight').bootstrapSlider('getValue') + 'px',
        'box-shadow': $('#bsHaloColor').colorpicker('getValue') + ' ' + $('#bsHaloAxeX').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloAxeY').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSize').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSizeShadow').bootstrapSlider('getValue') + 'px',
        'background': $('#bsHaloColor').colorpicker('getValue')
    });
});
$('.bsHaloSlider').on('slide', function () {
    $('#bsHaloCreate').css({
        'width': $('#bsHaloWidth').bootstrapSlider('getValue') + 'px',
        'height': $('#bsHaloHeight').bootstrapSlider('getValue') + 'px',
        'box-shadow': $('#bsHaloColor').colorpicker('getValue') + ' ' + $('#bsHaloAxeX').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloAxeY').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSize').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSizeShadow').bootstrapSlider('getValue') + 'px',
        'background': $('#bsHaloColor').colorpicker('getValue')
    });
});
$('#bt_HaloAddGDI').on('click', function () {
    $('.bsHaloSlider').bootstrapSlider({
        tooltip: 'hide'
            });
    $('.bsHaloColor').colorpicker({format: 'rgba'})
            .on('changeColor', function () {
                console.log($('#bsHaloColor').colorpicker('getValue') + ' ' + $('#bsHaloAxeX').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloAxeY').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSize').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSizeShadow').bootstrapSlider('getValue') + 'px');
                $('#bsHaloCreate').css({
                    'width': $('#bsHaloWidth').bootstrapSlider('getValue') + 'px',
                    'height': $('#bsHaloHeight').bootstrapSlider('getValue') + 'px',
                    'box-shadow': $('#bsHaloColor').colorpicker('getValue') + ' ' + $('#bsHaloAxeX').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloAxeY').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSize').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSizeShadow').bootstrapSlider('getValue') + 'px',
                    'background': $('#bsHaloColor').colorpicker('getValue')
                });
            });
    $('#bsHaloCreate').css({
        'width': $('#bsHaloWidth').bootstrapSlider('getValue') + 'px',
        'height': $('#bsHaloHeight').bootstrapSlider('getValue') + 'px',
        'box-shadow': $('#bsHaloColor').colorpicker('getValue') + ' ' + $('#bsHaloAxeX').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloAxeY').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSize').bootstrapSlider('getValue') + 'px' + ' ' + $('#bsHaloSizeShadow').bootstrapSlider('getValue') + 'px',
        'background': $('#bsHaloColor').colorpicker('getValue')
    });
    $('#bsListWidgets').jeedomBarDialog('dock');
    $('#bsEasyModeView').jeedomBarDialog('dock');
    $('#bsHaloCategory').jeedomBarDialog('show');
    $('#bsHaloCreate').show();
    $('#bsHaloCreate').position({
        my: "left top",
        at: "left bottom+5",
        of: "#bsHaloCategory",
        collision: "none none"
    });
    $('#bsHaloCreate').draggable();
});

function getSideBarListGDI(_path) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "sidebar",
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
            if(_path !== undefined)
                $('#ul_widget [data-path="' + _path + '"]').addClass('active');
            $('.li_widget').addClass('li_widgetGDI').removeClass('li_widget');
            $('.filterAcionWidget').change();
        }
    });
}

$('#modalOtherActionSaveGDI').on('click', function () {
    if($('#bsOtherActionName').val() === '') {
        $('#bsOtherActionName').parent().addClass('has-error');
        notify("Créateur de Widget", 'widget de type action.other nom manquant', 'warning');
        return;
    }
    else
        $('#bsOtherActionName').parent().removeClass('has-error');
    if(editorOther.getValue() === '') {
        notify("Créateur de Widget", 'widget de type action.other code manquant', 'warning');
        return;
    }
    otherActionSave(widgetGDICallback);
});
$('#modalInfoBinarySaveGDI').on('click', function () {
    if($('#bsInfoBinaryName').val() === '') {
        $('#bsInfoBinaryName').parent().addClass('has-error');
        notify("Créateur de Widget", 'widget de type info.binary nom manquant', 'warning');
        return;
    }
    else
        $('#bsInfoBinaryName').parent().removeClass('has-error');
    if(editorBinary.getValue() === '') {
        notify("Créateur de Widget", 'widget de type info.binary code manquant', 'warning');
        return;
    }
    infoBinarySave(widgetGDICallback);
});
$('#modalInfoNumericSaveGDI').on('click', function () {
    if($('#bsInfoNumericName').val() === '') {
        $('#bsInfoNumericName').parent().addClass('has-error');
        notify("Créateur de Widget", 'widget de type info.numeric nom manquant', 'warning');
        return;
    }
    else
        $('#bsInfoNumericName').parent().removeClass('has-error');
    if(editorNumeric.getValue() === '') {
        notify("Créateur de Widget", 'widget de type info.numeric code manquant', 'warning');
        return;
    }
    infoNumericSave(widgetGDICallback);
});
$('#modalOtherActionCancelGDI').on('click', function () {
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Numeric');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Other');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Binary');
    otherActionCancel();
    setTimeout(function() {
        $('#bsEasyModeView').jeedomBarDialog('showModal','EasyModeView');
    }, 310);
});
$('#modalInfoBinaryCancelGDI').on('click', function () {
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Numeric');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Other');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Binary');
    infoBinaryCancel();
    setTimeout(function() {
        $('#bsEasyModeView').jeedomBarDialog('showModal','EasyModeView');
    }, 310);
});
$('#modalInfoNumericCancelGDI').on('click', function () {
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Numeric');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Other');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Binary');
    infoNumericCancel();
    setTimeout(function() {
        $('#bsEasyModeView').jeedomBarDialog('showModal','EasyModeView');
    }, 310);
});

function widgetGDICallback(_path) {
    $('.li_widgetGDI').removeClass('active');
    $('.li_widgetGDI[data-path="' + _path + '"]').addClass('active');
    getSideBarListGDI(_path);
    if (_path !== undefined && _path !== '') {
        printWidget(_path, printWidgetGDICallback);
        $('#widgetFontsView').jeedomBarDialog('hide');
        $('#bsEasyModeView').jeedomBarDialog('hide');
        $('#widgetDetailsView').jeedomBarDialog('show');
        setTimeout(function () {
            editor.setSize('100%', '100%');
        }, 500);
    }
    else
        $('#widgetDetailsView').jeedomBarDialog('hide');
}
function printWidgetGDICallback(data) {
    $('#bt_editWidgetGDI').hide();
    if (editor === null) {
        setTimeout(function () {
            if (editor !== null) {
                var textWidget = editor.getValue().match(/\[CDATA\[(.*)\]]/);
                if (is_array(textWidget)) {
                    $('#bt_editWidgetGDI').show();
                }
            }
        }, 1);
    } else {
        if (isset(data.result.content)) {
            var textWidget = data.result.content.match(/\[CDATA\[(.*)\]]/);
            if (is_array(textWidget)) {
                $('#bt_editWidgetGDI').show();
            }
        }
    }
}

$('.widgetAction[data-action=saveGDI]').on('click', function () {
    saveWidget(widgetGDICallback);
});
$('.widgetAction[data-action=removeGDI]').on('click', function () {
    bootbox.confirm('{{Etes-vous sûr de vouloir supprimer le widget}} <span style="font-weight: bold ;">' + $('.widgetAttr[data-l1key=name]').value() + '</span> ?', function (result) {
        if (result) {
            removeWidget($('.widgetAttr[data-l1key=path]').value(), widgetGDICallback);
        }
    });
});
$('.widgetAction[data-action=copyGDI]').on('click', function () {
    bootbox.prompt("{{Nom la copie du widget ?}}", function (result) {
        if (result) {
            copyWidget($('.widgetAttr[data-l1key=path]').value(), result, widgetGDICallback);
        }
    });
});
$('#bt_editWidgetGDI').on('click', function () {
    var textWidget = null;
    if (editor !== null)
        textWidget = editor.getValue().match(/\[CDATA\[(.*)\]]/);
    else
        textWidget = $('#ta_script').val().match(/\[CDATA\[(.*)\]]/);
    if(!is_array(textWidget))
        return; //erreur impossible normalement
    $('#widgetFontsView').jeedomBarDialog('closeAccordeon');
    $('#widgetDetailsView').jeedomBarDialog('hide');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','EasyModeView');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Other');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Binary');
    $('#bsEasyModeView').jeedomBarDialog('hideModal','Numeric');
    $('#bsEasyModeView').jeedomBarDialog('show');
    var widgetDetails = JSON.parse(textWidget[1]);
    var widget = $('.widget').getValues('.widgetAttr');
    widget = widget[0];
    widgetDetails.name = widget.name;
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
            $('#bsOtherSvgSpecColor').val('#000');
            $('#bsOtherSvgSpecSize').val('64');
            setSelectImage($('#bsOtherImage1'));
            setSelectImage($('#bsOtherImage2'));
            setSelectPack($('#bsOtherSpecialCat1'));
            setSelectPack($('#bsOtherSpecialCat2'));
            $('#bsOtherActionCategory').setValues(widgetDetails, '.actionOtherAttr');
            $('#bsEasyModeView').jeedomBarDialog('showModal', 'Other');
            setTimeout(function () {
                editorOther.setSize('100%', '100%');
            }, 310);
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
            $('#bsInfoBinarySvgSpecColor').val('#000');
            $('#bsInfoBinarySvgSpecSize').val('64');
            setSelectImage($('#bsInfoBinaryImage1'));
            setSelectImage($('#bsInfoBinaryImage2'));
            setSelectPack($('#bsInfoBinarySpecialCat1'));
            setSelectPack($('#bsInfoBinarySpecialCat2'));
            $('#bsInfoBinaryCategory').setValues(widgetDetails, '.infoBinaryAttr');
            $('#bsEasyModeView').jeedomBarDialog('showModal', 'Binary');
            setTimeout(function () {
                editorBinary.setSize('100%', '100%');
            }, 310);
            bsInfoBinaryType();
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
            $('#bsInfoNumericSvgSpecColor').val('#000');
            $('#bsInfoNumericSvgSpecSize').val('64');
            var all = widgetDetails.min.length;
            setSelectImage($('#bsInfoNumericImage0'));
            setSelectPack($('#bsInfoNumericSpecialCat0'));
            for (var index = 0; index < all; index++) {
                if (index > 0)
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
            $('#bsEasyModeView').jeedomBarDialog('showModal', 'Numeric');
            setTimeout(function () {
                editorNumeric.setSize('100%', '100%');
            }, 310);
            bsInfoNumericType();
            break;
    }
});
