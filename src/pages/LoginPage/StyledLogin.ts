import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const NoAccountMessage = styled(Box)(({ theme }) => ({
  ...theme.typography.smallMessage,
  marginTop: '0.85rem',
  textAlign: 'center',
}))

export const accountIconStyles = {
  marginTop: 4,
  transform: 'scale(2.5)',
}
