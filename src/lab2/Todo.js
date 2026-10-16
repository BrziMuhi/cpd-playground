
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from './styles';

export default function Todo() {

  const [todos, setTodos] = useState([
    { id: '1', title: 'Install Expo Go', done: true },
    { id: '2', title: 'Finish Lab 2', done: false },
  ]);

  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim() === '') return;

    const newTodo = {
      id: Date.now().toString(),
      title: text.trim(),
      done: false
    };

    setTodos([...todos, newTodo]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.screen}>

      <Text style={styles.title}>To-Do List</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New task"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>

      <Text>{todos.length} tasks</Text>

      {todos.length === 0 ? (
        <Text>No tasks yet</Text>
      ) : (
        todos.map(todo => (
          <View key={todo.id} style={styles.row}>

            <Text style={{ flex: 1 }}>{todo.title}</Text>

            <Pressable
              style={styles.button}
              onPress={() => deleteTodo(todo.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>

          </View>
        ))
      )}

    </View>
  );
}
