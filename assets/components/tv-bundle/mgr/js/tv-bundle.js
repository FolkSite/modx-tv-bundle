var TVBundle = function(config) {
    config = config || {};
    TVBundle.superclass.constructor.call(this,config);
};
Ext.extend(TVBundle,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {},tv: {}
});
Ext.reg('tvbundle',TVBundle);
TVBundle = new TVBundle();