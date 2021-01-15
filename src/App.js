import { Button, Card, Divider, Input, Space, Typography } from "antd";
import styled from "styled-components";
import React, { useState } from 'react'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

function App() {
  const [newTitleTask, setnewTitleTask] = useState('')
  const [data, setData] = useState([])
  const [newSubTitleTask, setnewSubTitleTask] = useState('')
  return (
    <Container>
      <Space>
        <Input value={newTitleTask} style={{ width: 400 }} placeholder="Enter Task Name" onChange={e => setnewTitleTask(e.target.value)} />
        <Button type="primary" onClick={() => setData(createNewTask(data, newTitleTask))}>Create Task</Button>
      </Space>
      <Space direction="vertical" style={{ marginTop: 24 }}>
        {data && data.map((objTask, indexTask) => <Card
          title={objTask.name}
          style={{ width: 600, textDecoration: objTask.isAllDone ? 'line-through' : 'none' }}
          extra={<Button onClick={() => setData(duplicateTask(data, objTask))} type="primary">Duplicate</Button>}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
              <Input value={newSubTitleTask} placeholder="Enter Subtask Name" style={{ width: 400 }} onChange={e => setnewSubTitleTask(e.target.value)}/>
              <Button type="primary" onClick={() => setData(createNewSubTask(data, indexTask, newSubTitleTask))}>Add Task</Button>
            </Space>
            <Divider />
            {objTask.task.map((objSubTask, indexSubTask) => <Space>
              <Typography.Text style={{ textDecoration: objSubTask.isDone ? 'line-through' : 'none' }}>
                {objSubTask.title}
              </Typography.Text>
              <Button type="primary" onClick={() => setData(onClickDoUndo(data, indexTask, indexSubTask))}>{objSubTask.isDone ? 'Undone' : 'Done'}</Button>
              <Button type="danger" onClick={() => setData(onClickDeleteSubTask(data, indexTask, indexSubTask))}>Delete</Button>
            </Space>)}
          </Space>
        </Card>)}
      </Space>
    </Container>
  );
}

function onClickDoUndo(arrOld, indexTask, indexSubTask) {
  var newArr = [...arrOld]
  newArr[indexTask].task[indexSubTask].isDone = !newArr[indexTask].task[indexSubTask].isDone
  for (var index = 0; index < newArr[indexTask].task.length; index++) {
    if (!newArr[indexTask].task[index].isDone) {
      newArr[indexTask].isAllDone = false
      break;
    } else if (index === newArr[indexTask].task.length - 1) {
      newArr[indexTask].isAllDone = true
    }
  }
  return newArr
}

function onClickDeleteSubTask(arrOld, indexTask, indexSubTask) {
  var newArr = [...arrOld]
  newArr[indexTask].task.splice(indexSubTask, 1)
  return newArr
}

function createNewTask(arrOld, title) {
  var newArr = [...arrOld]
  newArr.push(
    {
      "name": title,
      "isAllDone": false,
      "task": []
    }
  )
  return newArr
}

function createNewSubTask(arrOld, indexTask, titleSubtask) {
  var newArr = [...arrOld]
  newArr[indexTask].task.push(
    {
      "title": titleSubtask,
      "isDone": false
    })
    newArr[indexTask].isAllDone = false
  return newArr
}

function duplicateTask(arrOld, task) {
  var newArr = [...arrOld]
  newArr.push(task)
  return newArr
}

export default App;
