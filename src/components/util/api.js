import axios from "axios";

export const fetchDataFromApi = async (query) => {
  try {
    const { data } = await axios.get(
      "https://stock-prediction-api-a4dh.onrender.com/get-stock-db?stock_ticker=" +
        query
    );

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
