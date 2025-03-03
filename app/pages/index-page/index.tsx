import Header from '~/widgets/header';
import TaskCreator from '~/widgets/task-creator';
import { TaskList } from '~/components/list';
import { Wrapper } from './styles';

export function IndexPage() {
  return (
    <>
      <Wrapper>
        <Header />
        <TaskList />
        <TaskCreator />
      </Wrapper>
    </>
  );
}
