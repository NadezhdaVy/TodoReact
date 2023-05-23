import { TasksProvider, initialState } from '../../context/tasks-context';
import TasksList from '../tasks-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import './app.css';

function App() {
  return (
    <TasksProvider tasks={initialState.tasks} filters={initialState.filters}>
      <div className="todoapp">
        <header className="header">
          <h1>Todo</h1>
          <NewTaskForm />
        </header>
        <main className="main">
          <TasksList />
          <Footer />
        </main>
      </div>
    </TasksProvider>
  );
}

export default App;
