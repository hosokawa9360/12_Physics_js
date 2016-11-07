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
        var size = cc.director.getWinSize();
// 背景
        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf,0x9f,0x83,255),
        cc.color(0xfa,0xf7,0x9f,255));
        this.addChild(backgroundLayer);
// 地面
        var ground =  cc.Sprite.create(res.ground_png);
        ground.setPosition(size.width/2, 10);
        this.addChild(ground);
// トーテム
        var totem =  cc.Sprite.create(res.totem_png);
        totem.setPosition(size.width/2, size.height/2);
        this.addChild(totem);

        this.scheduleUpdate();

    },
    update:function (dt) {

    },

});
