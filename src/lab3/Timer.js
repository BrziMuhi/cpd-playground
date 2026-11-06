
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

    return () => {
      clearInterval(id);
    };

  }, [running]);

  const toggleTimer = () => {
    setRunning(!running);
  };

  const resetTimer = () => {
    setSeconds(0);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Seconds: {seconds}
      </Text>

      <View style={styles.row}>

        <Pressable style={styles.button} onPress={toggleTimer}>
          <Text style={styles.buttonText}>
            {running ? 'Pause' : 'Resume'}
          </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={resetTimer}>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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
    color: 'white',
    fontSize: 16,
  },
});
