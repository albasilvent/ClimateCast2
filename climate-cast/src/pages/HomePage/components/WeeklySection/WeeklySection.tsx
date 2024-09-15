import { useTranslation } from 'react-i18next';
import { WeatherSvg } from 'weather-icons-animated';
import { Divider } from '@mantine/core';
import './WeeklySection.scss';
import InfoModal from './components/InfoModal/InfoModal';
import getWeatherIconState from '../../../../utils/getWeatherIconState';
import i18n from '../../../../i18n';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';
import {
  WeeklySectionPropsType,
  WeatherDayDataType,
} from '../../../../types/types';
import '../../../../styles.scss';

export default function WeeklySection({
  weeklyData,
  modalData,
}: WeeklySectionPropsType) {
  const { t } = useTranslation();
  const { language } = i18n;

  type DayType = {
    dt: number;
    weather: { main: string }[];
    main: {
      temp_max: number;
      temp_min: number;
    };
  };

  return (
    <section className="dailySection rounded">
      <h2 className="currentLocation">{t('weeklyTitle')}</h2>
      <div className="weeklyContainer">
        {weeklyData.map((day: DayType, index: number) => {
          const date = new Date(day.dt * 1000);

          // get day of the week
          const dayOfWeek = capitalizeFirstLetter(
            date.toLocaleDateString(language, { weekday: 'long' })
          );
          const formattedDate = date.toLocaleDateString(language, {
            day: '2-digit',
            month: '2-digit',
          });

          // get day data for the modal
          const filteredDays = modalData.filter((item: WeatherDayDataType) => {
            const itemDate = new Date(item.dt * 1000);

            return itemDate.toDateString() === date.toDateString();
          });

          return (
            <div key={day.dt}>
              <div className="line">
                <div className="dayDateContainer">
                  <p className="bold">{dayOfWeek}</p>
                  <p className="bold">{formattedDate}</p>
                </div>
                <div className="iconContainer">
                  <WeatherSvg
                    state={getWeatherIconState(day.weather[0].main, false)}
                    width={80}
                    height={80}
                  />
                  <p>{t(day.weather[0].main)}</p>
                </div>
                <div className="minMaxContainer">
                  <p className="bold">{Math.round(day.main.temp_max)}ºC</p>
                  <p>/</p>
                  <p>{Math.round(day.main.temp_min)}ºC</p>
                </div>
                <InfoModal dailyData={filteredDays} />
              </div>

              {index < weeklyData.length - 1 && <Divider />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
