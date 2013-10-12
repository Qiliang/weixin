Ext.define('wx.view.Recommended', {
    extend: 'Ext.Carousel',

    getImage: function (name) {
        return Ext.create('Ext.Img', {
            src: 'http://' + window.location.host + '/image/' + name,
            height: '100%',
            width: '100%'
        });
    },
    config: {
        fullscreen: true,
        ui:'light',
        defaults: {
            styleHtmlContent: true
        }

    },

    initialize: function () {
        this.callParent(arguments);

        this.setItems([
            this.getImage('m1.jpg'),
            this.getImage('m2.jpg'),
            this.getImage('m3.jpg'),
            this.getImage('m4.jpg'),
            this.getImage('m5.jpg')
        ])
    }


});


