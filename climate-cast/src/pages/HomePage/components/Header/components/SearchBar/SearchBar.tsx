import { Autocomplete, AutocompleteProps, Group } from '@mantine/core';
import './SearchBar.scss';
import { useTranslation } from 'react-i18next';
import { IoMdSearch } from 'react-icons/io';
import { useContext, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import FavoriteContext from '../../../../../../contexts/FavoritesContext';
import CityContext from '../../../../../../contexts/CityContext';
import capitalizeFirstLetter from '../../../../../../utils/capitalizeFirstLetter';

export default function SearchBar() {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>('');

  const { favoritesList } = useContext(FavoriteContext);
  const { setCity } = useContext(CityContext);

  const handleSubmit = () => {
    if (inputValue) {
      const formattedCity = capitalizeFirstLetter(inputValue);
      setCity(formattedCity);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({
    option,
  }) => (
    <Group gap="sm" className="group">
      <p>{option.value}</p>
      <AiFillStar color="gold" />
    </Group>
  );

  return (
    <Autocomplete
      placeholder={t('search')}
      limit={5}
      data={[{ group: t('autocompleteTitle'), items: favoritesList }]}
      renderOption={renderAutocompleteOption}
      rightSection={
        <IoMdSearch
          className="pointer"
          onClick={handleSubmit}
          data-testid="search-button"
        />
      }
      variant="filled"
      className="searchBar"
      size="sm"
      radius={50}
      styles={{
        input: {
          backgroundColor: '#e2e8f0',
        },
      }}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      onChange={(val) => setInputValue(val)}
      value={inputValue}
      onKeyDown={handleKeyDown}
      data-testid="search-input"
    />
  );
}
