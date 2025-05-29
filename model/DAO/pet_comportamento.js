/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de petComportamneto no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

 //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()
 
 //Função para inserir uma nova petComportamneto
 const insertPetComportamento = async function(petComportamneto){
     try{
         let sql  = `insert into tbl_pet_comportamento (
                                         id_pet,
                                         id_comportamento
                                         ) 
                                     values 
                                         ( 
                                         ${petComportamneto.id_pet},
                                         ${petComportamneto.id_comportamento}
                                         )`
 
         
         
         //Await só vai funcionar se na função estiver com o async
         //Executa um script sql no banco de dados, e aguarda o resultado (retornando um true or false)
         let result  = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return  true
         else
             return false//Bug no Banco de dados
         
         }catch(error){
             
             return false//Bug de programação
     }
 
 }
 //Função para atualizar uma petComportamneto existente
 const updatePetComportamento = async function(petComportamneto){
     try {
         let sql = `update tbl_pet_comportamento set id_pet = ${petComportamneto.id_pet},
                                                              ${petComportamneto.id_comportamento}
                     where id = ${petComportamneto.id} `
 
         let  result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
         
     } catch (error) {
         return false
     }
 }
 //Função para excluir uma petComportamneto existente
 const deletePetComportamento = async function(id){
     try {
 
         let sql = `delete from tbl_pet_comportamento where id=${id}`
 
         //
         let result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
 
         
     } catch (error) {
         return false
     }
 }
 //Função para retornar todas as petComportamneto do banco de dados
 const selectAllPetComportamento = async function(){
     try {
 
         //Script SQL
         let sql = 'select * from tbl_pet_comportamento order by id desc'
 
         //Encaminha o script SQL para o Banco de dados
         let result = await prisma.$queryRawUnsafe(sql)
 
         if(result)
             return result//retorna dados do banco
         else
             return false
 
     } catch (error) {
         return false
     }
 }
 //Função para buscar uma petComportamneto pelo ID
 const selectByIdPetComportamento = async function(number) {
     try {
         // Recebe o ID
         let id = number 
         
         // Script SQL 
         let sql = `select * from tbl_pet_comportamento where id=${id} `
 
         // Encaminha o Script SQL para o BD
         let result = await prisma.$queryRawUnsafe(sql)
         
         if(result)
             return result // Retorna os dados do Banco 
         else
             return false
 
     } catch (error) {
         return false
     }
 }
 
 //Função para retornar os filmes pelo genero
 const selectPetComportamento = async function(idAlbum){
     try {
         let sql = `select tbl_pet.* from tbl_album
                                               inner join tbl_pet_comportamento
                                                 on tbl_album.id = tbl_pet_comportamento.id_comportamento
                                               inner join tbl_artista
                                                 on tbl_artista.id = tbl_pet_comportamento.id_pet
                     where tbl_pet_comportamento.id_pet = ${idAlbum}`
   
         let result = await prisma.$queryRawUnsafe(sql)
   
       if (result)
           return result
       else 
           return false
     } catch (error) {
         return false
     }
   }
   
   //Função para retornar os generos pelo Filme
   const selectComportamentoPet = async function(idArtista){
     try {
         let sql = `select tbl_comportamento.* from tbl_album
                                               inner join tbl_pet_comportamento
                                                 on tbl_album.id = tbl_pet_comportamento.id_comportamento
                                               inner join tbl_artista
                                                 on tbl_artista.id = tbl_pet_comportamento.id_pet
                     where tbl_pet_comportamento.id_comportamento = ${idArtista}`
   
         let result = await prisma.$queryRawUnsafe(sql)
   
       if (result)
           return result
       else 
           return false
     } catch (error) {
         return false
     }
   }
 
 
 module.exports = {
     insertPetComportamento,
     updatePetComportamento,
     deletePetComportamento,
     selectAllPetComportamento,
     selectByIdPetComportamento,
     selectPetComportamento,
     selectComportamentoPet
 }