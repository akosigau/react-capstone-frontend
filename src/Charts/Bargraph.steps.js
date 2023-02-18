import { Bar } from 'react-chartjs-2';
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

function BarChart() {
  const data = {
    labels: ["100"],
  datasets: [{
    label: "Dataset 1",
    data: [70],
    backgroundColor: "#fff",
    borderWidth: 1,
    borderSkipped: 'end',
    borderRadius: 10,
  }, {
    label: "Dataset 2",
    data: [100],
    backgroundColor: "#fff5",
    borderWidth: 1,
    borderSkipped: 'start, end',
    borderRadius: 10,
  }]
  };
  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        display: false,
        grid: {
          zeroLineColor: "transparent",
          drawBorder: false,
          display: false
        },
        ticks: {
          display: false
        },
      },
      y: {
        display: false,
        stacked: true,
        grid: {
          drawBorder: false,
          display: false
        },
        ticks: {
          display: false,
        },
      }
    }
  };

  return (
    <div className="py-2 mt-3" style={{ width: "100%", height: "100px"}}>
         <h2 className="text-2xl font-semibold text-white">2.500 <span className="text-sm">steps</span></h2>
      <Bar className='mx-auto' data={data} options={options}></Bar>
      <p className="text-white text-center">70% of your Goals!</p>
    </div>
  )

}

export default BarChart;