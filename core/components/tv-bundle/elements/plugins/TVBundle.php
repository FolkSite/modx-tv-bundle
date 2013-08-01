<?php
/**
 * Bootstraps TV Bundle
 *
 * @package TV-Bundle
 *
 * @event OnTVInputRenderList
 * @event OnTVOutputRenderList
 * @event OnTVInputPropertiesList
 * @event OnTVOutputRenderPropertiesList
 * @event OnManagerPageBeforeRender
 */

$corePath = $modx->getOption('core_path',null,MODX_CORE_PATH).'components/tv-bundle/';
$assetsUrl = $modx->getOption('assets_url').'components/tv-bundle/';
switch ($modx->event->name) {
    case 'OnTVInputRenderList':
        $modx->event->output($corePath.'elements/tvs/input/');
        break;
    case 'OnTVOutputRenderList':
        $modx->event->output($corePath.'elements/tvs/output/');
        break;
    case 'OnTVInputPropertiesList':
        $modx->event->output($corePath.'elements/tvs/inputoptions/');
        break;
    case 'OnTVOutputRenderPropertiesList':
        $modx->event->output($corePath.'elements/tvs/properties/');
        break;
    case 'OnManagerPageBeforeRender':

        $modx->regClientStartupScript($assetsUrl.'mgr/js/tv-bundle.js');
        $modx->regClientStartupScript($assetsUrl.'mgr/js/tvs/multiselect.js');

        break;
}