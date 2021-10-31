/* eslint-disable react/jsx-wrap-multilines */

/* eslint-disable prettier/prettier */

/* eslint-disable react/jsx-no-bind */
import styled from '@emotion/styled';
import Search from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from 'verdaccio-ui/design-tokens/theme';

import { SearchResultWeb } from '@verdaccio/types';

import { Wrapper } from './styles';

export type OnSelecItem = (
  event: React.SyntheticEvent,
  value: SearchResultWeb,
  reason: string,
  details?: string
) => void;
interface Props {
  suggestions: SearchResultWeb[];
  suggestionsLoading: boolean;
  placeholder: string;
  startAdornment?: JSX.Element;
  onSuggestionsFetch: any;
  onCleanSuggestions: (event: React.SyntheticEvent) => void;
  onSelectItem: OnSelecItem;
}

const AutoComplete: FC<Props> = ({
  suggestions,
  startAdornment,
  onSuggestionsFetch,
  onCleanSuggestions,
  placeholder = '',
  onSelectItem,
  suggestionsLoading = false,
}: Props) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const handleOnInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {         
    if (reason === 'input') {
      event.preventDefault();
      onSuggestionsFetch({ value });
      setInputValue(value);           
    } else if (reason === 'clear') {
      onCleanSuggestions(event);
      setInputValue('');
    }
  };

  const handleOnClose = (event) => {
    onCleanSuggestions(event);
    setInputValue('');
  };

  return (
    <Wrapper>
      <Autocomplete
        disablePortal={true}
        freeSolo={true}
        onChange={onSelectItem}
        autoHighlight={true}
        hasClearIcon={false}
        hasPopupIcon={false}
        id="search-header-suggest"
        options={suggestions}
        inputValue={inputValue}
        clearOnBlur={true}
        loading={suggestionsLoading}
        renderTags={() => null}
        onClose={handleOnClose}
        loadingText={t('autoComplete.loading')}
        onInputChange={handleOnInputChange}
        getOptionLabel={(option) => option.name}
        fullWidth={true}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: startAdornment || (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),            
            }}
            label=""
          />
        )}
      />
    </Wrapper>
  );
};

export default AutoComplete;
