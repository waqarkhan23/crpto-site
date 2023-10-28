import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "./BaseURL";
import { useParams } from "react-router-dom";

import Loader from "./Loader";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CoinChart({ currency }) {
  const { id } = useParams();

  const [days, setDays] = useState(1);
  const [coinstat, setCoinStat] = useState([]);

  const coinChartData = async () => {
    const { data } = await axios.get(
      `${BaseURL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    setCoinStat(data.prices);
  };
  useEffect(() => {
    coinChartData();
  }, [currency, id, days]);

  const myData = {
    labels: coinstat.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: ` Price in Past Days ${days} in ${currency} `,
        data: coinstat.map((value) => value[1]),
        borderColor: "orange",
        borderWidth: "3",
      },
    ],
  };

  return (
    <div>
      {coinstat.length === 0 ? (
        <Loader />
      ) : (
        <div>
          {/* <Line data={myData} />  */}
          <Line
            data={myData}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
            style={{ marginTop: "5rem", width: "60rem" }}
          />

          <div className="btn" style={{ marginTop: "30px" }}>
            <button onClick={() => setDays(1)}>24 hours</button>
            <button onClick={() => setDays(30)}>1 Month</button>
            <button onClick={() => setDays(365)}>1 Year</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoinChart;
