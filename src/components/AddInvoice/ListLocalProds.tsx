import { useSelector } from "react-redux";

const ListLocalProds = () => {
  const localProducts = useSelector((state: any) => state.wallet.localProducts);
  return (
    <>
      <div>ListLocalProds</div>
      <table border={1}>
        <thead>
          <tr>
            <th>product name</th>
            <th>price</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          {localProducts.map((prod: any, index: any) => {
            return (
              <tr key={index}>
                <td>{prod[0]}</td>
                <td>{prod[1]}</td>
                <td>{prod[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListLocalProds;
