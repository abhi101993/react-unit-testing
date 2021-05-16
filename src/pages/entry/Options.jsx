import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/${optionType}`);

        setItems(res.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
