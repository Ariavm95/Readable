import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const validate = values => {

    const errors = {};

    if (!values.title) {
        errors.title = 'Post title'
    }

    if (!values.body) {
        errors.body = 'At least some text'
    }

    return errors
}


const renderInputField = ({
  input,
  label,
  placeholder,
  type,
  className,
  meta: { touched, error }
}) =>
  <div>
    <label>{ label }</label>
    <div>
      <input { ...input } placeholder={ placeholder } type={ type } className={ className }/>
      { touched && error &&
        <div className="error">{`*${error} is required!`} </div> }
    </div>
  </div>

  const renderTextareaField = ({
    input,
    label,
    placeholder,
    type,
    className,
    meta: { touched, error }
  }) =>
    <div>
      <label>{ label }</label>
      <div>
        <textarea { ...input } placeholder={ placeholder } type={ type } className={ className }/>
        { touched && error &&
          <div className="error">{`*${error} is required!`} </div> }
      </div>
    </div>

class EditPostContent extends Component {

  render() {

    const { initialValues, handleSubmit } = this.props
    
    return (
      <form onSubmit={handleSubmit} className="post-form">
        <Field
          name="title"
          value="box"
          component={renderInputField}
          type="text"
          placeholder="Post title"
          className="post-form-title"
          label="Title"
          
        />
        <Field
          name="body"
          type="text"
          placeholder="Your comment"
          className="post-form-body"
          component={renderTextareaField}
          label="Body"
        />
        <div>
          <button type="submit" className="post-form-button">Submit</button>
        </div>
      </form>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

EditPostContent = connect(
  mapStateToProps
)(EditPostContent)

export default reduxForm({
  form: 'postForm',
  validate
})(EditPostContent)
