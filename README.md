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
