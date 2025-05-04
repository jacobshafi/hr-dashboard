'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Props {
  open: boolean;
  onClose: () => void;
  recipientName: string;
}

export default function BirthdayWishModal({ open, onClose, recipientName }: Props) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 2000);
  };

  const handleClose = () => {
    setMessage('');
    setSent(false);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        🎉 Send a Birthday Wish to{' '}
        <Typography component="span" fontWeight="bold">
          {recipientName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {sent ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
            <CheckCircleOutlineIcon color="success" fontSize="large" />
            <Typography variant="h6" color="success.main">
              Sent to #birthday-channel on Slack!
            </Typography>
          </Box>
        ) : (
            <TextField
                label="Message"
                placeholder={`🎂 Happy Birthday, ${recipientName}! Hope you have a fantastic day!`}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 1 }}
            />
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          Close
        </Button>
        {!sent && (
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={loading || !message.trim()}
            endIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Sending...' : 'Send to Slack'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
