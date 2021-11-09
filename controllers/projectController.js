const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.json({projects, message: 'Proyectos listados'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Hubo un error'});
    }
}

exports.getProject = async (req, res, next) => {
    const id = req.params.id;

    try {
        let project = await Project.findById(id);
        if(!project) {
            return res.status(401).json({message: 'Proyecto no encontrado'});
        }

        res.json({project, message: 'El proyecto se encontró correctamente'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Hubo un error'});
    }
}

exports.getImageProject = async (req, res, next) => {
    try {
        const file = req.params.image;
        const pathFile = `./uploads/projects/${file}`;
        fs.exists(pathFile, (exists) => {
            if(exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(200).send('No existe la imagen');
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.createProject = async (req, res, next) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.json({project, message: 'Proyecto creado correctamente'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Hubo un error'});
    }
}

