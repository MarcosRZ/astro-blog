---
title: 'Configuración de múltiples cuentas de GitHub en una misma máquina'
pubDate: 2025-01-27
description: 'Te explico cómo manejar diferentes cuentas de GitHub en el mismo equipo y olvidarte de las credenciales (MacOS, Linux)'  
author: 
  name: 'Marcos R.'
  url: 'https://marcosrgz.com'
image: '@media/images/pic-6.jpg'
imageAlt: 'The Astro logo on a dark background with a pink glow.'
tags: ["git", "github", "autenticación", "desarrollo", "software"]
---

Cuando utilizas el mismo equipo y sistema para proyectos profesionales y personales, es probable que te hayas encontrado con que tienes que manejar dos (o más) identidades diferentes. Es más que probable que la compañía para la que trabajas te haya facilitado una dirección de correo corporativo, y a la vez, tengas una cuenta personal que utilizas en tus proyectos personales. Por defecto, esto lleva a la necesidad de identificarte (email y contraseña) cada vez que quieres comunicarte con la plataforma de alojamiento de código remota como GitHub, GitLab, Bitbucket, etc.

Según para quién, esto puede no ser un problema. Para mí resulta incómodo e innecesario. Por eso he buscado una alternativa que me permita simplificar el proceso.

## Visión general

En esta guía configuraremos dos claves SSH diferentes en GitHub, uno para nuestra cuenta profesional y otra para nuestra cuenta personal, pero por lo general el procedimiento es el mismo para otros proveedores como los mencionados anteriormente. Cada clave identificará a un usuario diferente.

Es importante aclarar ciertos puntos para entender el por qué de esta configuración:

- GitHub no permite utilizar la misma clave para dos cuentas diferentes por motivos de seguridad (como en caso de que alguien se haya hecho con tu pareja de claves).

- Teniendo varias claves para el mismo host (github.com) tu máquina no puede identificar correctamente qué clave debe ser utilizada en cada repositorio.

- Por defecto, SSH prueba todas las claves del directorio **~/.ssh** hasta dar con una registrada en el servidor (github.com). Nosotros tendremos registradas dos claves diferentes, y ssh, por defecto, las probará en orden alfabético. Por lo que para unos repositorios, la primera clave será correcta, pero para otros la incorrecta, dando lugar a un error de autenticación.

Es por ello que debemos indicar a nuestro sistema, cuál de las claves debe ser utilizada en cada repositorio. Para ello, utilizaremos el concepto de **host alias**.

# Que es un alias de host?

Es simple y llanamente, un nombre alternativo para referirnos al host. Teniendo alias diferentes para el mismo host, podemos configurar una clave independiente para cada uno de ellos, mientras el destino sigue siendo el mismo (github.com).

## Creación de claves

En este apartado te resumo los pasos, pero si tienes problemas o prefieres ir directamente a la fuente, aquí te dejo el [enlace a la pagina de GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

En primer lugar generaremos una pareja de claves. Yo recomiendo utilizar el directorio por defecto **~/.ssh/**.

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```
Sigue los pasos respondiendo a las preguntas de forma razonable. Escoge un nombre medianamente descriptivo. Adicionalmente se te pedirá un "passphrase", que no es más que una contraseña para utilizar la clave. 

> Si bien puedes dejar la passphrase en blanco, es altamente recomendable añadirlo. De lo contrario, si alguien obtuviese acceso a los ficheros de clave podría suplantar tu identidad. La desventaja de añadir el passphrase es que tendrás que escribirlo cada vez que te quieras utilizar la clave.

Como resultado del proceso, se crearán dos ficheros con el mismo nombre. Uno sin extensión que contiene la clave privada, y otro con extensión **.pub** que contiene la clave pública.

> Una **clave privada** nunca debe ser compartida con nadie ni expuesta en ningún lugar. **SIEMPRE** que vayas a configurar una clave SSH o GPG, y tengas que copiarla y pegarla en algún lugar, será la **PÚBLICA** (fichero .pub)

## Configuración de la clave en el entorno local

Pero antes, debemos dar de alta esta clave en nuestro sistema. Para ello iniciaremos el agente ssh:

```sh
eval "$(ssh-agent -s)"
```
No hay que hacer nada con él por ahora.

Abrimos el fichero de configuración de ssh (es posible, dependiendo de la configuración del sistema, que necesitemos abrirlo como super usuario). Puedes utilizar tu editor de texto favorito. Yo para estas cosas uso vim (aunque aún no se por qué):

```sh
$ sudo vi ~/.ssh/config 
```
En este fichero se configuran los diferentes servidores a los que accederemos por ssh. No siempre es necesario configurarlos a mano, pero en este caso necesitamos algo un poco más avanzado.

Añadimos el siguiente bloque al fichero:

```
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/<fichero-clave>
```

Con esto, estamos indicando al sistema que cuando se establezca una conexión SSH con el host github.com, se utilice este el fichero que hemos creado en el paso anterior, además de un par de opciones para que la clave sea digerida por el sistema y añadida al llavero del OS.

Finalmente añadimos la clave al llavero: 

```sh
ssh-add --apple-use-keychain ~/.ssh/<fichero-clave>
```

## Añadiendo la clave pública a GitHub

Ahora sí, vamos a dar de alta la clave pública en GitHub. Para ello, abrimos el navegador y vamos a [https://github.com/settings/keys](https://github.com/settings/keys).

Veremos un botón para añadir una nueva clave SSH y al hacer click en él se nos mostrará un formulario bastante intuitivo.

![alt text](@media/images/image.png)

Añadimos un nombre descriptivo para nosotros. Esto nos ayudará a identificar la clave en el futuro. Yo suelo utilizar algún código sencillo que me indique el dispositivo pero a la vez no lo evidencie al resto. (PSC para PC Sobremesa Casa, MT para Macbook Trabajo podrían ser ejemplos).

Dejamos "Authentication key" como Key Type.

En el textarea "key" pegamos la clave pública (el contenido del **fichero.pub**). Asegúrate de copiar todo el contenido, y no copiar más cosas de la cuenta, como el prompt de la consola. Es un error muy común..

Si estas utilizando MacOS también puedes utilizar este comando para copiar la clave correctamente al portapapeles:
```sh
pbcopy < fichero-clave.pub
```

Para terminar hacemos click en **"Add ssh key"**

> Sin entrar en detalles sobre cómo funciona el sistema de parejas de claves (cifrado asimétrico), la clave pública será utilizada por el servidor para cifrar la información que nos envía. De esta manera, un observador no podría leer la información que se está transmitiendo. Al llegar la información cifrada a nuestro equipo, se utiliza la clave privada para descifrarla. Por ese motivo, es importante que esta última sea mantenida en secreto.

## Punto de control

Vamos a ver si por el momento hemos seguido todos los pasos correctamente. Para ello, vamos a intentar hacer una prueba de conexión desde la terminal.

```sh
ssh -vT git@github.com
```

Este comando imprimirá una cantidad importante de información, pero por ahora sólo debemos fijarnos en las últimas líneas. Si todo está correcto, deberías leer algo como:

```txt
Hi <usuario> You've successfully authenticated, but GitHub does not provide shell access.
```
Eso quiere decir que está perfecto. Si no es el caso, trata de averiguar qué ha salido mal apoyándote en el log. Lo más probable es que la clave no haya sido añadida correctamente al sistema.

## Añadiendo una segunda cuenta para el mismo host

Si solamente quisiese añadir autenticación con clave para una sola cuenta de GitHub podría dejarlo en este punto. Sin embargo, como el objetivo es añadir múltiples cuentas, necesitamos hacer un ligero cambio al fichero de configuración de ssh.

Cambiamos el host **github.com** por un alias a nuestra elección. Yo he escogido **github_personal**.
Adicionalmente, añadimos el host real al contenido del bloque con **HostName github.com**. El resultado debería lucir así:

```sh
Host github_personal
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/<fichero-clave>
```

A continuación, creamos una segunda clave siguiendo los mismos pasos, y a la hora de añadir el bloque de configuración SSH, hazlo tomando como referencia el anterior. Haz un copy-paste y cambia el alias y el fichero de clave.

```sh
Host github_trabajo
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/<fichero-clave-2>
```

## Configuración de los repositorios
Sólo queda un último cambio. Para aquellos repositorios en los que queramos utilizar estas claves, deberemos modificar la url del remote, sustituyendo el host "github.com" por "github_personal" o "github_trabajo" (los alias que hayas escogido).
El aspecto para un repositorio como este:

Cuando clones un nuevo repositorio, utiliza el alias en lugar de **github.com**

```bash
git clone git@github_personal:usuario/nombre-del-repositorio.git
```

Y para repositorios ya existentes te recomiendo utilizar el **cli de git**:

```bash
git remote set-url origin "git@github_personal:usuario/nombre-del-repositorio.git"
```

> **origin** es el nombre por defecto del remoto. Si lo has cambiado utiliza el nombre correspondiente

## Notas

### Cuidado con tus claves
Tras la configuración, especialmente si no has configurado un passphrase, cualquiera con acceso a tu sistema de ficheros podrá obtener acceso a tu cuenta. Aún con un passphrase, es teóricamente posible aplicar fuerza bruta dependiendo de la configuración de tu proveedor de alojamiento de código.

### Alternativa: Utilizar un sólo alias y una clave por defecto
En mi caso, suelo utilizar un alias para mi cuenta profesional, y en lugar de utilizar otro para mi cuenta personal, simplemente configuro la clave para el host **github.com**. De esta manera, mi cuenta por defecto es la personal, y si el repo es de trabajo, simplemente le añado el alias **github_trabajo**.

Es importante tener en cuenta que si no cambias la url del repositorio al clonarlo, la clave (cuenta) utilizada será la de github.com. Dependiendo del contexto, puede ser problemático.