
import 'chart.js/auto';
import { useState, useEffect, useMemo } from 'react';

// components
import Header from './components/Header';
import MonteCarloPi from './MonteCarloPai';

import { IntlProvider, FormattedMessage } from "react-intl";

import enMessages from "./lang/en.json";
import zhCNMessages from "./lang/zh-CN.json";

function App() {

  const [locale, setLocale] = useState<string>('en');


  const updateLocale = (locale: string) => {
    console.log('updateLocale', locale);
    setLocale(locale);
  };

  const messages = useMemo(() => {
    switch (locale) {
      case 'en':
        return enMessages;
      case 'zh-CN':
        return zhCNMessages;
      default:
        return enMessages;
    }
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages}>

      <div className='w-full max-w-[1400px] flex flex-col justify-start items-center'>
        <Header
          locale={locale}
          changeLanguage={updateLocale}
        />
      <FormattedMessage id="hello" defaultMessage="Hello" />
      <MonteCarloPi />
      </div>
      </IntlProvider>

  );
}

export default App;