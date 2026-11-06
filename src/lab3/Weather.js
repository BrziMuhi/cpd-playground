
import { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { CITIES, currentUrl } from './cities';
import { useFetch } from './useFetch';

export default function Weather() {
  const [city, setCity] = useState(CITIES[0]);

  const { data, loading, error } = useFetch(currentUrl(city));

  return (
    <View style={styles.container}>

      <View style={styles.cityButtons}>
        {CITIES.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.button,
              city.id === item.id && styles.selectedButton
            ]}
            onPress={() => {
              if (city.id === item.id) return;
              setCity(item);
            }}
          >
            <Text style={styles.buttonText}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>{error}</Text>
      ) : data ? (
        <View style={styles.weather}>
          <Text style={styles.city}>{city.name}</Text>

          <Text style={styles.temperature}>
            {data.current.temperature_2m} °C
          </Text>

          <Text style={styles.wind}>
            Wind {data.current.wind_speed_10m} km/h
          </Text>
        </View>
      ) : (
        <Text>No weather data available</Text>
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
  cityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#64748b',
    padding: 10,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});
