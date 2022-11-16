import { Contract } from "ethers";

export const loadInvoices = async (contractProvider: Contract) => {
  const totalInvoice = await contractProvider.globalCounter();
  console.log("totalInvoice : ", totalInvoice);
  const allInvoice = [];
  for (let index = 0; index < totalInvoice.toNumber(); index++) {
    const oneInvoice = await contractProvider.getInvoice(index);
    const properInvoice = {
      header: {
        date: bigToNum(oneInvoice.header.inv_date),
        no: bigToNum(oneInvoice.header.inv_no),
        amount: bigToNum(oneInvoice.header.inv_total_amt),
      },
      body: [
        {
          product: oneInvoice.products[0].pro_name,
          price: bigToNum(oneInvoice.products[0].pro_price),
          qty: bigToNum(oneInvoice.products[0].pro_qty),
        },
      ],
    };
    allInvoice.push(properInvoice);
  }
  console.log("allInvoice: ", allInvoice);
  return allInvoice;
};

const bigToNum = (bigNum: any) => {
  return bigNum.toNumber();
};
