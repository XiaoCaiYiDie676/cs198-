import { useState } from 'react';

export default function AddItemForm({ onAddItem, categories }) {
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAddItem({
        name: itemName,
        category: selectedCategory,
        dueDate: dueDate || undefined
      });
      setItemName('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Add new item..."
        required
      />
      
      <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due date (optional)"
      />
      
      <button type="submit">➕ Add</button>
    </form>
  );
}