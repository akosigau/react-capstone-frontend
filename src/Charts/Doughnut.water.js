import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
);

function DoughnutWater() {
  const data = {
    labels: ['Dataset 1', 'Dataset 2'],
    datasets: [{
      data: [30, 70],
      backgroundColor: ['#fff', '#fff5'],
    }]
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '100px', height: 'auto', margin: 'auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutWater;
