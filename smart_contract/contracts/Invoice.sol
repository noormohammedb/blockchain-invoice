// SPDX-License-Identifier: unlicenced
pragma solidity ^0.8.17;

contract Invoice {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    struct INVOICE_METADAT {
        uint256 inv_no;
        uint256 inv_date;
        uint256 inv_total_amt;
        // customer data
    }

    struct PRODUCT_DATA {
        uint256 pro_id;
        string pro_name;
        uint256 pro_price;
        uint256 pro_qty;
    }

    INVOICE_METADAT[] globalInvoice;
    uint256 globalCounter = 0;

    /* user <=> invoice */
    // mapping(address => INVOICE_METADAT[]) userToInvoiceNumberArray;
    mapping(address => uint256[]) userToInvoiceNumberArray;
    mapping(uint256 => address) invoiceNoToAddress;

    /* invoice => [product] => invoice data */
    mapping(uint256 => PRODUCT_DATA[]) invoiceProducts;

    function addInvoice(
        string memory prod_name,
        uint256 prod_price,
        uint256 prod_qty
    ) external returns (uint256) {
        globalCounter++;

        // PRODUCT_DATA memory myProduct = PRODUCT_DATA({
        //     pro_id: 0,
        //     pro_name: prod_name,
        //     pro_price: prod_price,
        //     pro_qty: prod_qty
        // });

        invoiceProducts[globalCounter].push(
            PRODUCT_DATA({
                pro_id: 0,
                pro_name: prod_name,
                pro_price: prod_price,
                pro_qty: prod_qty
            })
        );

        // INVOICE_METADAT memory myInvoice = INVOICE_METADAT({
        //     inv_no: globalCounter,
        //     inv_date: block.timestamp,
        //     inv_total_amt: prod_price * prod_qty
        // });

        globalInvoice.push(
            INVOICE_METADAT({
                inv_no: globalCounter,
                inv_date: block.timestamp,
                inv_total_amt: prod_price * prod_qty
            })
        );

        userToInvoiceNumberArray[msg.sender].push(globalCounter);

        invoiceNoToAddress[globalCounter] = msg.sender;

        return 0;
    }
}

/*
pragma solidity >=0.7.0 <0.9.0;

contract GoldSouk {
    struct INVOICE_HEAD {
        uint256 date;
        uint256 id;
        uint256 totalPrice;
    }

    struct INVOICE_BODY {
        uint256 product_id;
        string prod_name;
        uint256 price;
        uint256 quantity;
    }

    mapping(address => uint256[]) userTobill;

    uint256 globalID = 0;

    // function addAInvoice(){

    // }
}
*/
