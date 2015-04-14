/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global jeedom, bootbox */

var fontsWidgets = [];

var firstCheckStyleCss = true;

$('#bt_WidgetFont').fileupload({
    dataType: 'json',
    dropZone: "#bsPanelWidgetFonts",
    done: function (e, data) {
        if (data.result.state !== 'ok') {
            $('#div_alert').showAlert({message: data.result.result, level: 'danger'});
            return;
        }
        notify("{{Ajout d'une Font}}", "{{Font ajoutée avec succès}}", 'success');
        updateListFonts();
    }
});

$('#bt_WidgetFontInit').on('click',function() {
    removeStyleCss();
});

$('#bsFontsView').on('click', '.bsDelFont', function (event) {
    var delFont = parseInt($(this).data('font'));
    bootbox.confirm("Etes-vous sur de vouloir effacer cette Font", function (result) {
        if (result) {
            $.ajax({
                type: "POST",
                url: "plugins/widget/core/ajax/widget.ajax.php",
                data: {
                    action: "removeFont",
                    font: fontsWidgets[delFont].file
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
                    if (data.result === true) {
                        updateListFonts();
                    }
                    else {
                        notify("{{Suppression d'une Font}}", "{{Impossible de supprimer la Font: }}" + fontsWidgets[delFont].file, 'warning');
                    }

                }
            });
        }
    });
});

function htmlFontFace(font) {
    var filename = init(font);
    if(filename === "")
        return;
    filename = filename.split('.');
    var html = '';
    html += "@font-face {\n";
    html += "\tfont-family: '" + filename[0] + "';\n";
        if (filename[1] === "ttf")
            html += "\tsrc:url('fonts/" + font + "') format('truetype');\n";
        else if (filename[1] === "woff")
            html += "\tsrc:url('fonts/" + font + "') format('woff');\n";
    html += "\tfont-weight: normal;\n";
    html += "\tfont-variant: normal;\n";
    html += "\tfont-style: normal;\n";
    html += "}\n";
    html += '[class="' + filename[0] + '"] {\n';
    html += "\tfont-family: '" + filename[0] + "';\n";
    html += "\tspeak: none;\n";
    html += "\ttext-transform: none;\n";
    html += "\tline-height: 1;\n";
    html += "}\n";
    return html;
}


function getHtmlSelectStyle(select) {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "listFont"
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            var options = '<option value="">{{Aucune}}</option>';
            if (data.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                select.html(options);
                return;
            }
            for (var i in data.result) {
                var filename = data.result[i].split('.');
                options += '<option value="' + filename[0] + '">' + data.result[i] + '</option>';
            }
            select.html(options);
        }
    });
}

function updateListFonts() {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "listFont"
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
            fontsWidgets = [];
            var fonts = '';
            for (var i in data) {
            }
            for (var i in data.result) {
                var filename = data.result[i].split('.');
                fontsWidgets.push({'file': data.result[i],'name': filename[0], 'extension': filename[1], 'html':htmlFontFace(data.result[i])});
                fonts += '<div class="media-left col-sm-3" style="min-width: 105px">';
                fonts += '<div class="well col-sm-12 noPaddingWell noPaddingLeft noMarginBottom">';
                fonts += '<button type="button" class="pull-left btn btn-xs btn-danger bsDelFont" data-font="' + i + "\" title=\"{{Supprimer la Font}}\"><i class='fa fa-trash-o'></i></button>";
                fonts += "<span class=\"pull-right\" style=\"font-family: '" + filename[0] + "';\">" + filename[0] + "</span>";
                fonts += '</div>';
                fonts += "<div class=\"text-center\" style=\"font-family: '" + filename[0] + "'; font-size: 2.5em\">012345</div>";
                fonts += "<div class=\"text-center\" style=\"font-family: '" + filename[0] + "'; font-size: 2.5em\">ABCDEF</div>";
                fonts += "<div class=\"text-center\" style=\"font-family: '" + filename[0] + "'; font-size: 2.5em\">abcdef</div>";
                fonts += '</div>';
            }
            $('#bsFontsView').html('<div class="media">' + fonts + '</div>');
            if (firstCheckStyleCss === true) {
                firstCheckStyleCss = false;
                checkStyleCss();
            }
            else
            {
                createStyleCss();
            }
        }
    });
}

function checkStyleCss() {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "checkStyleCss"
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
            if(data.result === false) {
                createStyleCss();
            }
            
        }
    });
}

function removeStyleCss() {
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "removeStyleCss"
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
            if(data.result === true) {
                createStyleCss();
            }
            else {
                notify("{{Fichier style.css}}", "{{impossible d'effacer le fichier style.css}}", 'danger');
            }
            
        }
    });
}

function createStyleCss() {
    var html = '';
    for(var index in fontsWidgets) {
        html += fontsWidgets[index].html;
    }
    $.ajax({
        type: "POST",
        url: "plugins/widget/core/ajax/widget.ajax.php",
        data: {
            action: "createStyleCss",
            html: html
        },
        dataType: 'json',
        error: function (request, status, error) {
            handleAjaxError(request, status, error);
        },
        success: function (data) {
            if (data.state !== 'ok' || data.result === false) {
                $('#div_alert').showAlert({message: data.result, level: 'danger'});
                return;
            }
            notify("{{Fichier style.css}}", "{{Création du fichier de style réussi}}", 'success');
            var vars = getUrlVars();
            var url = 'index.php?';
            for (var i in vars) {
                if (i !== 'id' && i !== '' && i !== 'saveSuccessFull' && i !== 'removeSuccessFull') {
                    url += i + '=' + vars[i].replace('#', '') + '&';
                }
            }
            url = url.substring(0, url.length - 1);
            window.location.href = url;
        }
    });
}
