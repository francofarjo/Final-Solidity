
# Simple bank project

Este proyecto es un ejemplo de un banco simple desarrollado con un contrato inteligente en Solidity, donde los usuarios pueden registrarse, depositar y retirar ETH. También incluye un sistema de fees que son acumulados en una cuenta de tesorería.

Componentes Principales:
Contrato Inteligente - SimpleBank.sol
El contrato inteligente SimpleBank es el corazón del sistema bancario. Permite a los usuarios registrarse, depositar y retirar fondos, con un pequeño fee aplicado a los retiros.

-Registro de Usuarios: Los usuarios deben registrarse antes de poder usar las funcionalidades del contrato.
-Depósitos y Retiros: Los usuarios pueden depositar ETH en su cuenta y retirar fondos, con un fee que se acumula en una tesorería.
-Tesorería y Fees: Una porción de cada retiro (basado en el fee definido) es almacenada en una cuenta de tesorería. El propietario del contrato puede retirar fondos de la tesorería.

Script de Interacción en JavaScript
El script se utiliza para interactuar con el contrato desplegado en la red Ethereum.
Verifica si un usuario está registrado y lo registra si no lo está.
Realiza depósitos de ETH en el contrato.
Consulta el saldo del usuario.
Retira fondos del contrato, aplicando el fee definido.
Consulta la dirección del propietario y la cuenta de tesorería del contrato.
Módulo de Despliegue - Hardhat Ignition
Se utiliza Hardhat Ignition para desplegar el contrato en la red Ethereum.
Configura el fee de retiro y la dirección de la tesorería.
Automatiza el despliegue del contrato inteligente.

Tecnologías Utilizadas:
-Solidity (0.8.24): Para el desarrollo del contrato inteligente.
-Hardhat: Framework de desarrollo de contratos inteligentes.
-ethers.js: Biblioteca para interactuar con Ethereum y realizar operaciones como transacciones.
-Infura: Para conectarse a la red Ethereum.

```shell
npx hardhat help
npx hardhat compile
npx hardhat ignition deploy ignition/modules/SimpleBank.ts --network sepolia --verify
hh run scripts/interactSimpleBank.ts
```