import { useState } from 'react';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import CategoryFilter from './components/CategoryFilter';
import ShoppingStats from './components/ShoppingStats';
import './styles/App.css';

export default function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Milk', category: 'grocery', completed: false, dueDate: '2023-11-15' },
    { id: 2, name: 'Notebook', category: 'school', completed: true, dueDate: '2023-11-10' },
    { id: 3, name: 'Batteries', category: 'household', completed: false, dueDate: '2023-11-20' }
  ]);

  const categories = ['grocery', 'school', 'household', 'personal'];
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  // ... existing functions (addItem, toggleItem, deleteItem) ...

  return (
    <div className="app-container">
      <h1>🛒 Smart Shopping List</h1>
      <ShoppingStats items={items} />
      <CategoryFilter 
        categories={categories} 
        onFilterChange={setFilter} 
      />
      <AddItemForm 
        onAddItem={addItem} 
        categories={categories} 
      />
      <ShoppingList 
        items={filteredItems} 
        onToggleItem={toggleItem}
        onDeleteItem={deleteItem}
      />
    </div>
  );
}