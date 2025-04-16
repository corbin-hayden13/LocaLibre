import { MainContentContainer } from './components/MainContentContainer';
import { Sidebar } from './components/Sidebar/Sidebar';
import { WebAppHeading } from './components/WebAppHeading';

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <WebAppHeading />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar />
        <MainContentContainer />
      </div>
    </div>
  );
}

export default App;
