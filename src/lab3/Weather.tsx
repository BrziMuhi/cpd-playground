
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Forecast from './Forecast';
import Temperature from './Temperature';
import { UnitsContext } from './UnitsContext';
import { CITIES, currentUrl, City } from './cities';
import { useFetch } from './useFetch';

type CurrentResponse = {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
  };
};

export default function Weather() {
  const [city, setCity] = useState<City>(CITIES[0]);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const { data, loading, error } =
    useFetch<CurrentResponse>(currentUrl(city));

  return (
    <UnitsContext value={unit}>
      <View style={styles.container}>

        <Pressable
          style={styles.unitButton}
          onPress={() => setUnit(unit === 'C' ? 'F' : 'C')}
        >
          <Text style={styles.buttonText}>
            Switch to °{unit === 'C' ? 'F' : 'C'}
          </Text>
        </Pressable>

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
          <View style={{ width: '100%', paddingHorizontal: 20 }}>

            <View style={styles.weather}>
              <Text style={styles.city}>{city.name}</Text>

              <Text style={styles.temperature}>
                <Temperature
                  celsius={data.current.temperature_2m}
                />
              </Text>

              <Text style={styles.wind}>
                Wind {data.current.wind_speed_10m} km/h
              </Text>
            </View>

            <Forecast city={city} />

          </View>
        ) : (
          <Text>No weather data available</Text>
        )}

      </View>
    </UnitsContext>
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
  unitButton: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 25,
  },
});
