SHELL := /bin/bash

# CONFIGURAÇÃO DAS VARIÁVEIS DO TERMINAL.
BLACK=`tput setaf 0`
RED=`tput setaf 1`
GREEN=`tput setaf 2`
YELLOW=`tput setaf 3`
BLUE=`tput setaf 4`
WHITE=`tput setaf 7`
RESET=`tput sgr0`

project-install:
	@echo "${YELLOW}Instalação do projeto... ${RED}project-install${RESET}."

	@$(MAKE) npm-install

	@echo "${GREEN}Instalação do projeto realizada com sucesso...${RESET}."
.PHONY: project-install

npm-install:
	@echo "${YELLOW}Instalando os pacotes npm... ${RED}npm-install${RESET}."

	@npm install;

	@echo "${GREEN} Instalação dos pacotes npm realizados com sucesso...${RESET}."
.PHONY: init

npm-clear:
	@echo "${YELLOW}Limpando pacotes npm... ${RED}npm-clear${RESET}."

	@rm -rf node_modules;

	@echo "${GREEN}Remoção dos pacotes npm realizados com sucesso...${RESET}."
.PHONY: clear