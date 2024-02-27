import React, { useState } from "react";
import dataSiswa from './dataSiswa.js';

export default function App() {
  const [items, setItems] = useState(dataSiswa);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function onDeleteItem(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId));
  }

  function handleUpdateItem(id, category) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [category]: !item[category] } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={onDeleteItem} onUpdateItem={handleUpdateItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>ABSEN KELAS</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now(), A: false, B: false, C: false, D: false };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Absen Murid</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Nama Murid"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Tambah</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onUpdateItem }) {
  const sortedItems = items.slice().sort((a, b) => a.quantity - b.quantity);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  const [checked, setChecked] = useState({});

  const handleCheckboxChange = (index, category) => {
    const newChecked = { ...checked };
    Object.keys(newChecked).forEach((key) => {
      newChecked[key] = false;
    });
    newChecked[index] = true;
    setChecked(newChecked);
    onUpdateItem(item.id, category);
  };

  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {['A', 'B', 'C', 'D'].map((category, index) => (
        <input
          key={index}
          type="checkbox"
          checked={checked[index] || false}
          onChange={() => handleCheckboxChange(index, category)}
        />
      ))}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const stats = { A: 0, B: 0, C: 0, D: 0 };

  items.forEach((item) => {
    ['A', 'B', 'C', 'D'].forEach((category) => {
      if (item[category]) {
        stats[category]++;
      }
    });
  });

  return (
    <footer className="stats">
      <em>
        Checklist Murid (Masuk = {stats.A},Sakit = {stats.B},Ijin = {stats.C},Alpha = {stats.D})
      </em>
    </footer>
  );
}
