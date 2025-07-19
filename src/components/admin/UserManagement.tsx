import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2, Search } from 'lucide-react';
import Button from '../common/Button';

interface User {
  id: string;
  name: string;
  email: string;
  huntsCompleted: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@exemple.com',
    huntsCompleted: 5,
    joinDate: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@exemple.com',
    huntsCompleted: 8,
    joinDate: '2024-02-01',
    status: 'active',
  },
  {
    id: '3',
    name: 'Pierre Durand',
    email: 'pierre@exemple.com',
    huntsCompleted: 3,
    joinDate: '2024-02-15',
    status: 'inactive',
  },
];

const columnHelper = createColumnHelper<User>();

const UserManagement: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusLabel = (status: string) => {
    return status === 'active' ? 'Actif' : 'Inactif';
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
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('huntsCompleted', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="flex items-center"
        >
          Chasses Terminées
          <ArrowUpDown size={16} className="ml-2" />
        </Button>
      ),
    }),
    columnHelper.accessor('joinDate', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="flex items-center"
        >
          Date d'Inscription
          <ArrowUpDown size={16} className="ml-2" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.joinDate).toLocaleDateString('fr-FR'),
    }),
    columnHelper.accessor('status', {
      header: 'Statut',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {getStatusLabel(row.original.status)}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => console.log('Modifier', row.original.id)}
            className="p-1 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => console.log('Supprimer', row.original.id)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    }),
  ];

  const filteredUsers = mockUsers.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const table = useReactTable({
    data: filteredUsers,
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
        <h1 className="text-2xl font-display text-primary-900">Gestion des Utilisateurs</h1>
        <Button variant="primary">Ajouter un Nouvel Utilisateur</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-secondary-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher des utilisateurs..."
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

export default UserManagement;