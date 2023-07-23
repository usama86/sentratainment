import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import BoxComponent from '../BoxComponent';
import TypographyComponent from '../TypographyComponent';
import DividerComponent from '../Divider';
import crossicon from './../../assets/images/cross_icon.png';
import ButtonComponent from '../ButtonComponent';
import { styles } from './style';

function DialogComponent({
  open,
  handleClose,
  title,
  subTitle,
  children,
  handleSave,
  dialogChildrenStyle,
  firstDivider,
  maxHeight,
  ...otherProps
}) {
  const handleCLoseChange = () => {
    if (handleClose) {
      handleClose();
    }
  };

  const handleSaveChange = () => {
    if (handleSave) {
      handleSave();
    }
  };
  return (
    <Dialog open={open} onClose={handleCLoseChange} maxWidth="lg" fullWidth {...otherProps}>
      <BoxComponent sx={styles.mainDiv}>
        <BoxComponent sx={styles.dialogHeader}>
          <BoxComponent sx={styles.headerDiv}>
            <TypographyComponent sx={styles.dialogText} variant="DialogText" component="p">
              {title}
            </TypographyComponent>
            <BoxComponent onClick={handleCLoseChange}>
              <img width={'15.38px'} height={'15.38px'} src={crossicon} style={{ cursor: 'pointer' }} alt="cross" />
            </BoxComponent>
          </BoxComponent>
          {subTitle && (
            <TypographyComponent sx={styles.dialogSubtitle} variant="DialogSubTitle" component="p">
              {subTitle}
            </TypographyComponent>
          )}
        </BoxComponent>
        {firstDivider && <DividerComponent sx={{ width: '100%' }} />}
        <DialogContent
          sx={{
            ...dialogChildrenStyle,
            p: '10px 24px',
            maxHeight: maxHeight ? maxHeight : '450px'
          }}
        >
          {children}
        </DialogContent>
        <DividerComponent sx={{ width: '100%' }} />
        <DialogActions sx={styles.dialogAction}>
          <BoxComponent sx={styles.buttonBox}>
            <ButtonComponent sx={styles.cancelButton} onClick={handleCLoseChange}>
              Cancel
            </ButtonComponent>
            <ButtonComponent sx={styles.saveButton} onClick={handleSaveChange}>
              Save
            </ButtonComponent>
          </BoxComponent>
        </DialogActions>
      </BoxComponent>
    </Dialog>
  );
}

export default DialogComponent;

DialogComponent.defaultProps = {
  open: false,
  children: <></>,
  handleClose: () => {},
  title: 'I am title',
  handleSave: () => {},
  firstDivider: true,
  maxHeight: '450px'
};
