import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormControl, makeStyles, styled, TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import { actions } from '../Metrics/metrics-reducer';
import { IState } from '../../store';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const getDataMetrics = (state: IState) => {
  const { getMetrics } = state.metrics;
  return {
    getMetrics,
  };
};

const getMetricsQuery = `
query{
    getMetrics
  }
`;

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
  const classes = useStyles();
  const { getMetrics } = useSelector(getDataMetrics);
  const dispatch = useDispatch();

  const [result] = useQuery({
    query: getMetricsQuery,
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  return (
    <ContainerStyle>
      <ComponentStyle>
        <StyledFormControl className={classes.formControl}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={data.getMetrics}
            filterSelectedOptions={true}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} variant="outlined" label="Select" placeholder="Favorites" />
            )}
          />
        </StyledFormControl>
      </ComponentStyle>
    </ContainerStyle>
  );
};

const StyledFormControl = styled(FormControl)({
  right: '1em',
  width: '40%',
});

const ContainerStyle = styled('div')({
  padding: '15px',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const ComponentStyle = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});
