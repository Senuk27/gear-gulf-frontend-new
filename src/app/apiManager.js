export const post = async ({ path, requestBody, header = {} }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
    body: JSON.stringify(requestBody),
  });

  const body = await response.json();
  return body;
};

export const put = async ({ path, requestBody, header = {} }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseURL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
    body: JSON.stringify(requestBody),
  });

  const body = await response.json();
  return body;
};

export const get = async ({ path, header = {} }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseURL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
  });

  const body = await response.json();
  return body;
};

export const del = async ({ path, header = {}, requestBody }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseURL}/${path}/${requestBody}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
  });

  const body = await response.json();
  return body;
};
