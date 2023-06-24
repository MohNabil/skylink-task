export const useFetch = async (
  url: string,
  verb: string,
  body?: { email: string; password: string }
) => {
  const response = await fetch(url, {
    method: verb,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  try {
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error: any) {
    alert(error.message);
  }
};
