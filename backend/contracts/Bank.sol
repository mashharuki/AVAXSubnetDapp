// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * Bank contract
 */
contract Bank {
    // 手形の構造体
    struct Bill {
        uint256 id;
        uint256 amount;
        uint256 timestamp;
        address issuer;
        address recipient;
        BillStatus status;
    }

    // 手形の状態
    enum BillStatus {
        Issued,    
        Paid,      
        Cashed,    
        Completed, 
        Dishonored 
    }

    // 全ての手形を保存します。
    Bill[] public allBills;
    // 不渡りを起こしたアドレスを保存します。
    address[] public dishonoredAddresses;
    // 各アドレスがコントラクトにロックしたトークンの数を保有します。
    mapping(address => uint256) private balance;

    // 手形の期間を定数で用意します。
    uint256 public constant term = 1 days * 60;
    // 割引金利
    uint256 public constant discountRate = 10;
    // 手形手数料
    uint256 public constant interestRate = 10;

    /**
     * コンストラクター
     */
    constructor() payable {}

    /**
     * sendToken function
     */
    function sendToken(address payable _to, uint256 _amount) private {
        (bool success, ) = (_to).call{value: _amount}("");
        require(success, "Failed to send token");
    }

    /**
     * getNumberOfBills function
     */
    function getNumberOfBills() public view returns (uint256) {
        return allBills.length;
    }

    /**
     * getNumberOfDishonoredAddresses function
     */
    function getNumberOfDishonoredAddresses() public view returns (uint256) {
        return dishonoredAddresses.length;
    }

    /**
     * getBalance function
     */
    function getBalance() public view returns (uint256) {
        return balance[msg.sender];
    }

    /**
     * beforeDueDate function
     */
    function beforeDueDate(uint256 _id) public view returns (bool) {
        Bill memory bill = allBills[_id];

        if (block.timestamp <= bill.timestamp + term) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * getAmountToCashBill function
     */
    function getAmountToCashBill(uint256 _id) public view returns (uint256) {
        Bill memory bill = allBills[_id];

        if (beforeDueDate(_id)) {
            return (bill.amount * (100 - discountRate)) / 100;
        }

        return bill.amount;
    }

    /**
     * getAmountToPayBill function
     */
    function getAmountToPayBill(uint256 _id) public view returns (uint256) {
        Bill memory bill = allBills[_id];
        return (bill.amount * (100 + discountRate)) / 100;
    }

    /**
     * issueBill function
     */
    function issueBill(uint256 _amount, address _recipient) public {
        Bill memory bill = Bill(
            allBills.length,
            _amount,
            block.timestamp, // block.timestampは正確な値ではありません。
            msg.sender,
            _recipient,
            BillStatus.Issued
        );

        allBills.push(bill);
    }

    /**
     * cashBill function
     */
    function cashBill(uint256 _id) public payable {
        Bill storage bill = allBills[_id];

        require(
            bill.status == BillStatus.Issued || bill.status == BillStatus.Paid,
            "Status is not Isued or Paid"
        );

        require(bill.recipient == msg.sender, "Your are not recipient");

        bill.status = BillStatus.Cashed;

        uint256 amount = getAmountToCashBill(_id);

        sendToken(payable(msg.sender), amount);
    }

    /**
     * lockToken function
     */
    function lockToken(uint256 _id) public payable {
        Bill storage bill = allBills[_id];
        uint256 amount = getAmountToPayBill(_id);

        require(msg.value == amount, "Amount is not correct");

        bill.status = BillStatus.Paid;

        balance[msg.sender] += msg.value;
    }

    /**
     * completeBill function
     */
    function completeBill(uint256 _id) public payable {
        Bill storage bill = allBills[_id];

        require(
            bill.status == BillStatus.Issued ||
            bill.status == BillStatus.Cashed ||
            bill.status == BillStatus.Paid,
            "Bill is already completed"
        );

        require(!beforeDueDate(_id), "Before due date");

        uint256 amount = getAmountToPayBill(_id);

        if (amount <= balance[bill.issuer]) {
            balance[bill.issuer] -= amount;
            bill.status = BillStatus.Completed;
        } else {
            bill.status = BillStatus.Dishonored;
            dishonoredAddresses.push(bill.issuer);
        }
    }
}