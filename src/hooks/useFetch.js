export default function useFetch(method) {
  async function APIcall(url, body = null) {
    let opts = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      opts = { ...opts, body: JSON.stringify(body) };
    }
    try {
      const res = await fetch(url, opts);
      if (res.ok) {
        const json = await res.json();
        return json;
      } else {
        throw res;
      }
    } catch (e) {
      return { error: "Something went wrong, please try again later!" };
    }
  }
  return { APIcall };
}
