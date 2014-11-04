<?php
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

if (!isConnect('admin')) {
    throw new Exception('{{401 - Accès non autorisé}}');
}

if (init('path') == '') {
    throw new Exception('{{Aucun widget fourni}}');
}
$widget = widget::byPath(init('path'));
if (!is_object($widget)) {
    throw new Exception('{{Widget non trouvé}}');
}
include_file('3rdparty', 'jquery.tablesorter/theme.bootstrap', 'css');
include_file('3rdparty', 'jquery.tablesorter/jquery.tablesorter.min', 'js');
include_file('3rdparty', 'jquery.tablesorter/jquery.tablesorter.widgets.min', 'js');
?>
<div style="display: none;" id="md_fileManageAlert"></div>
<span style="display: none;" class="md_fileMangeAttr" data-l1key="path"><?php echo $widget->getPath(); ?></span>
<input class="btn btn-warning pull-right" style="color: white;" id="bt_fileManageUpload" type="file" name="file" data-url="plugins/widget/core/ajax/widget.ajax.php?action=fileupload&path=<?php echo urlencode($widget->getPath()); ?>">
<br/><br/><br/>
<table class="table table-bordered table-condensed tablesorter" id="table_mdFileManage">
    <thead>
        <tr>
            <th>{{Nom du fichier}}</th>
            <th>{{Chemin}}</th>
            <th>{{Action}}</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
</table>

<script>
    dipalyFileManageList();
    $('#bt_fileManageUpload').fileupload({
        replaceFileInput: false,
        dataType: 'json',
        done: function(e, data) {
            if (data.result.state != 'ok') {
                $('#md_fileManageAlert').showAlert({message: data.result.result, level: 'danger'});
                return;
            }
            $('#md_fileManageAlert').showAlert({message: '{{Fichier(s) ajouté(s) avec succes}}', level: 'success'});
            dipalyFileManageList();
        }
    });

    function dipalyFileManageList() {
        $.ajax({// fonction permettant de faire de l'ajax
            type: "POST", // methode de transmission des données au fichier php
            url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
            data: {
                action: "list3rdparty",
                path: $('.md_fileMangeAttr[data-l1key=path]').value(),
            },
            dataType: 'json',
            error: function(request, status, error) {
                handleAjaxError(request, status, error, $('#md_fileManageAlert'));
            },
            success: function(data) { // si l'appel a bien fonctionné
                if (data.state != 'ok') {
                    $('#md_fileManageAlert').showAlert({message: data.result, level: 'danger'});
                    return;
                }
                $('#table_mdFileManage tbody').empty();
                var tr = '';
                for (var i in data.result) {
                    tr += '<tr data-path="' + encodeURI(data.result[i].path) + '" data-name="' + data.result[i].name + '">';
                    tr += '<td>';
                    tr += data.result[i].name;
                    tr += '</td>';
                    tr += '<td>';
                    tr += data.result[i].relativePath;
                    tr += '</td>';
                    tr += '<td>';
                    tr += '<a class="btn btn-danger btn-xs pull-right bt_remove3rdpartyFile" style="color : white;"><i class="fa fa-minus-circle"></i></a>';
                    tr += '</td>';
                    tr += '</tr>';
                }
                $('#table_mdFileManage tbody').append(tr);
            }
        });
    }

    $('#table_mdFileManage tbody').delegate('.bt_remove3rdpartyFile', 'click', function() {
        var path = $(this).closest('tr').attr('data-path');
        var name = $(this).closest('tr').attr('data-name');
        bootbox.confirm('{{Etes-vous sûr de vouloir supprimer le fichier}} <span style="font-weight: bold ;">' + name + '</span> ?', function(result) {
            if (result) {
                $.ajax({// fonction permettant de faire de l'ajax
                    type: "POST", // methode de transmission des données au fichier php
                    url: "plugins/widget/core/ajax/widget.ajax.php", // url du fichier php
                    data: {
                        action: "remove3rdparty",
                        path: path,
                    },
                    dataType: 'json',
                    error: function(request, status, error) {
                        handleAjaxError(request, status, error, $('#md_fileManageAlert'));
                    },
                    success: function(data) { // si l'appel a bien fonctionné
                        if (data.state != 'ok') {
                            $('#md_fileManageAlert').showAlert({message: data.result, level: 'danger'});
                            return;
                        }
                        $('#md_fileManageAlert').showAlert({message: '{{Fichier supprimé avec succes}}', level: 'success'});
                        dipalyFileManageList();
                    }
                });
            }
        });
    });

</script>