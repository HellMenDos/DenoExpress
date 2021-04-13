import server from './src.ts'
let app =  server(8000)


app.router('/index',(request:any):void=> {
  request.render('templates/index.html')
})
app.router('/contact',(request:any):void=> {
  request.render('templates/contact.html')
})


app.listen()

