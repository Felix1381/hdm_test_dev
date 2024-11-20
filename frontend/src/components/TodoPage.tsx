import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    handleFetchTasks(); // Rafraîchir la liste après la suppression
  }

  const handleSave = async () => {
    if (newTaskName.trim()) {
      if (editingTaskId) {
        // Mettre à jour la tâche si un ID est présent
        await api.patch(`/tasks/${editingTaskId}`, { name: newTaskName });
      } else {
        // Ajouter une nouvelle tâche
        await api.post('/tasks', { name: newTaskName });
      }
      setNewTaskName('');
      setOpen(false);
      setEditingTaskId(null); // Réinitialiser l'état d'édition
      handleFetchTasks(); // Rafraîchir la liste après l'ajout/édition
    }
  }

  const handleEdit = (task: Task) => {
    setNewTaskName(task.name);
    setEditingTaskId(task.id); // Stocker l'ID de la tâche à éditer
    setOpen(true);
  }

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={() => { setOpen(true); setEditingTaskId(null); setNewTaskName(''); }}>Ajouter une tâche</Button>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} divider>
              <ListItemText primary={task.name} />
              <Box>
                <IconButton color="primary" onClick={() => handleEdit(task)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingTaskId ? 'Modifier une tâche' : 'Ajouter une tâche'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la tâche"
            type="text"
            fullWidth
            variant="standard"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSave}>{editingTaskId ? 'Modifier' : 'Ajouter'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TodoPage;