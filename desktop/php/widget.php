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
include_file('3rdparty', 'jquery.packery/jquery.packery', 'js');

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
    .divIconSel{
        height: 80px;
        border: 1px solid #fff;
        box-sizing: border-box;
        cursor: pointer;
    }
    .iconSel{
        line-height: 1.4;
        font-size: 1.5em;
    }
    .iconSelected{
        background-color: #563d7c;
        color: white;
    }
    .iconDesc{
        font-size: 0.8em;
    }

    .noPaddingLeft { padding-left: 0;}
    .noPaddingRight { padding-right: 0;}
    .noMarginBottom { margin-bottom: 0;}
    .noPaddingWell {
        padding-bottom: 0;
        padding-top: 0;
    }
    
    .CodeMirror {
        border: 1px solid #eee;
        height: auto;
    }
    .CodeMirror-scroll {
        overflow-y: hidden;
        overflow-x: auto;
    }

    .market:hover{
        background-color : #F2F1EF !important;
    }
    .fileinput-button input {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
        font-size: 200px;
        direction: ltr;
        cursor: pointer;
    }
</style>
<div id="md_modalWidget"></div>
<div class="row row-overflow">
    <div class="col-lg-3 col-md-4 col-sm-4">
        <div class="bs-sidebar">
            <ul id="ul_widget" class="nav nav-list bs-sidenav">
                <a class="btn btn-default btn-sm tooltips" id="bt_getFromMarket" title="{{Récuperer du market}}" style="width : 100%"><i class="fa fa-shopping-cart"></i> {{Market}}</a>
                <a class="btn btn-default widgetAction" style="width : 100%;margin-top : 5px;margin-bottom: 5px;" data-action="add"><i class="fa fa-plus-circle"></i> {{Ajouter un widget}}</a>
                <a class="btn btn-success widgetAction" style="width : 100%;margin-top : 5px;margin-bottom: 5px;" data-action="create"><i class="fa fa-picture-o"></i> {{Créateur de Widget}}</a>
                <li class="filter" style="margin-bottom: 5px;"><input class="filter form-control input-sm" placeholder="{{Rechercher}}" style="width: 100%"/></li>
                <?php
                foreach ($dashboardWidget as $widget) {
                    echo '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a><i class="fa fa-desktop fa-fw" title="Widget pour la version bureau"></i> ' . displayWidgetName($widget->getHumanName());
                     echo '<span class="badge pull-right">'.count($widget->getUsedBy()).'</span>';
                    echo '</a></li>';
                }
                foreach ($mobileWidget as $widget) {
                    echo '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a><i class="fa fa-mobile fa-fw" title="Widget pour la version mobile"></i> ' . displayWidgetName($widget->getHumanName());
                    echo '<span class="badge pull-right">'.count($widget->getUsedBy()).'</span>';
                    echo '</a></li>';
                }
                ?>
            </ul>
        </div>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-8 widgetImageView"  style="border-left: solid 1px #EEE; padding-left: 25px;display: none;">
        <form class="form-horizontal" method="post" enctype="multipart/form-data">
            <fieldset>
                <legend><i class="fa fa-arrow-circle-left cursor bt_displayWidgetList"></i> {{Général}}</legend>
                <div class="container-fluid" id="bsMenuThemesImagesView">
                    <div class="form-horizontal col-sm-2">
                        <div class="well col-sm-12">
                            <strong class="col-sm-12 noPaddingLeft noPaddingRight" style="border-bottom: 1px groove; margin-bottom: 8px;">{{Images}}</strong>    
                            <div class="form-group form-group-sm">
                                <div class="col-sm-12">
                                    <span class="form-control btn-info fileinput-button">
                                        <i class="glyphicon glyphicon-plus"></i>
                                        <span> {{Image(s)...}}</span>
                                        <input class="form-control" type="file" id="bsImagesFileload" name="images" data-url="plugins/widget/core/ajax/widget.ajax.php?action=imageUpload"/>
                                    </span>
                                </div>    
                            </div>
                        </div>
                        <div class="well col-sm-12">
                            <strong class="col-sm-12 noPaddingLeft noPaddingRight" style="border-bottom: 1px groove; margin-bottom: 8px;">{{Widgets}}</strong>
                            <div class="form-group form-group-sm">
                                <div class="col-sm-12">
                                    <button type="button" class="btn btn-block btn-warning " id="bt_OtherActionAdd" title="{{other.action}}"><i class="fa fa-square"></i> {{Widget On/Off}}</button>
                                    <button type="button" class="btn btn-block btn-warning " id="bt_InfoBinaryAdd" title="{{info.binary}}"><i class="fa fa-square"></i> {{Widget Simple Etat}}</button>
                                    <button type="button" class="btn btn-block btn-warning " id="bt_InfoNumericAdd" title="{{info.numeric}}"><i class="fa fa-square"></i> {{Widget Numérique}}</abutton>
                                </div>
                            </div>
                        </div>
                    </div>                
                    <div class="well col-sm-10" id="bsCategory">
                        <div class="panel panel-default" id="bsCategoryDefault">
                            <div class="panel-heading">
                                <h4>{{Catégorie : Jeedom}}<small><em><bold> - {{Les divers icônes de Jeedom disponibles}}</bold></em></small></h4></div>
                            <div class="panel-body" style="height: 250px; overflow: auto">
                                <div class="col-sm-12" id="bsIconView">

<?php
foreach (ls('core/css/icon', '*') as $dir) {
    if (is_dir('core/css/icon/' . $dir) && file_exists('core/css/icon/' . $dir . '/style.css')) {
        $css = file_get_contents('core/css/icon/' . $dir . '/style.css');
        $research = strtolower(str_replace('/', '', $dir));
        preg_match_all("/\." . $research . "-(.*?):/", $css, $matches, PREG_SET_ORDER);
        $height = (ceil(count($matches) / 12) * 80) + 80;
        echo '<div style="height : ' . $height . 'px;"><legend>{{' . str_replace('/', '', $dir) . '}}</legend>';
        $number = 1;
        foreach ($matches as $match) {
            if (isset($match[0])) {
                if ($number == 1) {
                    echo '<div class="row">';
                }
                echo '<div class="col-lg-1 divIconSel">';
                $icon = str_replace(array(':', '.'), '', $match[0]);
                echo '<center><span class="iconSel"><i class=\'icon ' . $icon . '\'></i></span><br/><span class="iconDesc">' . $icon . '</span></center>';
                echo '</div>';
                if ($number == 12) {
                    echo '</div>';
                    $number = 0;
                }
                $number++;
            }
        }
        if (number != 1) {
            echo '</div>';
        }
        echo "</div><br/>";
    }
}
?>
<div style="height: 650px;">
    <legend>{{Générale}}</legend>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-glass'></i></span><br/><span class="iconDesc">fa-glass</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-music'></i></span><br/><span class="iconDesc">fa-music</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-search'></i></span><br/><span class="iconDesc">fa-search</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-envelope-o'></i></span><br/><span class="iconDesc">fa-envelope-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-heart'></i></span><br/><span class="iconDesc">fa-heart</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-star'></i></span><br/><span class="iconDesc">fa-star</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-star-o'></i></span><br/><span class="iconDesc">fa-star-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-user'></i></span><br/><span class="iconDesc">fa-user</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-film'></i></span><br/><span class="iconDesc">fa-film</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-th-large'></i></span><br/><span class="iconDesc">fa-th-large</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-check'></i></span><br/><span class="iconDesc">fa-check</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-times'></i></span><br/><span class="iconDesc">fa-times</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-power-off'></i></span><br/><span class="iconDesc">fa-power-off</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-signal'></i></span><br/><span class="iconDesc">fa-signal</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-cog'></i></span><br/><span class="iconDesc">fa-cog</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-trash-o'></i></span><br/><span class="iconDesc">fa-trash-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-home'></i></span><br/><span class="iconDesc">fa-home</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-file-o'></i></span><br/><span class="iconDesc">fa-file-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-clock-o'></i></span><br/><span class="iconDesc">fa-clock-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-road'></i></span><br/><span class="iconDesc">fa-road</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-download'></i></span><br/><span class="iconDesc">fa-download</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-inbox'></i></span><br/><span class="iconDesc">fa-inbox</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-play-circle-o'></i></span><br/><span class="iconDesc">fa-play-circle-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-refresh'></i></span><br/><span class="iconDesc">fa-refresh</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-list-alt'></i></span><br/><span class="iconDesc">fa-list-alt</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-lock'></i></span><br/><span class="iconDesc">fa-lock</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-flag'></i></span><br/><span class="iconDesc">fa-flag</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-headphones'></i></span><br/><span class="iconDesc">fa-headphones</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-volume-down'></i></span><br/><span class="iconDesc">fa-volume-down</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-qrcode'></i></span><br/><span class="iconDesc">fa-qrcode</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-barcode'></i></span><br/><span class="iconDesc">fa-barcode</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-tag'></i></span><br/><span class="iconDesc">fa-tag</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-book'></i></span><br/><span class="iconDesc">fa-book</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-print'></i></span><br/><span class="iconDesc">fa-print</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-camera'></i></span><br/><span class="iconDesc">fa-camera</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-video-camera'></i></span><br/><span class="iconDesc">fa-video-camera</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-picture-o'></i></span><br/><span class="iconDesc">fa-picture-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-pencil'></i></span><br/><span class="iconDesc">fa-pencil</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-map-marker'></i></span><br/><span class="iconDesc">fa-map-marker</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-tint'></i></span><br/><span class="iconDesc">fa-tint</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-pencil-square-o'></i></span><br/><span class="iconDesc">fa-pencil-square-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-check-square-o'></i></span><br/><span class="iconDesc">fa-check-square-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-arrows'></i></span><br/><span class="iconDesc">fa-arrows</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-step-backward'></i></span><br/><span class="iconDesc">fa-step-backward</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-fast-backward'></i></span><br/><span class="iconDesc">fa-fast-backward</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-backward'></i></span><br/><span class="iconDesc">fa-backward</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-play'></i></span><br/><span class="iconDesc">fa-play</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-pause'></i></span><br/><span class="iconDesc">fa-pause</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-stop'></i></span><br/><span class="iconDesc">fa-stop</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-forward'></i></span><br/><span class="iconDesc">fa-forward</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-fast-forward'></i></span><br/><span class="iconDesc">fa-fast-forward</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-step-forward'></i></span><br/><span class="iconDesc">fa-step-forward</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-eject'></i></span><br/><span class="iconDesc">fa-eject</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-chevron-left'></i></span><br/><span class="iconDesc">fa-chevron-left</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-chevron-right'></i></span><br/><span class="iconDesc">fa-chevron-right</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-plus-circle'></i></span><br/><span class="iconDesc">fa-plus-circle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-minus-circle'></i></span><br/><span class="iconDesc">fa-minus-circle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-times-circle'></i></span><br/><span class="iconDesc">fa-times-circle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-check-circle'></i></span><br/><span class="iconDesc">fa-check-circle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-question-circle'></i></span><br/><span class="iconDesc">fa-question-circle</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-info-circle'></i></span><br/><span class="iconDesc">fa-info-circle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-crosshairs'></i></span><br/><span class="iconDesc">fa-crosshairs</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-times-circle-o'></i></span><br/><span class="iconDesc">fa-times-circle-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-check-circle-o'></i></span><br/><span class="iconDesc">fa-check-circle-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-ban'></i></span><br/><span class="iconDesc">fa-ban</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-arrow-left'></i></span><br/><span class="iconDesc">fa-arrow-left</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-arrow-right'></i></span><br/><span class="iconDesc">fa-arrow-right</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-arrow-up'></i></span><br/><span class="iconDesc">fa-arrow-up</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-arrow-down'></i></span><br/><span class="iconDesc">fa-arrow-down</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-plus'></i></span><br/><span class="iconDesc">fa-plus</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-minus'></i></span><br/><span class="iconDesc">fa-minus</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-asterisk'></i></span><br/><span class="iconDesc">fa-asterisk</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-exclamation-circle'></i></span><br/><span class="iconDesc">fa-exclamation-circle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-gift'></i></span><br/><span class="iconDesc">fa-gift</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-leaf'></i></span><br/><span class="iconDesc">fa-leaf</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-fire'></i></span><br/><span class="iconDesc">fa-fire</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-eye'></i></span><br/><span class="iconDesc">fa-eye</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-eye-slash'></i></span><br/><span class="iconDesc">fa-slash</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-exclamation-triangle'></i></span><br/><span class="iconDesc">fa-exclamation-triangle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-plane'></i></span><br/><span class="iconDesc">fa-plane</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-calendar'></i></span><br/><span class="iconDesc">fa-calendar</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-random'></i></span><br/><span class="iconDesc">fa-random</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-comment'></i></span><br/><span class="iconDesc">fa-comment</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-magnet'></i></span><br/><span class="iconDesc">fa-magnet</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-chevron-up'></i></span><br/><span class="iconDesc">fa-chevron-up</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-chevron-down'></i></span><br/><span class="iconDesc">fa-chevron-down</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-shopping-cart'></i></span><br/><span class="iconDesc">fa-shopping-cart</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-folder'></i></span><br/><span class="iconDesc">fa-folder</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-folder-open'></i></span><br/><span class="iconDesc">fa-folder-open</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-bar-chart-o'></i></span><br/><span class="iconDesc">fa-bar-chart-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-key'></i></span><br/><span class="iconDesc">fa-key</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-heart-o'></i></span><br/><span class="iconDesc">fa-heart-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-sign-out'></i></span><br/><span class="iconDesc">fa-sign-out</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-thumb-tack'></i></span><br/><span class="iconDesc">fa-thumb-tack</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-sign-in'></i></span><br/><span class="iconDesc">fa-sign-in</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-phone'></i></span><br/><span class="iconDesc">fa-phone</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-unlock'></i></span><br/><span class="iconDesc">fa-unlock</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-credit-card'></i></span><br/><span class="iconDesc">fa-credit-card</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-rss'></i></span><br/><span class="iconDesc">fa-rss</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-hdd-o'></i></span><br/><span class="iconDesc">fa-hdd-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-bullhorn'></i></span><br/><span class="iconDesc">fa-bullhorn</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-bell'></i></span><br/><span class="iconDesc">fa-bell</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-globe'></i></span><br/><span class="iconDesc">fa-globe</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-wrench'></i></span><br/><span class="iconDesc">fa-wrench</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-filter'></i></span><br/><span class="iconDesc">fa-filter</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-briefcase'></i></span><br/><span class="iconDesc">fa-briefcase</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-cloud'></i></span><br/><span class="iconDesc">fa-cloud</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-flask'></i></span><br/><span class="iconDesc">fa-flask</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-scissors'></i></span><br/><span class="iconDesc">fa-scissors</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-paperclip'></i></span><br/><span class="iconDesc">fa-paperclip</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-floppy-o'></i></span><br/><span class="iconDesc">fa-floppy-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-table'></i></span><br/><span class="iconDesc">fa-table</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-magic'></i></span><br/><span class="iconDesc">fa-magic</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-truck'></i></span><br/><span class="iconDesc">fa-truck</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-money'></i></span><br/><span class="iconDesc">fa-money</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-columns'></i></span><br/><span class="iconDesc">fa-columns</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-envelope'></i></span><br/><span class="iconDesc">fa-envelope</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-gavel'></i></span><br/><span class="iconDesc">fa-gavel</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-tachometer'></i></span><br/><span class="iconDesc">fa-tachometer</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-bolt'></i></span><br/><span class="iconDesc">fa-bolt</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-sitemap'></i></span><br/><span class="iconDesc">fa-sitemap</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-umbrella'></i></span><br/><span class="iconDesc">fa-umbrella</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-lightbulb-o'></i></span><br/><span class="iconDesc">fa-lightbulb-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-stethoscope'></i></span><br/><span class="iconDesc">fa-stethoscope</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-suitcase'></i></span><br/><span class="iconDesc">fa-suitcase</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-coffee'></i></span><br/><span class="iconDesc">fa-coffee</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-cutlery'></i></span><br/><span class="iconDesc">fa-cutlery</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-building-o'></i></span><br/><span class="iconDesc">fa-building-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-medkit'></i></span><br/><span class="iconDesc">fa-medkit</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-beer'></i></span><br/><span class="iconDesc">fa-beer</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-h-square'></i></span><br/><span class="iconDesc">fa-square</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-desktop'></i></span><br/><span class="iconDesc">fa-desktop</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-laptop'></i></span><br/><span class="iconDesc">fa-laptop</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-tablet'></i></span><br/><span class="iconDesc">fa-tablet</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-mobile'></i></span><br/><span class="iconDesc">fa-mobile</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-circle-o'></i></span><br/><span class="iconDesc">fa-circle-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-spinner'></i></span><br/><span class="iconDesc">fa-spinner</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-circle'></i></span><br/><span class="iconDesc">fa-circle</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-smile-o'></i></span><br/><span class="iconDesc">fa-smile-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-frown-o'></i></span><br/><span class="iconDesc">fa-frown-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-meh-o'></i></span><br/><span class="iconDesc">fa-meh-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-gamepad'></i></span><br/><span class="iconDesc">fa-gamepad</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-keyboard-o'></i></span><br/><span class="iconDesc">fa-keyboard-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-terminal'></i></span><br/><span class="iconDesc">fa-terminal</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-location-arrow'></i></span><br/><span class="iconDesc">fa-location-arrow</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-microphone'></i></span><br/><span class="iconDesc">fa-microphone</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-microphone-slash'></i></span><br/><span class="iconDesc">fa-microphone-slash</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-shield'></i></span><br/><span class="iconDesc">fa-shield</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-calendar-o'></i></span><br/><span class="iconDesc">fa-calendar-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-fire-extinguisher'></i></span><br/><span class="iconDesc">fa-fire-extinguisher</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-rocket'></i></span><br/><span class="iconDesc">fa-rocket</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-anchor'></i></span><br/><span class="iconDesc">fa-anchor</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-unlock-alt'></i></span><br/><span class="iconDesc">fa-unlock-alt</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-compass'></i></span><br/><span class="iconDesc">fa-compass</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-apple'></i></span><br/><span class="iconDesc">fa-apple</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-windows'></i></span><br/><span class="iconDesc">fa-windows</span></div>
    </div>
    <div class="row">
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-android'></i></span><br/><span class="iconDesc">fa-android</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-linux'></i></span><br/><span class="iconDesc">fa-linux</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-dribbble'></i></span><br/><span class="iconDesc">fa-dribbble</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-trello'></i></span><br/><span class="iconDesc">fa-trello</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-female'></i></span><br/><span class="iconDesc">fa-female</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-male'></i></span><br/><span class="iconDesc">fa-male</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-gittip'></i></span><br/><span class="iconDesc">fa-sun-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-sun-o'></i></span><br/><span class="iconDesc">fa-glass</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-moon-o'></i></span><br/><span class="iconDesc">fa-moon-o</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-archive'></i></span><br/><span class="iconDesc">fa-archive</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-pagelines'></i></span><br/><span class="iconDesc">fa-pagelines</span></div>
        <div class="col-lg-1 divIconSel"><center><span class="iconSel"><i class='fa fa-wheelchair'></i></span><br/><span class="iconDesc">fa-wheelchair</span></div>
    </div>
</div>
<script>
    $('#in_iconSelectorSearch').on('keyup',function(){
        $('.divIconSel').show();
        var search = $(this).value();
        if(search != ''){
            $('.iconDesc').each(function(){
                if($(this).text().indexOf(search) == -1){
                    $(this).closest('.divIconSel').hide();
                }
            })
        }
    });
    $('.divIconSel').on('click', function () {
        $('.divIconSel').removeClass('iconSelected');
        $(this).closest('.divIconSel').addClass('iconSelected');
    });
    $('.divIconSel').on('dblclick', function () {
        $('.divIconSel').removeClass('iconSelected');
        $(this).closest('.divIconSel').addClass('iconSelected');
        $('#mod_selectIcon').dialog("option", "buttons")['Valider'].apply($('#mod_selectIcon'));
    });
</script>
                                </div> 
                            </div> 
                        </div>
                        <div class="panel panel-warning">
                            <div class="panel-heading">
                                <h4>Catégorie : Widgets<small><em><bold> - {{Vos images personnelles}}</bold></em></small></h4>
                            </div>
                            <div class="panel-body">
                                <div class="col-sm-12" id="bsImagesView">
                                </div>
                            </div>
                        </div>                    
                        <div class="panel panel-success">
                            <div class="panel-heading">
                                <h4>Catégorie : Spécial<small><em><bold> - {{Pack d'icones}}</bold></em></small></h4>
                            </div>
                            <div class="panel-body">
                                <div class="col-sm-12" name="bsImagesViewWidgets">
                                </div>
                            </div>
                        </div>                    
                    </div>                
                </div>
            </fieldset>        
        </form>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-8 widgetListDisplay" style="border-left: solid 1px #EEE; padding-left: 25px;">
        <legend>{{Widgets installés sur votre Jeedom}}
            <span style="font-size: 0.7em;color:#c5c5c5">
                Vous devez être connecté à internet pour voir les prévisualisation
            </span>

        </legend>
        <div class="pluginContainer">
            <?php
            $widget_list = array_merge($dashboardWidget, $mobileWidget);
            foreach ($widget_list as $widget) {
                echo '<div class="widgetDisplayCard cursor" data-path="' . $widget->getPath() . '" style="background-color : #ffffff; height : 200px;margin-bottom : 10px;padding : 5px;border-radius: 2px;width : 160px;margin-left : 10px;" >';
                if ($widget->getVersion() == 'mobile') {
                    echo '<i class="fa fa-mobile pull-left" style="color:#c5c5c5"></i>';
                } else {
                    echo '<i class="fa fa-desktop pull-left" style="color:#c5c5c5"></i>';
                }
                $urlPath = config::byKey('market::address') . '/market/widget/images/' . $widget->getVersion() . '.' . $widget->getHumanName() . '.jpg';
                $urlPath2 = config::byKey('market::address') . '/market/widget/images/' . $widget->getVersion() . '.' . $widget->getHumanName() . '_icon.png';
                $urlPath3 = config::byKey('market::address') . '/market/widget/images/' . $widget->getVersion() . '.' . $widget->getHumanName() . '_icon.jpg';
                echo "<center>";
                echo '<img class="lazy" src="plugins/widget/doc/images/widget_icon.png" data-original3="' . $urlPath3 . '" data-original2="' . $urlPath2 . '" data-original="' . $urlPath . '" height="105" width="95" />';
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
                    <i class="fa fa-arrow-circle-left cursor bt_displayWidgetList"></i> {{Général}}
                    <a class="btn btn-default btn-xs pull-right" id="bt_manageFiles"><i class="fa fa-file"></i> {{Fichiers}}</a>
                    <a class="btn btn-default btn-xs pull-right widgetAction expertModeVisible" data-action="copy"><i class="fa fa-files-o"></i> {{Dupliquer}}</a>
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
                        <div class="form-group">
                            <label class="col-sm-4 control-label">{{Utilisé par }}</label>
                            <div class="col-sm-6">
                                <span class="label label-primary">
                                <span class="widgetAttr" data-l1key="nbUsedBy"></span> commande(s)
                                </span>
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