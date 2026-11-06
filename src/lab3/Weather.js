
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { CITIES, currentUrl } from './cities';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(CITIES[0]);

  
useEffect(() => {
  let ignore = false;

  async function load() {
    try {
      const res = await fetch(currentUrl(city));

      if (!res.ok) {
        throw new Error('Failed to load weather');
      }

      const json = await res.json();

      if (!ignore) {
        setWeather(json.current);
        setError(null);
      }

    } catch (e) {
      if (!ignore) {
        setError(e.message);
      }

    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }

  load();

  return () => {
    ignore = true;
  };
}, [city]);

    
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

            setLoading(true);
            setError(null);
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
    ) : (
      <View style={styles.weather}>
        <Text style={styles.city}>{city.name}</Text>

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
