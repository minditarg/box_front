import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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
        <Select
          value={props.value}
          onChange={props.changed}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
         {props.elementConfig.options.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.displayValue}</MenuItem>
                       
                    ))}
         
         
        </Select>
            
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
