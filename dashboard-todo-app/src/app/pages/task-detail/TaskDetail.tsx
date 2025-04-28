import React from 'react';

import Detail from './components/Detail';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();

  console.log('taskId:', taskId);

  return (
    <div className="detail-page">
      <Detail taskId={taskId} />
    </div>
  );
};

export default TaskDetail;
