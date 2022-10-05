import React from "react";
// import '../src/styles.css';
import Card from "./Card";
class TaskList extends React.Component {
  state = {
    tasks: [],
    isCardOpen: false,
    isInProgress: false,
    isInWaiting: false,
    isCompleted: false,
    numRows: "",
  };

  componentDidMount() {
    const { tasks } = this.props;
    this.setState({
      tasks,
    });
  }
  onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };
  onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let tasks = this.state.tasks;
    console.log("data", data, status);
    let updated = tasks.map((task) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    this.setState({ tasks: updated });
  };

  render() {
    const { tasks } = this.state;
    console.log("tasks", tasks);
    let pending = tasks.filter((data) => data.status === "In Progress");
    let done = tasks.filter((data) => data.status === "Completed");
    let newOrder = tasks.filter((data) => data.status === "New Order");
    let waiting = tasks.filter((data) => data.status === "Delivered");
    const membersToRender = this.state.tasks.filter((tasks) => tasks.display);
    const numRows = membersToRender.length;

    return (
      <div className="container">
        <div
          className="order small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, false, "New Order")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4 className="new-bg">New Orders</h4>
                  <p className="dots-bg">...</p>
                  <p className="plus_icon">+</p>
                  {newOrder.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="card_right">
                        <div className="days">{task.description}</div>
                        {/* <div className="days">{task.time}</div>
                        <div className="time">{task.days}</div> */}
                      </div>
                    </div>
                  ))}
                  {this.state.isCardOpen ? <Card /> : null}
                  <div className="new_row">
                    <button
                      className="row-style"
                      onClick={() => {
                        this.setState({ isCardOpen: true });
                      }}
                    >
                      {" "}
                      + New{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="pending small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, false, "In Progress")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4 className="progress-bar">In Progress</h4>
                  <p className="dots-bg">...</p>
                  <p className="plus_icon">+</p>
                  {pending.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="img">
                        {/* <img src={task.image} alt="box" /> */}
                      </div>
                      <div className="card_right">
                        <div className="days">{task.description}</div>
                        {/* <div className="days">{task.time}</div>
                        <div className="time">{task.days}</div> */}
                      </div>
                    </div>
                  ))}
                  {this.state.isInProgress ? <Card /> : null}
                  <div className="inprogressbtn">
                    <button
                      className="in-progress"
                      onClick={() => {
                        this.setState({ isInProgress: true });
                      }}
                    >
                      + New
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="waiting small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, true, "Delivered")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4 className="waiting-bg">Waiting for buyer</h4>
                  <p className="dots-bg1">...</p>
                  <p className="plus_icon1">+</p>
                  {waiting.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="img">
                        {/* <img src={task.image} alt="box" /> */}
                      </div>
                      <div className="card_right">
                        <div className="days">{task.description}</div>
                        {/* <div className="days">{task.time}</div>
                        <div className="time">{task.days}</div> */}
                      </div>
                    </div>
                  ))}
                  {this.state.isInWaiting ? <Card /> : null}
                  <div className="inprogressbtn">
                    <button
                      className="in-progress"
                      onClick={() => {
                        this.setState({ isInWaiting: true });
                      }}
                    >
                      + New
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="done small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, true, "Completed")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4 className="completed-bg">Completed</h4>
                  <p className="dots-bg">...</p>
                  <p className="plus_icon">+</p>
                  {done.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="img">
                        {/* <img src={task.image} alt="box" /> */}
                      </div>
                      <div className="card_right">
                        <div className="days">{task.description}</div>
                        {/* <div className="days">{task.time}</div>
                        <div className="time">{task.days}</div> */}
                      </div>
                    </div>
                  ))}
                  {this.state.isCompleted ? <Card /> : null}
                  <div>
                    <button
                      onClick={() => this.setState({ isCompleted: true })}
                    >
                      + New
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default TaskList;
