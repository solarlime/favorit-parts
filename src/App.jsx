import ManufacturerSearch from './components/ManufacturerSearch';
import ManufacturerList from './components/ManufacturerList';
import AnaloguesTable from './components/AnaloguesTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Поиск автозапчастей и аналогов</h1>
          <ManufacturerSearch />
          <ManufacturerList />
          <AnaloguesTable />
        </div>
      </div>
    </div>
  );
}

export default App;
