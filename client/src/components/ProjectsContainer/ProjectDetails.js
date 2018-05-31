import React, { Component } from 'react';
import { getProject } from '../actions/projectsAction';
import { connect } from 'react-redux';
import { isEmpty } from '../utils/isEmpty';
import Spinner from '../Spinner/Spinner';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './ProjectDetails.scss';
class ProjectDetails extends Component {
  state = {
    project: {}
  };
  componentDidMount() {
    //execute the getProject action
    this.props.getProject(this.props.match.params.id);
  }
  //after the components received new props Project we need to set it to the state
  static getDerivedStateFromProps(nextProps) {
    //check if that props exist
    if (nextProps.project) {
      return {
        project: nextProps.project
      };
    }
  }
  showPriority = priority => {
    //check the priority of the project

    if (priority < 3) {
      return <span className="high-priority">HIGH</span>;
    } else if (priority < 5) {
      return <span className="medium-priority">Medium</span>;
    } else {
      return <span className="low-priority">Low</span>;
    }
  };
  showProjectDetail = project => {
    let result = null;
    if (Object.keys(project).length === 0 || project.loading) {
      result = <Spinner />;
    } else {
      if (project.project) {
        const proj = project.project.project;
        //if project exist then I will print it out

        if (proj) {
          result = (
            <div className="project-details-container">
              <div className="project-detail">
                <div className="project-title">
                  <h1>
                    {proj.title}
                    <span className="project__number">
                      (Project Number:{proj.number})
                    </span>
                  </h1>
                  <span>Category:{proj.categoryname}</span>
                  <p>Priority:{this.showPriority(proj.priority)}</p>
                </div>
                <div className="project-content-wrapped">
                  <div className="project-content">
                    <div className="project-infos">Company Name</div>
                    <div className="project-value">{proj.companyname}</div>
                  </div>
                  <div className="project-content">
                    <div className="project-infos">Start Date</div>
                    <div className="project-value">
                      {proj.startdate ? proj.startdate : 'To be considered'}
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-infos">Due Date</div>
                    <div className="project-value">
                      {proj.duedate ? proj.duedate : 'To be considered'}
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-infos">Description</div>
                    <div className="project-value">
                      {proj.description ? proj.description : 'None'}
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-infos">Quote Total</div>
                    <div className="project-value">{proj.quotetotal}</div>
                  </div>
                  <div className="project-content">
                    <div className="project-infos">Paid</div>
                    <div className="project-paid">
                      {proj.paid ? 'Paid' : 'None'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    return result;
  };
  render() {
    const { project } = this.state;
    return (
      <div className="wrapped-project-details">
        <div className="header-product-details">
          <div className="product-details-heading">
            <Link to="/">Homepage/</Link>
            <h1>Projects Details</h1>
          </div>
        </div>
        {this.showProjectDetail(project)}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    project: state.project
  };
};
export default connect(mapStateToProps, { getProject })(ProjectDetails);
