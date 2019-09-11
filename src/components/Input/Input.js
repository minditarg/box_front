import React from 'react';
import TextField from '@material-ui/core/TextField';


const input = ( props ) => {
    let inputElement = null;
    let textValidation = null
    console.log(props);
    if (props.invalid && props.shouldValidate && props.touched) {
      textValidation =  props.textValid 

      

    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <TextField

                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea

                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select

                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
            <br /><span style={{ fontSize:'80%',color:'red' }}>{textValidation}</span>
        </div>
    );

};

export default input;
