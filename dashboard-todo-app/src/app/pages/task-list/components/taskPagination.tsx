import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/shared/components/Pagination';
import { RootState } from '@/shared/redux/store';
import { setPage } from '@/shared/redux/task/taskActions';
import { FilterStatusType } from '@/shared/utils/enum';

const TaskPagination: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, search, filter, currentPage } = useSelector(
    (state: RootState) => state.task
  );

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter === FilterStatusType.all || task.status === filter) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPage = Math.ceil(filteredTasks.length / 4);

  return (
    <div className="task-pagination">
      {totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={(page) => dispatch(setPage(page))}
        />
      )}
    </div>
  );
};

export default TaskPagination;
