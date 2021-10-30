import styled from '@emotion/styled';
import Search from '@mui/icons-material/Search';
import React from 'react';
import InputAdornment from 'verdaccio-ui/components/InputAdornment';
import { Theme } from 'verdaccio-ui/design-tokens/theme';

const StyledInputAdornment = styled(InputAdornment)<{ theme?: Theme }>((props) => ({
  color: props.theme?.palette.white,
}));

const SearchAdornment: React.FC = () => (
  <StyledInputAdornment position={'start'}>
    <Search />
  </StyledInputAdornment>
);

export default SearchAdornment;
