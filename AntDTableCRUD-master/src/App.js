import "antd/dist/antd.css";
import "./App.css";
import React from 'react';
import { Button, Table, Modal, Input,Tag } from "antd";
import { useState } from "react";
import { DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


let randomNumber=0;
function App() {
  const state={
    curDT : new Date().toLocaleString(),
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
    {
      key: "6",
      title: "Created",
      dataIndex: "created",
    },
    {
      key: "7",
      title: "DueDate",
      dataIndex: "duedate",
      render: () =>{
        return(
          <>
        <DatePicker
          
        /></>)
      }
    },
  ];
  const onAddStudent = () => {
    randomNumber = randomNumber+1;
    const newStudent = {
       id: randomNumber,
       name: "",
       email: "",
       address: "",
      created: state.curDT,
      tags: [""],
      duedate: "",
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
  <div className="App">
    <header className="App-header">
      <Button onClick={onAddStudent}>Add a new Student</Button>
      <Table columns={columns} dataSource={dataSource}>
        
      </Table>
      <Modal
        title="Edit Student"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((pre) => {
            return pre.map((student) => {
              if (student.id === editingStudent.id) {
                return editingStudent;
              } else {
                return student;
              }
            });
          });
          resetEditing();
        }}
      >
        <h5>Name:</h5>
        <Input
          value={editingStudent?.name}
          onChange={(e) => {
            setEditingStudent((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <br/>
        <h5>Age:</h5>
        <Input
          value={editingStudent?.age}
          onChange={(e) => {
            setEditingStudent((pre) => {
              return { ...pre, age: e.target.value };
            });
          }}
        />
        <br/>
        <h5>Address:</h5>
        <Input
          value={editingStudent?.address}
          onChange={(e) => {
            setEditingStudent((pre) => {
              return { ...pre, address: e.target.value };
            });
          }}
        />
        <br/>
        <h5>Tags:</h5>
        <Input
          value={editingStudent?.tags}
          onChange={(e) => {
            setEditingStudent((pre) => {
              return { ...pre, tags: e.target.value };
            });
          }}
        />
        
      </Modal>
    </header>
  </div>
);
        }

export default App;