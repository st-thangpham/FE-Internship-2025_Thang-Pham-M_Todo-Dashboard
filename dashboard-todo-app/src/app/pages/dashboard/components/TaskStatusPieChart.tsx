import * as React from 'react';

import { RootState } from '@/shared/redux/store';
import { styled } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { useSelector } from 'react-redux';

import { FilterStatusType } from '@/shared/utils/enum';

const size = {
  width: 100,
  height: 100,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  fontWeight: 500,
}));

function CenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const TaskStatusPieChart: React.FC = () => {
  const { tasks } = useSelector((state: RootState) => state.task);

  const notStarted = tasks.filter(
    (task) => task.status === FilterStatusType.notStarted
  ).length;
  const inProgress = tasks.filter(
    (task) => task.status === FilterStatusType.inProgress
  ).length;
  const completed = tasks.filter(
    (task) => task.status === FilterStatusType.completed
  ).length;

  const data = [
    { label: FilterStatusType.completed, value: completed, color: '#05a301' },
    { label: FilterStatusType.inProgress, value: inProgress, color: '#0225ff' },
    { label: FilterStatusType.notStarted, value: notStarted, color: '#f21e1e' },
  ];

  const totalTasks = tasks.length;

  return (
    <PieChart series={[{ data, innerRadius: 33 }]} {...size}>
      <CenterLabel>{totalTasks}</CenterLabel>
    </PieChart>
  );
};

export default TaskStatusPieChart;
