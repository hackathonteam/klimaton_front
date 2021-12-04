import styled from 'styled-components';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const Label = styled.span`
  font-size: 36px;
  margin-left: 16px;
`;

type Props = {
  value: number;
};

const ProgressBar = ({ value }: Props) => {
  const data = [{ value, label: 'Procent', max: 100 }];

  const radius: {
    value: [number, number, number, number];
    max: [number, number, number, number];
  } = { value: [15, 0, 0, 15], max: [0, 15, 15, 0] };

  return (
    <Flex>
      <ResponsiveContainer width="80%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis
            dataKey="max"
            type="number"
            axisLine={false}
            tickLine={false}
            tick={false}
            height={0}
          />
          <YAxis width={0} dataKey="label" type="category" axisLine={false} />
          <Bar
            dataKey="value"
            stackId="a"
            fill="#6377c6"
            radius={radius.value}
          />
          <Bar
            dataKey="max"
            stackId="a"
            fill="#6377c6"
            fillOpacity={0.5}
            radius={radius.max}
          />
        </BarChart>
      </ResponsiveContainer>
      <Label>{value.toFixed(1)}%</Label>
    </Flex>
  );
};

export default ProgressBar;
