import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../../Helpers/API_URL";
import Card from "../../Card";
import Loading from "../../Loading";
import CarouselSlider from "../CarouselSlider";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

function ProdCatCarousel({ category }) {
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

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow height="top-40" />,
    prevArrow: <PrevArrow height="top-40" />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const printProducts = () => {
    return data.map((val, i) => {
      return (
        <div key={i} className="w-full h-full flex px-2 py-4">
          <Card key={i} data={val} imgStyling="h-36" />
        </div>
      );
    });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading className="h-full" />;
  }
  return (
    <CarouselSlider
      settings={settings}
      printFunc={printProducts}
      className=""
    />
  );
}

export default ProdCatCarousel;
