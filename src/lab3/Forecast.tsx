
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import type { City } from './cities';
import { forecastUrl } from './cities';
import Temperature from './Temperature';
import { useFetch } from './useFetch';

type ForecastProps = {
  city: City;
};

type ForecastResponse = {
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
  };
};

export default function Forecast({ city }: ForecastProps) {
  const { data, loading, error } =
    useFetch<ForecastResponse>(forecastUrl(city));

  if (loading) {
    return <ActivityIndicator size="small" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!data) {
    return <Text>No forecast available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Three-Day Forecast</Text>

      {data.daily.time.map((date, i) => (
        <View key={date} style={styles.row}>

          <Text style={styles.date}>{date}</Text>

          <View style={styles.temperatures}>
            <Temperature
              celsius={data.daily.temperature_2m_min[i]}
            />

            <Text> / </Text>

            <Temperature
              celsius={data.daily.temperature_2m_max[i]}
            />
          </View>

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 15,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  date: {
    fontSize: 14,
  },
  temperatures: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
