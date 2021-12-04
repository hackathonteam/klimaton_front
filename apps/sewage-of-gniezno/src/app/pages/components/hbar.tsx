import styled from 'styled-components';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 300px;
`;

const Label = styled.span`
  font-size: 36px;
  margin-left: 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
`;

type Props = {
  data: any;
};

const ProgressBar = ({ data }: Props) => {
  const radius: {
    value: [number, number, number, number];
    max: [number, number, number, number];
  } = { value: [15, 0, 0, 15], max: [0, 15, 15, 0] };

  return (
    <Flex>
      <Title>{data?.title}</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data?.data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            name="Zużycie wody"
            dataKey="water"
            fill="#6377c6"
            radius={radius.value}
            label={{ fontSize: '24px', fill: 'white' }}
          />
          <Bar
            name="Deklarowane ścieki"
            dataKey="sewage"
            fill="brown"
            radius={radius.max}
            label={{ fontSize: '24px', fill: 'white' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default ProgressBar;
