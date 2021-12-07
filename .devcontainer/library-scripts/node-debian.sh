curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh -o /tmp/install_nvm.sh
bash /tmp/install_nvm.sh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install --lts