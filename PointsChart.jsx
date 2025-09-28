import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculatePointsSpent, getTotalPoints } from '../data/characterData';
import { useCharacter } from '../contexts/CharacterContext';

const COLORS = {
  atributos: '#8884d8',
  defesas: '#82ca9d',
  pericias: '#ffc658',
  vantagens: '#ff7300',
  poderes: '#00ff88',
  restantes: '#e0e0e0'
};

const PointsChart = () => {
  const { character } = useCharacter();
  
  const pointsSpent = calculatePointsSpent(character);
  const totalPoints = getTotalPoints(character);
  const remainingPoints = totalPoints - pointsSpent.total;

  const data = [
    { name: 'Atributos', value: pointsSpent.atributos, color: COLORS.atributos },
    { name: 'Defesas', value: pointsSpent.defesas, color: COLORS.defesas },
    { name: 'Perícias', value: pointsSpent.pericias, color: COLORS.pericias },
    { name: 'Vantagens', value: pointsSpent.vantagens, color: COLORS.vantagens },
    { name: 'Poderes', value: pointsSpent.poderes, color: COLORS.poderes },
    { name: 'Restantes', value: Math.max(0, remainingPoints), color: COLORS.restantes }
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">
            {data.value} pontos ({((data.value / totalPoints) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-center">Distribuição de Pontos</h3>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
          <span>Total Gasto:</span>
          <span>{pointsSpent.total} / {totalPoints}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={remainingPoints < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
            Pontos Restantes:
          </span>
          <span className={remainingPoints < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
            {remainingPoints}
          </span>
        </div>

        {remainingPoints < 0 && (
          <div className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded">
            ⚠️ Você excedeu o limite de pontos disponíveis!
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.filter(item => item.name !== 'Restantes').map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsChart;
