Ext.define('wx.controller.UserInfo', {
    extend: 'Ext.app.Controller',
    views: ['UserInfo', 'Main','Test'],

    config: {
        control: {
            'button[action=saveUserInfo]': {
                tap: 'saveUserInfo'
            },
            'button[action=test]': {
                tap: 'test'
            }
        },

        refs: {
            userInfo: '#userInfo',
            test: '#test'
        }
    },

    saveUserInfo: function () {
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

    test: function () {
        Ext.Ajax.request({
            url: 'menu',
            method:'post',
            params: this.getTest().getValues().message,
            success: function (response) {
                var text = response.responseText;
                Ext.Msg.alert('Title', text, Ext.emptyFn);
            },
            failure: function (response, opts) {
                var text = response.responseText;
                Ext.Msg.alert('Title', text, Ext.emptyFn);
            }
        });
    }
});