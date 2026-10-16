
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';

export default function Counter() {

  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.screen}>

      <Text style={styles.title}>Count: {count}</Text>

      <View style={styles.row}>

        <Pressable
          style={[
            styles.button,
            count === 0 && { backgroundColor: 'grey' }
          ]}
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

      {/* Task 4: Like Button */}
      <Pressable
        style={[
          styles.button,
          { backgroundColor: liked ? 'green' : '#003A6D' }
        ]}
        onPress={() => setLiked(!liked)}
      >
        <Text style={styles.buttonText}>
          {liked ? 'Liked (13)' : 'Like (12)'}
        </Text>
      </Pressable>

    </View>
  );
}
