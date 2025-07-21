import Header from '~/widgets/header';
import { TaskList } from '~/widgets/task-list';
import { Wrapper } from './styles';

export function IndexPage() {
  return (
    <>
      <Wrapper>
        <Header />
        <TaskList />
      </Wrapper>
    </>
  );
}
