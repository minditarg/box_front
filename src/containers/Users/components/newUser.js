import React from 'react';
import Input from '../../../components/Input/Input';




const newUser = ( props ) =>
{
return (

  <form onSubmit={this.handleSubmit}>



      <div className="row justify-content-center">
          <div className="col-md-4 mt-5">

              <div className="card" >
                  { /* <img src="..." class="card-img-top" alt="..."> */}
                  <div className="card-body" style={{ marginLeft:25,marginRight:25 }}>
                      <h5 className="card-title">Inicio de sesión</h5>
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
                      changed={(event) => this.inputChangedHandler(event, formElement.id)} />
              ))}
              </div>

                      <button className="btn btn-primary" disabled={!this.state.formIsValid} type="submit" >Enviar </button>

                  </div>
              </div>



          </div>
      </div>



  </ form>


)};

export default newUser;
