# AVAXSubnetDapp
Avalanche の Subnet を活用して独自のチェーンを用意し、スマートコントラクトで手形取引を管理する Web アプリを構築するリポジトリです。

## Subnetとは

Subnetは独自のルールを定義することができるブロックチェーンネットワークです。  

Avalancheには3つのビルトインブロックチェーン（P-Chain, C-Chain, X-Chain）があり, プライマリネットネットワークと呼ばれます。
このビルトインブロックチェーンに加え, Subnetによるブロックチェーンをいくつも増やしていくことができます。  

*Subnet*でできること

- 独自のネイティブトークンとそれによる手数料体系を利用した独自のトークンエコノミクスを作成できる
- バリデーターは特定の国に居住している必要がある」などの独自の規則を設けることができる。
- バリデータが一定のスペックを持ったハードウェア要件を満たす必要がある」などのアプリ仕様に関する要求を設けることができる。
- 特定のバリデータのみ情報が見えるようにするプライベートブロックチェーンの作成ができる。
- バリデータは自分が関心のあるブロックチェーンにのみ検証を行うことができるので, バリデータの負担を軽減することができる。

