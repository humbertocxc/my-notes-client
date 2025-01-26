import { List, ListSubheader, Typography } from "@mui/material"
import { forwardRef, ReactNode } from "react"

interface IColumnStyle {
  name?: string
  children: ReactNode
}

const style = {
  width: '100%',
  maxWidth: 300,
  border: 1,
  bgcolor: 'common.white',
  borderColor: 'divider',
  borderRadius: 3,
  p: 1.5
}

const headerStyle = {
  display: 'flex', justifyContent: 'space-between', py: 2, bgcolor: 'transparent', color: 'black'
}


const ColumnStyle = forwardRef<HTMLUListElement, IColumnStyle>(({ name, children }, ref) => {
  return (
    <List
      sx={style}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={headerStyle}
        >
          <Typography variant="h3" sx={{ fontSize: '1.5em', pl: 0.5 }} >
            {name}
          </Typography>
        </ListSubheader>
      }
      ref={ref}
    >
      {children}
    </List>
  )
})

export default ColumnStyle
