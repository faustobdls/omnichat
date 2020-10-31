// send messages for telegram

import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

import * as TelegramBot from 'node-telegram-bot-api';

import { Message, User } from './../../models/user';
import { InputMessage } from './../../models/message';


const TOKEN = functions.config().telegram.key;
const bot = new TelegramBot(TOKEN, {});
const app = admin.initializeApp({});

const firestore = admin.firestore(app);


export const sendMessageToUser = functions.https.onRequest(async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body);
        const message: InputMessage = req.body;
        try {
            await firestore.collection('users').doc(message.from).update({
                messages: admin.firestore.FieldValue.arrayUnion({
                    type: 'text',
                    provider: 'owner',
                    create: Date.now(),
                    message_content: message.message,
                    message_obj: message
                })
            })
            res.json({
                code: 200,
                message: "Na fila de envio..."
            });
        } catch (error) {
            console.error(error);
        }
    }
})

export const onUpdateUser = functions.firestore.document('users/{userId}').onUpdate(async (change, context) => {
    const newValue = change.after.data() as User;
    // ...or the previous value before this update
    // const previousValue = change.before.data();
    if (newValue.provider.telegram !== null && newValue.provider.telegram !== undefined) {
        const last_message = newValue.messages.sort(sortByDateTimeNumber).pop();
        try {
            if (
                last_message?.message_content !== null && 
                last_message?.message_content !== undefined && 
                last_message.provider === 'owner') {
                await bot.sendMessage(newValue.provider.telegram, `${last_message?.message_content}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
});

function sortByDateTimeNumber(a: Message, b: Message){
    if (a.create < b.create) return -1;
    if (a.create > b.create) return 1;
    return 0;
}