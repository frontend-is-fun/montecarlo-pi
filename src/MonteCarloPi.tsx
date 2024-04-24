import { useState, useEffect, useRef } from 'react';

import ChartComponent from './components/Chart.tsx';
import ControlPanel from './components/ControlPanel.tsx';

function MonteCarloPi() {
  const [totalSteps, setTotalSteps] = useState(1000);
  const [squareLength, setSquareLength] = useState(600);
  const [isCalculating, setIsCalculating] = useState(false);
  const [piEstimate, setPiEstimate] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [piHistory, setPiHistory] = useState<Array<number>>([]); // 新增 piHistory 状态
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleSetTotalSteps = (value: number) => {
    if (value < 1) {
      setTotalSteps(1);
    } else if (value > 10000000) {
      setTotalSteps(10000000);
    } else {
      setTotalSteps(value);
    }
  };

  const handleReset = () => {
    setTotalSteps(1000);
    setCurrentStep(0);
    setSquareLength(600);
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
      <div className='grid w-full grid-cols-2 gap-4 p-4 border shadow-md'>
        <canvas
          ref={canvasRef}
          width={squareLength}
          height={squareLength}
          className='col-span-1'
        />
        <div className='flex flex-col items-start justify-start col-span-1'>
          <ChartComponent piHistory={piHistory} />
          <ControlPanel
            reset={handleReset}
            handleStartStop={handleStartStop}
            piEstimate={piEstimate}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setTotalSteps={handleSetTotalSteps}
            squareLength={squareLength}
            setSquareLength={setSquareLength}
            isCalculating={isCalculating}
            isPaused={isPaused}
          />
        </div>

      </div>

    </div>
  );
}

export default MonteCarloPi;
