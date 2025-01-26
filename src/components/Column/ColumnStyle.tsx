import { List, ListSubheader, Typography } from "@mui/material"
import { forwardRef, ReactNode } from "react"
import { headerStyle, listStyle } from "./styles"

interface IColumnStyle {
  name?: string
  children: ReactNode
}

const ColumnStyle = forwardRef<HTMLUListElement, IColumnStyle>(({ name, children }, ref) => {
  return (
    <List
      sx={listStyle}
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
