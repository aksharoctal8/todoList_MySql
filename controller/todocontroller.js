const con = require("../config/mysql")
const flash = require('../config/CustmFlash')
module.exports.addTodo = async (req, res) => {
    try {
        return res.render('add_todo')

    } catch (error) {
        console.log(error);

    }
}
// insert task 
module.exports.insertTodo = async (req, res) => {
    try {
        const todoTitle = req.body.todo_title;
        if (!todoTitle || todoTitle.trim() === '') {
            req.flash('error', 'Todo title is required');
            return res.redirect('back');
        }
        const dateTime = new Date()
        const insertQuery = 'INSERT INTO todo (todo_title, date) VALUES (?, ?)';

        let toDo = con.query(insertQuery, [todoTitle, dateTime], (error, results) => {
            if (error) {
                // req.flash('error', 'Todo is required');
                console.log(error);
            } else {
                // console.log("inserted");
                req.flash('success', 'Todo inserted');
                return res.redirect('back')
            }

        });
    } catch (error) {
        console.log(error);
    }
}
// view task 
module.exports.viewTodo = async (req, res) => {
    try {
        const viewQuery = 'SELECT * FROM todo ';
        con.query(viewQuery, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                // console.log(results);    

                return res.render('view_todo', {
                    todoData: results
                })
            }

        });
    } catch (error) {
        console.log(error);
    }
}
// delete task 
module.exports.deleteTodo = async (req, res) => {
    try {
        // console.log(req.params.id);
        // console.log(req.body);
        const { id } = req.params;
        const deleteQuery = 'DELETE FROM todo WHERE id = ?';
        con.query(deleteQuery, [id], (error, results) => {
            if (error) {
                console.log(error);

            } else {
                console.log("data delete");
                return res.redirect('back');
            }
        })
    } catch (error) {
        console.log(err);
    }
}
// update task 
module.exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log('ID:', id); 
        const updateQuery = 'SELECT * FROM todo WHERE id = ?';
        con.query(updateQuery, [id], (error, results) => {
            if (error) {
                console.log('Database error:', error); 
            } else {
                console.log('Results:', results); 
                return res.render('update_task', {
                    up: results[0] 
                });
            }})
        }
    catch (error) {
        console.log(error);
    }
}
module.exports.editTodo = async(req,res)=>{
    try {
        // console.log(req.body);
        // console.log(req.body.EditId);
        const todoTitle = req.body.todo_title;
        if (!todoTitle || todoTitle.trim() === '') {
            req.flash('error', 'Todo title is required');
            return res.redirect('back');
        }
        let EditId = req.body.EditId;
        const updateData = { todo_title: todoTitle };
        const editQuery = 'UPDATE todo SET ? WHERE id = ?'
        con.query(editQuery,[updateData,EditId], (error,results)=>{
            if (error) {
                console.log(error);
                return res.redirect('back')
            } else {
                // req.flash('success', 'Todo updated');
                console.log("todo updated..");                
                return res.redirect('/todo/view_todo')
            }
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports.isactive = async (req, res) => {
    try {
        const { id } = req.params;
        const statusQuery = 'UPDATE todo SET status = ? WHERE id = ?';
        con.query(statusQuery, [false, id], (error, results) => {
            if (error) {
                console.log(error);
                return res.redirect('back');
            } else {
                console.log("Status changed successfully");
                return res.redirect('back');
            }
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports.isdeactive = async (req, res) => {
    try {
        const { id } = req.params;
        const statusQuery = 'UPDATE todo SET status = ? WHERE id = ?';
        con.query(statusQuery, [true, id], (error, results) => {
            if (error) {
                console.log(error);
                return res.redirect('back');
            } else {
                console.log("Status changed successfully");
                return res.redirect('back');
            }
        });
    } catch (error) {
        console.log(error);
    }
}
