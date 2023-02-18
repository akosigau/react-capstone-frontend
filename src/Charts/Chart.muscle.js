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

function ChartMuscle() {
    const data = {
      labels: ['Dataset 1', 'Dataset 2'],
      datasets: [{
        data: [40,60],
        backgroundColor: ['#a855f7', '#e5e7eb'],
        borderWidth: 0
      }]
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
        centerText: {
          display: true,
          text: data.datasets[0].data[0].toString() + "%",
          color: '#000000',
          fontStyle: 'bold',
          fontFamily: 'Arial',
          minFontSize: 12,
          maxFontSize: 18,
        },
      },
      cutout: 30,
      rotation: 0, // rotate the chart by 180 degrees (in radians)
    };
  
    // Define a custom plugin to draw the center text
    ChartJS.register({
      id: 'centerText',
      afterDraw: function(chart, args, options) {
        if (options.display) {
          // Get the canvas context
          const ctx = chart.ctx;
  
          // Get the center point of the chart
          const canvasWidth = chart.canvas.width;
          const canvasHeight = chart.canvas.height;
          const centerX = canvasWidth / 2;
          const centerY = canvasHeight / 2;
  
          // Set the font style and size
          const fontStyle = options.fontStyle || 'normal';
          const fontFamily = options.fontFamily || 'Arial';
          const maxFontSize = options.maxFontSize || 18;
          const minFontSize = options.minFontSize || 12;
          let fontSize = maxFontSize;
  
          // Calculate the maximum text width and height
          const text = options.text || '';
          const maxTextWidth = canvasWidth - 40;
          const maxTextHeight = canvasHeight - 40;
  
          // Scale down the font size until the text fits within the max width and height
          while (fontSize > minFontSize) {
            ctx.font = fontStyle + ' ' + fontSize + 'px ' + fontFamily;
            const textWidth = ctx.measureText(text).width;
            if (textWidth < maxTextWidth && fontSize < maxTextHeight) {
              break;
            }
            fontSize -= 1;
          }
  
          // Set the text color and draw the text
          const textColor = options.color || '#000000';
          ctx.fillStyle = textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = fontStyle + ' ' + fontSize + 'px ' + fontFamily;
          ctx.fillText(text, centerX, centerY);
        }
      }
    });
  
    return (
      <div style={{ width: '100%', height: '80px', margin: 'auto' }}>
        <Doughnut data={data} options={options} />
      </div>
    )
  }
  
export default ChartMuscle;
