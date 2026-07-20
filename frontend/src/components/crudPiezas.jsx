import React, { useEffect, useState } from 'react';
import api from '../assets/api/api';
import { Link } from 'react-router-dom';

const CrudPiezas = () => {
  const [piezas, setPiezas] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', hp: '', torque: '', agarre: '', precio: '', categoria_id: '' });
  const [searchId, setSearchId] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchPiezas = async () => {
    try {
      const data = await api.get('/piezas');
      setPiezas(data);
    } catch (error) {
      console.error('Error cargando piezas', error);
    }
  };

  useEffect(() => {
    fetchPiezas();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      fetchPiezas();
      return;
    }

    try {
      const pieza = await api.get(`/piezas/${searchId}`);
      setPiezas([pieza]);
    } catch (error) {
      alert(error.message || 'No se pudo buscar la pieza');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/piezas/${editId}`, formData);
        setEditId(null);
      } else {
        await api.post('/piezas', formData);
      }

      setFormData({ nombre: '', hp: '', torque: '', agarre: '', precio: '', categoria_id: '' });
      setSearchId('');
      fetchPiezas();
    } catch (error) {
      alert(error.message || 'Error en el servidor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Seguro que quieres eliminarlo?')) {
      await api.delete(`/piezas/${id}`);
      fetchPiezas();
    }
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setFormData({ nombre: p.nombre, hp: p.hp ?? p.HP, torque: p.torque ?? p.Torque, agarre: p.agarre ?? p.Agarre, precio: p.precio ?? p.Precio, categoria_id: p.categoria_id ?? p.categoriaId });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/home">volver</Link>
      <Link to="/shop">Shop</Link>
      <h2>CRUD de Piezas (MySQL)</h2>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={fetchPiezas}>Mostrar todos</button>
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
          placeholder="Categoría ID"
          value={formData.categoria_id}
          onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({ nombre: '', hp: '', torque: '', agarre: '', precio: '', categoria_id: '' });
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {piezas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.hp ?? p.HP}</td>
              <td>{p.torque ?? p.Torque}</td>
              <td>{p.agarre ?? p.Agarre}</td>
              <td>{p.precio ?? p.Precio}</td>
              <td>
                <button onClick={() => startEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudPiezas;
