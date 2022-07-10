import "antd/dist/antd.css";
import "./App.css";
import React from 'react';
import { Button, Table, Modal, Input, Space, Badge, DatePicker } from "antd";
import Highlighter from 'react-highlight-words';
import { useRef, useState } from 'react';
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";

let randomNumber=0;
function App() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  // const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const state={
    curDT : new Date().toLocaleString(),
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  

  const onAddStudent = (record) => {
    randomNumber = randomNumber+1;
    const newStudent = {
       id: randomNumber,
       name: "",
       email: "",
       address: "",
      created: state.curDT,
      tags: "tags",
      duedate:"",
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
     //onEditStudent(record);
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
   {
     key: "2",
     title: "Name",
     dataIndex: "name",
     ...getColumnSearchProps('name'),
     sorter: (a, b) => a.name.length - b.name.length,
     sortDirections: ['descend', 'ascend'],
   },
   {
     key: "3",
     title: "Email",
     dataIndex: "email",
   },
   {
     key: "4",
     title: "Address",
     dataIndex: "address",
   },
   {
     title: 'Status',
     key: 'state',
     render: () => (
       <span>
         <Badge status="success" />
         opened
       </span>
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
          <h5>Email:</h5>
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
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
        </Modal>
      </header>
    </div>
  );
}

export default App;
