import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import TypographyComponent from '../TypographyComponent';

function ButtonComponent({ children, onClick, variant, ...otherProps }) {
  return (
    <Button onClick={onClick} {...otherProps}>
      {variant ? (
        <TypographyComponent variant={variant} component="p">
          {children}
        </TypographyComponent>
      ) : (
        children
      )}
    </Button>
  );
}

ButtonComponent.defaultProps = {
  children: <></>
};

ButtonComponent.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.string
};

export default ButtonComponent;
