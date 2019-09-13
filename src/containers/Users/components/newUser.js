import React from 'react';
import Input from '../../../components/Input/Input';




const newUser = ( props ) =>
{
    const formElementsArray = [];
        for (let key in props.orderForm) {
            formElementsArray.push({
                id: key,
                config: props.orderForm[key]
            });
        }
return (

  <form >



      <div className="row justify-content-center">
          <div className="col-md-4 mt-5">

              <div className="card" >
                  { /* <img src="..." class="card-img-top" alt="..."> */}
                  <div className="card-body" style={{ marginLeft:25,marginRight:25 }}>
                      <h5 className="card-title">Nuevo Usuario</h5>
                      <div className="mt-3 mb-3">
                      {formElementsArray.map(formElement => (
                  <Input
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      textValid={formElement.config.textValid}
                      invalid={!formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      changed={(event) => props.inputChangedHandler(event, formElement.id)}
                       />
              ))}
              </div>

                      <button className="btn btn-primary" disabled={!props.formIsValid} type="submit" >Enviar </button>

                  </div>
              </div>



          </div>
      </div>



  </ form>


)};

export default newUser;
