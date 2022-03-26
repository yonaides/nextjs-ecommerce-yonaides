import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";

export default function Singin() {
  const initialValues = { email: "", password: "" };
  const [userData, setUserData] = useState(initialValues);
  const router = useRouter();
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const handlerChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/login", userData);
    //console.log(res.user)
    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookies.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push("/");
    }
  }, [auth, router]);

  return (
    <div>
      <Head>
        <title> Dev At Sing in </title>
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handlerSubmit}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            onChange={handlerChangeInput}
            type="email"
            value={email}
            className="form-control"
            aria-describedby="emailHelp"
            required={true}
          />
          <div id="emailHelp" className="form-text">
            We will never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            onChange={handlerChangeInput}
            type="password"
            className="form-control"
            autoComplete="false"
            value={password}
            required={true}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>
        <p className="my-2">
          You do not have an account yet?
          <Link href="/register">
            <a style={{ color: "crimson" }}> Register Now </a>
          </Link>
        </p>
      </form>
    </div>
  );
}
