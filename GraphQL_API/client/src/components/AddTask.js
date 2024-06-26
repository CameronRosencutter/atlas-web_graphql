import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getProjectsQuery, addTaskMutation } from '../queries/queries';

function AddTask(props) {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');

  const displayProjects = () => {
    const data = props.getProjectsQuery;
    if (data.loading) {
      return <option>Loading projects...</option>;
    } else {
      return data.projects.map(project => (
        <option key={project.id} value={project.id}>
          {project.title}
        </option>
      ));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addTaskMutation({
      variables: {
        title: title,
        projectId: projectId
      },
      refetchQueries: [{ query: getProjectsQuery }]
    });
  };

  return (
    <form id="add-task" onSubmit={submitForm}>
      <div className="field">
        <label>Task title:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="field">
        <label>Project:</label>
        <select onChange={(e) => setProjectId(e.target.value)}>
          <option>Select project</option>
          {displayProjects()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addTaskMutation, { name: "addTaskMutation" })
)(AddTask);
