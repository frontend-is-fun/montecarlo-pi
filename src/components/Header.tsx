import Logo from '../assets/logo.png'
import LanguageSwitcher from './LanguageSwitcher'

import type { LanguageSwitcherProps } from './LanguageSwitcher'

const Header = (props: LanguageSwitcherProps) => {
    const { locale, changeLanguage } = props;
    return (
        <div className="w-full h-16 flex flex-row justify-between items-center">
            <div className='flex flex-row justify-start items-center'>
                <img src={Logo} alt="logo" className="h-12" />
                <h1 className='ml-2 text-xl font-black'>
                    MonteCarlo Pi
                </h1>
            </div>

            <LanguageSwitcher
                locale={locale}
                changeLanguage={changeLanguage}
            />
        </div>
    )
}

export default Header