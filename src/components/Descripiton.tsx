import { FormattedMessage } from 'react-intl';

const Description = () => (
  <div className='w-full p-4 mt-8 text-gray-500 whitespace-pre-line border shadow'>
    <FormattedMessage
      id='description'
      defaultMessage='Monte Carlo Pi Estimation'
    />
  </div>
);

export default Description;
