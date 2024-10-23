import * as vscode from 'vscode';
import { fetchWikiContent } from './commands/fetchWikiContent';

export function activate(context: vscode.ExtensionContext) {
  const startTranslationCommand = vscode.commands.registerCommand(
    'extension.startTranslation',
    async () => {
      const language = await vscode.window.showInputBox({
        placeHolder: 'Enter target language for translation (e.g., ja for Japanese)',
      });

      if (language) {
        fetchWikiContent(language);
      }
    }
  );

  context.subscriptions.push(startTranslationCommand);
}

export function deactivate() {}
