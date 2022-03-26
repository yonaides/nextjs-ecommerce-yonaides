import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { DataContext } from "../store/GlobalState";
import valid from "../utils/valid";
import { postData } from "../utils/fetchData";

export default function Register() {
  const initialValues = { name: "", email: "", password: "", confirm: "" };
  const [userData, setUserData] = useState(initialValues);
  const router = useRouter();
  const { name, email, password, confirm } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const handlerChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, confirm);
    if (errMsg) {
      return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);

    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push("/");
    }
  }, [auth, router]);

  return (
    <div>
      <Head>
        <title> Register Page </title>{" "}
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handlerSubmit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handlerChangeInput}
            autoComplete="false"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handlerChangeInput}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We will never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handlerChangeInput}
            autoComplete="false"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm"
            name="confirm"
            value={confirm}
            onChange={handlerChangeInput}
            autoComplete="false"
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>
        <p className="my-2">
          Already have an account
          <Link href="/singin">
            <a style={{ color: "crimson" }}> Login now </a>
          </Link>
        </p>
      </form>
    </div>
  );
}
