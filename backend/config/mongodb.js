const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost/knowledge_stats', {useNewUrlParser: true})
    .catch(e =>{
        const msg = "Erro! Não foi possível conectar com o mongoDB!"
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })