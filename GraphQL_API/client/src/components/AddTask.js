// client/src/components/AddTask.js

import React from 'react';
import { graphql } from 'react-apollo';
import { getProjectsQuery } from '../queries/queries';

function AddTask(props) {
  function displayProjects() {
    var data = props.data;

    if (data.loading) {
      return <option>Loading projects...</option>;
    } else {
      return data.projects.map(project => (
        <option key={project.id} value={project.id}>
          {project.title}
        </option>
      ));
    }
  }

  return (
    <form id="add-task">
      <div className="field">
        <label>Task:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Project:</label>
        <select>
          {displayProjects()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default graphql(getProjectsQuery)(AddTask);
