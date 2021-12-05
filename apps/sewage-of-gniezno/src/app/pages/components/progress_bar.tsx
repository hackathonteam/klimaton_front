import styled from 'styled-components';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';
import { useEffect, useState } from 'react';

const Flex = styled.div<{ popup: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ popup }) => (popup ? '50px' : '100px')};
`;

const Label = styled.span`
  font-size: 36px;
  margin-left: 16px;
`;

const Title = styled.h2<{ popup: boolean }>`
  font-size: ${({ popup }) => (popup ? '12px' : '24px')};
  text-align: center;
`;

type Props = {
  value?: number;
  name?: string;
  popup?: boolean;
  selected?: boolean;
};

const getData = ({ value, name, selected, popup }: Partial<Props>) => {
  const locationData = {
    value: value && value + 0.000001,
    label: name,
    max: 100,
  };
  const townData = { value: 59.5, label: 'Gniezno', max: 100 };

  if (popup) return [{ ...locationData }];
  if (!selected) return [{ ...townData }];
  return [{ ...locationData }, { ...townData }];
};

const ProgressBar = ({ value, name, selected, popup = false }: Props) => {
  const data = getData({ value, name, selected, popup });

  const radius: {
    value: [number, number, number, number];
    max: [number, number, number, number];
  } = { value: [15, 0, 0, 15], max: [0, 15, 15, 0] };

  console.log({ value, name, selected, popup, data });

  // hacky way to fix animation bugs
  const [time, setTime] = useState<boolean>(false);
  setTimeout(() => {
    setTime(true);
  }, Math.random() * 200 + 100);

  if (!value || !time) {
    return null;
  }

  return (
    <>
      <Title popup={popup}>Wskaźnik procentowy wody oddanej do pobranej</Title>
      <Flex popup={popup}>
        <ResponsiveContainer width="80%" height="100%">
          <BarChart data={[...data]} layout="vertical">
            <XAxis
              dataKey="max"
              type="number"
              axisLine={false}
              tickLine={false}
              tick={false}
              height={0}
            />
            <YAxis
              width={0}
              dataKey="label"
              type="category"
              axisLine={false}
              label="label"
            />
            <Bar
              dataKey="value"
              stackId="a"
              fill="#6377c6"
              radius={radius.value}
            >
              <LabelList
                dataKey="value"
                formatter={(value: number) => `${value.toFixed(1)}%`}
                style={{ fontSize: popup ? '16px' : '24px', fill: 'white' }}
                position="insideRight"
              />
              {!popup && (
                <LabelList
                  dataKey="label"
                  style={{
                    fontSize: '16px',
                    fill: 'white',
                    marginLeft: '12px',
                  }}
                  position="insideLeft"
                />
              )}
            </Bar>
            <Bar
              dataKey="max"
              stackId="a"
              fill="#6377c6"
              fillOpacity={0.5}
              radius={radius.max}
            />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </>
  );
};

export default ProgressBar;
