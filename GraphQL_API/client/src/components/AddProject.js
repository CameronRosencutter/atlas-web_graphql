import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getProjectsQuery, addProjectMutation } from '../queries/queries';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
  }

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

  submitForm = (e) => {
    e.preventDefault();
    this.props.addProjectMutation({
      variables: {
        title: this.state.title,
        description: this.state.description,
      },
      refetchQueries: [{ query: getProjectsQuery }],
    });
  };

  render() {
    return (
      <form id="add-project" onSubmit={this.submitForm}>
        <div className="field">
          <label>Project title:</label>
          <input type="text" onChange={(e) => this.setState({ title: e.target.value })} />
        </div>
        <div className="field">
          <label>Project description:</label>
          <input type="text" onChange={(e) => this.setState({ description: e.target.value })} />
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getProjectsQuery),
  graphql(addProjectMutation, { name: "addProjectMutation" })
)(AddProject);
