
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

  const toggleTodo = (id) => {
  setTodos(todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, done: !todo.done };
    }
    return todo;
  }));
};


const remaining = todos.filter(todo => !todo.done).length;

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

      <Text>{remaining} left</Text>

      {todos.length === 0 ? (
        <Text>No tasks yet</Text>
      ) : (
        todos.map(todo => (
          <View key={todo.id} style={styles.row}>

            <Pressable
                style={{ flex: 1 }}
                onPress={() => toggleTodo(todo.id)}
                >
                <Text
                    style={{
                    textDecorationLine: todo.done ? 'line-through' : 'none'
                    }}
                >
                    {todo.title}
                </Text>
            </Pressable>

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
