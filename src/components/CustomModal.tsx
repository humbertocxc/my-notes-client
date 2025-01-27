import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ReactNode } from 'react';
import { Button, SxProps } from '@mui/material';

const style: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '100%',
  bgcolor: 'background.paper',
  borderRadius: '1em',
  boxShadow: 24,
  p: 4,
};

interface ITransitionModal {
  onClose: VoidFunction
  isOpen: boolean
  children: ReactNode
  buttonClick?: VoidFunction
  buttonText?: string
  isSubmit?: boolean
  hideButton?: boolean
  disabled?: boolean
}

export default function CustomModal({ isSubmit, onClose, isOpen, children, buttonText, buttonClick, hideButton, disabled }: ITransitionModal) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            {children}
            {!hideButton &&
              <Button
                type={`${isSubmit ? 'submit' : 'button'}`}
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={buttonClick}
              >
                {buttonText}
              </Button>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
