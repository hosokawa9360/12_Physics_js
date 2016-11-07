# 12_Physics_js
物理エンジン　Box2dの実装サンプル  
## 1.背景と地面,トーテム（トーテムポールの頭）の配置

## 2.物理空間を定義する

### [外部変数]  
```
var world;
var worldScale = 30;//1メートルが30ピクセル

```
### gameLayer 重力とBOX2Dの物理空間定義  
```
var gravity = new Box2D.Common.Math.b2Vec2(0, -10)
world = new Box2D.Dynamics.b2World(gravity, true);
```
### update関数　物理計算頻度を設定
```
  // 物理計算をする　速度に10回、位置に対して10回シミュレーション
   world.Step(dt,10,10);
```
なお、公式のBOX2Dのドキュメントでは、速度に対して8回、位置に対して3回を設定することを推奨されている  


## 2.物理の特性を定義する
//剛体の定義データ型を呼び出す  
```
var bodyDef = new Box2D.Dynamics.b2BodyDef;
```
//剛体は重力の影響を受ける：dynamicを定義  
```
bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
```
//剛体の座標をスプライトの座標に一致させる ピクセルからメートルに変換  
```
 bodyDef.position.Set(totem.x/worldScale,totem.y/worldScale);
 ```
 //剛体にスプライトを組み込む  
  //剛体のタイプを指定　b2_dynamicBodyは重力の影響を受けるというタイプ  
	```
 bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
 bodyDef.userData = {
            type:  bodyDef.type ,
            asset: totem
        }
```
　//ここまだ設定した剛体の定義から、物理剛体をインスタンス  
```
var body = world.CreateBody(bodyDef)
```
//物理特性を定義データ型を呼び出す  
```
var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
fixtureDef.density = 1.0;//bodyの質量
fixtureDef.friction = 0.5;//body同士の滑り方
fixtureDef.restitution = 0.2;//bodyの跳ね方
```
//物理特性の計上を定義　今回はポリゴン型  
```
fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
```
//SetAsBoxで箱型として定義する　画像の実際の幅と高さが物理空間で何メールになるか割り算。box2dではその値を半分にするルールがある  
```
var width = totem.getContentSize().width
var height = totem.getContentSize().height
 fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
 ```
 //剛体に物理特性を与える  
 ```
body.CreateFixture(fixtureDef);
```
//update関数ですべての剛体の位置を更新する
```
update:function (dt) {
	// 物理計算をする　速度に10回、位置に対して10回シミュレーション
	world.Step(dt,10,10);
	for (var b = world.GetBodyList(); b; b = b.GetNext()) {
						if (b.GetUserData() != null) {
								var mySprite = b.GetUserData().asset;
								mySprite.setPosition(b.GetPosition().x * worldScale, b.GetPosition().y * worldScale);
								mySprite.setRotation(-1 * cc.radiansToDegrees (b.GetAngle()));
						}
				}
},
```

## 3.たくさんの物体の物理剛体を定義するのは冗長なので、物理剛体を定義する関数をつくる
```
function addPysicsBody(sprite,isDynamic,type){

  var width = sprite.getContentSize().width
  var height = sprite.getContentSize().height
  var posX = sprite.x
  var posY = sprite.y
  // 物理剛体の定義データ型を作る
         var bodyDef = new Box2D.Dynamics.b2BodyDef;
         //物理タイプを選択する　isDynamicがtrueなら重力の影響を受ける
       if(isDynamic){
           bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
       }
       else{
           bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
       }
       //物理剛体の位置をセットする
       bodyDef.position.Set(posX/worldScale,posY/worldScale);
       //物理剛体へのスプライトの組み込み
       bodyDef.userData = {
           type: type,
           asset: sprite
       }
      //  物理剛体をインスタンス
       var body = world.CreateBody(bodyDef)
      //  物理特性を定義
       var fixtureDef = new Box2D.Dynamics.b2FixtureDef;
       fixtureDef.density = 1.0;
       fixtureDef.friction = 0.5;
       fixtureDef.restitution = 0.2;
       //他の物体に当たったときに計算する形状モデルはb2PolygonShapeｓにする
       fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
       //他の物体に当たったときに計算する形状の大きさを定義
       fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
      //  物理剛体に物理合成を与える
       body.CreateFixture(fixtureDef);
   }
```
