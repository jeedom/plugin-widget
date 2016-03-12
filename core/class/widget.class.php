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

	public static function listSvgWidget() {
		$return = array();
		$uploaddir = dirname(__FILE__) . '/../special';
		$data['files'] = ls($uploaddir, "*", false, array('files'));
		$data['folders'] = ls($uploaddir, "*", false, array('folders'));
		for ($index = 0; $index < count($data['folders']); $index++) {
			$data['folders'][$index] = str_replace('/', '', $data['folders'][$index]);
		}
		for ($index = 0; $index < count($data['files']); $index++) {
			$filename = pathinfo($data['files'][$index]);
			for ($nbFolder = 0; $nbFolder < count($data['folders']); $nbFolder++) {
				if ($data['folders'][$nbFolder] == strtolower($filename['filename'])) {
					$folders['name'] = $data['files'][$index];
					$folders['folder'] = strtolower($filename['filename']) . '/';
					$folders['files'] = ls($uploaddir . '/' . strtolower($filename['filename']), "*", false, array('files'));
					$extension = pathinfo(strtolower($folders['files'][0]));
					$folders['extension'] = $extension['extension'];
					//return $folders;.replace(/<?[^>]*>/, "").replace(/<!DOCTYPE[^>]*>/, "").replace(/<!--[^>]*>/, "")
					if (in_array($folders['extension'], array('svg'))) {
						for ($nbFile = 0; $nbFile < count($folders['files']); $nbFile++) {
							$filename = pathinfo($folders['files'][$nbFile]);
							$folders['svg'][$nbFile]['name'] = $filename['filename'];
							$folders['svg'][$nbFile]['snap'] = file_get_contents($uploaddir . '/' . $folders['folder'] . $folders['files'][$nbFile]);
						}
					}
					$return[] = $folders;
				}
			}
		}
		return $return;
	}

	public static function byPath($_pathfile) {
		if (strpos($_pathfile, '.html') === false) {
			$_pathfile .= '.html';
		}
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
		if (!rcopy($cibDirs[0], $tmp_dir . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3] . '.html', false, array(), true)) {
			throw new Exception(__('Impossible de copier ', __FILE__) . $cibDirs[0] . ' => ' . $tmp_dir);
		}
		$cibDirs[1] = realpath(dirname(__FILE__) . '/../template/' . $informations[0]) . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3];
		if (file_exists($cibDirs[1])) {
			mkdir($tmp_dir . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3]);
			if (!rcopy($cibDirs[1], $tmp_dir . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3], false, array(), true)) {
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
		$widgetDir = dirname(__FILE__) . '/../template/' . $informations[0] . '/cmd.' . $informations[1] . '.' . $informations[2] . '.' . $informations[3] . '.html';
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

	public static function getSideBarList() {
		$return = '';
		foreach (self::listWidget('dashboard') as $widget) {
			$return .= '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a><i class="fa fa-desktop fa-fw" title="Widget pour la version bureau"></i> ' . $widget->displayWidgetName();
			$return .= '<span class="badge pull-right">' . count($widget->getUsedBy()) . '</span>';
			$return .= '</a></li>';
		}
		foreach (self::listWidget('mobile') as $widget) {
			$return .= '<li class="cursor li_widget" data-path="' . $widget->getPath() . '"><a><i class="fa fa-mobile fa-fw" title="Widget pour la version mobile"></i> ' . $widget->displayWidgetName();
			$return .= '<span class="badge pull-right">' . count($widget->getUsedBy()) . '</span>';
			$return .= '</a></li>';
		}
		return $return;
	}

	public static function getContainer() {
		$return = '';
		$widget_list = array_merge(self::listWidget('dashboard'), self::listWidget('mobile'));
		foreach ($widget_list as $widget) {
			$return .= '<div class="widgetDisplayCard cursor" data-path="' . $widget->getPath() . '" style="position:relative;border: 1px solid #C5C5C5;border-radius: 15px;background-color : #ffffff; height : 180px;margin-bottom : 10px;padding : 10px;width : 160px;margin-left : 10px;" >';
			if ($widget->getVersion() == 'mobile') {
				$return .= '<i class="fa fa-mobile" style="position: absolute;top: 10px;left: 22px;" title="Widget pour la version mobile"></i>' . $widget->displayWidgetType() . $widget->displayWidgetSubtype();
			} else {
				$return .= '<i class="fa fa-desktop" style="position: absolute;top: 10px;left: 18px;" title="Widget pour la version bureau"></i>' . $widget->displayWidgetType() . $widget->displayWidgetSubtype();
			}
			$urlPath = config::byKey('market::address') . '/filestore/market/widget/images/' . $widget->getVersion() . '.' . $widget->getHumanName() . '.jpg';
			$urlPath2 = config::byKey('market::address') . '/filestore/market/widget/images/' . $widget->getVersion() . '.' . $widget->getHumanName() . '_icon.png';
			$urlPath3 = config::byKey('market::address') . '/filestore/market/widget/images/' . $widget->getVersion() . '.' . $widget->getHumanName() . '_icon.jpg';
			$return .= "<center>";
			$return .= '<img class="lazy" style="margin-left: 40px;border: 1px solid #C5C5C5;border-radius:5px; padding: 3px" src="plugins/widget/doc/images/widget_icon.png" data-original3="' . $urlPath3 . '" data-original2="' . $urlPath2 . '" data-original="' . $urlPath . '" height="105" width="95" />';
			$return .= "</center>";
			if ($widget->getVersion() == 'mobile') {
				$return .= '<strong class="well col-sm-12 text-center" style="font-size : 0.85em;position:relative;padding: 5px; top : 15px;"><div style="width: auto; overflow: hidden;  -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap;" title="' . $widget->getName() . '">' . '<span class="badge pull-left">' . count($widget->getUsedBy()) . '</span> ' . $widget->getName() . '</div></strong>';
			} else {
				$return .= '<strong class="well col-sm-12 text-center" style="font-size : 0.85em;position:relative;padding: 5px; top : 15px;"><div style="width: auto; overflow: hidden;  -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap;" title="' . $widget->getName() . '">' . '<span class="badge pull-left">' . count($widget->getUsedBy()) . '</span> ' . $widget->getName() . '</div></strong>';
			}
			$return .= '</div>';
		}
		return $return;
	}

	public function displayWidgetName() {
		$result = '';
		$name = explode('.', $this->getHumanName());
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

	public function displayWidgetType() {
		$result = '';
		$name = explode('.', $this->getHumanName());
		if (count($name) != 3) {
			return "";
		}
		switch ($name[0]) {
			case 'info':
				$result .= '<i class="fa fa-eye fa-fw" title="Widget de type information" style="position: absolute;top: 26px; left: 16px;"></i> ';
				break;
			case 'action':
				$result .= '<i class="fa fa-exclamation-circle fa-fw" title="Widget de type action" style="position: absolute;top: 26px; left: 16px;"></i> ';
				break;
			default:
				$result .= "";
				break;
		}
		return $result;
	}

	public function displayWidgetSubtype() {
		$result = '';
		$name = explode('.', $this->getHumanName());
		if (count($name) != 3) {
			return "";
		}
		switch ($name[1]) {
			case 'other':
				$result .= '<span class="label label-warning" style="text-shadow: none;position: absolute;top: 65px; left: -21px;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin: 38px 16px;-webkittransform-origin: 38px 16px;">other</span> ';
				break;
			case 'color':
				$result .= '<span class="label label-success" style="text-shadow: none;position: absolute;top: 65px; left: -21px;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin: 38px 16px;-webkittransform-origin: 38px 16px;">color</span> ';
				break;
			case 'slider':
				$result .= '<span class="label label-primary" style="text-shadow: none;position: absolute;top: 65px; left: -21px;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin: 38px 16px;-webkittransform-origin: 41px 16px;">slider</span> ';
				break;
			case 'binary':
				$result .= '<span class="label label-info" style="text-shadow: none;position: absolute;top: 65px; left: -21px;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin: 38px 16px;-webkittransform-origin: 44px 16px;">binary</span> ';
				break;
			case 'numeric':
				$result .= '<span class="label label-danger" style="text-shadow: none;position: absolute;top: 65px; left: -21px;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin: 38px 16px;-webkittransform-origin: 53px 16px;">numeric</span> ';
				break;
			case 'string':
				$result .= '<span class="label label-default" style="text-shadow: none;position: absolute;top: 65px; left: -21px;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin: 38px 16px;-webkittransform-origin: 41px 16px;">string</span> ';
				break;
			default:
				$result .= "";
				break;
		}
		return $result;
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

	public function copy($_data) {
		$_data['name'] = $_data['name'] == '' ? $this->getName() . '_copy' : $_data['name'];
		$_data['version'] = $_data['version'] != '' ? $_data['version'] : $this->getVersion();
		$_data['type'] = $_data['type'] == 'none' ? $this->getType() : $_data['type'];
		$_data['subtype'] = $_data['subtype'] == 'none' ? $this->getSubtype() : $_data['subtype'];
		$dep = realpath(dirname(__FILE__) . '/../template/' . $this->getVersion()) . '/cmd.' . $this->getType() . '.' . $this->getSubtype() . '.' . $this->getName();
		if (file_exists($dep)) {
			mkdir(realpath(dirname(__FILE__) . '/../template/' . $_data['version']) . '/cmd.' . $_data['type'] . '.' . $_data['subtype'] . '.' . $_data['name']);
			if (!rcopy($dep, realpath(dirname(__FILE__) . '/../template/' . $_data['version']) . '/cmd.' . $_data['type'] . '.' . $_data['subtype'] . '.' . $_data['name'], false, array(), true)) {
				throw new Exception(__('Impossible de copier ', __FILE__) . $cibDirs[1] . ' => ' . $tmp_dir);
			}
		}
		$widget = clone $this;
		$widget->setName($_data['name']);
		$widget->setVersion($_data['version']);
		$widget->setType($_data['type']);
		$widget->setSubtype($_data['subtype']);
		$widget->setpath(realpath($widget->generatePath()));
		$widget->setContent(str_replace('cmd.' . $this->getType() . '.' . $this->getSubtype() . '.' . $this->getName(), 'cmd.' . $_data['type'] . '.' . $_data['subtype'] . '.' . $_data['name'], $widget->getContent()));
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
				$cmds = cmd::searchTemplate('"' . $this->getVersion() . '":"' . $name . '"', null, $type, $subtype);
				foreach ($cmds as $cmd) {
					$cmd->setTemplate($this->getVersion(), $this->getName());
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
		if (count($usedBy) > 0) {
			foreach ($usedBy as $cmd) {
				$cmd->setTemplate($this->getVersion(), $this->getName());
				$html = $cmd->toHtml($this->getVersion());
				if (trim($html) != '') {
					$color = $cmd->getEqLogic()->getBackgroundColor($this->getVersion());
					return array('html' => '<div class="eqLogic-widget" style="background-color : ' . $color . ';">' . $html . '</div>', 'cmd_humanname' => $cmd->getHumanName());
				}
			}
		}
		foreach ($cmds as $cmd) {
			$cmd->setTemplate($this->getVersion(), $this->getName());
			$html = $cmd->toHtml($this->getVersion());
			if (trim($html) != '') {
				$color = $cmd->getEqLogic()->getBackgroundColor($this->getVersion());
				return array('html' => '<div class="eqLogic-widget" style="background-color : ' . $color . ';">' . $html . '</div>', 'cmd_id' => $cmd->getId(), 'cmd_humanname' => $cmd->getHumanName());
			}
		}
	}

	public function getLogicalId() {
		return $this->getVersion() . '.' . $this->getHumanName();
	}

	public function getUsedBy() {
		return cmd::searchTemplate('"' . $this->getVersion() . '":"' . $this->getName() . '"', null, $this->getType(), $this->getSubtype());
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
