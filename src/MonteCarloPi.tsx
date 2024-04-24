import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FormattedMessage } from 'react-intl';

function MonteCarloPi() {
  const [totalSteps, setTotalSteps] = useState(1000);
  const [squareLength, setSquareLength] = useState(600);
  const [isCalculating, setIsCalculating] = useState(false);
  const [piEstimate, setPiEstimate] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [piHistory, setPiHistory] = useState<Array<number>>([]); // 新增 piHistory 状态
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleReset = () => {
    setTotalSteps(1000);
    setCurrentStep(0);
    setSquareLength(400);
    setIsCalculating(false);
    setPiEstimate(0);
    setIsPaused(false);
    setPiHistory([]); // 重置 piHistory

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, squareLength, squareLength);
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(0, 0, squareLength, squareLength);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(squareLength / 2, squareLength / 2, squareLength / 2, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, squareLength, squareLength);
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, squareLength, squareLength);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(squareLength / 2, squareLength / 2, squareLength / 2, 0, 2 * Math.PI);
    ctx.stroke();
  }, [squareLength]);

  const calculatePi = () => {
    let pointsInsideCircle = 0;

    // 将递增当前步数移到计算 pi 后
    // 当运行步数达到总步数时，停止计算
    if (currentStep >= totalSteps) {
      setIsCalculating(false);
      setIsPaused(false); // 重置暂停状态
      return;
    }

    for (let i = 0; i < totalSteps; i += 1) {
      const x = Math.random() * squareLength;
      const y = Math.random() * squareLength;
      const distance = Math.sqrt((x - squareLength / 2) ** 2 + (y - squareLength / 2) ** 2);
      if (distance <= squareLength / 2) {
        pointsInsideCircle += 1;
      }
    }

    const pi = (pointsInsideCircle / totalSteps) * 4;
    setPiEstimate(parseFloat(pi.toFixed(10)));

    // 将当前计算的 π 值添加到历史记录
    // setPiHistory((prevHistory) => [...prevHistory, pi]);
    setPiHistory((prevHistory) => [...prevHistory.slice(-199), pi]);

    // 移动递增当前步数的位置
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    let interval: number;

    if (isCalculating && !isPaused) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 启动计算前设置 isCalculating 为 true
      setIsCalculating(true);

      interval = setInterval(() => {
        // 如果处于暂停状态，不再继续生成点
        if (isPaused) {
          clearInterval(interval);
          setIsCalculating(false);
          return;
        }

        const x = Math.random() * squareLength;
        const y = Math.random() * squareLength;
        const distance = Math.sqrt((x - squareLength / 2) ** 2 + (y - squareLength / 2) ** 2);
        ctx.fillStyle = distance <= squareLength / 2 ? 'black' : 'white';
        ctx.fillRect(x, y, 1, 1);
        calculatePi();
      }, 50);
    }

    // 在清除 interval 时停止运行
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
      setIsCalculating(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalculating, squareLength, isPaused, currentStep, totalSteps]);

  const handleStartStop = () => {
    if (!isCalculating || isPaused) {
      setIsCalculating(true);
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  return (
    <div className='w-full max-w-[1400px] flex flex-col justify-start items-center'>
      <div className='grid w-full grid-cols-2 gap-4'>
        <canvas
          ref={canvasRef}
          width={squareLength}
          height={squareLength}
          className='col-span-1'
        />
        <div className='col-span-1 chart-container'>
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
      </div>

      <div className='flex flex-col justify-start items-center w-[600px] mt-8 border shadow-xl rounded-md py-8 px-4 font-bold'>
        <div className='grid w-full grid-cols-2 gap-4'>
          {/* total steps */}
          <div className='flex flex-row items-center justify-start'>
            <FormattedMessage
              id='total_steps'
              defaultMessage='Total Steps'
            />
            <input
              id='totalStepsInput'
              type='number'
              value={totalSteps}
              onChange={(e) => setTotalSteps(Math.max(1, parseInt(e.target.value, 10)))}
              disabled={isCalculating || isPaused}
              className='w-32 max-w-xs ml-4 input input-bordered'
            />
          </div>
          {/* side length */}
          <div className='flex flex-row items-center justify-start'>
            <FormattedMessage
              id='side_length'
              defaultMessage='Side Length of Square'
              aria-label='Side Length of Square'
            />
            <input
              id='squareLengthInput'
              type='number'
              value={squareLength}
              onChange={(e) => setSquareLength(parseInt(e.target.value, 10))}
              disabled={isCalculating || isPaused}
              className='w-32 max-w-xs ml-4 input input-bordered'
            />
          </div>
          {/* current step */}
          <div className='flex flex-row items-center justify-start'>
            <FormattedMessage
              id='current_step'
              defaultMessage='Current Step'
              aria-label='Current Step'
            />
            <span className='ml-4 font-black text-orange-500'>
              {currentStep}
            </span>
          </div>
          {/* result */}
          <div>
            <FormattedMessage
              id='result'
              defaultMessage='Result'
              aria-label='Result'
            />
            <span className='ml-4 font-black text-green-700'>
              {piEstimate}
            </span>
          </div>
        </div>

        <div className='flex flex-row items-center mt-4 justify-cente'>

          <button
            type='button'
            onClick={handleStartStop}
            className='btn btn-neutral'
          >
            {isCalculating && !isPaused ? (
              <FormattedMessage
                id='pause'
                defaultMessage='Pause'
              />
            ) : (
              <FormattedMessage
                id='start'
                defaultMessage='Start'
              />
            )}
          </button>
          <button
            type='button'
            onClick={handleReset}
            aria-label='Reset'
            className='ml-12 btn btn-info'
          >
            <FormattedMessage
              id='reset'
              defaultMessage='Reset'
            />

          </button>
        </div>

      </div>

    </div>
  );
}

export default MonteCarloPi;
