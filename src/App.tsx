import './App.css';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from '@mui/material/styles';
import theme from './muiTheme';

function App() {
  return (
    <div className="App">
         <ThemeProvider theme={theme}> 

      <main>
        <SmoothScroll />
      </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
