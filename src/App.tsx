import 'chart.js/auto';
import { useState, useMemo } from 'react';

// components
import { IntlProvider } from 'react-intl';
import Header from './components/Header.tsx';
import MonteCarloPi from './MonteCarloPi.tsx';
import Footer from './components/Footer.tsx';

import enMessages from './lang/en.json';
import zhCNMessages from './lang/zh-CN.json';
import zhTWMessages from './lang/zh-TW.json';
import jpMessages from './lang/jp.json';
import deMessages from './lang/de.json';
import frMessages from './lang/fr.json';
import krMessages from './lang/kr.json';

function App() {
  const [locale, setLocale] = useState<string>('en');

  const updateLocale = (lang: string) => {
    setLocale(lang);
  };

  const messages = useMemo(() => {
    switch (locale) {
      case 'en':
        return enMessages;
      case 'zh-CN':
        return zhCNMessages;
      case 'zh-TW':
        return zhTWMessages;
      case 'jp':
        return jpMessages;
      case 'de':
        return deMessages;
      case 'fr':
        return frMessages;
      case 'kr':
        return krMessages;
      default:
        return enMessages;
    }
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >

      <div className='w-full max-w-[1400px] flex flex-col justify-start items-center'>
        <Header
          locale={locale}
          changeLanguage={updateLocale}
        />
        <MonteCarloPi />
        <Footer />
      </div>
    </IntlProvider>

  );
}

export default App;
