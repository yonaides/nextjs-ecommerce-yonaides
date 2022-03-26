import Link from "next/link";
import Image from "next/image";
import { decrease, increase } from "../store/Actions";

const CartItem = ({ item, dispatch, cart }) => {
  return (
    <tr>
      <td style={{ width: "100px", overflow: "hidden" }}>
        <Image
          src={item.images[0].url}
          height="500px"
          width="500px"
          alt={item.name}
          className="img-thumbnail w-100"
          styles={{ minwidth: "80px", heigth: "80px" }}
        />
      </td>
      <td style={{ minWidth: "200px" }} className="w-50 align-middle">
        <h5 className="text-capitalize text-secundary">
          <Link href={`/product/${item._id}`}>
            <a> {item.title}</a>
          </Link>
        </h5>
        <h6 className="text-danger"> $ {item.quantity * item.price} </h6>
        {item.inStock > 0 ? (
          <p className="mb-1 text-info"> In Stock : {item.inStock}</p>
        ) : (
          <p className="mb-1 text-danger"> Out Stock </p>
        )}
      </td>
      <td className="align-middle" style={{ minWidth: "150px" }}>
        <button
          className="btn btn-outline-secondary"
          onClick={() => dispatch(decrease(cart, item._id))}
          disabled={item.quantity <= 1 ? true : false}
        >
          -
        </button>
        <span className="px-3"> {item.quantity} </span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => dispatch(increase(cart, item._id))}
        >
          +
        </button>
      </td>
      <td
        className="align-middle"
        style={{ minWidth: "150px", cursor: "pointer" }}
      >
        <i
          className="far fa-trash-alt text-danger"
          aria-hidden="true"
          style={{ fontSize: "18px" }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: cart,
                  id: item._id,
                  title: item.title,
                  type: "ADD_CART",
                },
              ],
            })
          }
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;
