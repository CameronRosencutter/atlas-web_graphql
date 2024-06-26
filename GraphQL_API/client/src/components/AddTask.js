import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getProjectsQuery } from '../queries/queries';

class AddTask extends Component {
  displayProjects() {
    const { data } = this.props;

    if (data.loading) {
      return <option>Loading projects...</option>;
    } else {
      return data.projects.map(project => {
        return (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        );
      });
    }
  }

  render() {
    return (
      <form id="add-task">
        <div className="field">
          <label>Task title:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Task weight:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Task description:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Project:</label>
          <select>
            {this.displayProjects()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default graphql(getProjectsQuery)(AddTask);
