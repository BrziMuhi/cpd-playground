
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Seconds: {seconds}
      </Text>

      <View style={styles.row}>
        <Pressable
          style={styles.button}
          onPress={() => setRunning(!running)}
        >
          <Text style={styles.buttonText}>
            {running ? 'Pause' : 'Resume'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setSeconds(0)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
