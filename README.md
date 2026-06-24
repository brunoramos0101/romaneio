# 📋 Sistema de Romaneio - Sucena

Este é o repositório do **Sistema de Controle de Romaneio de Materiais e Qualidade**.
O aplicativo é um PWA (Progressive Web App) desenvolvido em HTML, CSS e JavaScript que funciona offline e se sincroniza com uma planilha do Google Sheets na nuvem.

---

## 🚀 Como Rodar o Projeto Localmente

Se você quiser testar as alterações no seu computador antes de enviar para a internet, siga um dos métodos abaixo:

### Método 1: Usando a Extensão "Live Server" do VS Code (Recomendado)
1. Abra a pasta do projeto no VS Code.
2. Se não tiver, instale a extensão **Live Server** (do desenvolvedor Ritwick Dey).
3. Clique no botão **"Go Live"** na barra inferior do VS Code ou clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500/index.html`.

### Método 2: Pelo Terminal (Python)
Se você tiver o Python instalado, abra o terminal na pasta do projeto e rode:
```bash
python -m http.server 8000
```
Depois, abra o navegador e acesse: `http://localhost:8000`

---

## 🌐 Como Atualizar o App Online (GitHub Pages)

Toda vez que você fizer alterações nos arquivos do projeto (como no `index.html` ou no `sw.js`) e quiser que elas fiquem online para todos os usuários, você deve executar os seguintes passos no terminal:

### Passo 1: Atualizar a Versão do Cache (Obrigatório para PWA)
Como o app salva os arquivos no celular/computador do usuário para funcionar offline, você deve dizer aos navegadores que há um código novo.
1. Abra o arquivo [sw.js](file:///c:/Users/Sucen/Desktop/romaneio/sw.js).
2. Na primeira linha, altere a versão do cache (ex: de `'sucena-romaneio-v4'` para `'sucena-romaneio-v5'`). Incremente sempre o número quando fizer modificações.

### Passo 2: Comandar o Git para subir as alterações
Abra o terminal do VS Code (certifique-se de estar na pasta `c:\Users\Sucen\Desktop\romaneio`) e execute os seguintes comandos em ordem:

1. **Adicionar arquivos alterados:**
   ```powershell
   git add .
   ```

2. **Gravar o commit com a descrição do que foi feito:**
   ```powershell
   git commit -m "Descrição das atualizações que você fez"
   ```

3. **Enviar para o GitHub:**
   ```powershell
   git push origin main
   ```

### Passo 3: Aguardar a publicação
O GitHub Pages leva de **1 a 3 minutos** para processar e atualizar o site. 
* Na primeira vez que os usuários abrirem o app após a atualização, o navegador detectará o novo cache (`sw.js` incrementado) e atualizará os arquivos em segundo plano.
* Nas próximas vezes que eles abrirem o app, já estarão visualizando a versão mais recente!

---

## ☁️ Sincronização de Usuários com a Nuvem

O app sincroniza a lista de usuários com o Google Sheets se a URL da API do Google estiver configurada.
* **Configuração:** No painel de administração do app, insira a URL do seu Google Apps Script no campo correspondente para habilitar o salvamento em tempo real e a sincronização automática.
