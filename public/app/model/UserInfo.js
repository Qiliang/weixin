Ext.define('wx.model.UserInfo', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'sex', type: 'string' },
            { name: 'age', type: 'integer' }

        ]
    }
});