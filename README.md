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

- genesis fileの確認方法

```bash
cat ~/.avalanche-cli/subnets/mySubnet/genesis.json
or
avalanche subnet describe mySubnet --genesis
```

- genesis fileの中身

```json
{
    "config": {
        "chainId": 1111,
        "feeConfig": {
            "gasLimit": 8000000,
            "targetBlockRate": 2,
            "minBaseFee": 25000000000,
            "targetGas": 15000000,
            "baseFeeChangeDenominator": 36,
            "minBlockGasCost": 0,
            "maxBlockGasCost": 1000000,
            "blockGasCostStep": 200000
        },
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "subnetEVMTimestamp": 0
    },
    "nonce": "0x0",
    "timestamp": "0x0",
    "extraData": "0x",
    "gasLimit": "0x7a1200",
    "difficulty": "0x0",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
            "balance": "0xd3c21bcecceda1000000"
        }
    },
    "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "airdropAmount": null,
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "baseFeePerGas": null
}
```

### 動作確認コマンド

```bash
avalanche network status
```

### ネットワークの削除方法

```bash
avalanche network clean
```

### サブネットの削除コマンド

```bash
avalanche subnet delete mySubnet
```

### genesis fileを指定して起動させる方法

```bash
avalanche subnet create mySubnet --genesis genesis/mygenesis.json
```

result

```bash
Browser Extension connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:9652/ext/bc/HbNrSrApX8ZepmMnLcGKhRYuGeEo7vyVzB1S4SsXFWyvNDcgc/rpc
Funded address:   0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 with 1000
Network name:     mySubnet
Chain ID:         321123
Currency Symbol:  TEST
```

## Subnetを作り直す時の手順

- avalanche network clean
- avalanche subnet delete mySubnet
- avalanche subnet create mySubnet --genesis genesis/mygenesis.json
- avalanche subnet deploy mySubnet
- Metamaskの以前のネットワークを削除し, 新たなネットワークを接続
- コントラクトを再デプロイする場合はhardhat.configのRPC URLを更新（この先のsectionで扱います）