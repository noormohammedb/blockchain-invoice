import { Contract } from "ethers";

export const loadInvoices = async (contractProvider: Contract) => {
  const totalInvoice = await contractProvider.globalCounter();
  const allInvoice = [];
  for (let index = 0; index < totalInvoice.toNumber(); index++) {
    const oneInvoice = await contractProvider.getInvoice(index);
    const properInvoice = {
      header: {
        date: new Date(
          bigToNum(oneInvoice.header.inv_date) * 1000
        ).toLocaleString(),
        no: bigToNum(oneInvoice.header.inv_no),
        amount: bigToNum(oneInvoice.header.inv_total_amt),
      },
      body: [
        oneInvoice.products.map((data: any) => ({
          product: data.pro_name,
          price: bigToNum(data.pro_price),
          qty: bigToNum(data.pro_qty),
        })),
      ],
    };
    allInvoice.push(properInvoice);
  }
  return allInvoice;
};

const bigToNum = (bigNum: any) => {
  return bigNum.toNumber();
};
