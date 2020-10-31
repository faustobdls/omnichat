# Omnichat

---

![IMAGEM DA ARQUITETURA](https://github.com/faustobdls/omnichat/blob/master/images/arq-omnichat.png?raw=true)

---

- Client X/Y/Z
- Backend for Frontend X/Y/Z
- Backend Central
- Tasks
- DB

## Clients Online

 [Web](https://omnichat-fausto.web.app)
 [Telegram](https://t.me/omnichat_fausto_bot)

## Decisões

1 - Clientes
 - Telegram(Externos), Web(Próprio), Mobile(Próprio) cada um vai pedir info básica para iniciar seu contato e enviar para seu backend específico
 - Telegram: Bot
 - Web: Angular
 - Mobile: Flutter

2 - Backend for Frontends
 - Técnica usada para varios fins, um deles, é que não importa para qual banco ou outro serviço for conectar ou até mesmo outras coisas que o frontend necessite seja implementado aqui
 - Firebase Cloud Functions [NodeJS com TypeScript]

3 - Backend Central
 - Aqui vai morar a lógica de négocio, bateria de testes mais pesada, e esse backend que vai conhecer o banco e se conectar a ele
 - Firebase Cloud Functions [NodeJS com TypeScript]

4 - Tasks
 - Vai servir para derrubar sessions de clientes após um tempo prédefinido
 - Firebase Cloud Functions(Triggers) [NodeJS com TypeScript]

5 - DB
 - Armazenar os dados e configurações para cada caso
 - Firebase RealTimeDB
 - Firebase Firestore

 ---

 ## [SETUP] Maquina local

 ### Necessário

 1 - [node 12.x](#nodelink) e npm 6.x

 2 - firebase tools/emulator para criar o ambiente local

 3 - angular/ionic cli para o frontend web


 ### Processo

 1 - Instale o node na sua maquina

 2 - Instale os packages a seguir globalmente ou use via npx ou execute o script(scripts/global-packages.sh) 

    - firebase-tools (Firebase CLI)
    - @angular/cli (Angular CLI)
    - @ionic/cli (Ionic CLI)

 3 - Coloque as variáveis de ambiente do firebase para usar as functions de forma local e fazer o deploy, [Clique aqui para saber como gerar esse arquivo](https://cloud.google.com/docs/authentication/getting-started)

   ```bash
      export GOOGLE_APPLICATION_CREDENTIALS="path/to/project-config.json"
   ```

 4 - coloque também a apikey do seu bot, [Clique aqui para saber como criar seu bot](https://t.me/botfather)

   - [mais informaçoes sobre bots no telegram](https://core.telegram.org/bots)

   ```bash
      export TELEGRAM_OMNICHAT_APIKEY="STRING_KEY_HERE"
   ```

 5 - Para as váriaveis que falei coloque no seu `.bashrc`, `.zshrc`, `.profile`, `.bash_aliases`, `.zsh_aliases`, como preferir, apenas garanta que seu terminal leia ela.


 ## [Comandos] Para subir local o firebase emulators e o bot telegram

 1 - firebase emulators

 ```bash
   cd functions
   npm i
   npx tsc -w &
   npm run build
   cd ..
   firebase emulators:start
 ```
   ou

```bash
   ./scripts/up-firebase-emulators.sh
```

 2 - backend (telegram)

```bash
   cd backends/telegram
   npx tsc -w src/index.ts &
   node src/index.js
```

   ou
   
```bash
   ./scripts/up-telegram-bot.sh
```

 3 - frontend (web)

```bash
   cd frontends/web
   npm i
   ionic serve
```

   ou
   
```bash
   ./scripts/up-frontend-web.sh
```