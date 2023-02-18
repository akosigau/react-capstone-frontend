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

function HalfDoughnut() {
  const data = {
    labels: ['Dataset 1', 'Dataset 2'],
    datasets: [{
      data: [60,40],
      backgroundColor: ['#fff', 'transparent'],
      borderWidth: 0
    }]
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: 30,
    rotation: 270, // rotate the chart by 180 degrees (in radians)
  };

  return (
    <div style={{ width: '100px', height: 'auto', margin: 'auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default HalfDoughnut;
