import React, { useState } from 'react';
import { useTreasure } from '../../context/TreasureContext';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { Treasure, TreasureStatus } from '../../types';

const columnHelper = createColumnHelper<Treasure>();

const HuntManagement: React.FC = () => {
  const { treasures, deleteTreasure } = useTreasure();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette chasse ?')) {
      deleteTreasure(id);
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return difficulty;
    }
  };

  const getStatusLabel = (status: TreasureStatus) => {
    return status === TreasureStatus.FOUND ? 'Trouvé' : 'Caché';
  };

  const columns = [
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="flex items-center"
        >
          Nom
          <ArrowUpDown size={16} className="ml-2" />
        </Button>
      ),
    }),
    columnHelper.accessor('location', {
      header: 'Localisation',
    }),
    columnHelper.accessor('difficulty', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="flex items-center"
        >
          Difficulté
          <ArrowUpDown size={16} className="ml-2" />
        </Button>
      ),
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.difficulty === 'easy'
              ? 'bg-green-100 text-green-800'
              : row.original.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {getDifficultyLabel(row.original.difficulty)}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="flex items-center"
        >
          Statut
          <ArrowUpDown size={16} className="ml-2" />
        </Button>
      ),
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === TreasureStatus.HIDDEN
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {getStatusLabel(row.original.status)}
        </span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="flex items-center"
        >
          Créé le
          <ArrowUpDown size={16} className="ml-2" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('fr-FR'),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link
            to={`/treasures/${row.original.id}`}
            className="p-1 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded"
          >
            <Eye size={16} />
          </Link>
          <Link
            to={`/treasures/${row.original.id}/edit`}
            className="p-1 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredTreasures = treasures.filter(
    treasure =>
      treasure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treasure.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const table = useReactTable({
    data: filteredTreasures,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display text-primary-900">Gestion des Chasses</h1>
        <Link to="/treasures/new">
          <Button variant="primary">Créer une Nouvelle Chasse</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-secondary-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher des chasses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-secondary-300 rounded-md focus:outline-none 
                        focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 text-left text-sm font-medium text-secondary-700">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="border-t border-secondary-200 hover:bg-secondary-50"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-sm text-secondary-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HuntManagement;