import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BaseURL } from "./BaseURL";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { AiFillTrophy } from "react-icons/ai";
import CoinChart from "./CoinChart";

const CoinsDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${BaseURL}/coins/${id}`);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);
  const [currency, setCurrency] = useState("usd");
  let symbol = currency == "pkr" ? "PKR" : "$";
  const profit = coin.market_data?.price_change_percentage_24h > 0;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="coins-res"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <div className="coin-detail">
            <div className="coin-info"></div>

            <div className="btn">
              <button onClick={() => setCurrency("pkr")}>pkr</button>
              <button onClick={() => setCurrency("usd")}>usd</button>
            </div>
            <div className="time">{coin.last_updated}</div>
            <div className="coin-image">
              <img height={"150px"} src={coin.image.large} alt="" />
            </div>
            <div className="coin-name">{coin.name}</div>
            <div className="coin-price">
              {symbol} {coin.market_data.current_price[currency]}
            </div>
            <div className="coin-profit">
              {profit ? (
                <BiSolidUpArrow color="green" />
              ) : (
                <BiSolidDownArrow color="red" />
              )}
              {coin.market_data.price_change_percentage_24h}%
            </div>
            <div className="market-rank">
              <AiFillTrophy color="orange" /> #{coin.market_cap_rank}
            </div>
            <div className="coin-desc">
              {coin.description["en"].split(".")[0]}
            </div>
          </div>
          <div>
            <CoinChart currency={currency} />
          </div>
        </div>
      )}
    </>
  );
};

export default CoinsDetails;
