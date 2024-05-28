interface Products {
  id: number;
  name: string;
  img: string;
  price: number;
  describe: string;
  quantity: number;
}

interface Product {
  product: Products[];
  handleAdd: (product: Products) => void;
}

export default function Render({ product, handleAdd }: Product) {
  return product.map((item) => (
    <div key={item.id}>
      <div className="media product">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={item.img} alt="pizza" />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{item.name}</h4>
          <p>{item.describe}</p>
          <div>
            <input
              name="quantity-product-1"
              type="number"
              value={item.quantity}
              readOnly
            />
            {item.quantity === 0 ? (
              <button
                data-product={1}
                className="price"
                onClick={() => handleAdd(item)}
                disabled
                style={{ background: "gray" }}
              >
                {item.price} USD{" "}
              </button>
            ) : (
              <button
                data-product={1}
                className="price"
                onClick={() => handleAdd(item)}
              >
                {item.price} USD{" "}
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{ border: "1px", margin: 20 }}></div>
    </div>
  ));
}
