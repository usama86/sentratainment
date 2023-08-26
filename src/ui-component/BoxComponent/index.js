import PropTypes from 'prop-types'
import React from 'react'
import Box from '@mui/material/Box'

export default function BoxComponent({ children, ...otherProps }) {
  return <Box {...otherProps}>{children}</Box>
}

BoxComponent.propTypes = {
  children: PropTypes.node,
}
BoxComponent.defaultProps = {
  children: <></>,
}
