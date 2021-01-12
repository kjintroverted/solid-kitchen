import './App.css';
import { Back, HeaderBar, Spacer } from './components/styled';

function App() {
  return (
    <Back>
      <HeaderBar>
        <h2>Movie Ratings</h2>
        <Spacer />
        <h4>Login</h4>
      </HeaderBar>
      <h3>Hello War of the World!</h3>
    </Back>
  );
}

export default App;

