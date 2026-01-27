const {Router} = require('express');
const router = Router()

module.exports = (pool) => {

  // READ
  router.get('/', async (req, res, next) => {
    try {
      const result = await pool.query('SELECT * FROM karyawan ORDER BY id ASC');
      res.render('index', {
        karyawan: result.rows
        
      });
    } catch (err) {
      next(err);
    }

    
  });
  router.get('/add', (req, res) => {
    res.render('add');
  });

    // FORM CREATE
 router.post('/add', async (req, res, next) => {
    try {
        const { name, height, weight, birthdate, married } = req.body;
        
        // Hapus "id" dari daftar kolom dan VALUES
        const sql = `INSERT INTO karyawan (name, height, weight, birthdate, married) 
                     VALUES ($1, $2, $3, $4, $5)`;
        
        await pool.query(sql, [name, height, weight, birthdate, married === 'true']);
        
        res.redirect('/'); 
    } catch (err) {
        next(err);
    }
});


  return router;
};
