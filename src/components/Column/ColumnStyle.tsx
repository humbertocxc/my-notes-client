import { forwardRef, ReactNode } from "react"
import { Button, List, ListSubheader, Typography } from "@mui/material"
import { headerStyle, listStyle } from "./styles"
import { MoreVert } from "@mui/icons-material"

interface IColumnStyle {
  name?: string
  children: ReactNode
  showButton?: boolean
  onClick?: VoidFunction
}

const ColumnStyle = forwardRef<HTMLUListElement, IColumnStyle>(({ name, children, showButton, onClick }, ref) => {
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
          <Typography variant="h3" sx={{ fontSize: '1.5em', fontWeight: 500, pl: 0.5 }} >
            {name}
          </Typography>
          {showButton && (
            <Button onClick={onClick}>
              <MoreVert />
            </Button>
          )}
        </ListSubheader>
      }
      ref={ref}
    >
      {children}
    </List>
  )
})

export default ColumnStyle
