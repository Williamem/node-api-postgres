//imports and setup
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

//get all users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if(err) {
            throw err
        }
        res.status(200).json(results.rows);
    })
}

//get user by id
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        if(err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}

//post a new user
const createUser = (req, res) => {
    const {name, email} = req.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (err, results) => {
        if (err) {
            throw err
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

//update data in existing user
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, email} = req.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (err, results) => {
            if(err) {
                throw err
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

//delete a user
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}