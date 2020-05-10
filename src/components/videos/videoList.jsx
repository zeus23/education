import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { Link } from "react-router-dom";
import ClassSummary from "./classSummary";
import "./notes.style.css";

class VideoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classList: [],
    };
  }
  render() {
    const { x } = this.props;
    var i = [];
    x &&
      x.map((classItem) => {
        i.push(classItem);
      });
    return (
      <div
        className="notes-list-section"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <a
          href="/createNote"
          target="_blank"
          class="btn-floating btn-large waves-effect waves-light black"
          style={{ margin: "1rem" }}
        >
          <i class="material-icons">add</i>
        </a>
        <div className="notes-container">
          {i && i.map((item) => <ClassSummary item={item} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    x: state.firestore.ordered.classes,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "classes" }])
)(VideoList);
