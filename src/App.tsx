import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './muiTheme';
import TitleHeader from './components/TitleHeader';

function App() {
  return (
    <div className="App">
         <ThemeProvider theme={theme}> 

      <main>
        <TitleHeader />
      </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
