/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/registrar', 'EmpresaUsersController.store')
Route.post('/login', 'EmpresaUsersController.login')
Route.put('/update/:tokenEmpresa', 'EmpresaUsersController.update').middleware('auth:api')
Route.delete('/delete/:tokenEmpresa', 'EmpresaUsersController.destroy').middleware('auth:api')

Route.get('/vagas', 'DadosVagasesController.index')
Route.post('/vagas/:id', 'DadosVagasesController.show')
Route.post('/vaga/cadastrar', 'DadosVagasesController.store').middleware('auth:api')
Route.put('/vaga/editar/:id', 'DadosVagasesController.update').middleware('auth:api')
Route.delete('/vaga/deletar/:id', 'DadosVagasesController.destroy').middleware('auth:api')
