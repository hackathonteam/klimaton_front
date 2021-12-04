import styled from 'styled-components';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
  LabelList,
  LabelListProps,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const StyledContent = styled.div`
  padding: 8px;
  font-size: 24px;
  color: black;
  background-color: white;
  border-radius: 8px;
`;

const TooltipContent = ({ payload }: TooltipProps<ValueType, NameType>) => {
  if (!payload?.length) {
    return null;
  }
  return <StyledContent>{`${payload[0].value}%`}</StyledContent>;
};

const renderContent = (props: any) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  console.log(props);
  return (
    <g>
      <text
        x={(x as number) + (width as number) / 2}
        y={(y as number) - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

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
    <ResponsiveContainer width="40%" height="10%">
      <BarChart data={data} layout="vertical">
        <XAxis
          dataKey="max"
          type="number"
          axisLine={false}
          tickLine={false}
          tick={false}
        />
        <YAxis dataKey="label" type="category" axisLine={false} />
        <Bar
          dataKey="value"
          stackId="a"
          fill="#6377c6"
          radius={radius.value}
          isAnimationActive={false}
          label={{ position: 'insideRight', fontSize: '24px', formatter: (value: string) => `${value}%`  }}
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
  );
};

export default ProgressBar;
