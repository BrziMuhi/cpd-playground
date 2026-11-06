
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { CITIES, currentUrl } from './cities';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(currentUrl(CITIES[0]));

        if (!res.ok) {
          throw new Error('Failed to load weather');
        }

        const json = await res.json();
        setWeather(json.current);

      } catch (e) {
        setError(e.message);

      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View style={styles.weather}>
          <Text style={styles.city}>Sarajevo</Text>

          <Text style={styles.temperature}>
            {weather.temperature_2m} °C
          </Text>

          <Text style={styles.wind}>
            Wind {weather.wind_speed_10m} km/h
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  weather: {
    alignItems: 'center',
    gap: 12,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 36,
  },
  wind: {
    fontSize: 20,
  },
});
