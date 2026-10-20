import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBrand, fetchAnalogues } from '../store/partsSlice';

const ManufacturerList = ({ onBrandSelect, ref }) => {
  const dispatch = useDispatch();
  const { manufacturers, loading, number } = useSelector(
    (state) => state.parts
  );

  const handleSelectBrand = async (brand) => {
    dispatch(setSelectedBrand(brand));

    try {
      await dispatch(fetchAnalogues({ number, brand }));
      if (onBrandSelect) {
        onBrandSelect();
      }
    } catch (err) {
      console.error('Failed to load analogues:', err);
    }
  };

  if (manufacturers.length === 0) {
    return null;
  }

  return (
    <div id="manufacturers-section" ref={ref} className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Найденные производители</h5>
        <div className="list-group">
          {manufacturers.map((item, index) => (
            <button
              key={index}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => handleSelectBrand(item.brand)}
              disabled={loading}
            >
              <div className="text-start">
                <strong>{item.brand}</strong>
                <div className="text-muted small">{item.name}</div>
              </div>
              <span className="badge bg-primary rounded-pill">
                Остаток: {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManufacturerList;
