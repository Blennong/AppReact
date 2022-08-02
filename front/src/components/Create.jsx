import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../store/slices/postSlice'
import { api } from "../api/api";

function Create() {
  const dispatch = useDispatch()
  let history = useNavigate()

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addPerson = async (e) => {
    e.preventDefault();
    let n = name;
    let d = description;
    api.post('/post/', { nombre: n, descripcion: d })
    history('/')
    window.location.reload(false)
  }

  return (
    <>
      <h1>
        Crear nuevo Post
      </h1>
      <form onSubmit="addPerson()">
        <div>
          <label htmlFor="name">
            Nombre
          </label>
          <input type="text" name="name" onChange={ e => setName(e.target.value) } required />
        </div>
        <div>
          <label htmlFor="description">
            Descripcion
          </label>
          <input type="text" name="description" onChange={ e => setDescription(e.target.value) } required />
        </div>
        <div>
          <button type="submit" onClick={ (e) => addPerson(e) }>
            Ingresar
          </button>
        </div>
      </form>
    </>
  )
}

export default Create;
