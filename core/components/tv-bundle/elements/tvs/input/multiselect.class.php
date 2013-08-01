<?php
if (!class_exists('TVBundleMultiSelectInputRender')) {

    if (!class_exists('modTemplateVarInputRenderListboxMultiple')) {
        require_once MODX_CORE_PATH . 'model/modx/processors/element/tv/renders/mgr/input/listbox-multiple.class.php';
    }

    class TVBundleMultiSelectInputRender extends modTemplateVarInputRenderListboxMultiple
    {


        public function getTemplate()
        {
            return $this->modx->getOption('core_path') . 'components/tv-bundle/elements/tvs/input/tpl/multiselect.tpl';
        }


    }
}
return 'TVBundleMultiSelectInputRender';