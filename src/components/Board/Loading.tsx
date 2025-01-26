import { Backdrop, CircularProgress } from "@mui/material"

interface ILoading {
  loading: boolean
}

export const Loading = ({ loading }: ILoading) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
