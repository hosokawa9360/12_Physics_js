var world;
var worldScale = 30;//1メートルが30ピクセル

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

// 重力と物理空間の定義
        var gravity = new Box2D.Common.Math.b2Vec2(0, -10)
        world = new Box2D.Dynamics.b2World(gravity, true);


//剛体の定義データ型を呼び出す
var bodyDef = new Box2D.Dynamics.b2BodyDef;
//剛体は重力の影響を受ける：dynamicを定義
bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
//剛体の座標をスプライトの座標に一致させる ピクセルからメートルに変換
 bodyDef.position.Set(totem.x/worldScale,totem.y/worldScale);
 //剛体にスプライトを組み込む

  //剛体のタイプを指定　b2_dynamicBodyは重力の影響を受けるというタイプ
 bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
 bodyDef.userData = {
            type:  bodyDef.type ,
            asset: totem
        }

　//ここまだ設定した剛体の定義から、物理剛体をインスタンス
var body = world.CreateBody(bodyDef)

//物理特性を定義データ型を呼び出す
var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
fixtureDef.density = 1.0;//bodyの質量
fixtureDef.friction = 0.5;//body同士の滑り方
fixtureDef.restitution = 0.2;//bodyの跳ね方
//物理特性の計上を定義　今回はポリゴン型
fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
//SetAsBoxで箱型として定義する　画像の実際の幅と高さが物理空間で何メールになるか割り算。box2dではその値を半分にするルールがある
var width = totem.getContentSize().width
var height = totem.getContentSize().height
 fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
 //剛体に物理特性を与える
body.CreateFixture(fixtureDef);



        this.scheduleUpdate();

    },
    update:function (dt) {
      // 物理計算をする　速度に10回、位置に対して10回シミュレーション
      world.Step(dt,10,10);
      for (var b = world.GetBodyList(); b; b = b.GetNext()) {
                if (b.GetUserData() != null) {
                    var mySprite = b.GetUserData().asset;
                    mySprite.setPosition(b.GetPosition().x * worldScale, b.GetPosition().y * worldScale);
                    mySprite.setRotation(-1 * cc.radiansToDegrees (b.GetAngle()));
                    if(b.GetUserData().type=="totem"){
                        for(var c = b.GetContactList(); c; c = c.m_next){
                            if(c.other.GetUserData() &&
                               c.other.GetUserData().type=="ground"){
                                console.log("Oh no!!!!");
                            }
                        }
                    }
                }
            }
    },

});
