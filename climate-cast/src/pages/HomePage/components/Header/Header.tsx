import { HeaderPropsType } from '../../../../types/types';
import ContactUsModal from './components/ContactModal/ContactUsModal';
import LanguageControl from './components/LanguageControl/LanguageControl';
import SearchBar from './components/SearchBar/SearchBar';
import './Header.scss';

export default function Header({ scrollToTop }: HeaderPropsType) {
  // Scroll when pressing enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  return (
    <header className="header">
      <section className="headerDiv container">
        <div
          className="titleDiv"
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          <h1 className="climate pointer">Climate</h1>
          <h1 className="cast pointer">CAST</h1>
        </div>
        <SearchBar />
      </section>
      <section className="languageDiv">
        <ContactUsModal />
        <LanguageControl />
      </section>
    </header>
  );
}
