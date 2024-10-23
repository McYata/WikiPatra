import * as vscode from 'vscode';
import { fetchWikiContent } from './commands/fetchWikiContent';
import { createTranslationTab } from './commands/createTranslationTab';
import { postTranslation } from './commands/postTranslation';

export async function closeAllEditors() {
  // 保存されていないエディタも含め、すべてのタブを強制的に閉じる
  await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  await vscode.commands.executeCommand('workbench.action.revertAndCloseActiveEditor');
}

export function activate(context: vscode.ExtensionContext) {
  const startTranslationCommand = vscode.commands.registerCommand(
    'extension.startTranslation',
    async () => {
      // 既存のタブをすべて閉じる
      await closeAllEditors();

      const sourceLanguage = await vscode.window.showInputBox({
        placeHolder: 'Enter source language for the Wikipedia article (e.g., en for English)',
      });

      if (!sourceLanguage) {
        vscode.window.showErrorMessage('Source language is required');
        return;
      }

      const articleTitle = await vscode.window.showInputBox({
        placeHolder: `Enter the title of the Wikipedia article in ${sourceLanguage}`,
      });

      if (!articleTitle) {
        vscode.window.showErrorMessage('Article title is required');
        return;
      }

      const targetLanguage = await vscode.window.showInputBox({
        placeHolder: 'Enter target language for translation (e.g., ja for Japanese)',
      });

      if (!targetLanguage) {
        vscode.window.showErrorMessage('Target language is required');
        return;
      }

      const targetArticleTitle = await vscode.window.showInputBox({
        placeHolder: 'Enter the title for the translated article',
      });

      if (!targetArticleTitle) {
        vscode.window.showErrorMessage('Translated article title is required');
        return;
      }

      await fetchWikiContent(sourceLanguage, articleTitle);
      const editor = await createTranslationTab(targetLanguage, targetArticleTitle);

      const postCommand = vscode.commands.registerCommand('extension.postTranslation', async () => {
        if (editor) {
          const content = editor.document.getText();
          await postTranslation(targetLanguage, targetArticleTitle, content);
        }
      });

      context.subscriptions.push(postCommand);
    }
  );

  context.subscriptions.push(startTranslationCommand);
}

export function deactivate() {}
