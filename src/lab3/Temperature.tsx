
import { useContext } from 'react';
import { Text } from 'react-native';
import { UnitsContext } from './UnitsContext';

type TemperatureProps = {
  celsius: number;
};

export default function Temperature({ celsius }: TemperatureProps) {
  const unit = useContext(UnitsContext);

  const value = unit === 'C'
    ? celsius
    : celsius * 9 / 5 + 32;

  return (
    <Text>
      {value.toFixed(1)} °{unit}
    </Text>
  );
}
