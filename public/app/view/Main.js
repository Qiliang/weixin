Ext.define('wx.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: '主页',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: '欢迎进入微信推广平台'
                },

                html: ['微信附近的人——精准营销',

                    '产品描述：微信中基于LBS(基于位置的服务)的功能插件“查看附近的人”便可以使更多陌生人看到这种强制性广告。功能模式：用户点击“查看附近的人”后，可以根据自己的地理位置查找到周围的微信用户。在这些附近的微信用户中，除了显示用户姓名等基本信息外，还会显示用户签名档的内容。所以用户可以利用这个免费的广告位为自己的产品打广告。营销方式：营销人员在人流最旺盛的地方后台24小时运行微信，如果“查看附近的人”使用者足够多，这个广告效果也会不断随着微信用户数量的上升，可能这个简单的签名栏也会变成会移动的“黄金广告位”。',

                ].join("")
            },
            {
                title: '个人信息',
                iconCls: 'user',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '个人信息',
                        items: [
                            {
                                //iconCls: 'compose',
                                text:'保存',
                                align: 'right',
                                action:'saveUserInfo'
                            }
                        ]
                    },
                    Ext.create('wx.view.UserInfo')

                ]
            }
        ]
    }
});
