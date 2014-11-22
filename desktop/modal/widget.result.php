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

require_once dirname(__FILE__) . '/../../../../core/php/core.inc.php';
include_file('core', 'authentification', 'php');
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


include_file('core', 'icon.inc', 'php');
include_file('3rdparty', 'php.js/php.min', 'js');
include_file('3rdparty', 'jquery/jquery.min', 'js');
include_file('3rdparty', 'highstock/highstock', 'js');
include_file('3rdparty', 'highstock/highcharts-more', 'js');

if ($widget->getVersion() == 'mobile') {
    include_file('3rdparty', 'jquery.mobile/jquery.mobile.min', 'css');
    include_file('3rdparty', 'jquery.mobile/css/jquery.mobile.nativedroid', 'css');
    include_file('3rdparty', 'jquery.mobile/css/jquery.mobile.nativedroid.dark', 'css');
    include_file('3rdparty', 'jquery.mobile/css/jquery.mobile.nativedroid.color.green', 'css');
    include_file('mobile', 'commun', 'css');
    include_file('3rdparty', 'jquery.mobile/jquery.mobile.min', 'js');
} else {
    include_file('desktop', 'commun', 'css');
    include_file('3rdparty', 'bootstrap/css/bootstrap.min', 'css');
    include_file('3rdparty', 'jquery.ui/jquery-ui-bootstrap/jquery-ui', 'css');
    include_file('3rdparty', 'bootstrap.slider/css/slider', 'css');
    include_file('3rdparty', 'bootstrap/bootstrap.min', 'js');
    include_file('3rdparty', 'jquery.ui/jquery-ui.min', 'js');
    include_file('3rdparty', 'bootstrap.slider/js/bootstrap-slider', 'js');
}
include_file('3rdparty', 'jquery.utils/jquery.utils', 'js');
include_file('core', 'js.inc', 'php');
echo '<div class="eqLogic eqLogic-widget">';
echo '<div class="verticalAlign">';
echo '<center>';
echo $widget->displayExemple();
echo '</center>';
echo '</div>';
echo '</div>';
?>
