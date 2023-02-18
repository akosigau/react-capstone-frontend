import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'

ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement
)

function BarChartActivity () {
  const data = {
    labels: ["Mon","Tues","Wed","Thu","Fri","Sat","Sun",],
    datasets: [{
      data: [2,4,6,8,10,5,7],
      backgroundColor: ['#6b7280','#6b7280', '#6b7280', '#6b7280', '#f97316', '#6b7280', '#6b7280' ],
    }]
  };
  const options = {
    indexAxis: 'x',
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          display: true
        },
      },
      y: {
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false,
        },
      }
    }
  };

  return (
    <div style={{width: '90%', height: 'auto'}}>
      <Bar data={data} options={options}></Bar>
    </div>
  )

}

export default BarChartActivity;