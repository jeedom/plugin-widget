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

/* * ***************************Includes********************************* */
require_once dirname(__FILE__) . '/../../../../core/php/core.inc.php';

class widget {
    /*     * *************************Attributs****************************** */

    private $type = 'none';
    private $subtype = 'none';
    private $name;
    private $path;
    private $content = '';
    private $version = 'dashboard';

    /*     * ***********************Methode static*************************** */

    public static function listWidget($_version) {
        $path = dirname(__FILE__) . '/../template/' . $_version;
        $files = ls($path, 'cmd.*', false, array('files', 'quiet'));
        $return = array();
        foreach ($files as $file) {
            $informations = explode('.', $file);
            $pathfile = $path . '/' . $file;
            $widget = new self();
            $widget->setType($informations[1]);
            $widget->setSubtype($informations[2]);
            $widget->setName($informations[3]);
            $widget->setVersion($_version);
            $widget->setContent(file_get_contents($pathfile));
            $widget->setPath($pathfile);
            $return[] = $widget;
        }
        return $return;
    }

    public static function byPath($_pathfile) {
        if (!file_exists($_pathfile)) {
            throw new Exception(__('Chemin jusqu\'au widget non trouvé : ', __FILE__) . $_pathfile);
        }
        $path_parts = pathinfo($_pathfile);
        $informations = explode('.', $path_parts['basename']);
        $widget = new self();
        $widget->setType($informations[1]);
        $widget->setSubtype($informations[2]);
        $widget->setName($informations[3]);
        $folder = explode('/', $path_parts['dirname']);
        $widget->setVersion($folder[count($folder) - 1]);
        $widget->setContent(file_get_contents($_pathfile));
        $widget->setPath($_pathfile);
        return $widget;
    }

    public static function shareOnMarket(&$market) {
        $informations = explode('.', $market->getLogicalId());
        $tmp_dir = realpath(dirname(__FILE__) . '/../../../../tmp/') . '/' . $market->getLogicalId();
        if (file_exists($tmp_dir)) {
            if (!rrmdir($tmp_dir)) {
                throw new Exception(__('Impossible de supprimer : ', __FILE__) . $tmp_dir . __('. Vérifiez les droits', __FILE__));
            }
        }
        mkdir($tmp_dir);
        if (!file_exists($tmp_dir) || !is_dir($tmp_dir)) {
            throw new Exception(__('Impossible de creer : ', __FILE__) . $tmp_dir . __('. Vérifiez les droits', __FILE__));
        }
        $cibDirs = array();
        $cibDirs[0] = realpath(dirname(__FILE__) . '/../template/' . $informations[0] . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3] . '.html');
        if (!file_exists($cibDirs[0])) {
            throw new Exception(__('Impossible de trouver le widget ', __FILE__) . $cibDirs[0]);
        }
        if (!rcopy($cibDirs[0], $tmp_dir . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3] . '.html')) {
            throw new Exception(__('Impossible de copier ', __FILE__) . $cibDirs[0] . ' => ' . $tmp_dir);
        }
        $cibDirs[1] = realpath(dirname(__FILE__) . '/../template/' . $informations[0]) . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3];
        if (file_exists($cibDirs[1])) {
            mkdir($tmp_dir . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3]);
            if (!rcopy($cibDirs[1], $tmp_dir . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3], false)) {
                throw new Exception(__('Impossible de copier ', __FILE__) . $cibDirs[1] . ' => ' . $tmp_dir);
            }
        }
        $tmp = dirname(__FILE__) . '/../../../../tmp/' . $market->getLogicalId() . '.zip';
        if (file_exists($tmp)) {
            if (!unlink($tmp)) {
                throw new Exception(__('Impossible de supprimer : ', __FILE__) . $tmp . __('. Vérifiez les droits', __FILE__));
            }
        }
        if (!create_zip($tmp_dir, $tmp)) {
            throw new Exception(__('Echec de création du zip. Répertoire source : ', __FILE__) . $tmp_dir . __(' / Répertoire cible : ', __FILE__) . $tmp);
        }
        return $tmp;
    }

    public static function getFromMarket(&$market, $_path) {
        $informations = explode('.', $market->getLogicalId());
        $cibDir = dirname(__FILE__) . '/../template/' . $informations[0];
        if (!file_exists($cibDir)) {
            throw new Exception(__('Impossible d\'installer le widget le repertoire n\éxiste pas : ', __FILE__) . $cibDir);
        }
        $zip = new ZipArchive;
        if ($zip->open($_path) === TRUE) {
            $zip->extractTo($cibDir . '/');
            $zip->close();
        } else {
            throw new Exception(__('Impossible de décompresser le zip : ', __FILE__) . $_path);
        }
        $widgetDir = realpath(dirname(__FILE__) . '/../template/' . $informations[0] . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3] . '.html');
        if (!file_exists($widgetDir)) {
            throw new Exception(__('Echec de l\'installation. Impossible de trouver le widget ', __FILE__) . $widgetDir);
        }
    }

    public static function removeFromMarket(&$market) {
        $informations = explode('.', $market->getLogicalId());
        $widgetDir = realpath(dirname(__FILE__) . '/../template/' . $informations[0] . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3] . '.html');
        $widget = self::byPath($widgetDir);
        if (!is_object($widget)) {
            throw new Exception(__('Le widget est introuvable ', __FILE__) . $widgetDir);
        }
        $widget->remove();
    }

    public static function listMarketObject() {
        $return = array();
        foreach (self::listWidget('dashboard') as $widget) {
            $return[] = $widget->getLogicalId();
        }
        foreach (self::listWidget('mobile') as $widget) {
            $return[] = $widget->getLogicalId();
        }
        return $return;
    }

    /*     * *********************Methode d'instance************************* */

    public function getHumanName() {
        return $this->getType() . '.' . $this->getSubtype() . '.' . $this->getName();
    }

    public function remove() {
        $allowWritePath = config::byKey('allowWriteDir', 'widget');
        if (!hadFileRight($allowWritePath, $this->getPath())) {
            throw new Exception(__('Vous n\'etes pas autoriser à écrire : ', __FILE__) . $this->getPath());
        }
        if (file_exists($this->getPath())) {
            unlink($this->getPath());
        }
        $extention = dirname(__FILE__) . '/../template/' . $this->getVersion() . '/cmd.' . $this->getHumanName();
        if (file_exists($extention)) {
            rrmdir($extention);
        }
    }

    public function copy($_name){
        $dep = realpath(dirname(__FILE__) . '/../template/' . $this->getVersion()) . '/cmd.' . $this->getType() . '.' .$this->getSubtype() . '.' . $this->getName();
        if(file_exists($dep)){
            mkdir(realpath(dirname(__FILE__) . '/../template/' . $this->getVersion()) . '/cmd.' . $this->getType() . '.' .$this->getSubtype() . '.' . $_name);
            if (!rcopy($dep, realpath(dirname(__FILE__) . '/../template/' . $this->getVersion()) . '/cmd.' . $this->getType() . '.' .$this->getSubtype() . '.' . $_name, false)) {
                throw new Exception(__('Impossible de copier ', __FILE__) . $cibDirs[1] . ' => ' . $tmp_dir);
            }
        }
        $widget = clone $this;
        $widget->setName($_name);
        $widget->setpath(realpath($widget->generatePath()));
        $widget->setContent(str_replace('cmd.' . $this->getType() . '.' .$this->getSubtype() . '.' . $this->getName(), 'cmd.' . $this->getType() . '.' .$this->getSubtype() . '.' . $_name, $widget->getContent()));
        $widget->save();
        return $widget;
    }

    public function save() {
        if (trim($this->getName()) == '') {
            throw new Exception(__('Le nom du widget ne peut etre vide', __FILE__));
        }
        $allowWritePath = config::byKey('allowWriteDir', 'widget');
        if (!hadFileRight($allowWritePath, $this->generatePath())) {
            throw new Exception(__('Vous n\'etes pas autoriser à écrire : ', __FILE__) . $this->generatePath());
        }
        file_put_contents($this->generatePath(), $this->getContent());
        if (realpath($this->getPath()) != realpath($this->generatePath())) {
            if (file_exists($this->getPath())) {
                unlink($this->getPath());
                $informations = explode('.', $this->getPath());
                $name = $informations[count($informations) - 2];
                $type = $informations[count($informations) - 4];
                $subtype = $informations[count($informations) - 3];
                $cmds = cmd::searchTemplate('"'.$this->getVersion() . '":"' . $name.'"', null, $type, $subtype);
                foreach ($cmds as $cmd) {
                    $cmd->setTemplate($this->getVersion(),$this->getName());
                    $cmd->save();
                }
            }
            if (is_dir(str_replace('.html', '', $this->getPath()))) {
                if (!rename(str_replace('.html', '', $this->getPath()), str_replace('.html', '', $this->generatePath()))) {
                    throw new Exception(__('Impossible de déplacer : ', __FILE__) . str_replace('.html', '', $this->getPath()) . __(' vers ', __FILE__) . str_replace('.html', '', $this->generatePath()));
                }
            }
        }
        foreach ($this->getUsedBy() as $cmd) {
            $cmd->save();
        }
        return true;
    }

    public function generatePath() {
        $pathfile = dirname(__FILE__) . '/../template/';
        $pathfile .= $this->getVersion() . '/';
        $pathfile .= 'cmd.' . $this->getType() . '.' . $this->getSubtype() . '.' . $this->getName() . '.html';
        return $pathfile;
    }

    public function displayExemple() {
        $cmds = cmd::byTypeSubType($this->getType(), $this->getSubtype());
        if (count($cmds) < 1) {
            return __('Il n\'y a aucune commande de type : ', __FILE__) . $this->getType() . __(' et de sous-type : ', __FILE__) . $this->getSubtype();
        }
        $usedBy = $this->getUsedBy();
        if(count($usedBy) > 0){
         foreach ($usedBy as $cmd) {
            $cmd->setTemplate($this->getVersion(), $this->getName());
            $html = $cmd->toHtml($this->getVersion());
            if (trim($html) != '') {
                $color = $cmd->getEqLogic()->getBackgroundColor($this->getVersion());
                return '<div class="eqLogic-widget" style="background-color : ' . $color . ';">' . $html . '</div>';
            }
        }

    }
    foreach ($cmds as $cmd) {
        $cmd->setTemplate($this->getVersion(), $this->getName());
        $html = $cmd->toHtml($this->getVersion());
        if (trim($html) != '') {
            $color = $cmd->getEqLogic()->getBackgroundColor($this->getVersion());
            return '<div class="eqLogic-widget" style="background-color : ' . $color . ';">' . $html . '</div>';
        }
    }
}

public function getLogicalId() {
    return $this->getVersion() . '.' . $this->getHumanName();
}

public function getUsedBy() {
    return cmd::searchTemplate('"'.$this->getVersion() . '":"' . $this->getName().'"', null, $this->getType(), $this->getSubtype());
}

/*     * **********************Getteur Setteur*************************** */

public function getType() {
    return $this->type;
}

public function setType($type) {
    $this->type = $type;
}

public function getSubtype() {
    return $this->subtype;
}

public function setSubtype($subtype) {
    $this->subtype = $subtype;
}

public function getName() {
    return $this->name;
}

public function setName($name) {
    $this->name = str_replace('.', '_', $name);
}

public function getPath() {
    return $this->path;
}

public function setPath($path) {
    $this->path = $path;
}

public function getContent() {
    return $this->content;
}

public function setContent($content) {
    $this->content = $content;
}

public function getVersion() {
    return $this->version;
}

public function setVersion($version) {
    $this->version = $version;
}

}

?>
