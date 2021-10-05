const express = require('express')
const app = express()
const fileupload = require('express-fileupload')
const morgan = require('morgan')
const cors = require('cors')
const fs = require("fs")
const pdf = require("pdfkit")
const { options } = require('pdfkit')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(fileupload({ createParentPath: true }))
app.set("puerto", process.env.PORT || 3000)

const ini = (req, res, next) => {
    let PDF = new pdf
    PDF.pipe(fs.createWriteStream("./file/hola.pdf", "utf-8"))
    PDF.end()
    next();
}

app.use(ini)
app.get("/prueba", (req, res) => {
    let data = {
        nombre: "Miguel",
        apellido: "Huayhua Condori"
    }
    res.json(data)
})

app.post('/file', (req, res, next) => {
    let { myfile } = req.files
    let arr = new Uint8Array(myfile.data)
    fs.writeFileSync(req.files.myfile.name, Buffer.from(arr))
    next()
}, (req, res, next) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let PDF = new pdf()
    PDF.pipe(fs.createWriteStream("./file/hola.pdf", "utf-8"))
    PDF.rect(10, 10, PDF.page.width - 20, PDF.page.height - 20).fillAndStroke('#fff', '#000');
    PDF.image('./friends.png', 30, 30, { width: 50, height: 50 })
    let date = new Date()
    PDF.fill('#000')
    PDF.text(`La Paz - Bolivia ${date.getDate()} de ${meses[date.getMonth()]} del ${date.getFullYear()}`, 0, 30, { align: 'right' }).fontSize(20)
    PDF.text("CARTA DE AMISTAD", 50, 90, { oblique: true, align: 'center' }).fontSize(20);
    PDF.fontSize(14);
    PDF.text(`       Yo, Miguel Huayhua Condori, hago este documento para que pueda ser descargada las veces que quieras, dirigida a ${req.body.nombre} ${req.body.apellidos}` + " con el objetivo de presentar una carta de solo amistad, más nada estará involucrado" +
        ", y con el compromiso de no afectar nada, puedes contar conmigo las veces que necesites, como tu para mi.",
        50, 150, { lineGap: 15, });
    PDF.text("       Y lo que me falta a mí; el plan: comprender aquello que no entiendo perfectamente, y de ser posible aprender cosas nuevas de otras personas." +
        " Y pues ese momento llegó, veamos que el tiempo nos va a dar un giro, tu estarás diferente y yo igual, sigue el rumbo que planeas. Fin :P",
        { lineGap: 15 })

    PDF.image('me.jpg', 110, 520, { width: 75, height: 75 })
    PDF.image('firma69848.jpg', 80, 600, { width: 150, height: 90 })
    PDF.fontSize(15)
    PDF.text('..............................', 85, 650)
    PDF.fontSize(10)
    PDF.text('Miguel Huayhua Condori', 90, 670)
    PDF.text('Fase 3 XD', 120, 685)

    PDF.image(req.files.myfile.name, 410, 520, { width: 75, height: 75 })
    PDF.fontSize(15)
    PDF.text('..............................', 385, 650)
    PDF.fontSize(10)
    PDF.text(`${req.body.nombre} ${req.body.apellidos}`, 390, 670)
    PDF.text('Tú', 445, 685)
    PDF.end();
    

    next()
}, (req, res) => {
    res.json({ done: true })
    fs.rm(req.files.myfile.name,(err)=>{
        if(err) throw err
    })
})
app.get('/file', (req, res) => {
    res.download('hola.pdf');
})

app.post('/form', (req, res) => {
    console.log(req.body)
    res.send("jejej ok")
})

app.get('/download', (req, res) => {
    res.download('./file/hola.pdf')
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(
    app.get("puerto"),
    () =>
        console.log(`Listen to ${app.get("puerto")}`)
)

app.get('/prueba2', (req, res) => {

    res.end()
})
app.get('/file', (req, res) => {
    res.download('./file/hola.pdf');

})