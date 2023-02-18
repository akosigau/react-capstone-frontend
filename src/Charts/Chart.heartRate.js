import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement
);

function HeartRate() {
  const data = {
    labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Activity",
        data: [10, 6, 10, 4, 8, 6, 7],
        fill: false,
        borderColor: "#fff",
        tension: 0.4
      }
    ]
  };

  const options = {
    scales: {
      x: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      }
    }
  };

  return (
    <div className="py-2 mt-3" style={{ width: "100%", height: "120px"}}>
      <Line className='mx-auto' data={data} options={options} />
    </div>
  );
}

export default HeartRate;
