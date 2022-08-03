import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../../Helpers/API_URL";
import Card from "../../Card";

function ProdCatCarMobile({ category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      let order = "ORDER BY name ASC";
      let page = 0;
      let limit = 10;
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/product/products/${category}?order=${order}&page=${page}&limit=${limit}`
      );
      setData(res.data.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <>Loading....</>;
  }

  return (
    <div className="min-w-min h-full flex gap-x-2">
      {data.map((val, i) => {
        return <Card key={i} data={val} imgStyling="h-24" />;
      })}
    </div>
  );
}

export default ProdCatCarMobile;
