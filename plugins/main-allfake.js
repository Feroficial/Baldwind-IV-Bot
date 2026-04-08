import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
  }

  global.getBuffer = async function getBuffer(url, options) {
    try {
      options ? options : {}
      var res = await axios({
        method: "get",
        url,
        headers: {
          'DNT': 1,
          'User-Agent': 'GoogleBot',
          'Upgrade-Insecure-Request': 1
        },
        ...options,
        responseType: 'arraybuffer'
      })
      return res.data
    } catch (e) {
      console.log(`Error : ${e}`)
    }
  }

  // ========== DATOS DEL CREADOR ==========
  global.creador = 'Wa.me/59177474230'
  global.ofcbot = `${conn?.user?.jid?.split('@')[0] || ''}`
  global.asistencia = 'Wa.me/59177474230'
  global.namegrupo = ' DEVLYONN ☘︎'
  global.listo = '⚔️ *Aquí tienes perra*'

  // ========== ELIMINADO: canales, repos, correos ==========
  // Ya no hay canalIdM, canalNombreM, idchannel, channelRD
  // Ya no hay git, github, youtube, correo, redes

  // ========== FECHA Y HORA ==========
  global.d = new Date(Date.now() + 3600000)
  global.locale = 'es'
  global.dia = global.d.toLocaleDateString(global.locale, { weekday: 'long' })
  global.fecha = global.d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
  global.mes = global.d.toLocaleDateString('es', { month: 'long' })
  global.año = global.d.toLocaleDateString('es', { year: 'numeric' })
  global.tiempo = global.d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

  // ========== REACCIONES ==========
  global.rwait = '⏳'
  global.done = '✅'
  global.error = '✖️'

  // ========== EMOJIS ==========
  global.emoji = '⚔️'
  global.emoji2 = '🛸'
  global.emoji3 = '🎬'
  global.emoji4 = '🧬'
  global.emojis = pickRandom([global.emoji, global.emoji2, global.emoji3, global.emoji4])

  // ========== ELIMINADO: enlaces (canal, git, github, correo) ==========

  // ========== ICONOS (imagen aleatoria) ==========
  let category = "imagen"
  const db = './src/database/db.json'
  let rimg = null
  try {
    const db_ = JSON.parse(fs.readFileSync(db))
    const random = Math.floor(Math.random() * db_.links[category].length)
    const randomlink = db_.links[category][random]
    const response = await fetch(randomlink)
    rimg = await response.buffer()
  } catch (e) {
    console.log('Error cargando imagen:', e.message)
  }
  global.icons = rimg

  // ========== SALUDO POR HORA ==========
  var ase = new Date()
  var hour = ase.getHours()
  switch (hour) {
    case 0: case 1: case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
    case 3: case 4: case 5: case 6: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
    case 7: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; break;
    case 8: case 9: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
    case 10: case 11: case 12: case 13: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break;
    case 14: case 15: case 16: case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break;
    default: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'
  }
  global.saludo = hour

  // ========== NOMBRE DEL USUARIO ==========
  global.nombre = m.pushName || 'Anónimo'
  global.taguser = '@' + m.sender.split("@s.whatsapp.net")
  var more = String.fromCharCode(8206)
  global.readMore = more.repeat(850)

  // ========== CONTACTO FALSO ==========
  global.fkontak = { 
    key: { 
      participant: `0@s.whatsapp.net`, 
      ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}) 
    }, 
    message: { 
      'contactMessage': { 
        'displayName': `${global.nombre}`, 
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.nombre},;;;\nFN:${global.nombre},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 
        'jpegThumbnail': null, 
        thumbnail: null, 
        sendEphemeral: true 
      } 
    } 
  }

  // ========== ELIMINADO: fake (newsletter) y rcanal ==========

  // ========== ICONO PARA EXTERNAL AD REPLY ==========
  global.icono = pickRandom([
    'https://files.catbox.moe/9mtsqf.jpg',
  ])

}

export default handler