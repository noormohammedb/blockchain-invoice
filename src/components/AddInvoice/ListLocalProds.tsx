import { useSelector } from "react-redux";

const ListLocalProds = () => {
  const localProducts = useSelector((state: any) => state.wallet.localProducts);
  return (
    <>
      <div>ListLocalProds</div>
      <table border={1}>
        <tr>
          <th>product name</th>
          <th>price</th>
          <th>quantity</th>
        </tr>
        {localProducts.map((prod: any, index: any) => {
          return (
            <tr key={index}>
              <td>{prod[0]}</td>
              <td>{prod[1]}</td>
              <td>{prod[2]}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default ListLocalProds;
