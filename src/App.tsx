import CS2ConfigGenerator from '@/components/CS2ConfigGenerator';
import '@/App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CS2 Config Generator</h1>
        <CS2ConfigGenerator />
      </div>
    </div>
  );
}

export default App;