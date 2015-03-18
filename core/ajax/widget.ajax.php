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

try {
    require_once dirname(__FILE__) . '/../../../../core/php/core.inc.php';
    include_file('core', 'authentification', 'php');
    if (!isConnect('admin')) {
        throw new Exception(__('401 - Accès non autorisé', __FILE__));
    }

    if (init('action') == 'get') {
        $widget = widget::byPath(init('path'));
        if (!is_object($widget)) {
            throw new Exception(__('Widget non trouvé', __FILE__));
        }
        $return = utils::o2a($widget);
        $return['logicalId'] = $widget->getLogicalId();
        $usedBy = $widget->getUsedBy();
        $return['nbUsedBy'] = count($usedBy);
        $return['usedBy'] = $usedBy;
        ajax::success($return);
    }

    if (init('action') == 'save') {
        $widget_ajax = json_decode(init('widget'), true);
        if (file_exists($widget_ajax['path'])) {
            $widget_db = widget::byPath($widget_ajax['path']);
            if (!is_object($widget_db)) {
                $widget_db = new widget();
            }
        } else {
            $widget_db = new widget();
        }
        utils::a2o($widget_db, $widget_ajax);
        $widget_db->save();
        ajax::success(utils::o2a($widget_db));
    }

    if (init('action') == 'create') {
        $widget_ajax = json_decode(init('widget'), true);
        $widget = new widget();
        $widget->setName($widget_ajax['name']);
        $widget->setType($widget_ajax['type']);
        $widget->setSubtype($widget_ajax['subtype']);
        $widget->setContent($widget_ajax['content']);
        $widget->setVersion($widget_ajax['version']);
        //$widget->setPath($widget->generatePath());
        $widget->save();
        ajax::success(utils::o2a($widget));
    }

    if (init('action') == 'add') {
        $widget = new widget();
        $widget->setName(init('name'));
        $widget->save();
        ajax::success(utils::o2a($widget));
    }

    if (init('action') == 'remove') {
        $widget = widget::byPath(init('path'));
        if (!is_object($widget)) {
            throw new Exception(__('Widget non trouvé : ', __FILE__) . init('path'));
        }
        $widget->remove();
        ajax::success();
    }

     if (init('action') == 'copy') {
        $widget = widget::byPath(init('path'));
        if (!is_object($widget)) {
            throw new Exception(__('Widget non trouvé : ', __FILE__) . init('path'));
        }
        ajax::success(utils::o2a($widget->copy(init('name',$widget->getName().'_copy'))));
    }

    if (init('action') == 'applyWidget') {
        if (init('path') != 'default') {
            $widget = widget::byPath(init('path'));
            if (!is_object($widget)) {
                throw new Exception(__('Widget non trouvé : ', __FILE__) . init('path'));
            }
        }
        $cmds = json_decode(init('cmds'), true);
        foreach ($cmds as $cmd_id) {
            $cmd = cmd::byId($cmd_id);
            if (!is_object($cmd)) {
                throw new Exception(__('Commande introuvable : ', __FILE__) . $cmd_id);
            }
            if (init('path') != 'default') {
                $cmd->setTemplate($widget->getVersion(), $widget->getName());
            } else {
                $cmd->setTemplate(init('version'), 'default');
            }
            $cmd->save();
        }
        $unselects = json_decode(init('unselects'), true);
        foreach ($unselects as $cmd_id) {
            $cmd = cmd::byId($cmd_id);
            if (!is_object($cmd)) {
                throw new Exception(__('Commande introuvable : ', __FILE__) . $cmd_id);
            }
            if ($cmd->getTemplate($widget->getVersion()) == $widget->getName()) {
                $cmd->setTemplate($widget->getVersion(), 'default');
                $cmd->save();
            }
        }

        ajax::success();
    }

    if (init('action') == 'fileupload') {
        $widget = widget::byPath(init('path'));
        if (!is_object($widget)) {
            throw new Exception(__('Widget non trouvé : ', __FILE__) . init('path'));
        }
        $uploaddir = dirname(__FILE__) . '/../template/' . $widget->getVersion();
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        $uploaddir .= '/cmd.' . $widget->getHumanName();
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload non trouvé : ', __FILE__) . $uploaddir);
        }
        $file = $_FILES['file'];
        if (filesize($file['tmp_name']) > 10000000) {
            throw new Exception(__('Le fichier est trop gros (miximum 10mo)', __FILE__));
        }

        if (!move_uploaded_file($file['tmp_name'], $uploaddir . '/' . $file['name'])) {
            throw new Exception(__('Impossible de déplacer le fichier temporaire', __FILE__));
        }
        ajax::success();
    }

    if (init('action') == 'list3rdparty') {
        $widget = widget::byPath(init('path'));
        if (!is_object($widget)) {
            throw new Exception(__('Widget non trouvé : ', __FILE__) . init('path'));
        }
        $uploaddir = dirname(__FILE__) . '/../template/' . $widget->getVersion();
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        $uploaddir .= '/cmd.' . $widget->getHumanName();
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        $return = array();
        foreach (ls($uploaddir) as $file) {
            $return[] = array(
                'name' => $file,
                'path' => $uploaddir . '/' . $file,
                'relativePath' => 'plugins/widget/core/template/' . $widget->getVersion() . '/cmd.' . $widget->getHumanName() . '/' . $file,
            );
        }
        ajax::success($return);
    }

    if (init('action') == 'remove3rdparty') {
        $path = urldecode(init('path'));
        if (!file_exists($path)) {
            throw new Exception(__('Fichier non trouvé : ', __FILE__) . $path);
        }
        $path = realpath($path);
        if (strpos($path, realpath(dirname(__FILE__) . '/../template')) === false) {
            throw new Exception(__('Vous n\'etes pas autorisé à supprimer : ', __FILE__) . $path);
        }
        if (!unlink($path)) {
            throw new Exception(__('Impossible de supprimer : ', __FILE__) . $path);
        }
        ajax::success();
    }

    if (init('action') == 'listImage') {
        $uploaddir = dirname(__FILE__) . '/../images';
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__("{{Répertoire d'upload d'images non trouvé}} : ", __FILE__) . $uploaddir);
        }
        ajax::success(ls($uploaddir, "*", false, array('files')));
    }

    if (init('action') == 'removeImage') {
        $uploaddir = dirname(__FILE__) . '/../images/';
        $name = init('image');
        ajax::success(unlink($uploaddir . $name));
    }

    if (init('action') == 'imageUpload') {
        $uploaddir = dirname(__FILE__) . '/../images';
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__("{{Répertoire d'upload non trouvé}} : ", __FILE__) . $uploaddir);
        }
        if (!isset($_FILES['images'])) {
            throw new Exception(__('{{Aucun fichier trouvé. Vérifié parametre PHP (post size limit}}', __FILE__));
        }
        $extension = strtolower(strrchr($_FILES['images']['name'], '.'));
        if (!in_array($extension, array('.png','.jpg'))) {
            throw new Exception('{{Seul les images sont acceptées (autorisé .jpg .png)}} : ' . $extension);
        }
        if (filesize($_FILES['images']['tmp_name']) > 1000000) {
            throw new Exception(__('{{Le fichier est trop gros}} (maximum 8mo)', __FILE__));
        }
        if (!move_uploaded_file($_FILES['images']['tmp_name'], $uploaddir . '/' . $_FILES['images']['name'])) {
            throw new Exception(__('{{Impossible de déplacer le fichier temporaire}}', __FILE__));
        }
        if (!file_exists($uploaddir . '/' . $_FILES['images']['name'])) {
            throw new Exception(__("{{Impossible d'uploader le fichier (limite du serveur web ?)}}", __FILE__));
        }
        ajax::success();
    }

    if (init('action') == 'loadSvg') {
        $folder = init('folder');
        $uploaddir = dirname(__FILE__) . '/../special/' . $folder;
        $files = ls($uploaddir, "*", false, array('files'));
        for( $index = 0; $index < count($files); $index++) {
            $extension = strtolower(strrchr($files[$index], '.'));
            if (in_array($extension, array('.svg'))) {
                $return[$index]['name'] = $files[$index];
                $return[$index]['snap'] = file_get_contents ($uploaddir . '/' . $files[$index]);
            }
        }
        ajax::success($return);
    }

    if (init('action') == 'listSvg') {
        $uploaddir = dirname(__FILE__) . '/../special';
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__("{{Répertoire d'upload d'images non trouvé}} : ", __FILE__) . $uploaddir);
        }
        ajax::success(widget::listSvgWidget());
    }

    if (init('action') == 'removeSvg') {
        $name = init('special');
        $uploaddir = dirname(__FILE__) . '/../special/';
        $extension = strtolower(strrchr($name, '.'));
        if (in_array($extension, array('.zip'))) {
            $base = basename( strtolower($name), ".zip");
            if (is_dir($uploaddir . $base)) {
                $files = ls($uploaddir . $base, "*", false, array('files'));
                for ($index = 0; $index < count($files); $index++) {
                    unlink($uploaddir . $base . '/' . $files[$index]);
                }
                rmdir($uploaddir . $base);
            }
            if (file_exists($uploaddir . $base)) {
                throw new Exception(__("{{Impossible d'éffacer le pack}} : ", __FILE__) . init('special'));
            }
        }
        ajax::success(unlink($uploaddir . $name));
    }

    if (init('action') == 'specialUpload') {
        $uploaddir = dirname(__FILE__) . '/../special';
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__("{{Répertoire d'upload non trouvé}} : ", __FILE__) . $uploaddir);
        }
        if (!isset($_FILES['special'])) {
            throw new Exception(__('{{Aucun fichier trouvé. Vérifié parametre PHP (post size limit}}', __FILE__));
        }
        $extension = strtolower(strrchr($_FILES['special']['name'], '.'));
        if (!in_array($extension, array('.zip'))) {
            throw new Exception('{{Seul les fichiers Zip sont acceptés (autorisé .zip)}} : ' . $extension);
        }
        if (filesize($_FILES['special']['tmp_name']) > 2000000) {
            throw new Exception(__('{{Le fichier est trop gros}} (maximum 8mo)', __FILE__));
        }
        if (!move_uploaded_file($_FILES['special']['tmp_name'], $uploaddir . '/' . $_FILES['special']['name'])) {
            throw new Exception(__('{{Impossible de déplacer le fichier temporaire}}', __FILE__));
        }
        if (!file_exists($uploaddir . '/' . $_FILES['special']['name'])) {
            throw new Exception(__("{{Impossible d'uploader le fichier (limite du serveur web ?)}}", __FILE__));
        }
        if (!checkZipSvg($_FILES['special']['name'])) {
            unlink($uploaddir . '/' . $_FILES['special']['name']);
            throw new Exception('{{le fichier Zip contient des fichiers non autorisés ou de type différent (autorisé .svg, .png, .ico)}} ');
        }
        $base = basename( strtolower($_FILES['special']['name']), ".zip");
        mkdir($uploaddir . '/' . $base);
        if (!file_exists($uploaddir . '/' . $base)) {
            throw new Exception(__("{{Impossible de créer le répertoire de l'archive}} : ", __FILE__) . $uploaddir . '/' . $_FILES['special']['name']);
        }
        if(!unZipSvg($_FILES['special']['name'])) {
            throw new Exception(__("{{Impossible d'extraire l'archive}} : ", __FILE__) . $uploaddir . '/' . $_FILES['special']['name']);
        }
        //unlink($uploaddir . '/' . $_FILES['special']['name']);
        ajax::success();
    }
    throw new Exception(__('Aucune methode correspondante à : ', __FILE__) . init('action'));

} catch (Exception $e) {
    ajax::error(displayExeption($e), $e->getCode());
}


function unZipSvg($name) {
    $base = basename(strtolower($name), ".zip");
    $zip_dir = dirname(__FILE__) . '/../special/' . $base;
    $arch = new ZipArchive();
    if ($arch->open(dirname(__FILE__) . '/../special/' . $name) === true) {
        if ($arch->extractTo($zip_dir) === false) {
            return false;
        }
    } else {
        return false;
    }
    $arch->close();
    return true;
}

function checkZipSvg($name) {
    $check = true;
    $fileUse = null;
    $zip_dir = dirname(__FILE__) . '/../special/';
    $zip = zip_open($zip_dir . $name);
    if ($zip) {
        while ($zip_entry = zip_read($zip)) {
            $file = basename(zip_entry_name($zip_entry));
            $extension = strtolower(strrchr($file, '.'));
            if($fileUse == null)
                $fileUse = $extension;
            if($fileUse != $extension)
                $check = false;
            if (!in_array($extension, array('.svg', '.png', '.ico')))
                $check = false;
            else
                $fileUse = $extension;
        }
        zip_close($zip);
    }
    return $check;
}
?>
