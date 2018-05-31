import React, { Component } from 'react';
import axios from 'axios';
import './Layout.scss';
import { connect } from 'react-redux';
import { getProjects, searchProjects } from '../actions/projectsAction';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import ProjectItem from './ProjectItem';
import searchLogo from '../../assets/img/search.svg';
import { isEmpty } from '../utils/isEmpty';
import classnames from 'classnames';
class Projects extends Component {
  state = {
    search: ''
  };
  componentDidMount() {
    this.props.getProjects();
  }
  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.searchProjects(e.target.value);
  };

  searchProjects = (loading, searchProjects, searchQuery) => {
    let result = null;
    if (searchQuery) {
      //check the search query from user if it exists then the loading spinner will be appeared
      if (loading) {
        result = <Spinner />;
      } else {
        if (!isEmpty(searchProjects)) {
          //check if the props searchProjects 's length is having results or not
          result = searchProjects.map((project, key) => {
            {
              /*pass the project to ProjectItme component so it much easier to maintain and add more features later on and the code look nicer*/
            }
            return <ProjectItem project={project} key={key} />;
          });
        } else {
          return (result = <div>No result founded</div>);
        }
      }
    }

    return result;
  };
  render() {
    const { projects, loading, searchProjects } = this.props.project;
    let projectContent;
    //if projects is not received or the loading is true as we already set it to true when we send the request to the api from action, then if the request succeed, the loading will be set to false
    if (projects === null || loading) {
      projectContent = <Spinner />;
    } else {
      if (projects.count) {
        projectContent = projects.projects.map((project, key) => {
          return <ProjectItem project={project} key={key} />;
        });
      }
    }
    return (
      <div className="wrapped-container">
        <div className="container-projects">
          <div className="heading_title">
            <h1>Project Lists</h1>
          </div>
          <div className="wrapped__search">
            <div className="search__bar">
              <input
                type="text"
                placeholder="Search"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
              />
              <button className="btn btn-search">
                <img src={searchLogo} />
              </button>
            </div>
          </div>
          <section className="projects-section">
            <div className="project-items">
              {!this.state.search ? projectContent : null}
            </div>
            {/*Display full list os projects if  this.state.search is null otherwise will display list of searched Items*/}
            <div className="project-items">
              {this.searchProjects(loading, searchProjects, this.state.search)}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
Projects.propTypes = {
  projects: PropTypes.object
};
const mapStateToProps = state => {
  return {
    project: state.project
  };
};
export default connect(mapStateToProps, { getProjects, searchProjects })(
  Projects
);
