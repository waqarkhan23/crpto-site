import React from "react";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { FcHome, FcCurrencyExchange } from "react-icons/fc";

function Header() {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>Crypto</h1>
        <FaEthereum className="icon-logo" />
      </div>

      <ul>
        <li>
          <Link to="/">
            <FcHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/coins">
            <FcCurrencyExchange /> Coins
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
