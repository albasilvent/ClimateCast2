import 'fullpage.js/dist/fullpage.css';
import './HomePage.scss';
import { BackgroundImage, Loader, ScrollArea } from '@mantine/core';
import { useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header/Header';
import InfoSection from './components/InfoSection/InfoSection';
import DailySection from './components/DailySection/DailySection';
import WeeklySection from './components/WeeklySection/WeeklySection';
import WeatherContext from '../../contexts/WeatherContext';
import scrollToTop from '../../utils/scrollToTop';

export default function HomePage() {
  const { t } = useTranslation();
  const {
    loading,
    isDataReady,
    hasError,
    infoData,
    dailyData,
    weeklyData,
    modalData,
    titleCity,
  } = useContext(WeatherContext);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header scrollToTop={() => scrollToTop(scrollAreaRef)} />
      <BackgroundImage
        src="/clear.jpg"
        className="background"
        data-testid="homePage"
      >
        {loading && (
          <section className="loadingContainer" data-testid="homePageLoader">
            <Loader />
          </section>
        )}

        {/* Show content when ready */}
        {!loading &&
          isDataReady &&
          !hasError &&
          infoData &&
          dailyData.length > 0 &&
          weeklyData.length > 0 && (
            <ScrollArea className=" homePage" viewportRef={scrollAreaRef}>
              <InfoSection infoData={infoData} titleCity={titleCity} />
              <DailySection dailyData={dailyData} />
              <WeeklySection weeklyData={weeklyData} modalData={modalData} />
            </ScrollArea>
          )}

        {/* Show error when there is an error */}
        {!loading && hasError && (
          <section className=" errorContainer" data-testid="error">
            <p>{t('noData')}</p>
          </section>
        )}
      </BackgroundImage>
    </>
  );
}
