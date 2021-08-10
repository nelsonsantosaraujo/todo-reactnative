import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTaskTitle = tasks.find(task => task.title === newTaskTitle);

    if(foundTaskTitle) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok",
            onPress: () => {return;},
          },
        ]
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const mappedTasks = tasks.map(task => {
      if(task.id === id){
        return {
          ...task,
          done: !task.done,
        }
      }

      return task;
    });

    setTasks(mappedTasks);
  }

  function handleConfirmRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {return;},
        },
        { text: "Sim", onPress: () => handleRemoveTask(id) }
      ]
    );
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => {
      if(task.id !== id){
        return task;
      }

      return;
    });

    setTasks(filteredTasks);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const mappedTasks = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          title: taskNewTitle
        }
      }

      return task;
    });

    setTasks(mappedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleConfirmRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})