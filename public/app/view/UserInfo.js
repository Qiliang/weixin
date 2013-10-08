Ext.define('wx.view.UserInfo', {
    extend: 'Ext.form.Panel',
   // alias:'widget.userinfo',
    id:'userInfo',
    config:{
        hideOnMaskTap: false,
        //centered: true,
        height: '95%',
        items: [
            {
                xtype: 'textfield',
                name: 'name',
                label: '姓名'
            },
            {
                xtype: 'selectfield',
                label: '性别',
                options: [
                    {text: '男', value: 'm'},
                    {text: '女', value: 'f'}
                ],
                name:'sex'

            },
            {
                xtype: 'textfield',
                label: '年龄',
                name: 'age'
            }
        ]
    }


});