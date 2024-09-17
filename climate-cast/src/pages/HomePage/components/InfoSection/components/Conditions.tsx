import {
  TbArrowsDown,
  TbCloud,
  TbCloudRain,
  TbDroplets,
  TbTemperature,
  TbWind,
} from 'react-icons/tb';
import { Divider } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ConditionType, ConditionsPropsType } from '../../../../../types/types';
import '../InfoSection.scss';

export default function Conditions({ infoData }: ConditionsPropsType) {
  const { t } = useTranslation();
  const conditions: ConditionType[][] = [
    [
      {
        icon: TbTemperature,
        label: 'maximum',
        data: `${Math.round(infoData?.main?.temp_max)}ºC`,
      },
      {
        icon: TbTemperature,
        label: 'minimum',
        data: `${Math.round(infoData?.main?.temp_min)}ºC`,
      },
      {
        icon: TbTemperature,
        label: 'thermalFeel',
        data: `${Math.round(infoData?.main?.feels_like)}ºC`,
      },
      {
        icon: TbWind,
        label: 'wind',
        data: `${Math.round(infoData?.wind?.speed)} km/h`,
      },
    ],
    [
      {
        icon: TbArrowsDown,
        label: 'pressure',
        data: `${Math.round(infoData?.main?.pressure)} hPa`,
      },
      {
        icon: TbDroplets,
        label: 'humidity',
        data: `${Math.round(infoData?.main?.humidity)} %`,
      },
      {
        icon: TbCloudRain,
        label: 'rain',
        data: infoData?.rain ? `${infoData?.rain['1h']} mm` : '0 mm',
      },
      { icon: TbCloud, label: 'clouds', data: `${infoData?.clouds?.all} %` },
    ],
  ];

  return (
    <div className="conditionContainer">
      <h3 className="condictionsTitle">{t('conditions')}:</h3>
      <div className="container">
        {conditions.map((column, colIndex) => (
          <div key={`column-${colIndex}`} className="div">
            {column.map((condition) => (
              <div key={condition.label} className="condition">
                <condition.icon className="icon" />
                <p className="bold">{t(condition.label)}</p>
                <p>{condition.data}</p>
              </div>
            ))}
            {colIndex !== conditions.length - 1 && (
              <Divider orientation="vertical" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
