import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from "axios";

const options = {
    filterType: 'checkbox',
  };

  const columns = [{name:"id", label:"id"},{name:"codigo", label:"Codigo"}, {name:"descripcion", label:"Descripcion"}];

class Stock extends Component {

    state = {
        materiales: [] 
    };

    getMateriales = () => {
        axios.get('/list-materiales')
          .then(res => {
            if (res.data.success == 1) {
              let resultado = [...res.data.result];
              this.setState({
                materiales: resultado
              })
            }
          })
      }
    
      componentDidMount() {

          axios.get('/me')
            .then(res => {
              if (res.data.success != 1) 
                this.props.history.replace('/');
              else 
                this.getMateriales();
            })
         
      }


    render(){
        console.log(this.state.materiales);
    return (     
    <MUIDataTable
        title={"Listado de Materiales"}
        data={this.state.materiales}
        columns={columns}
        options={options}
    />)
    }
};

// {"id":1,"codigo":"ven","descripcion":"ventana"},{"id":2,"codigo":"pue","descripcion":"puerta"}

export default Stock;
