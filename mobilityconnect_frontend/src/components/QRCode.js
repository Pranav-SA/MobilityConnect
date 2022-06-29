import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from "qrcode.react";
import Box from '@material-ui/core/Box';

const defaultProps = {
	bgcolor: 'background.paper',
	borderColor: '#0DD2D9',
	m: 1,
	border: 2,
};
const useStyles = makeStyles((theme) => ({
	head: {
	  fontWeight: 'bold',
	  fontSize: 18,
	  textAlign: "center"
	}
}));

export default function QrCode(props) {
const classes = useStyles();

return (
<Box borderColor="primary.main" {...defaultProps}>
<p className={classes.head}> Ticket id:</p>
  <QRCode         
  id="qr-gen"
  value={props.ticketId}
  size={290}
  level={"H"}
  includeMargin={true} />
  </Box>
)};