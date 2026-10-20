import { useRef } from 'react';
import ManufacturerSearch from './components/ManufacturerSearch';
import ManufacturerList from './components/ManufacturerList';
import AnaloguesTable from './components/AnaloguesTable';
import ScrollToTopButton from './components/ScrollToTopButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const manufacturersSectionRef = useRef(null);
  const analoguesSectionRef = useRef(null);

  const scrollToManufacturers = () => {
    if (manufacturersSectionRef.current) {
      manufacturersSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToAnalogues = () => {
    if (analoguesSectionRef.current) {
      analoguesSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4">Поиск автозапчастей и аналогов</h1>
            <ManufacturerSearch onSearchComplete={scrollToManufacturers} />
            <ManufacturerList
              ref={manufacturersSectionRef}
              onBrandSelect={scrollToAnalogues}
            />
            <AnaloguesTable ref={analoguesSectionRef} />
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
}

export default App;
