let handler = async function (m, { conn }) {
  let user = global.db.data.users[m.sender]

  if (!user.registered) {
    return m.reply(`
⚠️ *ERROR DE REINO*
🚫 No estás registrado actualmente.
`)
  }

  user.registered = false
  m.reply(`
🗡️ *USUARIO ELIMINADO*
📁 Registro completamente eliminado del sistema...
⌛ vuelve a registrarte con *.reg* si lo deseas.
`)
}

handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true

export default handler