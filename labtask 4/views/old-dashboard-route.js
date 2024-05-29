// Route to render dashboard page----------------
// Dashboard route with pagination and search
// updated dashboard page with appointments and contact messages
app.get('/dashboard', isAuthenticated, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const searchQuery = req.query.search || '';
  
    let query = {};
  
    if (searchQuery) {
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { phone: { $regex: searchQuery, $options: 'i' } },
          { nature: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }
  
    try {
      const totalAppointments = await Appointment.countDocuments(query);
      const appointments = await Appointment.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
  
      const totalPages = Math.ceil(totalAppointments / limit);
  
      const contactQuery = {};
      if (searchQuery) {
        contactQuery.$or = [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { message: { $regex: searchQuery, $options: 'i' } }
        ];
      }
  
      const totalContacts = await Contact.countDocuments(contactQuery);
      const contacts = await Contact.find(contactQuery)
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.render('dashboard', {
        appointments,
        contacts,
        totalPages,
        currentPage: page,
        searchQuery
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while fetching data.');
    }
  });
  
  // Delete appointments route
  app.post('/delete-appointments', isAuthenticated, async (req, res) => {
    const { appointmentIds } = req.body;
  
    try {
      if (Array.isArray(appointmentIds)) {
        await Appointment.deleteMany({ _id: { $in: appointmentIds } });
      } else if (appointmentIds) {
        await Appointment.deleteOne({ _id: appointmentIds });
      }
  
      res.redirect('/dashboard?success=true');
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while deleting appointments.');
    }
  });