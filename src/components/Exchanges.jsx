import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaRankingStar } from "react-icons/fa6";
import { BaseURL } from "./BaseURL";
import Loader from "./Loader";
import Header from "./NavBar";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      axios.get(`${BaseURL}/exchanges`).then((res) => setData(res.data));
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <>
      {loading ? <Loader /> : <Header />}

      <div>
        <div className="exchanges">All Exchanges Around The World</div>
        {data.map((curElem) => (
          <div className="ex-cards" key={curElem.id}>
            <div className="image">
              <img height={"80px"} src={curElem.image} alt="" />
            </div>
            <div className="name">{curElem.name}</div>
            <div className="price">
              {" "}
              {curElem.trade_volume_24h_btc.toFixed(2)}
            </div>
            <div className="rank">
              <FaRankingStar /> {curElem.trust_score_rank}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Exchanges;
