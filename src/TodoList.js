import { Button, Table, Tag, Modal, Input } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function TodoList() {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState({});
  const [currentKey, setCurrentKey] = useState(6);

  const [dataSource, setDataSource] = useState([
    {
      time: "2022-10-10",
      title: "Title 1",
      description: "Description 1",
      due_time: "10-11-2022",
      tag: "cpp,coding",
      status: "OPEN",
      key: 1,
    },
    {
      time: "2022-10-12",
      title: "Title 2",
      description: "Description 1",
      due_time: "10-12-2022",
      tag: "cpp,coding",
      status: "DONE",
      key: 2,
    },
    {
      time: "2022-10-11",
      title: "Title 3",
      description: "Description 3",
      due_time: "13-11-2022",
      tag: "cpp,coding,JAVA",
      status: "WORKING",
      key: 3,
    },
    {
      time: "2022-12-13",
      title: "Title 4",
      description: "Description 4",
      due_time: "15-12-2022",
      tag: "cpp,coding,SQL",
      status: "OVERDUE",
      key: 4,
    },
    {
      time: "2022--12-15",
      title: "Title 5",
      description: "Description 5",
      due_time: "20-12-2022",
      tag: "cpp,coding",
      status: "DONE",
      key: 5,
    },
  ]);

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "1",
      sorter: (record1, record2) => {
        return record1.time.localeCompare(record2.time);
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "2",
      sorter: (record1, record2) => {
        return record1.title.localeCompare(record2.title);
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "3",
    },
    {
      title: "Due Time",
      dataIndex: "due_time",
      key: "4",
    },
    {
      title: "Tags",
      dataIndex: "tag",
      key: "5",
      render: (tag) => {
        const tags = tag.split(",");
        return tags.map((x) => <Tag color={"orange"}>{x}</Tag>);
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Search tag here !!"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.tag.includes(value);
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "6",
      render: (stat) => {
        const color =
          stat === "OPEN"
            ? "yellow"
            : stat === "OVERDUE"
            ? "red"
            : stat === "DONE"
            ? "green"
            : "blue";
        return <Tag color={color}>{stat}</Tag>;
      },
      filters: [
        { text: "OPEN", value: "OPEN" },
        { text: "WORKING", value: "WORKING" },
        { text: "DONE", value: "DONE" },
        { text: "OVERDUE", value: "OVERDUE" },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      title: "Actions",
      key: "7",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            ></EditOutlined>
            <DeleteOutlined
              onClick={() => onDelete(record)}
              style={{ color: "red", marginLeft: 12 }}
            ></DeleteOutlined>
          </>
        );
      },
    },
  ];
  const getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
  const addNewTodo = () => {
    setCurrentKey((pre) => pre + 1);
    console.log(newTodo);
  };
  const onDelete = (record) => {
    Modal.confirm({
      title: "Sure you wish to delete it?",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.key !== record.key); //Watch out
        });
      },
    });
  };
  const onEdit = (record) => {
    setIsEditing(true);
    setEditTodo({ ...record });
  };
  const reseEdit = () => {
    setIsEditing(false);
    setEditTodo(null);
  };
  return (
    <>
      <h1>Todo List</h1>
      <Button
        onClick={() => {
          setIsAdding(true);
          setNewTodo((pre) => {
            return { ...pre, time: getCurrentDate(), key: currentKey };
          });
        }}
        type="primary"
        style={{ width: "95%" }}
      >
        Add New Todo
      </Button>{" "}
      <br /> <br />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
      ></Table>
      <Modal
        title="Edit Todo"
        open={isEditing}
        onCancel={() => {
          reseEdit();
        }}
        okText="Save"
        onOk={() => {
          setDataSource((pre) => {
            return pre.map((todo) => {
              if (todo.key === editTodo.key) return editTodo;
              return todo;
            });
          });
          reseEdit();
        }}
      >
        <Input
          value={editTodo?.title}
          onChange={(e) => {
            setEditTodo((pre) => {
              return { ...pre, title: e.target.value };
            });
          }}
          placeholder="Title"
        />
        <Input
          value={editTodo?.description}
          onChange={(e) => {
            setEditTodo((pre) => {
              return { ...pre, description: e.target.value };
            });
          }}
          placeholder="Description"
        />
        <Input
          value={editTodo?.status}
          onChange={(e) => {
            setEditTodo((pre) => {
              return { ...pre, status: e.target.value };
            });
          }}
          placeholder="Status"
        />
      </Modal>
      <Modal
        title="Add new Todo"
        open={isAdding}
        onCancel={() => {
          setIsAdding(false);
        }}
        okText="Save"
        onOk={() => {
          if (
            !(
              newTodo.title &&
              newTodo.description &&
              newTodo.status &&
              newTodo.tag
            )
          ) {
            alert("Please fill all the details");
          } else {
            addNewTodo();
            setCurrentKey((pre) => pre + 1);
            setDataSource((pre) => {
              return [...pre, newTodo];
            });
            console.log(dataSource);
            setIsAdding(false);
            setNewTodo({});
          }
        }}
      >
        <Input
          value={newTodo.title}
          onChange={(e) => {
            setNewTodo((pre) => {
              return { ...pre, title: e.target.value };
            });
          }}
          placeholder="Title"
        />
        <br />
        <br />
        <Input
          value={newTodo.description}
          onChange={(e) => {
            setNewTodo((pre) => {
              return { ...pre, description: e.target.value };
            });
          }}
          placeholder="Description"
        />
        <br />
        <br />
        <Input
          value={newTodo.due_time}
          type="date"
          onChange={(e) => {
            setNewTodo((pre) => {
              return { ...pre, due_time: e.target.value };
            });
          }}
          placeholder="Due Time"
        />
        <br /> <br />
        <Input
          value={newTodo.tag}
          onChange={(e) => {
            setNewTodo((pre) => {
              return { ...pre, tag: e.target.value };
            });
          }}
          placeholder="Enter tags seperated by ,"
        />
        <br /> <br />
        <Input
          value={newTodo.status}
          onChange={(e) => {
            setNewTodo((pre) => {
              return { ...pre, status: e.target.value };
            });
          }}
          placeholder="Status"
        />
        <br /> <br />
      </Modal>
    </>
  );
}

export default TodoList;
