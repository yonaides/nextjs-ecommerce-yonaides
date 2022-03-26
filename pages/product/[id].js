import { useState, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const DetailProduct = ({ product }) => {
  const [productDetail, setProductDetail] = useState(product);
  const [tab, setTab] = useState(0);
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const isActive = (index) => {
    if (tab === index) {
      return "active";
    }
    return "";
  };

  return (
    <div className="row detail_page">
      <Head>
        <title> Detail Product</title>
      </Head>

      <div className="col-md-6">
        <Image
          src={productDetail.images[tab].url}
          alt={productDetail.images[tab].url}
          width="650px"
          height="550px"
          className="d-block img-thumbail rounded mt-4 w-100"
        />
        <div className="flex mx-0" style={{ cursor: "pointer" }}>
          {productDetail.images.map((img, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={img.url}
              alt={img.name}
              className={`img-fluid img-thumbnail rounded${isActive(index)}`}
              style={{ height: "80px", width: "20%" }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6 mt-3">
        <h2 className="text-uppercase">{product.title}</h2>
        <h2 className="text-uppercase">$ {product.price}</h2>
        <div className="flex mx-0 d-flex justify-content-between">
          {product.inStock > 0 ? (
            <h6 className="text-uppercase">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-uppercase">Out Stock: Out Stock</h6>
          )}
          <h6 className="text-uppercase">Sold: {product.sold}</h6>
        </div>
        <div className="my-2"> {product.description} </div>
        <div className="my-2"> {product.content} </div>
        <button
          type="button"
          className="btn btn-dark d-block my-3 px-5"
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  return {
    props: { product: res.product }, // will be passed to the page component as props
  };
}

export default DetailProduct;
