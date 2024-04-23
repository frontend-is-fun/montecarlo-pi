import {Language} from '../App';

export interface LanguageSwitcherProps {
  locale: Language;
  changeLanguage: (newLocale: string) => void;
}

const LanguageSwitcher = (props: LanguageSwitcherProps) => {

  const { locale, changeLanguage } = props;
  return (
      <select
        className="select select-bordered w-full max-w-xs"
        value={locale}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="zh_CN">简体中文</option>
        {/* <option value="zh_TW">繁體中文</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="jp">日本語</option>
        <option value="kr">한국어</option> */}
      </select>
  );
}

export default LanguageSwitcher;