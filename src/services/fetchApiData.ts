import axios from "axios";

const fetchApiData = (url: string) => {
    axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
}

export default fetchApiData;