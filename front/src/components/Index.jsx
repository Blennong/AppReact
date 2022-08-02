import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPostsApiCall, deletePostApiCall } from '../store/slices/thunks'
import { api } from "../api/api";
import Create from './Create';

const Index = () => {
  let history = useNavigate()

  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])

  const getPostsCallback = async () => {
    api.get('/post/').then((res) => {
      console.log(res.data)
      setPosts(res.data)
    })
  }

  useEffect(() => {
    getPostsCallback()
  }, [])

  return (
    <>
      <div>
        <h1>
          Lista de Posts
        </h1>
        <table>
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Descripción
              </th>
              <th>
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map((item) => {
                return (
                  <tr key={ item.id }>
                    <td>
                      { item.nombre }
                    </td>
                    <td>
                      { item.descripcion }
                    </td>
                    <td>
                      <button>
                        Borrar
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <hr />
        <Create/>
      </div>
    </>
  )
}

export default Index;
