import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

export default function TypographyComponent({
  children,
  variant,
  ...otherProps
}) {
  return (
    <Typography variant={variant} {...otherProps}>
      {children}
    </Typography>
  )
}

TypographyComponent.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
}
TypographyComponent.defaultProps = {
  children: <></>,
  variant: 'h4',
}
