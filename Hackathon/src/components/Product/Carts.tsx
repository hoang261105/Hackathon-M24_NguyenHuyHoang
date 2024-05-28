import { useState } from "react";

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
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(0);

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newQuantity = parseInt(event.target.value);
    setUpdatedQuantity(newQuantity);
  };

  const handleUpdateClick = (id: number) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    if (itemToUpdate) {
      handleUpdate({ ...itemToUpdate, quantity: updatedQuantity });
      setUpdatedQuantity(0);
    }
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
              value={updatedQuantity !== 0 ? updatedQuantity : item.quantity}
              onChange={(event) => handleQuantityChange(event, item.id)}
              min={1}
            />
          </td>
          <td>
            <a
              className="label label-info update-cart-item"
              data-product={item.id}
              onClick={() => handleUpdateClick(item.id)}
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
