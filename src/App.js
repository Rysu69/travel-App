import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
  { id: 1, description: "Ahmad", quantity: 1, packed: false },
  { id: 2, description: "Zaky", quantity: 2, packed: false },
  { id: 3, description: "Akram", quantity: 3, packed: false },
  { id: 4, description: "Bintang", quantity: 4, packed: false },
  { id: 5, description: "Desta", quantity: 5, packed: false },
  { id: 6, description: "Syahla", quantity: 6, packed: false },
  { id: 7, description: "Fairuz", quantity: 7, packed: false },
  { id: 8, description: "Faiz", quantity: 8, packed: false },
  { id: 9, description: "Ferdinan", quantity: 9, packed: false },
  { id: 10, description: "Joan", quantity: 10, packed: false },
  { id: 11, description: "Khairul", quantity: 11, packed: false },
  { id: 12, description: "Hesti", quantity: 12, packed: false },
  { id: 13, description: "Alwi", quantity: 13, packed: false },
  { id: 14, description: "Fahmi", quantity: 14, packed: false },
  { id: 15, description: "Daus", quantity: 15, packed: false },
  { id: 16, description: "Firly", quantity: 16, packed: false },
  { id: 17, description: "Gathan", quantity: 17, packed: false },
  { id: 18, description: "Haris", quantity: 18, packed: false },
  { id: 19, description: "Marco", quantity: 19, packed: false },
  { id: 20, description: "Naufal", quantity: 20, packed: false },
  { id: 21, description: "Rafi", quantity: 21, packed: false },
  { id: 22, description: "Adan", quantity: 22, packed: false },
  { id: 23, description: "Rasyid", quantity: 23, packed: false },
  { id: 24, description: "Zidan", quantity: 24, packed: false },
  { id: 25, description: "Nabil", quantity: 25, packed: false },
  { id: 26, description: "Niko", quantity: 26, packed: false },
  { id: 27, description: "Glenn", quantity: 27, packed: false },
  { id: 28, description: "Rendi", quantity: 28, packed: false },
  { id: 29, description: "Rizal", quantity: 29, packed: false },
  { id: 30, description: "Sandeki", quantity: 30, packed: false },
  { id: 31, description: "Vincent", quantity: 31, packed: false },
  { id: 32, description: "Valentino", quantity: 32, packed: false },

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
                {Array.from({ length: 40}, (_, i) => i + 1).map((num) => (
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