/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de usuario
 * Data: 22/05/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

//INSERT DO NOVO USUARIO
const insertUser = async function(user){
    //Instancia (criar um objt a ser utilizado) a biblioteca do prisma/client
    try {
        
            let sql = `insert into tbl_usuario (  
                                                nome,
                                                email,
                                                senha,
                                                telefone,
                                                palavra_chave,
                                                data_nascimento,
                                                cpf,
                                                id_endereco
                                            )
                                            values(
                                                '${user.nome}',
                                                '${user.email}',
                                                '${user.senha}',
                                                '${user.telefone}',
                                                '${user.palavra_chave}',
                                                '${user.data_nascimento}',
                                                '${user.cpf}',
                                                '${user.id_endereco}'
                                            )`

            // Executa o scriptSQL no BD e aguarda o retorno no mesmo para saber se deu certo
            let result = await prisma.$executeRawUnsafe(sql)

        
                if(result){
                    let getID = `SELECT * FROM tbl_usuario WHERE email = '${user.email}' ORDER BY id DESC LIMIT 1 `
                   

                    let idPego = await prisma.$queryRawUnsafe(getID)
                    console.log(idPego[0])
                    
                    return idPego[0]
                }else{
                    return false
                }
                
        
    } catch (error) {
        console.log(error)
        return false
    }
}


//ATUALIZAR UM USUARIO EXISTENTE
const updateUser = async function(user){
    try {
        let sql = `update tbl_usuario set       nome = '${user.nome}',
                                                email = '${user.email}',
                                                senha = '${user.senha}',
                                                telefone = '${user.telefone} ',
                                                palavra_chave = '${user.palavra_chave}',
                                                data_nascimento = '${user.data_nascimento}',
                                                cpf = '${user.cpf}',
                                                id_endereco = '${user.id_endereco}'
                                                
                                where id = ${user.id}`

    let resultUser= await prisma.$executeRawUnsafe(sql)

    if(resultUser)
        return true
    else 
        return false
    } catch (error) {
        return false
    }
}

//EXCLUIR UM USUARIO EXISTENTE
const deleteUser = async function(id){

    try {
        let sql = `delete from tbl_usuario where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql, id)
    
        if (result){
            return true 
        }else{
            return false
        }
    } catch (error) {
        
    }
}

//RETORNAR TODOS OS USUARIOS EXISTENTES
const selectAllUsers = async function(){

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_usuario order by id desc'

        //Executa o ScriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//BUSCAR UM USUARIO PELO ID
const selectByIdUser = async function(id){

    try {

        let sql = `SELECT * FROM tbl_usuario WHERE id = ${id}`
    
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        } catch (error) {
            return false
        }


}

const loginUser = async function(user){
    
    try {
        
        let sql = `SELECT * FROM tbl_usuario WHERE email = '${user.email}' and senha ='${user.senha}'`
        
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        } catch (error) {
            return false
        }
}

const selectLastInsertId = async function(){
    try {
        let sql = `select id from tbl_usuario order by id desc limit 1`

        let result =  await prisma.$queryRawUnsafe(sql) 
        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    selectAllUsers,
    selectByIdUser,
    loginUser,
    selectLastInsertId,
}