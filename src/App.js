import './App.scss';
import AboutUs from './components/AboutUs/AboutUs';
import Buttons from './components/Buttons/Buttons';
import Header from './components/Header/Header';

function App() {
  return (
      <div className='wrapper'>
        <Header />
        <AboutUs />
        <Buttons />
      </div>
  );
}

export default App;
