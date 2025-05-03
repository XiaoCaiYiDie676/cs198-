import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function ShoppingStats({ items }) {
  // Data processing for charts
  const categoryData = items.reduce((acc, item) => {
    const found = acc.find(c => c.name === item.category);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: item.category, value: 1 });
    }
    return acc;
  }, []);

  const completionData = [
    { name: 'Completed', value: items.filter(i => i.completed).length },
    { name: 'Pending', value: items.filter(i => !i.completed).length }
  ];

  const timelineData = items
    .filter(i => i.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .map(item => ({
      name: item.name,
      date: new Date(item.dueDate).toLocaleDateString(),
      completed: item.completed ? 1 : 0
    }));

  return (
    <div className="stats-container">
      <div className="chart">
        <h3>Items by Category</h3>
        <PieChart width={300} height={200}>
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label />
          <Tooltip />
        </PieChart>
      </div>
      
      <div className="chart">
        <h3>Completion Status</h3>
        <BarChart width={300} height={200} data={completionData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#82ca9d" />
          <Tooltip />
        </BarChart>
      </div>
      
      <div className="chart">
        <h3>Upcoming Items</h3>
        <LineChart width={300} height={200} data={timelineData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Line type="monotone" dataKey="completed" stroke="#ff7300" />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}