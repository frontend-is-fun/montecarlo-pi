export interface LanguageSwitcherProps {
  locale: string;
  changeLanguage: (newLocale: string) => void;
}

const LanguageSwitcher = (props: LanguageSwitcherProps) => {

  const { locale, changeLanguage } = props;
  return (
      <select
        className="w-full max-w-xs select select-bordered"
        value={locale}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="zh-CN">简体中文</option>
        <option value="zh-TW">繁體中文</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="jp">日本語</option>
        <option value="kr">한국어</option>
      </select>
  );
}

export default LanguageSwitcher;