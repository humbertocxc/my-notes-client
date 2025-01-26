import { Skeleton, Stack } from "@mui/material"
import BaseColumn from "./ColumnStyle"

interface IColumnSkeleton {
  name?: string
  size?: number
}

const ColumnSkeleton = ({ name = ".....", size = 3 }: IColumnSkeleton) => {
  return (
    <BaseColumn name={name}>
      <Stack sx={{ pt: 1.5 }} spacing={1}>
        {[...Array(size)].map((_, id) => (
          <Skeleton variant="rounded" key={id} height={58} />
        ))}
      </Stack>
    </BaseColumn>
  )
}

export default ColumnSkeleton
