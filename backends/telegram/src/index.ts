import * as TelegramBot from 'node-telegram-bot-api';
import { firestore, admin } from './firebase/index'

const TELEGRAM_TOKEN = process.env.TELEGRAM_OMNICHAT_APIKEY ?? '';
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })


async function isRegistred(msg: TelegramBot.Message): Promise<boolean> {
    const users = (await firestore.collection('users').where('provider.telegram', '==', msg?.from?.id).get()).docs;
    return users.length === 1;
}
function isCPF(msg: TelegramBot.Message) {
    if (msg?.text?.match(/^\d{3}.?\d{3}.?\d{3}-?\d{2}$/gm)) {
        console.log('[IS CPF]');
        return true;
    }
    return false;
}

async function createUser(msg: TelegramBot.Message) {
    await firestore.collection('users').doc(msg?.text ?? '').set({
        name: msg?.from?.first_name,
        cpf: msg.text,
        provider: { telegram: msg?.from?.id },
        messages: admin.firestore.FieldValue.arrayUnion({
            type: 'text',
            provider: 'telegram',
            create: Date.now(),
            message_content: msg.text,
            message_obj: msg,
        })
    }, { merge: true })
}
async function addMessage(telegram_user_id: string, msg: TelegramBot.Message) {
    const users = (await firestore.collection('users').where('provider.telegram', '==', msg?.from?.id).get()).docs
    if (users.length === 1) {
        const user = users[0];
        const doc_id = user.get('cpf') as string;
        firestore.collection('users').doc(doc_id).update({
            provider: { telegram: msg?.from?.id },
            messages: admin.firestore.FieldValue.arrayUnion({
                type: 'text',
                provider: 'telegram',
                create: Date.now(),
                message_content: msg.text,
                message_obj: msg,
            })
        })
    }
}


bot.on('text', async (msg, m) => {

    if (isCPF(msg)) {
        await bot.sendMessage(`${msg?.from?.id}`, 'Vou procurar aqui, só um momento...')
        if (!(await isRegistred(msg))) {
            console.log('[Not Register]')
            await createUser(msg)
            await bot.sendMessage(`${msg?.from?.id}`, 'Em que posso lhe ajudar?')
        }
    }

    if (!msg?.from?.is_bot && !isCPF(msg) && msg.text !== null) {
        if (await isRegistred(msg)) {
            console.log('[Register]')
            addMessage(`${msg?.from?.id}`, msg);
            console.log(`[${msg?.from?.first_name}] ${msg.text}`);
        } else {
            console.log('[Not Register]')
            await bot.sendMessage(`${msg?.from?.id}`, 'Informe o CPF VÁLIDO por favor para proseguir com o contato.')
        }
    }

    if (msg?.from?.is_bot) {
        console.log(`[${msg?.from?.first_name}] ${msg.text}`);
    }
});
