import { useState } from "react";
import Render from "./Render";
import Carts from "./Carts";

interface Products {
  id: number;
  name: string;
  img: string;
  price: number;
  describe: string;
  quantity: number;
}

// const products = [
//   {
//     id: Math.ceil(Math.random() * 10000),
//     name: "Pizza",
//     img: "https://github.com/ngoquy12/template_shopping_cart/blob/master/images/pizza.jpg?raw=true",
//     describe:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
//     price: 30,
//     quantity: 40,
//   },
//   {
//     id: Math.ceil(Math.random() * 10000),
//     name: "Hamburger",
//     img: "https://github.com/ngoquy12/template_shopping_cart/blob/master/images/Hamburger.jpg?raw=true",
//     describe:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
//     price: 15,
//     quantity: 40,
//   },
//   {
//     id: Math.ceil(Math.random() * 10000),
//     name: "Bread",
//     img: "https://github.com/ngoquy12/template_shopping_cart/blob/master/images/bread.jpg?raw=true",
//     describe:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
//     price: 20,
//     quantity: 40,
//   },
//   {
//     id: Math.ceil(Math.random() * 10000),
//     name: "Cake",
//     img: "https://github.com/ngoquy12/template_shopping_cart/blob/master/images/Cake.jpg?raw=true",
//     describe:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
//     price: 10,
//     quantity: 40,
//   },
// ];

// localStorage.setItem("carts", JSON.stringify(products));

export default function ListProduct() {
  const [productLocal, setProduct] = useState<Products[]>(() => {
    const carts = localStorage.getItem("carts");
    const listCart = carts ? JSON.parse(carts) : [];
    return listCart;
  });

  const [deleted, setDeleted] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [notificate, setNotificate] = useState<boolean>(false);
  const [cart, setCart] = useState<Products[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const saveToLocal = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setProduct([...value]);
  };

  const updateCart = (newCart: Products[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Khởi tạo hàm thêm sản phẩm
  const handleAdd = (product: Products) => {
    const productIndex = productLocal.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1 && productLocal[productIndex].quantity > 0) {
      const updatedProducts = [...productLocal];
      updatedProducts[productIndex].quantity -= 1;

      const cartIndex = cart.findIndex((item) => item.id === product.id);
      let updatedCart = [...cart];
      if (cartIndex !== -1) {
        updatedCart[cartIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      updateCart(updatedCart);
      saveToLocal("carts", updatedProducts);
      setNotificate(true);
      setTimeout(() => {
        setNotificate(false);
      }, 3000);
    }
  };

  // Cập nhật sản phẩm
  const handleUpdate = (product: Products) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? product : item
    );
    updateCart(updatedCart);
    setUpdate(true);
    setTimeout(() => {
      setUpdate(false);
    }, 3000);
  };

  // Xóa sản phẩm
  const handleDelete = (product: Products) => {
    const deletedCart = cart.filter((item) => item.id !== product.id);

    if (deletedCart) {
      const confirmDelete = confirm(
        `Ban có chắc chắn muốn xóa ${product.name} không?`
      );
      if (confirmDelete) {
        const filterCart = cart.filter((item) => item.id !== product.id);
        updateCart(filterCart);
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);

        // Cập nhật số lượng sản phẩm trong ListProduct
        const productToUpdate = productLocal.find(
          (item) => item.id === product.id
        );
        if (productToUpdate) {
          productToUpdate.quantity += product.quantity;
          setProduct([...productLocal]);
        }
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">List Products</h1>
              </div>
              <div className="panel-body" id="list-product">
                <Render product={productLocal} handleAdd={handleAdd} />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-danger">
              <div className="panel-heading">
                <h1 className="panel-title">Your Cart</h1>
              </div>
              <div className="panel-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="my-cart-body">
                    <Carts
                      cart={cart}
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                    />
                  </tbody>
                  <tfoot id="my-cart-footer">
                    <tr>
                      <td colSpan={4}>
                        There are <b>{cart.length}</b> items in your shopping
                        cart.
                      </td>
                      <td colSpan={2} className="total-price text-left">
                        {cart.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )}{" "}
                        USD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            {notificate && (
              <div
                className="alert alert-success"
                role="alert"
                id="mnotification"
              >
                Thêm vào giỏ thành công
              </div>
            )}
            {update && (
              <div
                className="alert alert-success"
                role="alert"
                id="mnotification"
                style={{ background: "#ff6f3c" }}
              >
                Cập nhật giỏ hàng thành công
              </div>
            )}
            {deleted && (
              <div
                className="alert alert-success"
                role="alert"
                id="mnotification"
                style={{ background: "#ff5757" }}
              >
                Xóa sản phẩm thành công
              </div>
            )}
            {cart.length === 0 ? (
              <div
                className="alert alert-success"
                role="alert"
                id="mnotification"
                style={{ background: "#ff5757" }}
              >
                Chưa có sản phẩm trong giỏ
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
