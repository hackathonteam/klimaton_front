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
  data: Record<string, any>;
  quotient?: boolean;
};

const ProgressBar = ({ data, quotient = false }: Props) => {
  const radius: {
    value: [number, number, number, number];
    max: [number, number, number, number];
  } = { value: [15, 0, 0, 15], max: [0, 15, 15, 0] };

  const quotientData = data?.data.map((props: Record<string, any>) => ({
    ...props,
    max: 1 - props.quotient,
  }));

  return (
    <Flex>
      <Title>{data?.title}</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={quotient ? quotientData : data?.data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {quotient ? (
            <>
              <Bar
                dataKey="quotient"
                stackId="a"
                fill="#6377c6"
                radius={[0, 0, 15, 15]}
              >
                <LabelList
                  dataKey="quotient"
                  formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                  style={{ fontSize: '24px', fill: 'white' }}
                  position="insideTop"
                />
              </Bar>
              <Bar
                dataKey="max"
                stackId="a"
                fill="#6377c6"
                fillOpacity={0.5}
                radius={[15, 15, 0, 0]}
              />
            </>
          ) : (
            <>
              <Legend />
              <Bar
                name="Zużycie wody"
                dataKey="pobrana"
                fill="#6377c6"
                radius={radius.value}
              >
                <LabelList
                  dataKey="pobrana"
                  formatter={(value: number) => value.toFixed(1)}
                  style={{ fontSize: '24px', fill: 'white' }}
                />
              </Bar>
              <Bar
                name="Deklarowane ścieki"
                dataKey="deklarowana"
                fill="brown"
                radius={radius.max}
              >
                <LabelList
                  dataKey="deklarowana"
                  formatter={(value: number) => value.toFixed(1)}
                  style={{ fontSize: '24px', fill: 'white' }}
                />
              </Bar>
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default ProgressBar;
