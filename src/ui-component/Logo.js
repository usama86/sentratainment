// material-ui

import SenImg from './../assets/images/sentratainment_img.svg';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
    <img
      src={SenImg}
      alt="logo"
      style={{
        height: '58px',
        width: '108px',
        background: 'black'
      }}
    />
  );
};

export default Logo;
