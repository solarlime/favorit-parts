import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNumber,
  clearResults,
  fetchManufacturers,
} from '../store/partsSlice';

const ManufacturerSearch = ({ onSearchComplete }) => {
  const dispatch = useDispatch();
  const { loading, error, manufacturers } = useSelector((state) => state.parts);
  const [localNumber, setLocalNumber] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!localNumber.trim()) return;

    dispatch(setNumber(localNumber));
    dispatch(clearResults());

    try {
      await dispatch(fetchManufacturers(localNumber));
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  useEffect(() => {
    if (manufacturers.length > 0 && onSearchComplete) {
      onSearchComplete();
    }
  }, [manufacturers, onSearchComplete]);

  const handleClear = () => {
    setLocalNumber('');
    dispatch(clearResults());
  };

  return (
    <div id="search-section" className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Поиск производителей</h5>
        <form onSubmit={handleSearch}>
          <div className="mb-3">
            <label htmlFor="partNumber" className="form-label">
              Введите артикул детали
            </label>
            <input
              type="text"
              className="form-control"
              id="partNumber"
              value={localNumber}
              onChange={(e) => setLocalNumber(e.target.value)}
              placeholder="Например: 01089"
              disabled={loading}
            />
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !localNumber.trim()}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Загрузка...
                </>
              ) : (
                'Найти производителей'
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={loading}
            >
              Очистить
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerSearch;
