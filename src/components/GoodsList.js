import React from 'react';
import useServerGoods from './useServerGoods';

function GoodsList() {
  const { goods, isLoading, error, loadMore } = useServerGoods();

  if (isLoading && goods.length === 0) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка соединения</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата выпуска</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.releaseDate}</td>
              <td>{item.price} ₽</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={loadMore} disabled={isLoading}>Загрузить больше</button>
    </div>
  );
}

export default GoodsList;