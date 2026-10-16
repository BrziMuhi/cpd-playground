
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';

export default function Counter() {

  const [count, setCount] = useState(0);

  return (
    <View style={styles.screen}>

      <Text style={styles.title}>Count: {count}</Text>

      <View style={styles.row}>

        <Pressable
          style={[styles.button, count === 0 && { backgroundColor: 'grey' }]}
          disabled={count === 0}
          onPress={() => setCount(c => c - 1)}
        >
          <Text style={styles.buttonText}>-1</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setCount(c => c + 1)}
        >
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setCount(0)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

      </View>

    </View>
  );
}
