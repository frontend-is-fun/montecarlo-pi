import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export interface ChartComponentProps {
  piHistory: number[];
}

const ChartComponent = (props: ChartComponentProps) => {
  const { piHistory } = props;
  return (
    <div className='w-full chart-container'>
      <Line
        data={{
          labels: new Array(piHistory.length).fill('').map((_, index) => `#${piHistory.length - index}`),
          datasets: [
            {
              label: 'Pi Estimate',
              data: piHistory,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
};

export default ChartComponent;
