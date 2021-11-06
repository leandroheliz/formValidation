import React, {useState} from "react";
import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeError, MensajeExito } from "./elements/formularios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from './components/Input';
const App = () => {
  const [nombre, cambiarNombre] = useState({campo: '', valido: null});
  const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
  const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
  const [correo, cambiarCorreo] = useState({campo: '', valido: null});
  const [password, cambiarPassword] = useState({campo: '', valido: null});
  const [password2, cambiarPassword2] = useState({campo: '', valido: null});
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, 
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    password: /^.{4,12}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

const validarPassword2 = () => {
  if(password.campo.length > 0){
    if(password.campo !== password2.campo){
cambiarPassword2((prevState)=>{
  return {...prevState, valido: 'false'}
});
    }else{
      cambiarPassword2((prevState)=>{
        return {...prevState, valido: 'true'}
      });
    }
  }
}

const onChangeTerminos = (e) =>{
  cambiarTerminos(e.target.checked);
}

const onSubmit = (e) =>{
  e.preventDefault();
  if(usuario.valido === 'true' &&
   nombre.valido === 'true' &&
   password.valido === 'true' &&
   password2.valido === 'true' &&
   correo.valido === 'true' && 
   telefono.valido === 'true' &&
   terminos
   
   ){
cambiarFormularioValido(true);
cambiarUsuario({campo: '', valido: null});
cambiarNombre({campo: '', valido: null});
cambiarCorreo({campo: '', valido: null});
cambiarTelefono({campo: '', valido: null});
cambiarPassword({campo: '', valido: null});
cambiarPassword2({campo: '', valido: null});
  }else{
    cambiarFormularioValido(false);
  }
}

  return(
    <main>
      <Formulario action="" onSubmit={onSubmit}>
<Input
estado={nombre}
cambiarEstado={cambiarNombre}
tipo="text"
label= "Nombre y Apellido"
placeholder="nombre y apellido"
name="nombre"
leyendaError=""
expresionRegular={expresiones.nombre}
/>
<Input
estado={correo}
cambiarEstado={cambiarCorreo}
tipo="email"
label= "Email"
placeholder="email @"
name="email"
leyendaError="El correo debe ser valido."
expresionRegular={expresiones.correo}
/>
<Input
estado={telefono}
cambiarEstado={cambiarTelefono}
tipo="text"
label="Teléfono"
placeholder="+549"
name="telefono"
leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
expresionRegular={expresiones.telefono}
/>
<Input
estado={usuario}
cambiarEstado={cambiarUsuario}
tipo="text"
label= "Usuario"
placeholder="Ingrese su usuario"
name="usuario"
leyendaError="Usuario incorrecto."
expresionRegular={expresiones.usuario}
/>
<Input
estado={password}
cambiarEstado={cambiarPassword}
tipo="password"
label="Contraseña"
name="password1"
leyendaError="La contraseña debe ser de 4 a 12 dígitos."
expresionRegular={expresiones.password}
/>
<Input
estado={password2}
cambiarEstado={cambiarPassword2}
tipo="password"
label="Repetir Contraseña"
name="password2"
leyendaError="Ambas contraseñas deben ser iguales."
funcion={validarPassword2}
/>



<ContenedorTerminos>
  <Label>
    <input 
    type="checkbox" 
    name="terminos" 
    id="terminos" 
    checked={terminos}
    onChange={onChangeTerminos}/>
   <b>Acepto</b> los Terminos y Condiciones.
  </Label>
</ContenedorTerminos>
{formularioValido === false && <MensajeError>
  <p>
    <FontAwesomeIcon icon={faExclamationTriangle}/>
    <b>Error:</b> Por favor, Complete el formulario correctamente.
  </p>
</MensajeError>}
<ContenedorBotonCentrado>
  <Boton type="submit">Registrarme</Boton>
 {formularioValido === true && <MensajeExito>Registro Exitoso.</MensajeExito>}
</ContenedorBotonCentrado>
        </Formulario>
    </main>
  );
}


export default App;