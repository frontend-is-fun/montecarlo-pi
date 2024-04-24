import Logo from '../assets/logo.png';
import LanguageSwitcher from './LanguageSwitcher.tsx';

import type { LanguageSwitcherProps } from './LanguageSwitcher';

const Header = (props: LanguageSwitcherProps) => {
  const { locale, changeLanguage } = props;
  return (
    <div className='flex flex-row items-center justify-between w-full h-16 mb-8'>
      <div className='flex flex-row items-center justify-start'>
        <img
          src={Logo}
          alt='logo'
          className='h-12'
        />
        <h1 className='ml-2 text-xl font-black'>
          MonteCarlo Pi
        </h1>
      </div>

      <LanguageSwitcher
        locale={locale}
        changeLanguage={changeLanguage}
      />
    </div>
  );
};

export default Header;
