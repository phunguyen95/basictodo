import React from 'react';
import { Link } from 'react-router-dom';
function ProjectItem({ project }) {
  return (
    <div className="project-item">
      <div className="item-heading">
        <div className="project-id">
          <span> ID:{project.id ? project.id : 'None'}</span>
        </div>
        <div className="project-name">
          <span>Name:{project.title ? project.title : 'None'}</span>
        </div>
      </div>
      <div className="project-body">
        <div className="project-title">
          <h4>Company ID:{project.companyid ? project.companyid : 'None'}</h4>
        </div>
        <div className="project-number">
          <span>
            Company Name:{project.companyname ? project.companyname : 'TBC'}
          </span>
        </div>
        <div className="project-number">
          <span>
            Start Date:{project.startdate ? project.startdate : 'TBC'}
          </span>
        </div>
        <div className="project-number">
          <span>Due Date: {project.duedate ? project.duedate : 'TBC'}</span>
        </div>
        <div className="view-more">
          <Link to={`/project/${project.id}`}>
            <button className="btn-view-more">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
