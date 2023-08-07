import {connect, ConnectOptions } from 'mongoose'

export const dbConnect = () => {
    const db: string = ""
    connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log('Conectado ao banco de dados'), 
        (err) => console.log(err)
    )
}