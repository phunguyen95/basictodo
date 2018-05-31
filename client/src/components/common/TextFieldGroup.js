import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
function TextFieldGroup({name,placeholder,value,label,error,info,type,onChange,disabled}) {
    return (
        <div className="form-group">
        {/* we received the props sent from Login or Register then if there is any errors, the classname will be appended is-invalid to change the color and display error */}
        <input
          type={type}
          className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })} 
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {/*if info exist*/}
        {info&&<small className="form-text text-muted">{info}</small>}
        {/*if error exists then print it out */}
        {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
TextFieldGroup.propTypes={
  name:PropTypes.string.isRequired,
  placeholder:PropTypes.string,
  value:PropTypes.string.isRequired,
  info:PropTypes.string,
  error:PropTypes.string,
  onChange:PropTypes.func.isRequired,
  type:PropTypes.string.isRequired,
  disabled:PropTypes.string,
}
TextFieldGroup.defaultProps={
  type:'text'
}
export default TextFieldGroup;
