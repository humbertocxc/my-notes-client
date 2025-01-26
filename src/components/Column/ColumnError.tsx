import { Box, Button, Zoom, Typography, Tooltip } from "@mui/material"
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import BaseColumn from "./ColumnStyle"
import { useState } from "react"
import { ApolloError } from "@apollo/client";
import { errorStyle } from "./styles";

interface IColumnError {
  name?: string
  error?: ApolloError
}

const ColumnError = ({ name, error }: IColumnError) => {
  const [showError, setShowError] = useState(false)

  const handleShowError = () => {
    setShowError(!showError)
  }

  return (
    <BaseColumn name={name}>
      <Box sx={{ p: 3, pt: 4 }}>
        <Box sx={errorStyle}>
          <Typography color="error">{error?.name || 'Error fetching data.'}</Typography>
          <Tooltip title="Show error message" placement="top">
            <Button onClick={handleShowError}>
              {showError ? <ArrowDropUp /> : <ArrowDropDown />}
            </Button>
          </Tooltip>
        </Box>

        {showError && (
          <Zoom in={showError}>
            <Typography sx={{ py: 2 }}>
              {error?.message}
            </Typography>
          </Zoom>
        )}
      </Box>
    </BaseColumn>
  )
}

export default ColumnError

