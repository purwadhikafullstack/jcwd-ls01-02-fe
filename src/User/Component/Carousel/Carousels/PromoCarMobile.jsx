import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../../Helpers/API_URL";
import Card from "../../Card";

function PromoCarMobile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/product/promo-products`);
      setData(res.data.data);
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
        if (i === 0) {
          return <div key={i} className="w-56 h-64"></div>;
        }
        return <Card key={i} data={val} imgStyling="h-24" />;
      })}
    </div>
  );
}

export default PromoCarMobile;
