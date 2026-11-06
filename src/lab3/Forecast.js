
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { forecastUrl } from './cities';
import Temperature from './Temperature';
import { useFetch } from './useFetch';



export default function Forecast({ city }) {
  const { data, loading, error } = useFetch(forecastUrl(city));

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

                
        <Text style={styles.temperature}>
        <Temperature celsius={data.daily.temperature_2m_min[i]} />
        {' / '}
        <Temperature celsius={data.daily.temperature_2m_max[i]} />
        </Text>
        
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
    marginBottom: 12,
    gap: 10,
  },
  date: {
    fontSize: 14,
  },
  temperature: {
    fontSize: 14,
  },
});
