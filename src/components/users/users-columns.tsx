// import {
//   DropdownMenu,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from '../../ui/dropdown-menu';
// import { Button } from '../../ui/button';
// import { ColumnDef } from '@tanstack/react-table';
// import { User } from '@/shared/types/entity/user';
// import StatusBadge from '@/components/common/StatusBadge';
// import { DataTableColumnHeader } from '../DataTableColumnHeader';
// import { Ban, CheckCircle2, MoreHorizontal, ReceiptText } from 'lucide-react';

// const AdminUsersTableColumns = (
//   changeUserBlockStatus: (data: AdminChangeUserBlockStatusRequest) => void,
//   changeBlockStatusUserId: string | null | undefined,
//   toUserDetailsPage: (userId: User['_id'], replace?: boolean) => void,
// ): ColumnDef<AdminfetchAllUsersResponse>[] => [
//   {
//     accessorKey: 'slNo',
//     header: 'Sl No',
//     cell: ({ row }) => (
//       <span className="font-mono text-xs text-slate-500 font-medium">
//         {String(row.index + 1).padStart(2, '0')}
//       </span>
//     ),
//   },
//   {
//     accessorKey: 'username',
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
//     cell: ({ row }) => (
//       <span className="font-semibold text-slate-900 dark:text-slate-100">
//         {row.original.username}
//       </span>
//     ),
//   },
//   {
//     accessorKey: 'email',
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
//     cell: ({ row }) => (
//       <span className="font-medium text-slate-600 dark:text-slate-400 text-xs">
//         {row.original.email}
//       </span>
//     ),
//   },
//   {
//     accessorKey: 'isBlocked',
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Account Status" />,
//     cell: ({ row }) => {
//       const isBlocked = row.original.isBlocked;
//       const isThisRowUpdating = changeBlockStatusUserId === row.original._id;

//       if (isThisRowUpdating) {
//         return <StatusBadge type="updating" />;
//       }

//       return !isBlocked ? <StatusBadge type="active" /> : <StatusBadge type="blocked" />;
//     },
//   },
//   {
//     accessorKey: 'actions',
//     header: 'Actions',
//     id: 'actions',
//     cell: ({ row }) => {
//       const user = row.original;
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button title="Open Menu" variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="size-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               onClick={() => toUserDetailsPage(user._id)}
//               className="cursor-pointer"
//             >
//               <ReceiptText className="w-3.5 h-3.5" />
//               Details
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() =>
//                 changeUserBlockStatus({ isBlocked: !user.isBlocked, userId: user._id })
//               }
//               className="cursor-pointer"
//             >
//               {user.isBlocked ? (
//                 <CheckCircle2 className="w-3.5 h-3.5" />
//               ) : (
//                 <Ban className="w-3.5 h-3.5" />
//               )}
//               {user.isBlocked ? 'Unblock' : 'Block'}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// export default AdminUsersTableColumns;
