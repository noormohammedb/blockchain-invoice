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
        string pro_name;
        uint256 pro_price;
        uint256 pro_qty;
    }

    struct FULL_INVOICE {
        INVOICE_METADAT header;
        PRODUCT_DATA[] products;
    }

    // FULL_INVOICE[] globalInvoice2;
    INVOICE_METADAT[] public globalInvoice;
    uint256 public globalCounter = 0;

    /* user <=> invoice */
    mapping(address => uint256[]) userToInvoiceNumberArray;
    mapping(uint256 => address) invoiceNoToAddress;

    /* invoice => [product] => invoice data */
    mapping(uint256 => PRODUCT_DATA[]) invoiceProducts;

    function getInvoice(uint256 invoiceNumber)
        external
        view
        returns (FULL_INVOICE memory)
    // returns (INVOICE_METADAT memory, PRODUCT_DATA[] memory)
    {
        INVOICE_METADAT memory myInvoice = globalInvoice[invoiceNumber];

        PRODUCT_DATA[] memory myProducts = invoiceProducts[invoiceNumber];

        return FULL_INVOICE(myInvoice, myProducts);
    }

    function addInvoice(PRODUCT_DATA[] memory prod) external returns (uint256) {
        uint256 totalPrice = 0;
        for (uint256 i = 0; i < prod.length; i++) {
            invoiceProducts[globalCounter].push(
                PRODUCT_DATA(
                    prod[i].pro_name,
                    prod[i].pro_price,
                    prod[i].pro_qty
                )
            );
            totalPrice += prod[i].pro_price * prod[i].pro_qty;
        }

        globalInvoice.push(
            INVOICE_METADAT({
                inv_no: globalCounter,
                inv_date: block.timestamp,
                inv_total_amt: totalPrice
            })
        );

        userToInvoiceNumberArray[msg.sender].push(globalCounter);

        invoiceNoToAddress[globalCounter] = msg.sender;

        globalCounter++;

        return globalCounter;

        // PRODUCT_DATA[] memory myProducts;
        // myProducts[0] = PRODUCT_DATA({
        //     pro_id: 0,
        //     pro_name: prod_name,
        //     pro_price: prod_price,
        //     pro_qty: prod_qty
        // });

        // PRODUCT_DATA[1] memory myProducts = [
        //     PRODUCT_DATA({
        //         pro_id: 0,
        //         pro_name: prod_name,
        //         pro_price: prod_price,
        //         pro_qty: prod_qty
        //     })
        // ];

        // myProducts[0] = PRODUCT_DATA({
        //     pro_id: 0,
        //     pro_name: prod_name,
        //     pro_price: prod_price,
        //     pro_qty: prod_qty
        // });

        // myProducts.push();

        // globalInvoice2.push(INVOICE_METADAT, PRODUCT_DATA);

        // globalInvoice2.push(
        //     INVOICE_METADAT({
        //         inv_no: globalCounter,
        //         inv_date: block.timestamp,
        //         inv_total_amt: prod_price * prod_qty
        //     }),
        //     PRODUCT_DATA({
        //         pro_id: 0,
        //         pro_name: prod_name,
        //         pro_price: prod_price,
        //         pro_qty: prod_qty
        //     })
        // );
    }
}
