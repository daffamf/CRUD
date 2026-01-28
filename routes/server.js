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

// PROSES DELETE
router.get('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id; // Mengambil ID dari URL
    
    // Query untuk menghapus data berdasarkan ID
    await pool.query('DELETE FROM karyawan WHERE id = $1', [id]);
    
    // Setelah dihapus, balik lagi ke halaman utama
    res.redirect('/');
  } catch (err) {
    console.error("Gagal menghapus data:", err);
    next(err);
  }
});

//  Menampilkan Form Edit
router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM karyawan WHERE id = $1', [id]);
    
    // Kirim data karyawan y
    res.render('edit', { item: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

//  Memproses Update data
router.post('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, height, weight, birthdate, married } = req.body;

    const sql = `UPDATE karyawan 
                 SET name = $1, height = $2, weight = $3, birthdate = $4, married = $5 
                 WHERE id = $6`;
    
    await pool.query(sql, [name, height, weight, birthdate, married === 'true', id]);
    
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});
  return router;
};
