import { useState } from 'react';
import { BookOpen, Tablet, Headphones } from 'lucide-react';

export default function BookTypeButtons() {
  const [selectedType, setSelectedType] = useState('book');

  const types = [
    { id: 'book', label: 'Book', icon: BookOpen },
    { id: 'ebook', label: 'eBook', icon: Tablet },
    { id: 'audiobook', label: 'Audiobook', icon: Headphones }
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-2xl">
         <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Select Book Type
        </h2>
        
        <div className="flex gap-3 ">
          {types.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedType(id)}
              className={`flex-1 flex items-center shadow-lg gap-3 p-2 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                selectedType === id
                  ? 'border-red-500 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow'
              }`}
            >
              <Icon 
                className={`w-6 h-6 ${
                  selectedType === id ? 'text-red-500' : 'text-slate-400'
                }`}
              />
              <span className={`text-sm font-medium ${
                selectedType === id ? 'text-black' : 'text-slate-600'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
        
        {/* <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 text-center">
            Selected: <span className="font-semibold text-slate-800">{selectedType}</span>
          </p>
        </div> */}
      </div>
    </div>
  );
}