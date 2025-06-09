const userRoutes = require('./routes/userRoutes');
const achatRoutes = require('./routes/achatRoutes');
const inventaireRoutes = require('./modules/inventaire/inventaireRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chantiers', chantierRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/achats', achatRoutes);
app.use('/api/inventaire', inventaireRoutes); 