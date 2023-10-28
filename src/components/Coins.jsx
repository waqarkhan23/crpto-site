import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BaseURL } from "./BaseURL";
import Loader from "./Loader";
import Header from "./NavBar";

import { FaRankingStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("usd");
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  let symbol = country == "pkr" ? "PKR" : "$";

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(`${BaseURL}//coins/markets?vs_currency=${country}`)
        .then((res) => setCoins(res.data));
      setLoading(false);
    };
    fetch();
  }, [country]);

  console.log(coins);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="serach-bar">
            <input
              type="text"
              placeholder="Search Coins"
              className="input"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div class="container">
            <button class="button" onClick={() => setCountry("pkr")}>
              PKR
            </button>
            <button class="button" onClick={() => setCountry("usd")}>
              USD
            </button>
          </div>

          {coins
            .filter((curElem) => {
              if (curElem == "") {
                return curElem;
              } else if (
                curElem.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return curElem;
              }
            })
            .map((curElem) => (
              <Link
                to={`/coins/${curElem.id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <div className="ex-cards" key={curElem.id}>
                  <div className="image">
                    <img height={"80px"} src={curElem.image} alt="" />
                  </div>
                  <div className="name">{curElem.name}</div>
                  <div className="price">
                    {symbol} {curElem.current_price}
                  </div>
                  <div
                    className="rank"
                    style={{
                      color:
                        curElem.market_cap_change_percentage_24h < 0
                          ? "red"
                          : "green",
                    }}
                  >
                    {curElem.market_cap_change_percentage_24h.toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default Coins;
