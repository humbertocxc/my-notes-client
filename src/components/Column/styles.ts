import { SxProps } from "@mui/material"

export const listStyle: SxProps = {
  minWidth: '320px',
  maxWidth: '320px',
  minHeight: '79vh',
  maxHeight: '79vh',
  overflowY: 'scroll',
  border: 1,
  bgcolor: 'common.white',
  borderColor: 'divider',
  borderRadius: 3,
  pb: 1.5,
  px: 1.5
}

export const headerStyle: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pb: 2,
  pt: 3.5,
  bgcolor: 'inherit',
  color: 'black'
}

export const errorStyle: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center'
}

export const addTaskStyle: SxProps = {
  display: 'block',
  mx: 'auto',
  mb: 4,
  mt: 1,
  borderRadius: '100%'
}

export const editColumnHeader: SxProps = { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  pb: 3 
}

