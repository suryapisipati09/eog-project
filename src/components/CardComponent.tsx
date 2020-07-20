import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core';
import { MultipleMeasurements, Measurement } from '../Features/Metrics/metrics-reducer';
import '../../src/styles.css';

const CardComponent = (multipleMeasurments: any) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h3">
          {multipleMeasurments.props.metric}
        </Typography>
        <CardComponentContent props={multipleMeasurments.props.measurements}></CardComponentContent>
      </CardContent>
    </Card>
  );
};

const CardComponentContent = (content: any) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (content.props.length > 0) {
    return (
      <Typography variant="h5" component="h3">
        {content.props[counter].value}
      </Typography>
    );
  } else return <div></div>;
};

export const RenderCard = (measurements: any) => {
  if (measurements.props.length > 0) {
    return measurements.props.map((measurement: MultipleMeasurements, index: number) => {
      return (
        <Style key={index}>
          <CardComponent key={index} props={measurement} style={{ margin: '5px' }} />
        </Style>
      );
    });
  } else return [];
};

const Style = styled('div')({
  margin: '5px',
});
