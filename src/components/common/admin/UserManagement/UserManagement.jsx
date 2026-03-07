import { useState } from "react";
import {
    Box, Paper, Typography, Stack, Button, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Chip, IconButton, Tooltip, Dialog, DialogTitle, DialogContent,
    DialogActions, MenuItem, Select, FormControl, InputLabel, Pagination,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const INIT_USERS = [
    { id: 1, name: "Aya Abu Ghozeh", role: "student", dept: "CS", email: "aya@ptu.edu.ps", status: "active" },
    { id: 2, name: "Dr. Thaer Sammar", role: "supervisor", dept: "CS", email: "thaer@ptu.edu.ps", status: "active" },
    { id: 3, name: "Hanan Awad", role: "student", dept: "CS", email: "hanan@ptu.edu.ps", status: "active" },
    { id: 4, name: "Malak Malak", role: "student", dept: "CS", email: "malak@ptu.edu.ps", status: "active" },
    { id: 5, name: "Omar Jawad", role: "student", dept: "CE", email: "omar@ptu.edu.ps", status: "pending" },
    { id: 6, name: "Dr. Layla Hassan", role: "supervisor", dept: "EE", email: "layla@ptu.edu.ps", status: "leave" },
    { id: 7, name: "Sara Ahmad", role: "student", dept: "CE", email: "sara@ptu.edu.ps", status: "active" },
    { id: 8, name: "Dr. Ahmad Nasser", role: "supervisor", dept: "CE", email: "ahmad@ptu.edu.ps", status: "active" },
];

const ROLE_CLR = { student: "#B46F4C", supervisor: "#6D8A7D", admin: "#7E9FC4" };
const STATUS_CLR = { active: "#6D8A7D", pending: "#C49A6C", leave: "#9AA9B9" };
const STATUS_LBL = { active: "Active", pending: "Pending", leave: "On Leave" };
const EMPTY = { name: "", email: "", role: "student", dept: "CS", status: "active" };
const PER_PAGE = 6;

function FormFields({ form, setForm }) {
    return (
        <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Full Name" size="small" fullWidth value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            <TextField label="Email" size="small" fullWidth value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            <TextField label="Department" size="small" fullWidth value={form.dept} onChange={(e) => setForm((p) => ({ ...p, dept: e.target.value }))} />
            <FormControl size="small" fullWidth>
                <InputLabel>Role</InputLabel>
                <Select label="Role" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="supervisor">Supervisor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="leave">On Leave</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}

export default function UserManagement() {
    const theme = useTheme();
    const t = theme.palette.custom;

    const [users, setUsers] = useState(INIT_USERS);
    const [search, setSearch] = useState("");
    const [roleFilter, setRole] = useState("all");
    const [page, setPage] = useState(1);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState(EMPTY);

    const filtered = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
            (roleFilter === "all" || u.role === roleFilter)
        );
    });
    const pageCount = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const openEdit = (u) => { setSelected(u); setForm({ name: u.name, email: u.email, role: u.role, dept: u.dept, status: u.status }); setEditOpen(true); };
    const openDel = (u) => { setSelected(u); setDelOpen(true); };

    const handleAdd = () => { setUsers((p) => [...p, { ...form, id: Date.now() }]); setAddOpen(false); setForm(EMPTY); };
    const handleEdit = () => { setUsers((p) => p.map((u) => u.id === selected.id ? { ...u, ...form } : u)); setEditOpen(false); };
    const handleDel = () => { setUsers((p) => p.filter((u) => u.id !== selected.id)); setDelOpen(false); };

    return (
        <Box sx={{ maxWidth: 1100 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h2" sx={{ color: t.textPrimary, mb: 0.5 }}>User Management</Typography>
                <Typography sx={{ color: t.textSecondary, fontSize: "0.9rem" }}>
                    {users.length} users · {users.filter((u) => u.status === "pending").length} pending approval
                </Typography>
            </Box>

            <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden", bgcolor: theme.palette.background.paper }}>
                {/* Toolbar */}
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} alignItems={{ sm: "center" }} justifyContent="space-between"
                    sx={{ px: 2.5, py: 2, borderBottom: `1px solid ${t.borderLight}` }}>
                    <Stack direction="row" gap={1.5} flexWrap="wrap">
                        <TextField placeholder="Search…" size="small" sx={{ width: 200 }} value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: t.textTertiary }} /></InputAdornment> }} />
                        <FormControl size="small" sx={{ minWidth: 130 }}>
                            <InputLabel>Role</InputLabel>
                            <Select label="Role" value={roleFilter} onChange={(e) => { setRole(e.target.value); setPage(1); }}>
                                <MenuItem value="all">All Roles</MenuItem>
                                <MenuItem value="student">Students</MenuItem>
                                <MenuItem value="supervisor">Supervisors</MenuItem>
                                <MenuItem value="admin">Admins</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setForm(EMPTY); setAddOpen(true); }}
                        sx={{ bgcolor: t.accentPrimary, whiteSpace: "nowrap" }}>Add User</Button>
                </Stack>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>{["User", "Role", "Department", "Status", "Actions"].map((h) => <TableCell key={h}>{h}</TableCell>)}</TableRow>
                        </TableHead>
                        <TableBody>
                            {paginated.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" gap={1.5}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: ROLE_CLR[u.role], fontSize: "0.8rem", fontWeight: 600 }}>{u.name.charAt(0)}</Avatar>
                                            <Box>
                                                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }}>{u.name}</Typography>
                                                <Typography sx={{ fontSize: "0.72rem", color: t.textTertiary }}>{u.email}</Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={u.role} size="small" sx={{ bgcolor: `${ROLE_CLR[u.role]}15`, color: ROLE_CLR[u.role], fontWeight: 600, fontSize: "0.7rem", textTransform: "capitalize", height: 22 }} />
                                    </TableCell>
                                    <TableCell><Typography sx={{ fontSize: "0.875rem", color: t.textSecondary }}>{u.dept}</Typography></TableCell>
                                    <TableCell>
                                        <Chip label={STATUS_LBL[u.status]} size="small" sx={{ bgcolor: `${STATUS_CLR[u.status]}18`, color: STATUS_CLR[u.status], fontWeight: 600, fontSize: "0.7rem", height: 22 }} />
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" gap={0.5}>
                                            <Tooltip title="Edit"><IconButton size="small" onClick={() => openEdit(u)} sx={{ color: t.textSecondary, "&:hover": { color: t.accentPrimary } }}><EditOutlinedIcon sx={{ fontSize: 17 }} /></IconButton></Tooltip>
                                            <Tooltip title="Delete"><IconButton size="small" onClick={() => openDel(u)} sx={{ color: t.textSecondary, "&:hover": { color: t.error } }}><DeleteOutlineIcon sx={{ fontSize: 17 }} /></IconButton></Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {paginated.length === 0 && (
                                <TableRow><TableCell colSpan={5} sx={{ textAlign: "center", py: 5, color: t.textTertiary }}>No users found.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {pageCount > 1 && (
                    <Stack alignItems="center" sx={{ py: 2, borderTop: `1px solid ${t.borderLight}` }}>
                        <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)}
                            sx={{ "& .MuiPaginationItem-root.Mui-selected": { bgcolor: t.accentPrimary, color: "#fff" } }} />
                    </Stack>
                )}
            </Paper>

            {/* Add */}
            <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>Add New User</DialogTitle>
                <DialogContent><FormFields form={form} setForm={setForm} /></DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={() => setAddOpen(false)} sx={{ color: t.textSecondary }}>Cancel</Button>
                    <Button variant="contained" onClick={handleAdd} sx={{ bgcolor: t.accentPrimary }}>Add User</Button>
                </DialogActions>
            </Dialog>

            {/* Edit */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>Edit User</DialogTitle>
                <DialogContent><FormFields form={form} setForm={setForm} /></DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={() => setEditOpen(false)} sx={{ color: t.textSecondary }}>Cancel</Button>
                    <Button variant="contained" onClick={handleEdit} sx={{ bgcolor: t.accentPrimary }}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete */}
            <Dialog open={delOpen} onClose={() => setDelOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, color: t.error }}>Delete User</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: t.textSecondary }}>
                        Delete <strong style={{ color: t.textPrimary }}>{selected?.name}</strong>? This cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={() => setDelOpen(false)} sx={{ color: t.textSecondary }}>Cancel</Button>
                    <Button variant="contained" onClick={handleDel} sx={{ bgcolor: t.error }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}