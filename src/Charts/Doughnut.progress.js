import {Doughnut} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  DoughnutController,
  LinearScale,
  ArcElement,
} from 'chart.js'

ChartJS.register({
  DoughnutController,
  LinearScale,
  ArcElement,
});

function DoughnutChart  () {
  const data = {
    labels: ["30", "40", "20", "10"],
    datasets: [{
      data: [30, 40, 20, 10],
      backgroundColor: ["#14b8a6", "#f97316", "#ec4899", "#a855f7"]
    }]
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed}%`;
          }
        }
      },
      legend: {
        display: false
      },
      doughnutCenterText: {
        text: '40hrs',
        font: '16px Arial',
        color: 'black'
      }
    },
  };

  return (
    <div style={{width: '200px', height: 'auto'}}>
      <Doughnut className='mx-auto'  data={data} options={options} ></Doughnut >
    </div>
  )

}

export default DoughnutChart ;