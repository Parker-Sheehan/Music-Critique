const express = require('express')
const cors = require('cors')
const http = require('http')
const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors())

let arrayOfSongs = [{ songUrl: 'Parker', songTitle: 'yay' }, { songUrl: 'Payton', songTitle: 'cutie' }]

app.get('/getSongs', (req,res) => {
    console.log('in getSongs')
    res.send(arrayOfSongs)
})

app.post('/postSong', (req,res) => {
    console.log(req.body)
    arrayOfSongs.push(req.body)

    res.send(arrayOfSongs)
})

app.put('/editSong/:ID', (req,res) => {
    console.log(req.body, req.params)
    console.log(arrayOfSongs)
    
})

app.delete('/deleteSong/:song', (req,res) => {
    let songTitle = req.params.song
    let newArray = arrayOfSongs.filter((song) => {
        if(song.songTitle !== songTitle){
            return song
        }
    })

    arrayOfSongs = newArray

    res.send(arrayOfSongs)
})

server.listen(4000, console.log('listening on port 4000'))