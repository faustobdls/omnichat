# Chat Bemol

---

![ARQ IMAGE HERE](https://github.com/faustobdls/omnichat/blob/master/images/arq-omnichat.png?raw=true)


- Client X/Y/Z
- Backend for Frontend X/Y/Z
- Backend Central
- Tasks
- DB

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