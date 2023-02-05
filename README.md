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

## Avalanche-CLIのインストール

```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

- コマンドの確認

```bash
avalanche -v
```

- subnetの作成

```bash
avalanche subnet create mySubnet
```

作成後

```bash
✔ Subnet-EVM
creating subnet mySubnet
Enter your subnet's ChainId. It can be any positive integer.
ChainId: 1111
Select a symbol for your subnet's native token
Token symbol: TEST
✔ Use latest version
✔ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)
✔ Airdrop 1 million tokens to the default address (do not use in production)
✔ No
Successfully created subnet configuration
```

設定を確認

```bash
avalanche subnet list --deployed
```

出力結果

```bash
+----------+----------+---------------------------------------------------+---------------+----------------+---------+
|  SUBNET  |  CHAIN   |                       VM ID                       | LOCAL NETWORK | FUJI (TESTNET) | MAINNET |
+----------+----------+---------------------------------------------------+---------------+----------------+---------+
| mySubnet | mySubnet | qDN9XsRy6efv5tZw3q2ngfQzQZJyMQJEF3d3Nu4YisNi9iR4G | No            | No             | No      |
+----------+----------+---------------------------------------------------+---------------+----------------+---------+
```

- Subnetのデプロイ

```bash
avalanche subnet deploy mySubnet
```

これよりローカルマシンに5つのノードによるAvalancheネットワークが構築される。

### Subnetのカスタム

*genesis file*  

Subnetの初期設定を含むファイルです。
Subnetを作成する際, Avalancheはパラメータに基づいてジェネシスファイルを自動で生成します。
また, 独自のgenesis fileを作成することもできます。これにより, Subnetの構成をより詳細に制御することができます。
