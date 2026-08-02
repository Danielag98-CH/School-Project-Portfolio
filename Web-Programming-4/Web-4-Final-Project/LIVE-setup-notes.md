# Setting up a CI/CD pipeline for your final project

### Create a public/private key pair
The cpanel SSH keys all require a passphrase, which will not work for with Github Actions
But you can generate your own key pair (without a passphrase) and upload it to cpanel
1. Open gitbash in your project folder 
2. Run this command to create a key pair (change username to your github username and repository to the name of your repository):
```md
ssh-keygen -t ed25519 -C "github.com/username/repository"

# The t option specifies the type of key to create. ED25519 is a modern, secure, and recommended algorithm
# The C option is for 'comment' and apparently GitHub wants your to add it this way
```
3. When prompted for the name the key pair, enter: **deploy-key** This will create a file named **deploy-key** (the private key) and another file named **deploy-key.pub** (the public key) in your project folder
4. Never commit your private key to the repository. MAKE SURE TO ADD BOTH KEY FILES TO YOUR .gitignore FILE!!!

### Import the public key into cPanel
In the cPanel dashboard:
1. Goto SSH Access (in the Security section)
1. Click **Import Key**
  1. Enter a key name of **deploy-key**
  1. Leave the private key empty
  1. Leave the passphrase empty
  1. Paste the contents of your public key
  1. Click the **Import** button
1. Click **Manage** for the key you just imported
  1. Click the **Authorize** button
  1. Now the key will can be used to log in via ssh

To test the key, open a gitbash terminal in your project folder and enter this command
(replace cpanelusername with your cpanel user name)
```md
ssh -i deploy-key cpanelusername@165.128.1.17
```

### Run these commands on the server
Once you are logged into the server you can run the following commands to stop and start a node app. MAKE SURE TO SET THE --user AND --app-root OPTIONS CORRECTLY:
- The **--user** option should be set to your cpanel username
- The **--app-root** option should be the path to the folder that has your node app code files ex: /home/username/api-final-project

To stop the node app:
```md
cloudlinux-selector stop --json --interpreter nodejs --user yourcpanelusername --app-root /home/yourcpanelusername/path-to-project-folder
```

To install the node modules:
```md
cloudlinux-selector install-modules --json --interpreter nodejs --user yourcpanelusername --app-root /home/yourcpanelusername/path-to-project-folder
```

To start the node app
```md
cloudlinux-selector start --json --interpreter nodejs --user yourcpanelusername --app-root /home/yourcpanelusername/path-to-project-folder
```

### Create the deployment script 
Create a file named **deploy.sh** in your project folder and put this into it. This script will copy files from your
GitHub repository to the live server.
- Make sure to upate the REMOTE_USER variable to your cpanel username
- Update the REMOTE_PATH to your project folder (ex: /home/username/api-final-project)
```sh
#!/bin/bash
REMOTE_USER="yourcpanelusername"
REMOTE_IP="165.128.1.17"
REMOTE_PATH="/home/yourcpanelusername/path-to-project-folder"

# NOTE: we need to exclude the log files from being copied because they will replace the ones on the live server
scp -r src $REMOTE_USER@$REMOTE_IP:$REMOTE_PATH
scp .env $REMOTE_USER@$REMOTE_IP:$REMOTE_PATH
scp package.json $REMOTE_USER@$REMOTE_IP:$REMOTE_PATH
```
Make sure your deploy.sh script is in the root of your repository and is executable by running this command:
```md
chmod +x deploy.sh
```
If you are ready to the copy files to your live server, you can run the script by entering this command:
```md
./deploy.sh
```

### Add your deploy-key file (the private key) as a GitHub secret:
1. Go to your repository on GitHub.com
1. Go to Settings > Secrets and variables > Actions.
1. Click New repository secret.
1. Set the Name to something like SSH_PRIVATE_KEY.
1. Open your **deploy-key** file in a text editor, copy its entire contents (but don't include any extra spaces when you copy).
1. Paste the contents into the Value field.
1. Click Add secret.

Notes:
- Be careful when copying and pasting the contents of the private key file
- In your GitHub Actions workflow file (which we create in the next step), we can reference the private key like so: **${{ secrets.SSH_PRIVATE_KEY }}**

### Create a GitHub action that triggers the deploy script
The following steps show you how to create a deployment file, which we will configure to run whenever you push your main/master branch to GitHub.
1. Create a **.github** folder in your project folder.
1. In the .github folder, create a **workflows** folder
1. In the workflows folder, create a file named **deploy.yml**, put this into the file:

NOTE: (are we using main or master!!!!!!!!!!)
```yml
name: Deploy to Remote Server

on:
  push:
    branches:
      - master # main OR master ???

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
      SERVER_IP: "165.128.1.17"
      CPANEL_USERNAME: "YOURCPANELUSERNAME"
      PROJECT_FOLDER: "PATHTOYOURPROJECTFOLDER" #ex: /home/someuser/api-final-project
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up SSH key for remote server
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
      
      - name: Add server to known hosts
        run: |
          ssh-keyscan -H $SERVER_IP >> ~/.ssh/known_hosts
      
      - name: Test SSH connection
        run: |
          ssh -o ConnectTimeout=10 $CPANEL_USERNAME@$SERVER_IP "echo 'SSH test successful'"

      - name: Copy files to remote server
        run: bash deploy.sh
      
      - name: Stop application
        run: |
          ssh ${{ env.CPANEL_USERNAME }}@${{ env.SERVER_IP }} "cloudlinux-selector stop --json --interpreter nodejs --user ${{ env.CPANEL_USERNAME }} --app-root ${{ env.PROJECT_FOLDER }}"

      - name: Install modules
        run: |
          ssh ${{ env.CPANEL_USERNAME }}@${{ env.SERVER_IP }} "cloudlinux-selector install-modules --json --interpreter nodejs --user ${{ env.CPANEL_USERNAME }} --app-root ${{ env.PROJECT_FOLDER }}"

      - name: Start application
        run: |
          ssh ${{ env.CPANEL_USERNAME }}@${{ env.SERVER_IP }} "cloudlinux-selector start --json --interpreter nodejs --user ${{ env.CPANEL_USERNAME }} --app-root ${{ env.PROJECT_FOLDER }}"
```

The action will run your script on every push to main/master. Go ahead and do a push.

### To view the log output for the deployment
1. Go to your repository on github.com
1. Click on the **Actions** tab
1. You should see a list that shows each time the deployment script runs,
you can click on one of them to see the log for that run

Note that there is a GitHub Actions VS code extension that you can install, we should
look into that.


