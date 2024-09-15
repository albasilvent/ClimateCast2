import { useTranslation } from 'react-i18next';
import './InfoSection.scss';
import { WeatherSvg } from 'weather-icons-animated';
import { useContext, useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import FavoriteContext from '../../../../contexts/FavoritesContext';
import getWeatherIconState from '../../../../utils/getWeatherIconState';
import { InfoSectionPropsType } from '../../../../types/types';
import i18n from '../../../../i18n';
import { formatDate, formatTime, isNight } from '../../../../utils/dateUtils';
import Conditions from './components/Conditions';

export default function InfoSection({
  infoData,
  titleCity,
}: InfoSectionPropsType) {
  const { t } = useTranslation();
  const { favoritesList, addFavorite, removeFavorite } =
    useContext(FavoriteContext);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  const { language } = i18n;

  const isNightTime = isNight();

  useEffect(() => {
    setIsFavorite(favoritesList.includes(titleCity));
  }, [favoritesList, titleCity, infoData]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = formatDate(language, now);
      const formattedTime = formatTime(language, now);

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, [language]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(titleCity);
    } else {
      addFavorite(titleCity);
    }
  };

  return (
    <section className="infoSection" data-testId="infoSection">
      <article className="titleSection">
        <div className="dataContainer">
          <h2 className="currentLocation">{t('currentLocation')}</h2>
          <div className="favContainer">
            <h1 className="cityName">{titleCity}</h1>
            {isFavorite ? (
              <AiFillStar
                onClick={handleFavoriteClick}
                color="gold"
                size={40}
                title={t('remove')}
              />
            ) : (
              <AiOutlineStar
                onClick={handleFavoriteClick}
                size={40}
                color="#999ea5"
                title={t('favorite')}
              />
            )}
          </div>
        </div>

        <div className="dateParagraphs">
          <p className="date">{currentDate}</p>
          <p className="hour">{currentTime}</p>
        </div>
      </article>

      <article className="infoArticle">
        <div className="celsiusContainer">
          {infoData?.weather && infoData.weather.length > 0 && (
            <WeatherSvg
              state={getWeatherIconState(infoData.weather[0].main, isNightTime)}
              width={300}
              height={300}
            />
          )}
          <p>{Math.round(infoData?.main?.temp)}ºC</p>
        </div>
        <Conditions infoData={infoData} />
      </article>
    </section>
  );
}
