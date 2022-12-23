.SILENT: #don't echo commands as we run them.
.PHONY: all

OUTPUT_DIR:=./outputs

new:
	@./scripts/new.sh

open:
	@./scripts/open.sh ${file}

video:
	@./scripts/video.sh ${file}