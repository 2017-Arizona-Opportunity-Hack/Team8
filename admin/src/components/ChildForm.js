import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as childAction from '../actions/child';

class ChildForm extends Component {

  render() {
    return (
      <div className="container">
        <br />
        <div className="alert alert-secondary" role="alert">
          <b>Child Information</b>
        </div>
        <form className="form-horizontal">
          <fieldset>
            <div className="form-group">
              <label htmlFor="lname" className="col-lg-2 control-label">Last Name:</label>
              <div className="col-lg-10">
                <Field name="lname" component="input" type="text" className="form-control" placeholder="Enter the last name" autoComplete="off" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="fname" className="col-lg-2 control-label">First Name:</label>
              <div className="col-lg-10">
                <Field name="fname" component="input" type="text" className="form-control" placeholder="Enter the first name" autoComplete="off" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button type="submit" className="btn btn-outline-info">Submit</button> &nbsp;
                <Link to="/" className="btn btn-outline-info">Cancel</Link>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state, props) {
  return {
    children: state.children,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    childAction: bindActionCreators(childAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'client' })(ChildForm));
