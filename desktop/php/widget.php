<?php
if (!isConnect('admin')) {
    throw new Exception('{{401 - Accès non autorisé}}');
}
include_file('3rdparty', 'codemirror/lib/codemirror', 'js');
include_file('3rdparty', 'codemirror/lib/codemirror', 'css');
include_file('3rdparty', 'codemirror/addon/edit/matchbrackets', 'js');
include_file('3rdparty', 'codemirror/mode/htmlmixed/htmlmixed', 'js');
include_file('3rdparty', 'codemirror/mode/xml/xml', 'js');
include_file('3rdparty', 'codemirror/mode/javascript/javascript', 'js');
include_file('3rdparty', 'codemirror/mode/css/css', 'js');
include_file('3rdparty', 'jquery.fileupload/jquery.ui.widget', 'js');
include_file('3rdparty', 'jquery.fileupload/jquery.iframe-transport', 'js');
include_file('3rdparty', 'jquery.fileupload/jquery.fileupload', 'js');
?>
<style>
    .CodeMirror {
        border: 1px solid #eee;
        height: auto;
    }
    .CodeMirror-scroll {
        overflow-y: hidden;
        overflow-x: auto;
    }

    li.li_widget.active{
        color: white;
        background-color: #178FE5;
        text-decoration-color: white;
    }

    li.li_widget.active a{
        color: white;
        background-color: #178FE5;
        text-decoration-color: white;
    }

    li a{
        text-decoration: none;
        margin-left: 4px;
    }

</style>

<div class="row row-overflow">
    <div class="col-lg-2 col-md-3 col-sm-4">
        <div class="bs-sidebar">
            <ul id="ul_widget" class="nav nav-list bs-sidenav">
                <a class="btn btn-default btn-sm tooltips" id="bt_getFromMarket" title="{{Récuperer du market}}" style="width : 100%"><i class="fa fa-shopping-cart"></i> {{Market}}</a>
                <a class="btn btn-default widgetAction" style="width : 100%;margin-top : 5px;margin-bottom: 5px;" data-action="add"><i class="fa fa-plus-circle"></i> {{Ajouter un widget}}</a>
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse_dashboard">
                                    Dashboard
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_dashboard" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <?php
                                foreach (widget::listWidget('dashboard') as $widget) {
                                    echo '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a>' . $widget->getHumanName();
                                    echo '</a></li>';
                                }
                                ?>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse_mobile">
                                    Mobile
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_mobile" class="panel-collapse collapse">
                            <div class="panel-body">
                                <?php
                                foreach (widget::listWidget('mobile') as $widget) {
                                    echo '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a>' . $widget->getHumanName();
                                    echo '</a></li>';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>       
            </ul>
        </div>
    </div>
    <div class="col-lg-10 col-md-9 col-sm-8 widget" style="border-left: solid 1px #EEE; padding-left: 25px;display: none;">

        <div class="row">
            <div class="col-sm-6">
                <legend>
                    {{Général}}
                    <a class="btn btn-default btn-xs pull-right" id="bt_manageFiles"><i class="fa fa-file"></i> {{Fichiers}}</a>
                </legend>
                <form class="form-horizontal">
                    <fieldset>

                        <div class="form-group">
                            <label class="col-sm-4 control-label">{{Nom du widget}}</label>
                            <div class="col-sm-6">
                                <input type="text" class="widgetAttr form-control" data-l1key="path" style="display : none;" />
                                <input type="text" class="widgetAttr form-control" data-l1key="logicalId" style="display : none;" />
                                <input type="text" class="widgetAttr form-control" data-l1key="name" placeholder="{{Nom du widget}}"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 control-label">{{Version}}</label>
                            <div class="col-sm-6">
                                <select class="widgetAttr form-control" data-l1key='version'>
                                    <option value='dashboard'>{{Dashboard}}</option>
                                    <option value='mobile'>{{Mobile}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 control-label">{{Type}}</label>
                            <div class="col-sm-6">
                                <select class="widgetAttr form-control" data-l1key='type'>
                                    <option value='none'>{{Aucun}}</option>
                                    <?php
                                    foreach (cmd::allType() as $type) {
                                        echo '<option value="' . $type['type'] . '">' . $type['type'] . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 control-label">{{Sous-type}}</label>
                            <div class="col-sm-6">
                                <select class="widgetAttr form-control" data-l1key='subtype'>
                                    <option value='none'>{{Aucun}}</option>
                                    <?php
                                    foreach (cmd::allSubType() as $subtype) {
                                        echo '<option value="' . $subtype['subtype'] . '">' . $subtype['subtype'] . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div class="col-sm-6" >
                <legend>{{Apercu}}
                    <a class="btn btn-xs btn-default pull-right" id="bt_applyWidget"><i class="fa fa-fire"></i> {{Appliquer sur des commandes}}</a>
                    <a class="btn btn-xs btn-warning pull-right" id="bt_shareOnMarket"><i class="fa fa-cloud-upload"></i> {{Partager}}</a>
                </legend>
                <div class="col-sm-6" id='div_widgetResult'style="height: 350px;"></div>
            </div>
        </div>
        <a class="btn btn-default btn-xs" id="bt_insertIcon"><i class="fa fa-flag"></i> Rechercher une icone</a><br/><br/>
        <textarea class='form-control widgetAttr' data-l1key='content' id='ta_widgetContent' style='height: 500px;'></textarea>

        <form class="form-horizontal">
            <fieldset>
                <div class="form-actions">
                    <a class="btn btn-danger widgetAction" data-action="remove"><i class="fa fa-minus-circle"></i> {{Supprimer}}</a>
                    <a class="btn btn-success widgetAction" data-action="save"><i class="fa fa-check-circle"></i> {{Sauvegarder}}</a>
                </div>
            </fieldset>
        </form>

    </div>
</div>

<?php include_file('desktop', 'widget', 'js', 'widget'); ?>