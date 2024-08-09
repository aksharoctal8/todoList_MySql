const todo = require("../model/todoModel")
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

        req.body.status = false
        req.body.date = new Date().toLocaleString();
        let createQuery = await todo.create(req.body);
        if (createQuery) {
            req.flash("success", "Task Inserted")
            return res.redirect('back');
        } else {
            req.flash("error", "Task is required")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
    }
}
// view task 
module.exports.viewTodo = async (req, res) => {
    try {
        let search = '';
        if(req.query.search){
            search= req.query.search
        }
        console.log(req.query.search);
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0
        }
        var perpage =4;
    
        let adminrecord = await todo.find({
            $or :[
                {"todo_title":{$regex:".*"+search+".*",   }}
            ]
        })
        .limit(perpage)
        .skip(perpage*page);
    
        let AdminePage = await todo.find({
            $or :[
                {"todo_title":{$regex:".*"+search+".*", $options:"i"}}
            ]
        }).countDocuments();
        // console.log(adminrecord);
        if(adminrecord){
            return res.render("view_todo",{
                todoData : adminrecord,
            
                search: search,
                totalDocument : Math.ceil(AdminePage/perpage),
                curentpage :page
            })
        }
        else{
            console.log('somthing went worng');
            return res.render("view_admin")
        }
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
        let deleteQuery = await todo.findByIdAndDelete(id)
        if (deleteQuery) {
            console.log("Task Delete..");
            return res.redirect('back')
        } else {
            console.log("Task Can't Delete..!");
            return res.redirect('back')
        }
    } catch (error) {
        console.log(err);
    }
}
// update task 
module.exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log('ID:', id); 
        const updateQuery = await todo.findById(id)
        if (updateQuery) {
            return res.render('update_task', {
                up: updateQuery
            })
        } else {
            console.log("Task Not Find");
        }
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.editTodo = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.body.EditId);
        const { EditId } = req.body;
        let editQuery = await todo.findByIdAndUpdate(EditId, req.body);
        if (editQuery) {
            req.flash("success", "Task Updated")
            return res.redirect('/todo/view_todo');
        } else {
            req.flash("error", "Task Updated")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports.isactive = async (req, res) => {
    try {
        const { id } = req.params;
        const statusQuery = await todo.findByIdAndUpdate(id, { status: false });
        if (statusQuery) {
            return res.redirect('back')
        } else {
            console.log("Task statuse can't change");
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports.isdeactive = async (req, res) => {
    try {
        const { id } = req.params;
        const statusQuery = await todo.findByIdAndUpdate(id, { status: true });
        if (statusQuery) {
            return res.redirect('back')
        } else {
            console.log("Task statuse can't change");
        }
    } catch (error) {
        console.log(error);
    }
}