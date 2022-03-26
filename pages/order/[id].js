/* eslint-disable @next/next/no-img-element */
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "../../store/GlobalState";
import OrderDetail from "../../components/OrderDetail";

const DetailOrderPage = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;
  const router = useRouter();
  const [orderDetailState, setOrderDetailState] = useState([]);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetailState(newArr);
  }, [router.query.id, orders]);

  if (!auth.user) {
    return null;
  }

  return (
    <div className="my-3">
      <Head>
        <title> Details Orders </title>
      </Head>
      <div>
        <button className="btn btn-dark" onClick={() => router.back()}>
        <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
        </button>
      </div>
      <OrderDetail orderDetail={orderDetailState}  state={state} dispatch={dispatch}/>
    </div>
  );
};

export default DetailOrderPage;
