Ext.define('wx.view.Map', {
    extend: 'Ext.Map',
    id: 'map',


    config: {
        height: '95%',
        useCurrentLocation: true,
        mapOptions:{
            zoom: 15,
            disableDefaultUI: true,
            //--Available Map Options--//

            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
        }
    },


});