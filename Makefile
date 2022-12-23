.PHONY: help build
.DEFAULT_GOAL := help
.SILENT: help

# Colours
 NORMAL_RED:=\033[0;31m
 RED:=\033[1;31m
 NORMAL_GREEN:=\033[0;32m
 GREEN:=\033[1;32m
 NORMAL_YELLOW:=\033[0;33m
 YELLOW:=\033[1;33m
 WHITE:=\033[1;37m
 NC:=\033[0m


help: ## Display this help text
	grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}{printf "$(NORMAL_GREEN)%-20s$(NC) %s\n", $$1, $$2}' | sed -e 's/;32m##/;33m/' | sed -e 's/[0|1];33m#/0m$(shell printf "%-20s")/'

new: ## Create new canvas
	@./scripts/new.sh

open: ## Open canvas specified by <file> arg. CMD+S to save PNG. CMD+SHIFT+S to save mp4.
	@./scripts/open.sh ${file}

build: ## Builds canvas specified by <file> arg.
	@./scripts/build.sh ${file}