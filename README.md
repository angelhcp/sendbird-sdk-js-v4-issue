## Instructions to reproduce the issue.
First, create an `.env.local` file and set the required variables (you can use `.env.local` as a start)

Then, install dependencies:
```bash
npm install
# or
yarn
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/api/unread_messages_v3](http://localhost:3000/api/unread_messages_v3) to see the sendbird javascript sdk v3 working.

Open [http://localhost:3000/api/unread_messages_v3](http://localhost:3000/api/unread_messages_v3) to reproduce the issue when using sendbird javascript sdk v4.
