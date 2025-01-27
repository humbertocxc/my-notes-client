import { SxProps, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

export const cardStyles: SxProps = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 4,
  borderColor: 'divider',
  m: 1,
  py: 1,
  pl: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export const CleanInput = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});
