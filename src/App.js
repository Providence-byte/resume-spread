import { ResumeRouter } from "./router";
import styled from "styled-components";
import "./App.css";
function App() {
  return (
    <AppContainer className="App">
      <ResumeRouter />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;
