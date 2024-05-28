interface Products {
  id: number;
  name: string;
  img: string;
  price: number;
  describe: string;
  quantity: number;
}

interface CartProps {
  cart: Products[];
  handleUpdate: (cart: Products) => void;
  handleDelete: (cart: Products) => void;
}

export default function Carts({ cart, handleUpdate, handleDelete }: CartProps) {
  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newQuantity = parseInt(event.target.value);
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    handleUpdate(updatedCart.find((item) => item.id === id) as Products);
  };
  return (
    <>
      {cart.map((item, index) => (
        <tr key={item.id}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.price} USD</td>
          <td>
            <input
              name={`cart-item-quantity-${item.id}`}
              type="number"
              value={item.quantity}
              onChange={(event) => handleQuantityChange(event, item.id)}
              min={1}
            />
          </td>
          <td>
            <a
              className="label label-info update-cart-item"
              data-product={item.id}
              onClick={() => handleUpdate(item)}
            >
              Update
            </a>
            <a
              className="label label-danger delete-cart-item"
              data-product={item.id}
              onClick={() => handleDelete(item)}
            >
              Delete
            </a>
          </td>
        </tr>
      ))}
    </>
  );
}
