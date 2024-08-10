# Projeto Dapp de Propostas e Votos

Esse projeto contêm toda parte de contrato, testes, e deploy na paste backend para deployar e verificar o contrato deve renomear o .env-example para .env colocar uri e apikey, pode ser por exemplo da [alchemy](https://www.alchemy.com/) ou da [quicknode](https://www.quicknode.com/), sua chave privada(não exponha para ninguem) e apikey [polygonscan](https://polygonscan.com/) para conseguir fazer a verificação. Então dentro do terminal dentro da pasta backend execute:
```shell
    npm i
    npx hardhat run scripts/deploy.js --network amoy
    npx hardhat verify "o endereço do contrato deployado que aparece no ultimo comando" --network amoy
```

Após isso entre na amoyscan no endereço do contrato deployado, entre em frontend\src\constants\index.js e lá substitua a adress do contrato e a ABI. Após isso execute:
```shell
    npm i 
    npm run dev
```
Desse modo a aplicação deve rodar em localhost.

Obs: É necessário ter node instalado e verifique que tem faucets de MATICs para fazer o deploy do SmartContract.