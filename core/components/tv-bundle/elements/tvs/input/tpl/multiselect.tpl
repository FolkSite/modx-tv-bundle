<input type="text" id="tv{$tv->id}" name="tv{$tv->id}" value="{$tv->value}" />
<div id="tv{$tv->id}-panel"></div>
<script>
{literal}
MODx.load({
    {/literal}
    xtype: 'tvbundle-tv-multiselect'
    ,name: 'tv{$tv->id}'
    ,hiddenName: 'tv{$tv->id}'
    ,transform: 'tv{$tv->id}'
    ,id: 'tv{$tv->id}'
    ,width: 300
    ,value: '{$tv->value}'
    ,opts: {$opts|json_encode}
    ,renderTo: 'tv{$tv->id}-panel'
    {literal}
    ,listeners: { 'select': { fn:MODx.fireResourceFormChange, scope:this}}
})
{/literal}
</script>
