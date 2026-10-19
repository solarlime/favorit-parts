import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNumber, clearResults, fetchManufacturers } from '../store/partsSlice';

const ManufacturerSearch = () => {
  const dispatch = useDispatch();
  const { number, loading, error } = useSelector((state) => state.parts);
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

  const handleClear = () => {
    setLocalNumber('');
    dispatch(clearResults());
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Этап 1: Поиск производителей</h5>
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
          <div className="d-flex gap-2">
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
