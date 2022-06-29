import React from 'react';
import DisplayMap from '../views/DisplayMap';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

//const [initial, setInitial] = useState(false);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cont: {
    padding: theme.spacing(4),
    maxWidth: "lg"
  },
}));

function NestedGrid() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
            <DisplayMap />
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
          <FormRow />
    </div>
  );
}

function JourneyView() {
  const classes = useStyles();

    return (
        <div>
          <Container className={classes.cont}>
            <NestedGrid/>
          </Container>
        </div>
    );

}

export default JourneyView;

