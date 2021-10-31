/* eslint-disable react/jsx-wrap-multilines */

/* eslint-disable prettier/prettier */

/* eslint-disable react/jsx-no-bind */
import styled from '@emotion/styled';
import Search from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useRef, FC, useState } from 'react';
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
  const [value, setValue] = useState(null);
  const inputRef = useRef();
  return (
    <Wrapper>
      <Autocomplete
        disablePortal={true}
        freeSolo={true}
        onChange={onSelectItem}
        autoHighlight={true}
        id="search-header-suggest"
        options={suggestions}
        clearOnBlur={true}
        loading={suggestionsLoading}
        renderTags={() => {
          console.log('render tags');
          return null;
        }
        }
        onClose={(event, reason) => {
          if (reason === 'selectOption') {
            onCleanSuggestions(event);
            setValue(null);
          }
        }}
        loadingText={t('autoComplete.loading')}
        onInputChange={(event: React.SyntheticEvent, value: string, reason: string) => {         
          console.log('change', reason, value);
          if (reason === 'input') {
            event.preventDefault();
            setValue(value);
            onSuggestionsFetch({ value });           
          } else if (reason === 'clear') {
            onCleanSuggestions(event);
          }
        }}
        getOptionLabel={(option) => option.name}
        sx={{ width: 700 }}
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
