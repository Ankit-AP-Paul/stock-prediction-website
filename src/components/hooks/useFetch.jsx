import React from "react";

const useFetch = (query) => {
  const [data, setData] = useState();

  useEffect(() => {
    makeApiCall();
  }, [query]);

  const makeApiCall = async () => {
    const res = await fetchDataFromApi(query);
    setData(res);
  };

  return { data };
};

export default useFetch;
