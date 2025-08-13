
import { Typography, Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components';
import { AdminUser } from '../types';
import { useAdminUsers } from '../hooks/use-admin-users';

export function AdminUserList({ onImpersonate }: { onImpersonate: (userId: string) => void }) {
    const { users, loading, error, setSearch, search, refetch, page, setPage, hasNextPage, hasPrevPage } = useAdminUsers();

    return (
        <Card className="w-full max-w-3xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <Typography as="h2" className="text-2xl font-bold">Utilisateurs administratifs</Typography>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <Input
                    placeholder="Rechercher par email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full"
                />
                <Button size="small" variant="secondary" onClick={refetch}>Rafraîchir</Button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading ? (
                <div className="text-center py-8 text-gray-400">Chargement...</div>
            ) : (
                <>
                <div className="overflow-x-auto rounded-lg  dark:bg-meko-blue-dark">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead align="left">Email</TableHead>
                                <TableHead align="left">Rôle</TableHead>
                                <TableHead align="center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: AdminUser) => (
                                <TableRow key={user.id}>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.role || <span className="italic text-gray-400">—</span>}</TableCell>
                                    <TableCell align="center">
                                        <Button size="small" variant="primary" onClick={() => onImpersonate(user.id)}>
                                            Impersonate
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-center items-center gap-4 mt-6">
                    <Button size="small" variant="secondary" disabled={!hasPrevPage} onClick={() => setPage(page - 1)}>
                        Précédent
                    </Button>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Page {page}</span>
                    <Button size="small" variant="secondary" disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
                        Suivant
                    </Button>
                </div>
                </>
            )}
        </Card>
    );
}
