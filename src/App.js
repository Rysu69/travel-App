import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
  ]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function onDeleteItem(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId));
  }

  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} 
      onDeleteItem={onDeleteItem} 
      onUpdateItem={handleUpdateItem}
      />
       <Stats items={items} />
    </div>
  );
}

function Logo() {
    return <h1> ABSEN KELAS</h1>;
}

function Form({ onAddItems }) { 

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
    

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
}

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Absen Murid</h3>
            <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20}, (_, i) => i + 1).map((num) => (
                    <option value={num}>{num}</option>
                ))}
            </select>
            <input type="text" 
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
          <Item 
            item={item} 
            key={item.id} 
            onDeleteItem={onDeleteItem} 
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  const [checked, setChecked] = useState({});

  return (
    <li>

      {/* ternary operator to check simple condition */}
      {/* if item.packed === true then apply this style textDecoration: "line-through" 
      else don't do anything */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {Array.from({ length: 4 }, (_, i) => (
        <input
          key={i}
          type="checkbox"
          checked={checked[i] || false}
          onChange={() => {
            const newChecked = { ...checked };
            Object.keys(newChecked).forEach((key) => {
              newChecked[key] = false;
            });
            newChecked[i] = true;
            setChecked(newChecked);
          }}
        />
      ))}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // jika tidak ada item pada array
  if (!items.length)
    return (
      <p className="stats">
        <em>Mulai Daftarkan Murid Anda 😎</em>
      </p>
    );

  return (
    <footer className="stats">
      <em>
       Checklist Murid (Masuk,Sakit,Ijin,Alpha)
      </em>
    </footer>
  );
}