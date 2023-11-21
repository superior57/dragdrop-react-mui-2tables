import './App.css';

import { Box } from '@mui/material';
import MainSection from './sections';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Box component="main" className="App-main">
        <MainSection />
      </Box>
    </div>
  );
}

export default App;
