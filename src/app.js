var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init:function () {
        this._super();
        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf,0x9f,0x83,255),
        cc.color(0xfa,0xf7,0x9f,255));
        this.addChild(backgroundLayer);
        var ground =  cc.Sprite.create(res.ground_png);
        var size = cc.director.getWinSize();
        ground.setPosition(size.width/2, 10);
        this.addChild(ground);
        this.scheduleUpdate();

    },
    update:function (dt) {

    },

});
