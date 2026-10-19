import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const AnaloguesTable = forwardRef((props, ref) => {
  const { analogues, selectedBrand, loading, error } = useSelector((state) => state.parts);

  if (!selectedBrand) {
    return null;
  }

  const flattenAnalogues = (goods) => {
    const result = [];

    goods.forEach((item) => {
      // Add main item
      if (item.warehouses && item.warehouses.length > 0) {
        item.warehouses.forEach((warehouse) => {
          result.push({
            brand: item.brand,
            name: item.name,
            price: warehouse.price,
            stock: warehouse.stock,
            own: warehouse.own,
            notRefund: warehouse.notRefund || item.notRefund,
          });
        });
      }

      // Add analogues if they exist
      if (item.analogues && item.analogues.length > 0) {
        item.analogues.forEach((analogue) => {
          if (analogue.warehouses && analogue.warehouses.length > 0) {
            analogue.warehouses.forEach((warehouse) => {
              result.push({
                brand: analogue.brand,
                name: analogue.name,
                price: warehouse.price,
                stock: warehouse.stock,
                own: warehouse.own,
                notRefund: warehouse.notRefund || analogue.notRefund,
                isAnalogue: true,
              });
            });
          }
        });
      }
    });

    return result;
  };

  const flattenedData = flattenAnalogues(analogues);

  return (
    <div id="analogues-section" ref={ref} className="card">
      <div className="card-body">
        <h5 className="card-title">
          Этап 2: Аналоги и предложения для {selectedBrand}
        </h5>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && flattenedData.length === 0 && (
          <div className="alert alert-info" role="alert">
            Нет доступных предложений
          </div>
        )}

        {!loading && !error && flattenedData.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Производитель</th>
                  <th>Наименование</th>
                  <th>Цена</th>
                  <th>Остаток</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {flattenedData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.isAnalogue && (
                        <span className="badge bg-secondary me-1">Аналог</span>
                      )}
                      {item.brand}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price ? `${item.price} ₽` : '-'}</td>
                    <td>
                      <span className={item.stock > 0 ? 'text-success' : 'text-danger'}>
                        {item.stock}
                      </span>
                    </td>
                    <td>
                      {item.notRefund && (
                        <span className="badge bg-warning text-dark">Невозврат</span>
                      )}
                      {!item.notRefund && item.stock > 0 && (
                        <span className="badge bg-success">В наличии</span>
                      )}
                      {!item.notRefund && item.stock === 0 && (
                        <span className="badge bg-secondary">Нет в наличии</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
});

AnaloguesTable.displayName = 'AnaloguesTable';

export default AnaloguesTable;
