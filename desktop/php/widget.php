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
include_file('3rdparty', 'jquery.lazyload/jquery.lazyload', 'js');
include_file('3rdparty', 'jquery.masonry/jquery.masonry', 'js');

$mobileWidget = widget::listWidget('mobile');
$dashboardWidget = widget::listWidget('dashboard');

function displayWidgetName($_name) {
    $result = '';
    $name = explode('.', $_name);
    if (count($name) != 3) {
        return $name;
    }
    switch ($name[0]) {
        case 'info':
            $result .= '<i class="fa fa-eye fa-fw" title="Widget de type information"></i> ';
            break;
        case 'action':
            $result .= '<i class="fa fa-exclamation-circle fa-fw" title="Widget de type action"></i> ';
            break;
        default:
            $result .= $name[0];
            break;
    }
    switch ($name[1]) {
        case 'other':
            $result .= '<span class="label label-warning" style="text-shadow: none;">other</span> ';
            break;
        case 'color':
            $result .= '<span class="label label-success" style="text-shadow: none;">color</span> ';
            break;
        case 'slider':
            $result .= '<span class="label label-primary" style="text-shadow: none;">slider</span> ';
            break;
        case 'binary':
            $result .= '<span class="label label-info" style="text-shadow: none;">binary</span> ';
            break;
        case 'numeric':
            $result .= '<span class="label label-danger" style="text-shadow: none;">numeric</span> ';
            break;
        case 'string':
            $result .= '<span class="label label-default" style="text-shadow: none;">string</span> ';
            break;
        default:
            $result .= $name[1];
            break;
    }
    return $result .= $name[2];
}
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

    #ul_widget{
        line-height: 85%;

    }

    .market:hover{
        background-color : #F2F1EF !important;
    }
</style>

<div class="row row-overflow">
    <div class="col-lg-2 col-md-3 col-sm-4">
        <div class="bs-sidebar">
            <ul id="ul_widget" class="nav nav-list bs-sidenav">
                <a class="btn btn-default btn-sm tooltips" id="bt_getFromMarket" title="{{Récuperer du market}}" style="width : 100%"><i class="fa fa-shopping-cart"></i> {{Market}}</a>
                <a class="btn btn-default widgetAction" style="width : 100%;margin-top : 5px;margin-bottom: 5px;" data-action="add"><i class="fa fa-plus-circle"></i> {{Ajouter un widget}}</a>
                <li class="filter" style="margin-bottom: 5px;"><input class="filter form-control input-sm" placeholder="{{Rechercher}}" style="width: 100%"/></li>
                <?php
                foreach ($dashboardWidget as $widget) {
                    echo '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a><i class="fa fa-desktop fa-fw" title="Widget pour la version bureau"></i> ' . displayWidgetName($widget->getHumanName());
                    echo '</a></li>';
                }
                foreach ($mobileWidget as $widget) {
                    echo '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a><i class="fa fa-mobile fa-fw" title="Widget pour la version mobile"></i> ' . displayWidgetName($widget->getHumanName());
                    echo '</a></li>';
                }
                ?>
            </ul>
        </div>
    </div>
    <div class="col-lg-10 col-md-9 col-sm-8 widgetListDisplay" style="border-left: solid 1px #EEE; padding-left: 25px;">
        <legend>{{Widgets installés sur votre Jeedom}}
            <span style="font-size: 0.7em;color:#c5c5c5">
                Vous devez être connecté à internet pour voir les prévisualisation
            </span>
        
        </legend>
        <div class="pluginContainer">
            <?php
            $widget_list = array_merge($dashboardWidget, $mobileWidget);
            foreach ($widget_list as $widget) {
                echo '<div class="widgetDisplayCard cursor ' . $install . '" data-path="' . $widget->getPath() . '" style="background-color : #ffffff; height : 200px;margin-bottom : 10px;padding : 5px;border-radius: 2px;width : 160px;margin-left : 10px;" >';
                if ($widget->getVersion() == 'mobile') {
                    echo '<i class="fa fa-mobile pull-left" style="color:#c5c5c5"></i>';
                } else {
                    echo '<i class="fa fa-desktop pull-left" style="color:#c5c5c5"></i>';
                }
                echo "<center>";
                $urlPath = config::byKey('market::address') . '/market/widget/images/' . $widget->getVersion() . '.' . $widget->getHumanName() . '.jpg';
                echo '<img class="lazy" src="core/img/no_image.gif" data-original="' . $urlPath . '" height="105" width="95" />';
                echo "</center>";
                echo '<span style="font-size : 1.1em;position:relative; top : 15px;word-break: break-all;white-space: pre-wrap;word-wrap: break-word;">' . $widget->getHumanName() . '</span>';
                echo '</div>';
            }
            ?>
        </div>
    </div>



    <div class="col-lg-9 col-md-8 col-sm-8 widget" style="border-left: solid 1px #EEE; padding-left: 25px;display: none;">

        <div class="row">
            <div class="col-sm-6">
                <legend>
                    <i class="fa fa-arrow-circle-left cursor" id="bt_displayWidgetList"></i> {{Général}}
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