import User from "../models/User.js";

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';




export default {
    async index(req, res) {
        res.send('Hello World!');
    },

    async store(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        if(!name) return res.status(422).send({ error: 'Nome é obrigatório' });

        if(!email) return res.status(422).send({ error: 'Email é obrigatório' });
        
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(String(email).toLowerCase())) return res.status(422).send({ error: 'Email inválido' });

        if(!password) return res.status(422).send({ error: 'Senha é obrigatória' });

        if(password !== confirmpassword) return res.status(422).send({ error: 'Senhas não conferem' });

        // Check if user already exists

        const userExists = await User.findOne({ email });

        if(userExists) return res.status(422).send({ error: 'Usuário já existe' });

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const userX = new User({
            name,
            email,
            password: passwordHash
            
        });

        userX.save() // Save user to database
            .then(() => res.send({ message: 'Usuário cadastrado com sucesso!' }))
            .catch(err => res.status(422).send({ error: err }));

        const user = await User.create({ name, email, password });

        res.send({ message: 'Usuário cadastrado com sucesso!' });

    },

    async login(req, res) {

        const {email, password} = req.body;

        if(!email) return res.status(422).send({ error: 'Email é obrigatório' });

        if(!password) return res.status(422).send({ error: 'Senha é obrigatória' });

        //check if user exists

        const user = await User.findOne({ email });

        if(!user) return res.status(422).send({ error: 'Usuário não existe' });

        //check if password is correct

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) return res.status(422).send({ error: 'Senha incorreta' });

        //create and assign a token

        const secret = process.env.TOKEN_SECRET;

        const token = jwt.sign({ _id: user._id }, secret);

        res.status(200).json({msg: 'Autenticação efetuada com sucesso', token: token})
        

    },

    // Private route

    async profile(req, res) {
    
        const id = req.params.id;

        // check if user exists

        User.findById(id,'-password') // -password means that password will not be returned
        .then(user => res.status(200).json(user))
        .catch(err => res.status(404).send({ error: 'Usuário não existe' }));
        

    
    }


}