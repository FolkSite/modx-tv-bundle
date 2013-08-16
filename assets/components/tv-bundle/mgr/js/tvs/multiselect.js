TVBundle.tv.MultiSelect = function(config) {
    config = config || {};

    this.id = config.id

    this.availableItems = [];
    this.selectedValuesStore = false;
    this.availableValuesStore = false;
    this.tvField = document.getElementById(config.id);

    this.prepareData(config.opts);
    this.createGrid(config);

    //noinspection JSValidateTypes
    Ext.apply(config,{
        border: false

        ,value: false

        ,items: [{
            xtype: 'combo'
            ,mode: 'local'
            ,typeAhead: true
            ,triggerAction: 'all'
            ,pageSize: 0
            ,width: 300
            ,lazyRender: true
            ,valueField: 'value'
            ,displayField: 'text'
            ,store: this.availableValuesStore
            ,listeners: {
                select: {fn: this.onComboSelect, scope: this}
            }
        },this.grid]
    });
    TVBundle.tv.MultiSelect.superclass.constructor.call(this,config);

    this.tvField.style.display = 'none';
};
Ext.extend(TVBundle.tv.MultiSelect,MODx.Panel,{

//    availableItems: []
//    ,selectedValuesStore:false
//    ,availableValuesStore: false

    /**
     * Prepare data records (select options) for use
     * @param data
     */
    prepareData: function(data){

        for(var k=0;k<data.length;k++){
            // Add to records record
            this.availableItems.push(data[k]);
            // If selected, add to that list also
        }

        // Prepare data
        var records = [];
        var selected = [];
        for(var k=0;k<this.availableItems.length;k++){
            var item = this.availableItems[k];

      //      if(item.selected){
      //          selected.push([item.text,item.value]);
      //      } else {
                records.push([item.selected,item.text,item.value]);
      //      }
        }
        this.availableValuesStore = new Ext.data.ArrayStore({
            storeId: this.id+'-store'
            ,fields: [
                'selected',
                'text',
                'value'
            ],
            data: records
        });


        this.selectedValuesStore = new Ext.data.ArrayStore({
            storeId: this.id+'-selected-store'
            ,fields: ['selected','text','value']
            ,data: []
        });


        selectedIds = this.tvField.value.split('||')
        for(var k=0;k<selectedIds.length;k++){
            var value = selectedIds[k];
            var index = this.availableValuesStore.findExact('value',value);
            if(index>=0){
                var record = this.availableValuesStore.getAt(index);
                this.availableValuesStore.remove(record);
                this.selectedValuesStore.add(record);

            }
        }
    }




    ,createGrid: function(){
        this.grid = MODx.load({
            xtype: 'modx-grid-local'
            ,autoHeight: true
            ,deferRender: true
            ,hideHeaders: true
            ,store: this.selectedValuesStore
            ,fields: ['text','value','selected']
            ,tv: this
            ,id: this.id + '-grid'
            ,columns: [{
                header: 'ONE',
                dataIndex: 'text'
            }]
            ,enableDragDrop: true
            ,ddGroup: this.id+'-dd'
            ,ddText: 'Place item here'
            ,sm: new Ext.grid.RowSelectionModel({
                singleSelect:true,
                listeners: {
                    beforerowselect: {fn: function(sm,i,ke,row){
                        this.ddText = row.data.pagetitle
                    }, scope: this}
                }
            })
            ,listeners: {
                render: {fn: this._onGridRender,scope: this}
            }

            ,getTV: function(ths){return function(){
                return ths;
            }}(this)

            ,getMenu: function(grid,index){
                console.log(arguments)
                return [{
                    text: 'Remove Item'
                    ,itemIndex: index
                    ,handler: this.getTV().removeGridItem
                    ,scope: this.getTV()
                }]
            }

        });


    //    this.availableValuesStore.filter('selected',1);
    }



    ,_onGridRender: function(){
        var grid = this.grid;

        // Set up dd target
        var ddrow = new Ext.dd.DropTarget(this.grid.getView().mainBody, {
            ddGroup : this.id+'-dd'
            ,copy: false
            ,notifyDrop : function(tv){ return function(dd, e, data){
                console.log('DROP');
                var grid = tv.grid
                var sm = grid.getSelectionModel();
                var rows = sm.getSelections();
                var cindex = dd.getDragData(e).rowIndex;
                var store = grid.getStore();

                if (sm.hasSelection()) {
                    for (i = 0; i < rows.length; i++) {
                        store.remove(store.getById(rows[i].id));
                        store.insert(cindex,rows[i]);
                    }
                    sm.selectRecords(rows);
                //    grid.store.updateMenuIndexes();

                    tv.onOrderUpdated();
                }
            }}(this)
        });

    }



    ,onOrderUpdated: function(){
        this.updateValueField();
    }


    /**
     * Pre-defined options chosen from combo list
     */
    ,onComboSelect: function(combo,record,ind){

        // Remove record from options list
        record.store.remove(record);

        // Add record to selected store
        this.selectedValuesStore.add(record);

        // Update tv value
        this.updateValueField();
    }



    ,updateValueField: function(){
        var values = [];
        var store = this.selectedValuesStore;
        for(var k=0;k<store.data.items.length;k++){

            var item = store.data.items[k];
            values.push(item.data.value);
        }

        this.tvField.value = values.join('||');
    }

    /**
     * Creates a data availableValuesStore to power the combo box
     *
     * @param opts {Object}
     * @returns {Ext.data.ArrayStore}
     * @private
     */
    ,_getComboStore: function( opts ){
        return this.availableValuesStore
    }


    ,removeGridItem: function(menu,evt){
        var itemIndex = menu.initialConfig.options.itemIndex;
        var store = this.getStore();
        var record = store.getAt(itemIndex);
        store.remove(record);

        this.tv.availableValuesStore.add(record);

        this.tv.updateValueField();
    }


});
Ext.reg('tvbundle-tv-multiselect',TVBundle.tv.MultiSelect);


