Ext.define('wx.view.Test', {
    extend: 'Ext.form.Panel',
    id:'test',
    config:{
        hideOnMaskTap: false,
        //centered: true,
        height: '95%',
        items: [
            {
                xtype: 'textareafield',
                name: 'message',
                label: 'xml'
            }

        ]
    }


});