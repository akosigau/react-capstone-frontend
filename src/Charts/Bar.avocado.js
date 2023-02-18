
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

function BarAvocado() {

    const data = {
        labels: ["100"],
        datasets: [{
            label: "Dataset 1",
            data: [20],
            backgroundColor: "#a855f7",
            borderWidth: 1,
        }, {
            label: "Dataset 2",
            data: [30],
            backgroundColor: "#f97316",
            borderWidth: 1,
        }, {
            label: "Dataset 3",
            data: [50],
            backgroundColor: "#ec4899",
            borderWidth: 1,
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
                }
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
        <div className="py-0" style={{height: "50px" }}>
            
            <div className="h-12" style={{ width: "250px", height: "50px" }}>
                <Bar data={data} options={options} />
            </div>

        </div>
    )

}

export default BarAvocado;