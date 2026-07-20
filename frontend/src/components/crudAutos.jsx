import React, { useEffect, useState } from 'react';
import api from '../assets/api/api';
import { Link } from 'react-router-dom';

const CrudAutos = () => {
  const [autos, setAutos] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', hp: '', torque: '', agarre: '', precio: '', rareza_id: '' });
  const [searchId, setSearchId] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchAutos = async () => {
    try {
      const data = await api.get('/autos');
      setAutos(data);
    } catch (error) {
      console.error('Error cargando autos', error);
    }
  };

  useEffect(() => {
    fetchAutos();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      fetchAutos();
      return;
    }

    try {
      const auto = await api.get(`/autos/${searchId}`);
      setAutos([auto]);
    } catch (error) {
      alert(error.message || 'No se pudo buscar el auto');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/autos/${editId}`, formData);
        setEditId(null);
      } else {
        await api.post('/autos', formData);
      }

      setFormData({ nombre: '', hp: '', torque: '', agarre: '', precio: '', rareza_id: '' });
      setSearchId('');
      fetchAutos();
    } catch (error) {
      alert(error.message || 'Error en el servidor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Seguro que quieres eliminarlo?')) {
      await api.delete(`/autos/${id}`);
      fetchAutos();
    }
  };

  const startEdit = (a) => {
    setEditId(a.id);
    setFormData({ nombre: a.nombre, hp: a.hp ?? a.HP, torque: a.torque ?? a.Torque, agarre: a.agarre ?? a.Agarre, precio: a.precio ?? a.Precio, rareza_id: a.rareza_id ?? a.rarezaId ?? a.rareza });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/home">volver</Link>
      <Link to="/shop">Shop</Link>
      <h2>CRUD de Autos (MySQL)</h2>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={fetchAutos}>Mostrar todos</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          placeholder="HP"
          value={formData.hp}
          onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
        />
        <input
          placeholder="Torque"
          value={formData.torque}
          onChange={(e) => setFormData({ ...formData, torque: e.target.value })}
        />
        <input
          placeholder="Agarre"
          value={formData.agarre}
          onChange={(e) => setFormData({ ...formData, agarre: e.target.value })}
        />
        <input
          placeholder="Precio"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
        />
        <input
          placeholder="Rareza ID"
          value={formData.rareza_id}
          onChange={(e) => setFormData({ ...formData, rareza_id: e.target.value })}
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({ nombre: '', hp: '', torque: '', agarre: '', precio: '', rareza_id: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>HP</th>
            <th>Torque</th>
            <th>Agarre</th>
            <th>Precio</th>
            <th>Rareza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.hp ?? a.HP}</td>
              <td>{a.torque ?? a.Torque}</td>
              <td>{a.agarre ?? a.Agarre}</td>
              <td>{a.precio ?? a.Precio}</td>
              <td>{a.rareza_id ?? a.rareza}</td>
              <td>
                <button onClick={() => startEdit(a)}>Editar</button>
                <button onClick={() => handleDelete(a.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudAutos;
