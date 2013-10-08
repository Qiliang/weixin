Ext.define('wx.controller.UserInfo', {
    extend: 'Ext.app.Controller',
    views: ['UserInfo', 'Main'],

    config: {
        control: {
            'button[action=saveUserInfo]': {
                tap: 'saveUserInfo'
            },
            'button[action=logout]': {
                tap: 'doLogout'
            }
        },

        refs: {
            userInfo: '#userInfo'
        }
    },

    saveUserInfo: function () {
//        var values = this.getUserInfo().getValues();
//        var tpl = new Ext.XTemplate(
//            '<p>{name}</p>',
//            '<p>{sex}</p>',
//            '<p>{age}</p>'
//
//        );


        Ext.Ajax.request({
            url: 'users',
            method:'post',
            params: this.getUserInfo().getValues(),
            success: function (response) {
                var text = response.responseText;
                Ext.Msg.alert('Title', text, Ext.emptyFn);
            },
            failure: function (response, opts) {
                var text = response.responseText;
                Ext.Msg.alert('Title', text, Ext.emptyFn);
            }
        });
    },

    doLogout: function () {
        //called whenever any Button with action=logout is tapped
    }
});