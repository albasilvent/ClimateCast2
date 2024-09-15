import { useTranslation } from 'react-i18next';
import './DailySection.scss';
import { Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  LuSun,
  LuCloud,
  LuCloudRain,
  LuCloudSnow,
  LuCloudLightning,
  LuCloudFog,
  LuMoon,
  LuCloudMoon,
} from 'react-icons/lu';
import i18n from '../../../../i18n';
import getClosestIndex from '../../../../utils/getClosestIndex';
import { isNight, isToday } from '../../../../utils/dateUtils';
import { DailySectionPropsType } from '../../../../types/types';

const weatherIcons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Clear: LuSun,
  Clouds: LuCloud,
  Rain: LuCloudRain,
  Snow: LuCloudSnow,
  Thunderstorm: LuCloudLightning,
  Drizzle: LuCloudRain,
  Mist: LuCloudFog,
  Fog: LuCloudFog,
  Haze: LuCloudFog,
  Dust: LuCloudFog,
  Squall: LuCloudRain,
  Tornado: LuCloud,
};

export default function DailySection({ dailyData }: DailySectionPropsType) {
  const { t } = useTranslation();
  const [closestIntervalIndex, setClosestIntervalIndex] = useState<
    number | null
  >(null);
  const { language } = i18n;
  const isNightTime = isNight();

  useEffect(() => {
    const closestIndex = getClosestIndex(dailyData);
    setClosestIntervalIndex(closestIndex);
  }, [dailyData]);

  return (
    <section className="dailySection rounded" data-testid="dailySection">
      <h2 className="currentLocation">{t('dailyTitle')}</h2>
      <article className="forecastContainer rounded">
        {dailyData.map((interval: any, index: number) => {
          // Change icon at night for each card

          let WeatherIcon = weatherIcons[interval.weather[0].main] || LuCloud;

          if (isNightTime) {
            if (interval.weather[0].main === 'Clear') {
              WeatherIcon = LuMoon;
            } else {
              WeatherIcon = LuCloudMoon;
            }
          }

          // Check if its active (only on HomePage) for each card

          const date = new Date(interval.dt * 1000);
          const isActive = index === closestIntervalIndex && isToday(date);

          return (
            <>
              <div key={interval.dt} className="forecastItem">
                <div className={`card rounded ${isActive ? 'active' : ''}`}>
                  <div className="cardHeader">
                    <div className="cardHeader">
                      <h3 className="title">
                        {date.toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </h3>
                      <p className="title">
                        {date.toLocaleTimeString(language, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <WeatherIcon className="bigIcon" />

                  <p className="title">{Math.round(interval.main.temp)}ºC</p>
                  <p className="p">{t(interval.weather[0].main)}</p>
                </div>
              </div>
              {index < dailyData.length - 1 && (
                <Divider className="divider" orientation="vertical" />
              )}
            </>
          );
        })}
      </article>
    </section>
  );
}
