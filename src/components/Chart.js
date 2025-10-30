import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

const average = (data) => (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);

const Chart = ({ data, color, units }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Sparklines data={data} height={120} width={180}>
        <SparklinesLine color={color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>
        <strong>{average(data)}</strong> {units}
      </div>
    </div>
  );
};

export default Chart;
