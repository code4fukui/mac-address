# mac-address
金沢大学のwi-fiパケットセンシングにより取得したデータをオープンデータとしたものです。

本リポジトリは北陸インバウンド観光DX・データコンソーシアムによって公開されています。

wi-fiパケットセンシングの概要については、こちらの論文を参照してください。

Wi-Fiパケットセンシングによるクルーズ旅客の観光周遊行動の捕捉とその特性分析～石川県金沢港を対象として～
[https://www.jstage.jst.go.jp/article/jsceiii/1/J1/1_560/_pdf/-char/ja]

## move.csv / user.csv

- [move.csv](move.csv) 30分単位でシュリンクした全件移動データ
- [user.csv](user.csv) 30分単位でシュリンクしたユーザー全件データ

### How to make

```sh
deno run -A make.js
deno run -A make2.js
```
全レコード数 30,794,029件
全MACアドレスユニーク数 3,651件
