const vscode = require('vscode');
const EJS_MODE = { scheme: 'file', language: 'ejs' }

class EjsHoverProvider {
	provideHover(document, position, token) {
		let wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_]+/);
		if (wordRange === undefined) return Promise.reject("no word here");

		let currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
		return Promise.resolve(new vscode.Hover(currentWord));
	}
}

function activate(context) {
	context.subscriptions.push(vscode.languages.registerHoverProvider(EJS_MODE, new EjsHoverProvider()));
}

function deactivate() {
	return undefined;
}

module.exports = { activate, deactivate };