import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
// import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';
import SenImg from './../../../assets/images/sentratainment_img.svg';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <img
        src={SenImg}
        alt="logo"
        style={{
          height: '58px',
          width: '108px',
          background: 'black'
        }}
      />
    </ButtonBase>
  );
};

export default LogoSection;
