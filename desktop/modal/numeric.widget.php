<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (!isConnect('admin')) {
	throw new Exception('{{401 - Accès non autorisé}}');
}

?>
<div class="col-sm-12">
    <div class="row">
        <div class="col-sm-12">
            <div class="well col-sm-12">
                <div class="form-group form-group-sm">
                    <label class="col-sm-2 control-label" for="bsInfoNumericName">{{Nom}}</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="bsInfoNumericName" placeholder="{{Nom}}..."/>
                    </div>
                    <div class="col-sm-3">
                        <select class="form-control" id="bsInfoNumericDash">
                            <option value="1">Dashboard</option>
                            <option value="0">Mobile</option>
                        </select>
                    </div>
                    <div class="col-sm-3">
                        <select class="form-control" id="bsInfoNumericType">
                            <option value="0">Jeedom</option>
                            <option value="1">Widgets</option>
                            <option value="2">Spécial</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <button type="button" class="btn btn-sm btn-block btn-primary" id="bsInfoNumericAddEntry" title="{{Ajouter une entrée}}"><i class="fa fa-plus-circle"></i> {{Ajouter}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th style="text-align: center;" class="col-sm-2">Image</th>
                        <th style="text-align: center;" class="col-sm-2">Taille</th>
                        <th style="text-align: center;" class="col-sm-2">de</th>
                        <th style="text-align: center;" class="col-sm-2">à</th>
                        <th style="text-align: center;" class="col-sm-3">Aperçu</th>
                        <th style="text-align: center;" class="col-sm-1"></th>
                    </tr>
                </thead>
                <tbody id="bodyInfoNumeric">
                    <tr>
                        <td style="text-align: center; vertical-align: middle;">
                            <a class="btn btn-default btn-xs JeedomView" data-index="0" name="bsInfoNumericInsertIcon0" id="bsInfoNumericInsertIcon0" style=display:none"><i class="fa fa-flag"></i> Rechercher une icone</a>
                            <select class="form-control widgetsView" value="" data-index="0" name="bsInfoNumericImage0" id="bsInfoNumericImage0">
                            </select>
                        </td>
                        <td style="text-align: center; vertical-align: middle;">
                            <input type="number" class="form-control JeedomView" data-index="0" style=display:none" value="2.5" min="1" max="5" step="0.2" name="bsInfoNumericIconSize0" id="bsInfoNumericIconSize0"/>
                            <label class="col-sm-12 control-label widgetsView" id="bsInfoNumericLabel0"></label>
                        </td>
                        <td style="text-align: center; vertical-align: middle;">
                            <input type="number" class="form-control" value="0" max="100" data-index="0" name="bsInfoNumericEcartMin0" id="bsInfoNumericEcartMin0" disabled/>
                        </td>
                        <td style="text-align: center; vertical-align: middle;">
                            <input type="number" class="form-control" value="100" max="100" data-index="0" name="bsInfoNumericEcartMax0" id="bsInfoNumericEcartMax0"/>
                        </td>
                        <td style="text-align: center; vertical-align: middle;">
                            <span style="font-size: 2.5em;font-weight: bold;margin-top: 5px;" class=" JeedomView" data-index="0" name="bsInfoNumericIconCmd0" id="bsInfoNumericIconCmd0"></span>
                            <img src="" id="bsInfoNumericPreview0" class="img-responsive widgetsView" style="margin: 0px auto;" alt="Image 0">
                        </td>
                        <td style=" vertical-align: middle;">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-3" style="width:224px;">
            <div class="well col-sm-12">
                    <input id="bsInfoNumeric" style="width:150px;" data-slider-id='bsInfoNumericSlider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="0"/>
                <div class="col-sm-12" style="text-align: center; vertical-align: middle;">
                    <div class="eqLogic eqLogic-widget" style="display: none;">
                        <div class="verticalAlign">
                            <center id="bsInfoNumericWidgetOff"></center>
                        </div>
                    </div> 
                </div>
            </div>       
        </div>       
        <div class="col-sm-9">
            <textarea class="form-control" id="bsViewInfoNumeric"></textarea>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <br>
        <button type="button" class="btn btn-danger pull-right" id="modalInfoNumericCancel">{{Annuler}}</button>
        <button type="button" class="btn btn-success pull-right" id="modalInfoNumericSave">{{Valider}}</button>
    </div>
</div>

<?php
include_file('desktop', 'numeric.widget', 'js', 'widget');
?>