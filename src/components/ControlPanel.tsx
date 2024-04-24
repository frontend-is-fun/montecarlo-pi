/* eslint-disable no-unused-vars */
import { FormattedMessage } from 'react-intl';

export interface ControlPanelProps {
  totalSteps: number;
  setTotalSteps: (value: number) => void;
  squareLength: number;
  setSquareLength: (value: number) => void;
  handleStartStop: () => void;
  isCalculating: boolean;
  isPaused: boolean;
  piEstimate: number;
  currentStep: number;
  reset: () => void;
}

const ControlPanel = (props: ControlPanelProps) => {
  const {
    totalSteps,
    setTotalSteps,
    squareLength,
    setSquareLength,
    isCalculating,
    isPaused,
    handleStartStop,
    piEstimate,
    currentStep,
    reset,
  } = props;

  return (
    <div className='flex flex-col items-center justify-start w-full px-4 py-8 mt-8 font-bold border rounded-md shadow-xl'>
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
          onClick={reset}
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
  );
};

export default ControlPanel;
