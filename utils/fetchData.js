const BASE_URL = process.env.BASE_URL;

export const getData = async (url, token) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

export const postData = async (url, post, token) => {
  
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const putData = async (url, post, token) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const patchData = async (url, post, token) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (url, post, token) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};
