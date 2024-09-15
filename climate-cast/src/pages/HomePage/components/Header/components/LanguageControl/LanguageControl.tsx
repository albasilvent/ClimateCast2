import { SegmentedControl } from '@mantine/core';
import ReactCountryFlag from 'react-country-flag';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import i18n from '../../../../../../i18n';

export default function LanguageControl() {
  const navigate = useNavigate();
  const { language } = i18n;
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLanguage(value);
    navigate(`/${value}`);
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [language]);

  return (
    <SegmentedControl
      key="language-selector"
      size="sm"
      value={selectedLanguage}
      onChange={handleLanguageChange}
      styles={{
        root: {
          backgroundColor: '#e2e8f0',
          width: '120px',
        },
      }}
      data={[
        {
          value: 'en',
          label: (
            <ReactCountryFlag
              countryCode="US"
              svg
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          ),
        },
        {
          value: 'es',
          label: (
            <ReactCountryFlag
              countryCode="ES"
              data-testid="language-selector-es"
              svg
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          ),
        },
      ]}
    />
  );
}
