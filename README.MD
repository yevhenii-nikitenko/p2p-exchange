# Simplified P2P distributed exchange

### start two grape servers

```bash
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'

```

### run service:

```bash
node server.js
```

### run client(s)

```bash
nodemon client.js sell 15 BTC
```

where argv[2] is "sell" or "buy",
where argv[3] is order amount,
where argv[4] is currency

when the orders of client match, the system performs exchange updating queue and order book for users. Once for a 10 seconds the queue and order book is logged.

A lot of stuff missing due to time limit.

- input validatioin
- proper error handling
- good queue solution (bullMQ, rabbitMQ, redis etc)
- some action to perform on order fullfiled
- safe number parsing (Big.js etc)
- can be extended by adding a source currency and rates map, for example USD and crypto to fiat rates calculation
- possibility to multiply service node - there is a single source of truth for now
