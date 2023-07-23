export const styles = {
  mainDiv: {
    display: 'flex',
    p: '32px 0px 16px 0px',
    flexDirection: 'column'
  },
  dialogHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flexWrap: 'wrap',
    p: '10px 24px'
  },
  headerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  dialogText: { textAlign: 'left', color: '#323E4D' },
  dialogSubtitle: { textAlign: 'left', color: '#7A7E8B' },
  dialogAction: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-end',
    p: '0px 24px'
  },
  cancelButton: {
    height: '44px',
    width: '96px',
    borderRadius: '16px',
    padding: '10px 20px 10px 20px',
    color: '#132640',
    background: '#FFFFFF',
    border: '1px solid #C5C7D4'
  },
  duplicateButton: {
    height: '44px',
    width: '120px',
    borderRadius: '16px',
    padding: '10px 20px 10px 20px',
    color: '#132640',
    background: '#FFFFFF',
    border: '1px solid #C5C7D4'
  },
  saveButton: {
    height: '44px',
    width: '79px',
    borderRadius: '16px',
    padding: '10px 20px 10px 20px',
    color: '#FFFFFF',
    background: '#132640',
    '&:hover': {
      backgroundColor: '#132640'
    }
  },
  buttonBox: { display: 'flex', gap: '8px', p: '8px' }
};
